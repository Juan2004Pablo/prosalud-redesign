
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AvisoIncapacidadAlertProps {
  onOpenChatbot?: () => void;
}

const AvisoIncapacidadAlert: React.FC<AvisoIncapacidadAlertProps> = ({ onOpenChatbot }) => {
  const handleChatbotClick = () => {
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      // Buscar el botón del chatbot en el DOM y hacer clic
      const chatbotButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
      if (chatbotButton) {
        chatbotButton.click();
      }
    }
  };

  return (
    <Alert className="border-green-200 bg-green-50 mb-6">
      <MessageCircle className="h-5 w-5 text-green-600" />
      <AlertDescription className="text-green-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <strong>¿Consultas sobre el pago de una incapacidad?</strong>
            <br />
            Usa nuestro chatbot especializado en la esquina inferior derecha. 
            Selecciona la opción habilitada y sigue el paso a paso.
          </div>
          <Button
            onClick={handleChatbotClick}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            Abrir Chatbot
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default AvisoIncapacidadAlert;
