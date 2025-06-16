import React, { useState, useEffect, useRef } from 'react';
import { Avatar, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CloseIcon from '@mui/icons-material/Close';
import { Box, styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

import { searchRelevantChunks } from '../../utils/vectorSearch';
import { getSecurityMessage } from '../../utils/inputValidator';
import { faqData } from '../../data/faqData';
import { faqCategories } from '../../data/faqData';
import { 
  isValidUserInput, 
  getSecurityMessage, 
  requiresContactInfo 
} from '../../utils/inputValidator.js';

const StyledChatBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: '350px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #ccc',
  borderRadius: theme.spacing(1),
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
  zIndex: 1000,
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  background: '#007BFF',
  color: 'white',
  padding: theme.spacing(2),
  textAlign: 'center',
  fontWeight: 'bold',
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledChatMessages = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledMessage = styled(Box)(({ theme, isBot }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  maxWidth: '80%',
  marginLeft: isBot ? '0' : 'auto',
  marginRight: isBot ? 'auto' : '0',
  backgroundColor: isBot ? '#f0f0f0' : '#e2f0ff',
  textAlign: isBot ? 'left' : 'right',
  wordBreak: 'break-word',
}));

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #ccc',
  display: 'flex',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(1),
}));

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
        Tu objetivo es ayudar a los afiliados respondiendo preguntas sobre ProSalud, sus servicios y beneficios.
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
      <IconButton
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#007BFF',
          color: 'white',
          zIndex: 1000,
        }}
      >
        {isOpen ? <CloseIcon /> : <HeadsetMicIcon />}
      </IconButton>

      {isOpen && (
        <StyledChatBox>
          <StyledHeader>
            <span>Chat de Ayuda ProSalud</span>
            <IconButton onClick={toggleChat} style={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </StyledHeader>
          <StyledChatMessages ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <StyledMessage key={index} isBot={message.isBot}>
                {message.text}
              </StyledMessage>
            ))}
            {isLoading && (
              <StyledMessage isBot={true}>
                <CircularProgress size={20} />
              </StyledMessage>
            )}
          </StyledChatMessages>
          <StyledFooter>
            <StyledTextField
              label="Escribe tu mensaje..."
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSendMessage} color="primary">
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledFooter>
        </StyledChatBox>
      )}
    </>
  );
};

export default ChatBot;
