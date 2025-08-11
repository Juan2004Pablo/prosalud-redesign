import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import DOMPurify from 'dompurify';

const Bot = () => {
  // Recuperar mensajes del localStorage al inicializar
  const getStoredMessages = () => {
    try {
      const stored = localStorage.getItem('chatbot_messages');
      return stored ? JSON.parse(stored) : [
        {
          type: 'bot',
          content: '¡Hola! Soy el asistente virtual de ProSalud. ¿En qué puedo ayudarte hoy?',
          timestamp: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Error loading stored messages:', error);
      return [
        {
          type: 'bot',
          content: '¡Hola! Soy el asistente virtual de ProSalud. ¿En qué puedo ayudarte hoy?',
          timestamp: new Date().toISOString()
        }
      ];
    }
  };

  const getStoredChatState = () => {
    try {
      const stored = localStorage.getItem('chatbot_open');
      return stored === 'true';
    } catch (error) {
      return false;
    }
  };

  const [messages, setMessages] = useState(getStoredMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(getStoredChatState);
  const [context, setContext] = useState('');
  const messagesEndRef = useRef(null);

  // Guardar mensajes en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem('chatbot_messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  }, [messages]);

  // Guardar estado del chat (abierto/cerrado) en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chatbot_open', isOpen.toString());
    } catch (error) {
      console.error('Error saving chat state to localStorage:', error);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadContext();
  }, []);

  const loadContext = async () => {
    try {
      const response = await fetch('/chatbot/contextConfig.json');
      const config = await response.json();
      setContext(config.context || '');
    } catch (error) {
      console.error('Error loading context:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemMessage = {
        role: 'system',
        content: context
      };

      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const messagesToSend = [
        systemMessage,
        ...conversationHistory,
        { role: 'user', content: userMessage.content }
      ];

      const { data, error } = await supabase.functions.invoke('openai-gpt-chat', {
        body: { messages: messagesToSend }
      });

      if (error) throw error;

      const botMessage = {
        type: 'bot',
        content: data.generatedText || 'Lo siento, no pude generar una respuesta.',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        type: 'bot',
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    const initialMessage = {
      type: 'bot',
      content: '¡Hola! Soy el asistente virtual de ProSalud. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toISOString()
    };
    setMessages([initialMessage]);
  };

  const renderMessage = (message) => {
    if (message.type === 'bot') {
      const cleanContent = DOMPurify.sanitize(message.content, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
        ALLOWED_ATTR: ['href', 'target', 'rel']
      });

      return (
        <div 
          dangerouslySetInnerHTML={{ __html: cleanContent.replace(/\n/g, '<br>') }}
        />
      );
    }
    return <div>{message.content}</div>;
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 z-40 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Abrir chat de asistencia"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.4183 21 12 21C10.8 21 9.6 20.8 8.5 20.3L3 21L4.7 15.5C4.2 14.4 4 13.2 4 12C4 7.58172 8.58172 3 12 3C16.4183 3 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Ventana de chat */}
      <div className={`fixed bottom-6 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-xl transition-all duration-300 z-50 flex flex-col ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Asistente ProSalud</h3>
              <p className="text-xs opacity-90">En línea</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className="p-1 hover:bg-primary-foreground/20 rounded"
              title="Limpiar chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6M19 6V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/20 rounded"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {renderMessage(message)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bot;
