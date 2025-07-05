
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatbotFabProps {
  onOpenChatbot?: () => void;
}

const ChatbotFab: React.FC<ChatbotFabProps> = ({ onOpenChatbot }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleChatOpen = () => {
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      // Fallback: dispatch custom event
      window.dispatchEvent(new CustomEvent('openChatbot'));
    }
    setIsTooltipOpen(false);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleChatOpen}
            className="fixed bottom-6 right-6 w-14 h-14 bg-prosalud-salud hover:bg-prosalud-salud/90 rounded-full shadow-xl z-50 flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Abrir chat"
          >
            <MessageCircle className="text-white h-6 w-6" />
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
