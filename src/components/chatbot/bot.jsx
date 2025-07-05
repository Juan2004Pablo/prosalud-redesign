
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

const ProSaludChatbot = ({ isOpen, onClose, onToggleSize, isMinimized }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de ProSalud. ¿En qué puedo ayudarte hoy?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const abortControllerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const searchDocuments = async (query) => {
    try {
      const { data, error } = await supabase.functions.invoke('embed-question', {
        body: { question: query }
      });
      
      if (error) throw error;
      return data?.context || '';
    } catch (error) {
      console.error('Error searching documents:', error);
      return '';
    }
  };

  const streamChatResponse = async (messages, onChunk, onComplete, onError) => {
    try {
      abortControllerRef.current = new AbortController();
      
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/openai-gpt-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`,
        },
        body: JSON.stringify({ messages }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // Try to parse complete JSON objects from the buffer
        let lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in buffer
        
        for (let line of lines) {
          line = line.trim();
          if (line) {
            try {
              const data = JSON.parse(line);
              if (data.generatedText) {
                // If we get the complete response, handle it
                onComplete(data.generatedText);
                return;
              } else if (data.chunk) {
                // If we get a streaming chunk, handle it
                onChunk(data.chunk);
              }
            } catch (e) {
              // If we can't parse as JSON, treat as text chunk
              onChunk(line);
            }
          }
        }
      }
      
      // Handle any remaining buffer
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          if (data.generatedText) {
            onComplete(data.generatedText);
          }
        } catch (e) {
          onChunk(buffer);
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Stream aborted');
        return;
      }
      onError(error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsStreaming(true);

    try {
      // Search for relevant context
      const context = await searchDocuments(userMessage.text);
      
      // Create bot message placeholder for streaming
      const botMessageId = Date.now() + 1;
      const botMessage = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isStreaming: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);

      // Prepare messages for OpenAI
      const systemMessage = {
        role: 'system',
        content: `Eres el asistente oficial de ProSalud, el Sindicato de Profesionales de la Salud. 
        
Usa la siguiente información como contexto para responder preguntas:
${context}

Responde de manera útil, profesional y concisa. Si no tienes información específica sobre el tema consultado en el contexto proporcionado, indícalo amablemente.`
      };

      const chatMessages = [
        systemMessage,
        ...messages.slice(-5).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: userMessage.text }
      ];

      let streamedText = '';

      // Start streaming
      await streamChatResponse(
        chatMessages,
        // onChunk
        (chunk) => {
          streamedText += chunk;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, text: streamedText }
                : msg
            )
          );
        },
        // onComplete
        (completeText) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, text: completeText || streamedText, isStreaming: false }
                : msg
            )
          );
          setIsStreaming(false);
        },
        // onError
        (error) => {
          console.error('Error in chat:', error);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { 
                    ...msg, 
                    text: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.', 
                    isStreaming: false 
                  }
                : msg
            )
          );
          setIsStreaming(false);
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        text: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.',
        sender: 'bot',
        timestamp: new Date(),
      }]);
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      } transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-prosalud text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-prosalud" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Asistente ProSalud</h3>
            <p className="text-xs opacity-90">En línea</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSize}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 h-[340px]">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary-prosalud text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          {message.isStreaming && (
                            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && !isStreaming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1"
              />
              {isStreaming ? (
                <Button
                  onClick={stopStreaming}
                  size="sm"
                  variant="outline"
                  className="px-3"
                >
                  Detener
                </Button>
              ) : (
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  size="sm"
                  className="bg-primary-prosalud hover:bg-primary-prosalud/90 px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProSaludChatbot;
