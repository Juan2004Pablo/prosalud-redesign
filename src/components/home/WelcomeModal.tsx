
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MessageCircle, 
  Settings, 
  CheckCircle, 
  X 
} from 'lucide-react';

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar si el modal ya se mostró anteriormente
    const hasSeenWelcome = localStorage.getItem('prosalud-welcome-modal-seen');
    
    if (!hasSeenWelcome) {
      // Mostrar el modal después de un pequeño delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Marcar como visto para no mostrarlo nuevamente
    localStorage.setItem('prosalud-welcome-modal-seen', 'true');
  };

  const features = [
    {
      icon: Settings,
      title: 'Procesos de Autogestión Mejorados',
      description: 'Formularios más intuitivos y procesos simplificados para tus trámites.'
    },
    {
      icon: MessageCircle,
      title: 'Chatbot Inteligente',
      description: 'Asistente virtual disponible 24/7 para resolver tus dudas instantáneamente.'
    },
    {
      icon: Sparkles,
      title: 'Diseño Renovado',
      description: 'Interfaz moderna y responsive para una mejor experiencia de usuario.'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-xl bg-white">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        {/* Header with ProSalud branding */}
        <div className="bg-gradient-to-br from-primary-prosalud to-primary-prosalud-dark text-white px-6 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/15 p-3 rounded-full backdrop-blur-sm">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            <DialogHeader className="space-y-0">
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                ¡Bienvenido al Nuevo ProSalud!
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/90 text-base leading-relaxed">
              Hemos rediseñado nuestro sitio web pensando en ti
            </p>
            <Badge className="mt-3 bg-white/20 text-white border-white/30 hover:bg-white/30 font-medium">
              Versión 2.0
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-5">
            <div className="text-center mb-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Qué hay de nuevo?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Descubre las mejoras que hemos implementado para brindarte un mejor servicio
              </p>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-primary-prosalud/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary-prosalud" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex gap-3">
                <MessageCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>¡Prueba nuestro chatbot!</strong> Haz clic en el ícono de chat en la esquina inferior derecha 
                    para obtener ayuda instantánea con tus consultas.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleClose}
                className="bg-primary-prosalud hover:bg-primary-prosalud-dark px-6 py-2 text-sm font-medium"
              >
                ¡Entendido, explorar el sitio!
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
