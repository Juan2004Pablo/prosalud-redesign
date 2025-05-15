
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  linkTo: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, linkTo, className }) => {
  return (
    <Link 
      to={linkTo} 
      className={cn(
        "block bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-prosalud-border hover:border-primary-prosalud",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex justify-center md:justify-start">
          <Icon className="h-12 w-12 text-primary-prosalud group-hover:text-secondary-prosaludgreen transition-colors" />
        </div>
        <h3 className="text-xl font-semibold text-text-dark mb-2 group-hover:text-primary-prosalud transition-colors">{title}</h3>
        {description && <p className="text-sm text-text-gray mb-4 flex-grow">{description}</p>}
        {!description && <div className="flex-grow"></div>} {/* Ensure consistent height if no description */}
        <div className="mt-auto">
          <span className="text-sm font-medium text-secondary-prosaludgreen group-hover:text-primary-prosalud flex items-center">
            Acceder al servicio
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
