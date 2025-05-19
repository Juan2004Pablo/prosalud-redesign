
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';

interface ServiceCardProps {
  icon?: React.ElementType;
  imageUrl?: string;
  title: string;
  description?: string;
  linkTo: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, 
  imageUrl, 
  title, 
  description, 
  linkTo, 
  className 
}) => {
  return (
    <Link 
      to={linkTo} 
      className={cn(
        "flex flex-col h-full bg-card p-6 rounded-lg shadow-md border border-prosalud-border transition-all duration-300 hover:shadow-xl hover:border-primary-prosalud card-hover focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        className
      )}
      aria-label={`Acceder al servicio: ${title}`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex justify-center md:justify-start">
          {imageUrl ? (
            <Avatar className="h-12 w-12 overflow-hidden">
              <img 
                src={imageUrl} 
                alt={`Icono para ${title}`} 
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </Avatar>
          ) : Icon && (
            <Icon aria-hidden="true" className="h-12 w-12 text-primary-prosalud group-hover:text-secondary-prosaludgreen transition-colors" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-text-dark mb-3 group-hover:text-primary-prosalud transition-colors">{title}</h3>
        {description && <p className="text-sm text-text-gray mb-4 flex-grow">{description}</p>}
        {!description && <div className="flex-grow"></div>}
        <div className="mt-auto pt-2 border-t border-prosalud-border/30">
          <span className="text-sm font-medium text-secondary-prosaludgreen hover:text-primary-prosalud flex items-center transition-colors">
            Acceder al servicio
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
