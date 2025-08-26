
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
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary-prosalud to-secondary-prosaludgreen text-white p-8 pb-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                ¡Bienvenido al Nuevo ProSalud!
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/90 text-lg">
              Hemos rediseñado nuestro sitio web pensando en ti
            </p>
            <Badge className="mt-3 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Versión 2.0
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-primary-prosalud mb-2">
                ¿Qué hay de nuevo?
              </h3>
              <p className="text-gray-600">
                Descubre las mejoras que hemos implementado para brindarte un mejor servicio
              </p>
            </div>

            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-primary-prosalud/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary-prosalud" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-prosalud mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex gap-3">
                <MessageCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>¡Prueba nuestro chatbot!</strong> Haz clic en el ícono de chat en la esquina inferior derecha 
                    para obtener ayuda instantánea con tus consultas.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleClose}
                className="bg-primary-prosalud hover:bg-primary-prosalud/90 px-8"
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
