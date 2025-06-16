import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, AlertTriangle, FileText, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { searchRelevantChunks } from '@/utils/vectorSearch';
import { isValidUserInput, getSecurityMessage } from '@/utils/inputValidator';
import IncapacidadForm from './IncapacidadForm';

// Patrones para detectar saludos
const greetingPatterns = [
  /^(hola|buenos días|buenas tardes|buenas noches|buen día|saludos|hey|hi|hello)$/i,
  /^(hola|buenos días|buenas tardes|buenas noches|buen día|saludos|hey|hi|hello)[!\s]*$/i,
  /^(como está[sn]?|cómo está[sn]?|que tal|qué tal)$/i
];

// Patrones para detectar consultas sin sentido
const nonsensePatterns = [
  /^[a-z]{1,3}$/i, // 1-3 letras solas
  /^[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/, // Solo símbolos/números
  /^(.)\1{3,}$/, // Caracteres repetidos (aaaa, 1111, etc)
  /^[a-zA-Z]{1,2}[0-9]+$/, // Combinaciones como "a1", "ab123"
  /^test$/i,
  /^prueba$/i,
  /^[xyz]+$/i,
  /^[qwerty]+$/i,
  /^asdf+$/i,
  /^[.,;:!?]{2,}$/ // Solo signos de puntuación
];

// Clasificación de preguntas por categorías
const categoryKeywords = {
  incapacidades: ['incapacidad', 'licencia', 'médica', 'eps', 'enfermedad', 'ausentismo', 'baja médica', 'certificado médico', 'prorroga', 'alta médica'],
  certificados: ['certificado', 'constancia', 'afiliación', 'certificación', 'documento', 'comprobante', 'carta', 'formato', 'solicitud', 'tramite'],
  contacto: ['teléfono', 'correo', 'contacto', 'dirección', 'ubicación', 'sede', 'oficina', 'horario', 'atención', 'comunicar'],
  convenios: ['convenio', 'acuerdo', 'sindicato', 'sindical', 'alianza', 'beneficio', 'descuento', 'promoción', 'oferta'],
  normatividad: ['norma', 'resolución', 'ley', 'decreto', 'reglamento', 'estatuto', 'legal', 'jurídico', 'normativa'],
  bienestar: ['bienestar', 'recreación', 'evento', 'actividad', 'taller', 'capacitación', 'deporte', 'cultura', 'galería'],
  pagos: ['pago', 'liquidación', 'nómina', 'verificación', 'salario', 'sueldo', 'dinero', 'compensación', 'diferida'],
  retiro: ['retiro', 'renuncia', 'desafiliación', 'salir', 'desvincular', 'baja', 'cesar', 'terminar']
};

// Respuestas automáticas para saludos
const greetingResponses = [
  "¡Hola! Soy el asistente virtual de ProSalud. Estoy aquí para ayudarte con información sobre nuestros servicios y beneficios. ¿En qué puedo asistirte hoy?",
  "¡Buenos días! Bienvenido/a al chat de ProSalud. ¿Tienes alguna consulta sobre nuestros servicios que pueda resolver?",
  "¡Hola! Me da mucho gusto saludarte. Soy tu asistente de ProSalud y estoy listo para ayudarte. ¿Qué necesitas saber?"
];

// Detecta si es un saludo
const isGreeting = (text) => {
  return greetingPatterns.some(pattern => pattern.test(text.trim()));
};

// Detecta consultas sin sentido
const isNonsense = (text) => {
  const trimmed = text.trim();
  if (trimmed.length < 2) return true;
  return nonsensePatterns.some(pattern => pattern.test(trimmed));
};

// Clasifica la pregunta por categoría
const classifyQuestion = (question) => {
  const lowerQuestion = question.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return category;
    }
  }
  
  return 'general';
};

// Carga contexto específico por categoría
const loadContextByCategory = async (category) => {
  try {
    const contextFiles = {
      incapacidades: ['/doc/servicios/incapacidades-licencias.md'],
      certificados: ['/doc/servicios/certificado-seguridad-social.md', '/doc/servicios/certificado-convenio.md'],
      contacto: ['/doc/contacto/informacion-contacto.md'],
      convenios: ['/doc/convenios/convenios-alianzas.md'],
      normatividad: ['/doc/legal/estatutos-beneficios.md', '/doc/legal/contrato-sindical.md'],
      bienestar: ['/doc/servicios/galeria-bienestar.md', '/doc/servicios/encuesta-bienestar.md'],
      pagos: ['/doc/servicios/verificacion-pagos.md', '/doc/servicios/solicitud-compensacion-anual-diferida.md'],
      retiro: ['/doc/servicios/solicitud-retiro-sindical.md'],
      general: ['/doc/quienes-somos/overview.md', '/doc/servicios/overview.md']
    };

    const files = contextFiles[category] || contextFiles.general;
    let context = '';

    for (const file of files) {
      try {
        const response = await fetch(file);
        if (response.ok) {
          const content = await response.text();
          context += content + '\n\n';
        }
      } catch (error) {
        console.warn(`No se pudo cargar el archivo: ${file}`);
      }
    }

    return context || 'Información general de ProSalud disponible.';
  } catch (error) {
    console.error('Error cargando contexto:', error);
    return 'Información general de ProSalud disponible.';
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIncapacidadForm, setShowIncapacidadForm] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // Validación básica de entrada
    const validation = isValidUserInput(userMessage);
    if (!validation.isValid) {
      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: getSecurityMessage(validation.reason) }
      ]);
      setInput('');
      return;
    }

    // Detectar consultas sin sentido
    if (isNonsense(userMessage)) {
      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'Por favor, realiza una consulta clara y específica sobre ProSalud, nuestros servicios o beneficios. Estoy aquí para ayudarte con información útil.' }
      ]);
      setInput('');
      return;
    }

    // Detectar saludos y responder automáticamente
    if (isGreeting(userMessage)) {
      const randomResponse = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: randomResponse }
      ]);
      setInput('');
      return;
    }

    // Detectar solicitud de formulario de incapacidad
    if (userMessage.toLowerCase().includes('incapacidad') && 
        (userMessage.toLowerCase().includes('formulario') || userMessage.toLowerCase().includes('formato'))) {
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setShowIncapacidadForm(true);
      setInput('');
      return;
    }

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Clasificar la pregunta y cargar contexto específico
      const category = classifyQuestion(userMessage);
      console.log(`Categoría detectada: ${category}`);
      
      const specificContext = await loadContextByCategory(category);
      
      // Buscar chunks relevantes usando embeddings (como fallback adicional)
      const relevantChunks = await searchRelevantChunks(userMessage, 2);
      const vectorContext = relevantChunks.map(chunk => chunk.content).join('\n\n');

      // Combinar contextos (priorizar el específico por categoría)
      const combinedContext = specificContext + (vectorContext ? '\n\n' + vectorContext : '');

      const systemPrompt = `Eres el asistente virtual de ProSalud, una entidad sindical que brinda servicios y beneficios a sus afiliados.

IMPORTANTE: ProSalud es un SINDICATO, NO un empleador. Los usuarios son AFILIADOS, no empleados. Nunca hagas referencia a relaciones laborales entre ProSalud y los afiliados, ya que esto contradice la naturaleza sindical de la organización.

Contexto específico relevante:
${combinedContext}

Instrucciones:
- Responde ÚNICAMENTE preguntas relacionadas con ProSalud, sus servicios y beneficios
- Usa un tono amable, profesional y cercano
- Refiere a los usuarios como "afiliados" o "miembros", nunca como "empleados"
- Si no tienes información específica, orienta hacia los canales oficiales de contacto
- Mantén respuestas concisas (máximo 300 palabras)
- NO hagas referencia a relaciones laborales entre ProSalud y los afiliados
- ProSalud es una entidad sindical que REPRESENTA y DEFIENDE los intereses de los afiliados ante sus empleadores`;

      const { data, error } = await supabase.functions.invoke('openai-gpt-chat', {
        body: {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ]
        }
      });

      if (error) {
        throw new Error(error.message || 'Error al procesar la consulta');
      }

      const assistantMessage = data.generatedText || 'Lo siento, no pude procesar tu consulta. Por favor, inténtalo de nuevo.';

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

    } catch (error) {
      console.error('Error en chat:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Disculpa, estoy teniendo dificultades técnicas. Por favor, contacta directamente con ProSalud para recibir asistencia.' 
      }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: '¡Hola! Soy el asistente virtual de ProSalud. Estoy aquí para ayudarte con información sobre nuestros servicios y beneficios como afiliado. ¿En qué puedo asistirte hoy?'
      }]);
    }
  };

  const closeIncapacidadForm = () => {
    setShowIncapacidadForm(false);
  };

  if (showIncapacidadForm) {
    return <IncapacidadForm onClose={closeIncapacidadForm} />;
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
        aria-label="Abrir chat de asistencia"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">Asistente ProSalud</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    {message.role === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                    <span className="text-sm whitespace-pre-wrap">{message.content}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot size={16} />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu consulta..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
                maxLength={500}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {input.length}/500 caracteres
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
