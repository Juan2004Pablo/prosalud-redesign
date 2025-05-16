import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ServiceCard from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button'; // shadcn button
import { Input } from '@/components/ui/input';   // shadcn input
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
  LogOut,
  Building2
} from 'lucide-react';

const newServices = [
  { icon: Certificate, title: 'Certificado de convenio sindical', description: 'Descarga tu constancia de afiliación al convenio sindical.', linkTo: '/servicios/certificado-convenio' },
  { icon: CalendarCheck, title: 'Solicitud de descanso laboral', description: 'Solicita días de descanso según tus derechos laborales.', linkTo: '/servicios/descanso-laboral' },
  { icon: DollarSign, title: 'Compensación anual diferida', description: 'Gestiona el pago correspondiente a tu compensación anual.', linkTo: '/servicios/compensacion-anual' },
  { icon: Search, title: 'Consulta de pagos', description: 'Verifica los pagos realizados por concepto laboral o sindical.', linkTo: '/servicios/consulta-pagos' }, 
  { icon: Hospital, title: 'Incapacidad y licencia de maternidad', description: 'Reporta tu incapacidad o licencia de maternidad al sindicato.', linkTo: '/servicios/incapacidad-maternidad' },
  { icon: ShieldCheck, title: 'Certificado de seguridad social', description: 'Genera tu certificado de aportes a la seguridad social.', linkTo: '/servicios/certificado-seguridad-social' },
  { icon: Banknote, title: 'Actualizar cuenta bancaria', description: 'Notifica un cambio en tu cuenta para recibir pagos.', linkTo: '/servicios/actualizar-cuenta' },
  { icon: BriefcaseMedical, title: 'Seguridad y salud en el trabajo (SST)', description: 'Accede a recursos y reportes relacionados con SST.', linkTo: '/servicios/sst' },
  { icon: Image, title: 'Galería de bienestar', description: 'Explora fotos y eventos organizados para tu bienestar.', linkTo: '/servicios/galeria-bienestar' },
  { icon: Poll, title: 'Encuesta de bienestar laboral', description: 'Participa en encuestas para mejorar tu entorno laboral.', linkTo: '/servicios/encuesta-bienestar' },
  { icon: Store, title: 'Servicios de Comfenalco Antioquia', description: 'Conoce los beneficios y convenios con Comfenalco.', linkTo: '/servicios/comfenalco' },
  { icon: Calendar, title: 'Permisos y cambio de turnos', description: 'Solicita permisos laborales o ajustes en tus turnos.', linkTo: '/servicios/permisos-turnos' },
  { icon: CalendarDays, title: 'Cuadro de turnos', description: 'Consulta tu calendario de turnos asignados.', linkTo: '/servicios/cuadro-turnos' },
  { icon: CreditCard, title: 'Solicitud de microcrédito', description: 'Aplica a un microcrédito con condiciones especiales para afiliados.', linkTo: '/servicios/microcredito' },
  { icon: LogOut, title: 'Solicitud de retiro sindical', description: 'Inicia el proceso para retirarte del sindicato.', linkTo: '/servicios/retiro-sindical' },
];

const conveniosData = [
  { name: "E.S.E. HOSPITAL MARCO FIDEL SUÁREZ - BELLO" },
  { name: "E.S.E. HOSPITAL SAN JUAN DE DIOS - RIONEGRO" },
  { name: "PROMOTORA MÉDICA Y ODONTOLÓGICA S.A." },
  { name: "SOCIEDAD MÉDICA RIONEGRO SOMER S.A." },
  { name: "E.S.E. HOSPITAL VENANCIO DÍAZ DÍAZ" },
  { name: "E.S.E. HOSPITAL LA MERCED - CIUDAD BOLÍVAR" },
  { name: "E.S.E. HOSPITAL SANTA ELENA - FREDONIA" },
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            ProSalud: Empoderando Tu Bienestar Laboral
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Tu portal de autogestión para acceder a servicios, trámites y beneficios de manera ágil y segura. Simplificamos tu día a día.
          </p>
          <div className="max-w-xl mx-auto animate-fade-in animation-delay-400">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="search" 
                placeholder="Busca servicios, certificados, trámites..." 
                className="flex-grow text-base !text-text-dark py-3 px-4" // Adjusted padding for consistency
              />
              <Button type="submit" variant="secondary" size="lg" className="bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen-dark py-3 px-6"> {/* Adjusted padding for consistency */}
                <Search size={20} className="mr-2" />
                <span>Buscar</span>
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="quick-links" className="py-12 md:py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-12 text-center">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Autogestión
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-primary-700 sm:text-5xl">
              Gestiona tus trámites
            </h2>
            <p className="max-w-[900px] text-center text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Accede rápidamente a los servicios que necesitas sin complicaciones.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {newServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                linkTo={service.linkTo}
                className="animate-scale-in"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Convenios Section */}
      <section id="convenios" className="py-12 md:py-16 bg-white"> {/* Changed background to white for differentiation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-prosalud text-text-light p-6 rounded-lg shadow-lg mb-10 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              A lo largo de nuestra trayectoria hemos tenido convenios con diferentes entidades en Antioquia
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {conveniosData.map((convenio, index) => (
              <li 
                key={index} 
                className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border hover:shadow-xl hover:border-primary-prosalud transition-all duration-300 flex items-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Building2 className="h-10 w-10 text-primary-prosalud mr-4 shrink-0" />
                <p className="text-md font-medium text-text-dark">{convenio.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* You can add more sections here, e.g., News, Events, etc. */}

    </MainLayout>
  );
};

export default Index;
