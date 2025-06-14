
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! ¿En qué puedo ayudarte hoy?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const welcomeMessages = [
    "¡Hola! Soy tu asistente virtual de ProSalud. ¿En qué puedo ayudarte hoy?",
    "Puedo responder preguntas sobre incapacidades, servicios y más.",
    "¡Escribe tu consulta y te responderé en breve!"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Auto-hide tooltip after 1 minute
  useEffect(() => {
    if (showWelcomeTooltip) {
      const timer = setTimeout(() => {
        setShowWelcomeTooltip(false);
      }, 60000); // 1 minute

      return () => clearTimeout(timer);
    }
  }, [showWelcomeTooltip]);

  // Listen for external chatbot open requests
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
      setShowWelcomeTooltip(false);
    };

    // Listen for clicks on elements with data-chatbot-trigger
    const triggerElements = document.querySelectorAll('[data-chatbot-trigger]');
    triggerElements.forEach(element => {
      if (element !== document.querySelector('[data-chatbot-trigger]')) {
        element.addEventListener('click', handleOpenChatbot);
      }
    });

    // Custom event listener for external chatbot activation
    window.addEventListener('openChatbot', handleOpenChatbot);

    return () => {
      triggerElements.forEach(element => {
        if (element !== document.querySelector('[data-chatbot-trigger]')) {
          element.removeEventListener('click', handleOpenChatbot);
        }
      });
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);

  const closeWelcomeTooltip = () => {
    setShowWelcomeTooltip(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = { text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(inputValue);
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: "bot" }]);
      }, 500);
    }
  };

  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("incapacidad")) {
      return "Para consultar el estado de tu incapacidad, por favor proporciona tu número de documento y fecha de expedición.";
    } else if (lowerCaseMessage.includes("certificado") && lowerCaseMessage.includes("convenio")) {
      return "Puedes solicitar tu certificado de convenio directamente desde nuestra página web en la sección de servicios.";
    } else if (lowerCaseMessage.includes("horario") && lowerCaseMessage.includes("atención")) {
      return "Nuestro horario de atención es de lunes a viernes de 7:00 AM a 5:00 PM.";
    } else if (lowerCaseMessage.includes("contacto")) {
      return "Puedes contactarnos a través de nuestro correo electrónico comunicaciones@sindicatoprosalud.com o llamando al (604) 444-5555.";
    } else {
      return "Gracias por tu mensaje. En este momento no tengo la respuesta, pero te contactaremos lo antes posible.";
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setInputValue(value);
    }
  };

  const remainingChars = 500 - inputValue.length;
  const showCharWarning = remainingChars <= 10;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Welcome tooltip */}
      {showWelcomeTooltip && (
        <div className="fixed bottom-20 right-4 md:right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs z-[9999] animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm text-gray-700 leading-relaxed">
              {welcomeMessages[currentMessageIndex]}
            </p>
            <button
              onClick={closeWelcomeTooltip}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 text-lg leading-none"
              aria-label="Cerrar mensaje"
            >
              ×
            </button>
          </div>
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      )}

      {/* Chatbot button */}
      <button
        onClick={toggleChat}
        data-chatbot-trigger
        className="fixed bottom-4 right-4 md:right-6 bg-prosalud-salud text-white p-4 rounded-full shadow-lg hover:bg-prosalud-salud/90 transition-all duration-300 z-[9998] flex items-center justify-center group"
        style={{ width: '60px', height: '60px' }}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-200" />
        ) : (
          <MessageCircle size={24} className="transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>

      {/* Chatbot interface */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 md:right-6 bg-white border border-gray-200 rounded-lg shadow-lg max-w-sm w-full z-[9999] animate-in slide-in-from-bottom-2 duration-300 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h5 className="text-lg font-semibold text-gray-800">Chat de Ayuda</h5>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div ref={chatContainerRef} className="p-4 h-64 overflow-y-auto flex-grow">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-3 py-2 rounded-lg ${message.sender === 'user' ? 'bg-prosalud-salud text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Escribe tu mensaje..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
              />
              <button
                type="button"
                className="bg-prosalud-salud hover:bg-prosalud-salud/90 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
                onClick={sendMessage}
              >
                Enviar
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center text-xs">
              <span className={`${showCharWarning ? 'text-red-500' : 'text-gray-500'}`}>
                {inputValue.length}/500 caracteres
              </span>
              {showCharWarning && (
                <span className="text-red-500 font-medium">
                  Límite de caracteres alcanzado
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
