
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Send, Headphones, X } from 'lucide-react';

import { searchRelevantChunks } from '../../utils/vectorSearch';
import { faqData } from '../../data/faqData';
import { faqCategories } from '../../data/faqData';
import { 
  isValidUserInput, 
  getSecurityMessage, 
  requiresContactInfo 
} from '../../utils/inputValidator.js';

const categorizeQuery = (query) => {
  // Convertir la consulta a minúsculas para hacer la comparación insensible a mayúsculas
  const lowerQuery = query.toLowerCase();

  // Iterar sobre las categorías de preguntas frecuentes
  for (const category of faqCategories) {
    // Buscar preguntas frecuentes que coincidan con la categoría actual
    const matchingFaqs = faqData.filter(faq => faq.category === category.id);

    // Verificar si alguna de las preguntas frecuentes coincide con la consulta del usuario
    for (const faq of matchingFaqs) {
      // Convertir la pregunta frecuente a minúsculas para la comparación
      const lowerQuestion = faq.question.toLowerCase();

      // Verificar si la consulta del usuario contiene palabras clave de la pregunta frecuente
      const keywordsMatch = faq.keywords.some(keyword => lowerQuery.includes(keyword));

      // Si la consulta del usuario coincide con la pregunta frecuente o contiene palabras clave, retornar la categoría
      if (lowerQuery.includes(lowerQuestion) || keywordsMatch) {
        return category.id;
      }
    }
  }

  // Si no se encuentra ninguna categoría que coincida, retornar "general"
  return "general";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll al fondo cada vez que hay un nuevo mensaje
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    console.log('🔍 Validando input del usuario:', inputValue);
    
    // Validar input del usuario
    const validation = isValidUserInput(inputValue);
    console.log('🔍 Resultado de validación:', validation);

    if (!validation.isValid) {
      console.log('❌ Input no válido:', validation.reason);
      
      // Agregar mensaje del usuario
      const userMessage = { text: inputValue, isBot: false };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Agregar respuesta de error
      const errorMessage = { 
        text: getSecurityMessage(validation.reason), 
        isBot: true 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      
      setInputValue('');
      return;
    }

    // Manejar respuestas automáticas (saludos y despedidas)
    if (validation.autoResponse) {
      console.log('🤖 Respuesta automática detectada:', validation.messageType);
      
      const userMessage = { text: inputValue, isBot: false };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      const autoMessage = { 
        text: validation.autoResponse, 
        isBot: true 
      };
      setMessages(prevMessages => [...prevMessages, autoMessage]);
      
      setInputValue('');
      return;
    }

    const userMessage = { text: inputValue, isBot: false };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    setIsLoading(true);

    try {
      // Determinar la categoría de la consulta
      const category = categorizeQuery(inputValue);
      console.log(`💬 Categoría detectada: ${category}`);

      // Buscar chunks relevantes
      console.log(`📚 Buscando chunks relevantes en la categoría: ${category}`);
      const relevantChunks = await searchRelevantChunks(inputValue, 3);

      let contextText = '';
      if (relevantChunks && relevantChunks.length > 0) {
        contextText = relevantChunks.map(chunk => chunk.content).join('\n');
        console.log(`✅ Encontrados ${relevantChunks.length} chunks relevantes`);
      } else {
        console.log('No se encontraron chunks relevantes, usando conocimiento general.');
      }

      // Construir el prompt para OpenAI
      const prompt = `Eres un asistente virtual del Sindicato de Profesionales de la Salud - ProSalud.
        
        IMPORTANTE: ProSalud es un sindicato, NO un empleador. Los usuarios son afiliados al sindicato, NO empleados de ProSalud. Nunca menciones relaciones laborales entre ProSalud y los afiliados, ya que esto es contradictorio al contrato sindical y puede causar problemas legales.
        
        Tu objetivo es ayudar a los afiliados respondiendo preguntas sobre ProSalud, sus servicios y beneficios como sindicato.
        Utiliza el siguiente contexto para responder la pregunta del usuario:
        
        ${contextText}
        
        Si la pregunta no está relacionada con ProSalud, sus servicios o beneficios, o si no encuentras información relevante en el contexto proporcionado, responde que solo puedes responder preguntas relacionadas con ProSalud y sus servicios.
        Si la consulta requiere información de contacto (teléfono, correo, dirección), proporciona la información de contacto de ProSalud.
        
        Pregunta del usuario: ${inputValue}
        `;

      // Llamar a la función de OpenAI
      const response = await fetch('/api/openai-gpt-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });

      if (!response.ok) {
        throw new Error(`Error en la llamada a la API: ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage = { text: data.generatedText, isBot: true };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error al procesar la consulta:', error);
      const errorMessage = { text: getSecurityMessage(), isBot: true };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 z-[1000] bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-5 right-5 w-[350px] h-[500px] z-[1000] flex flex-col border border-gray-300 rounded-lg bg-white shadow-lg font-sans">
          <div className="bg-blue-600 text-white p-4 text-center font-bold rounded-t-lg flex justify-between items-center">
            <span>Chat de Ayuda ProSalud</span>
            <Button
              onClick={toggleChat}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            ref={chatMessagesRef}
            className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] break-words ${
                  message.isBot
                    ? 'bg-gray-100 text-left mr-auto'
                    : 'bg-blue-100 text-right ml-auto'
                }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 text-left mr-auto p-2 rounded-lg max-w-[80%]">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-300 flex space-x-2">
            <Input
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
