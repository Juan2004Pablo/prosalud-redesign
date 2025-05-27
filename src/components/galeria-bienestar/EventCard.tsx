
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EventData } from '@/types/eventos';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge'; // Asumiendo que tienes un componente Badge

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out animate-fadeIn">
      <CardHeader className="p-0">
        <img 
          src={event.mainImage.src} 
          alt={event.mainImage.alt} 
          className="w-full h-48 object-cover" 
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold mb-2 text-primary-prosalud line-clamp-2">{event.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarDays size={16} className="mr-2" />
          <span>{new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        {event.category && (
          <Badge variant="outline" className="text-xs mb-2">{event.category}</Badge>
        )}
        <!--<p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>-->
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link 
          to={`/servicios/galeria-bienestar/${event.id}`}
          className="text-sm font-medium text-primary-prosalud hover:text-secondary-prosaludgreen flex items-center"
        >
          Ver Detalles
          <ChevronRight size={18} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
