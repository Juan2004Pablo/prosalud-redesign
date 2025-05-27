
import React, { useMemo } from 'react';
import ServiceCard from '@/components/shared/ServiceCard';
import { 
  Search as SearchIcon, // Renamed to avoid conflict with Search component
  FileText, 
  BedDouble, 
  Banknote, 
  ShieldCheck, 
  HardHat, 
  Landmark, 
  Image, 
  Coins, 
  Award as Certificate, 
  CalendarCheck,
  DollarSign,
  Hospital,
  BriefcaseMedical, 
  Users as Poll, 
  Store,
  Calendar,
  CalendarDays,
  CreditCard,
  LogOut
} from 'lucide-react';

// Definición de categorías (debe coincidir con QuickLinksSection)
export const serviceCategories = [
  "Todos",
  "Certificados y Documentos",
  "Gestión Personal y Laboral",
  "Pagos",
  "Bienestar y SST"
] as const;

export type ServiceCategory = typeof serviceCategories[number];

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  linkTo: string;
  category: ServiceCategory;
}

const newServices: Service[] = [
  // Certificados y Documentos
  { icon: Certificate, title: 'Certificado de convenio sindical', description: 'Descarga tu constancia de afiliación al convenio sindical.', linkTo: '/servicios/certificado-convenio', category: 'Certificados y Documentos' },
  { icon: ShieldCheck, title: 'Certificado de seguridad social', description: 'Genera tu certificado de aportes a la seguridad social.', linkTo: '/servicios/certificado-seguridad-social', category: 'Certificados y Documentos' },
  { icon: Calendar, title: 'Formato de permisos y cambio de turnos', description: 'Diligencia el formato para solicitudes de permisos laborales o ajustes en tus turnos.', linkTo: '/servicios/permisos-turnos', category: 'Certificados y Documentos' },
  
  // Gestión Personal y Laboral
  { icon: CalendarCheck, title: 'Solicitud de descanso laboral', description: 'Solicita días de descanso según tus derechos laborales.', linkTo: '/servicios/descanso-laboral', category: 'Gestión Personal y Laboral' },
  { icon: Hospital, title: 'Incapacidades y licencias', description: 'Reporta tu incapacidad o licencia de maternidad al sindicato.', linkTo: '/servicios/incapacidad-maternidad', category: 'Gestión Personal y Laboral' },
  { icon: CalendarDays, title: 'Cuadro de turnos', description: 'Consulta tu calendario de turnos asignados.', linkTo: 'https://www.prosanet.com/#/shifts-employees/index', category: 'Gestión Personal y Laboral' },
  { icon: LogOut, title: 'Solicitud de retiro sindical', description: 'Inicia el proceso para retirarte del sindicato.', linkTo: '/servicios/retiro-sindical', category: 'Gestión Personal y Laboral' },

  // Pagos
  { icon: DollarSign, title: 'Compensación anual diferida', description: 'Gestiona el pago correspondiente a tu compensación anual.', linkTo: '/servicios/compensacion-anual', category: 'Pagos' },
  { icon: SearchIcon, title: 'Consulta de pagos', description: 'Verifica los pagos realizados por concepto laboral o sindical.', linkTo: '/servicios/consulta-pagos', category: 'Pagos' }, 
  { icon: Banknote, title: 'Actualizar cuenta bancaria', description: 'Notifica un cambio en tu cuenta para recibir pagos.', linkTo: '/servicios/actualizar-cuenta', category: 'Pagos' },
  { icon: CreditCard, title: 'Solicitud de microcrédito', description: 'Aplica a un microcrédito con condiciones especiales para afiliados.', linkTo: '/servicios/microcredito', category: 'Pagos' },
  
  // Bienestar y SST
  { icon: BriefcaseMedical, title: 'Seguridad y salud en el trabajo (S.S.T)', description: 'Accede a recursos y reportes relacionados con SST.', linkTo: '/servicios/sst', category: 'Bienestar y SST' },
  { icon: Poll, title: 'Encuesta de bienestar laboral', description: 'Participa en encuestas para mejorar tu entorno laboral.', linkTo: 'https://forms.gle/2YnLMixdN6EnZ7Qq6', category: 'Bienestar y SST' },
  { icon: Image, title: 'Galería de bienestar', description: 'Explora fotos y eventos organizados para tu bienestar.', linkTo: '/servicios/galeria-bienestar', category: 'Bienestar y SST' },
];

interface ServiceListProps {
  searchTerm: string;
  selectedCategory: ServiceCategory;
}

const ServiceList: React.FC<ServiceListProps> = ({ searchTerm, selectedCategory }) => {
  const filteredServices = useMemo(() => {
    let servicesToFilter = newServices;

    if (selectedCategory && selectedCategory !== 'Todos') {
      servicesToFilter = servicesToFilter.filter(service => service.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      servicesToFilter = servicesToFilter.filter(service => 
        service.title.toLowerCase().includes(lowerSearchTerm) ||
        (service.description && service.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    return servicesToFilter;
  }, [searchTerm, selectedCategory]);

  return (
    <>
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              linkTo={service.linkTo}
              className="animate-scale-in" // Keep existing animation
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No se encontraron trámites.</p>
          <p className="text-sm text-muted-foreground">Intenta con otras palabras clave o cambia la categoría.</p>
        </div>
      )}
    </>
  );
};

export default ServiceList;
