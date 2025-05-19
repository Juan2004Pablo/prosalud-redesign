
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatbotFab: React.FC = () => {
  const handleChatOpen = () => {
    // Lógica para abrir el chatbot (se implementará más adelante)
    console.log('Abrir chatbot');
    // Por ejemplo, podrías usar un estado global o un context para manejar la visibilidad del chat.
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleChatOpen}
            className="fixed bottom-6 right-6 w-14 h-14 bg-prosalud-salud hover:bg-prosalud-salud/90 rounded-full shadow-xl z-50 flex items-center justify-center"
            aria-label="Abrir chat"
          >
            <MessageCircle className="text-white h-7 w-7" /> {/* Icono un poco más grande, ajustado al nuevo tamaño del botón */}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white border-gray-700">
          <p>¡Chatea con nosotros!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatbotFab;
