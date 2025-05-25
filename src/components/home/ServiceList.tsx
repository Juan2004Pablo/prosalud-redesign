
import React, { useMemo } from 'react';
import ServiceCard from '@/components/shared/ServiceCard';
import { 
  Search, 
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

const newServices = [
  { icon: Certificate, title: 'Certificado de convenio sindical', description: 'Descarga tu constancia de afiliación al convenio sindical.', linkTo: '/servicios/certificado-convenio' },
  { icon: CalendarCheck, title: 'Solicitud de descanso laboral', description: 'Solicita días de descanso según tus derechos laborales.', linkTo: '/servicios/descanso-laboral' },
  { icon: DollarSign, title: 'Compensación anual diferida', description: 'Gestiona el pago correspondiente a tu compensación anual.', linkTo: '/servicios/compensacion-anual' },
  { icon: Search, title: 'Consulta de pagos', description: 'Verifica los pagos realizados por concepto laboral o sindical.', linkTo: '/servicios/consulta-pagos' }, 
  { icon: ShieldCheck, title: 'Certificado de seguridad social', description: 'Genera tu certificado de aportes a la seguridad social.', linkTo: '/servicios/certificado-seguridad-social' },
  { icon: Banknote, title: 'Actualizar cuenta bancaria', description: 'Notifica un cambio en tu cuenta para recibir pagos.', linkTo: '/servicios/actualizar-cuenta' },
  { icon: Hospital, title: 'Incapacidades y licencias', description: 'Reporta tu incapacidad o licencia de maternidad al sindicato.', linkTo: '/servicios/incapacidad-maternidad' },
  { icon: BriefcaseMedical, title: 'Seguridad y salud en el trabajo (S.S.T)', description: 'Accede a recursos y reportes relacionados con SST.', linkTo: '/servicios/sst' },
  { icon: Poll, title: 'Encuesta de bienestar laboral', description: 'Participa en encuestas para mejorar tu entorno laboral.', linkTo: 'https://forms.gle/2YnLMixdN6EnZ7Qq6' },
  { icon: Image, title: 'Galería de bienestar', description: 'Explora fotos y eventos organizados para tu bienestar.', linkTo: '/servicios/galeria-bienestar' },
  { icon: Calendar, title: 'Formato de permisos y cambio de turnos', description: 'Diligencia el formato para solicitudes de permisos laborales o ajustes en tus turnos.', linkTo: '/servicios/permisos-turnos' },
  { icon: CalendarDays, title: 'Cuadro de turnos', description: 'Consulta tu calendario de turnos asignados.', linkTo: 'https://www.prosanet.com/#/shifts-employees/index' },
  { icon: CreditCard, title: 'Solicitud de microcrédito', description: 'Aplica a un microcrédito con condiciones especiales para afiliados.', linkTo: '/servicios/microcredito' },
  { icon: LogOut, title: 'Solicitud de retiro sindical', description: 'Inicia el proceso para retirarte del sindicato.', linkTo: '/servicios/retiro-sindical' },
];

interface ServiceListProps {
  searchTerm: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ searchTerm }) => {
  const filteredServices = useMemo(() => {
    if (!searchTerm) {
      return newServices;
    }
    return newServices.filter(service => 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

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
              // Adding focus visible styles for accessibility
              // These will be more effective if the Link component itself can receive focus styling
              // However, ServiceCard as a whole block link should be focusable
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Search size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No se encontraron trámites.</p>
          <p className="text-sm text-muted-foreground">Intenta con otras palabras clave.</p>
        </div>
      )}
    </>
  );
};

export default ServiceList;
