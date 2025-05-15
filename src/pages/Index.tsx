
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ServiceCard from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button'; // shadcn button
import { Input } from '@/components/ui/input';   // shadcn input
import { Search, FileText, BedDouble, Banknote, ShieldCheck, HardHat, Landmark, Image, Coins } from 'lucide-react';

const services = [
  { icon: FileText, title: 'Solicita tu certificado', description: 'Genera certificados de convenio sindical y otros.', linkTo: '/servicios/certificado' },
  { icon: BedDouble, title: 'Solicita tu descanso', description: 'Gestiona tus solicitudes de periodos de descanso.', linkTo: '/servicios/descanso' },
  { icon: Banknote, title: 'Verifica tu pago', description: 'Consulta el estado y detalles de tus pagos.', linkTo: '/servicios/pagos' },
  { icon: ShieldCheck, title: 'Seguridad Social', description: 'Información y trámites de seguridad social.', linkTo: '/servicios/seguridad-social' },
  { icon: HardHat, title: 'S.S.T.', description: 'Accede a recursos de Seguridad y Salud en el Trabajo.', linkTo: '/servicios/sst' },
  { icon: Landmark, title: 'Notificar cambio de cuenta', description: 'Actualiza tu información bancaria para pagos.', linkTo: '/servicios/cuenta-bancaria' },
  { icon: Image, title: 'Galería Bienestar', description: 'Explora momentos y actividades de bienestar.', linkTo: '/servicios/galeria-bienestar' },
  { icon: Coins, title: 'Solicita tu Micro crédito', description: 'Información y solicitud de microcréditos.', linkTo: '/servicios/microcredito' },
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark text-text-light py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Bienvenido al Portal de Autogestión ProSalud
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Tu espacio para gestionar servicios, trámites y beneficios de forma rápida y sencilla.
          </p>
          <div className="max-w-xl mx-auto animate-fade-in animation-delay-400">
            <form className="flex gap-2">
              <Input 
                type="search" 
                placeholder="¿Qué necesitas encontrar? (ej: certificado, pago, etc.)" 
                className="flex-grow text-base !text-text-dark" // Ensure text is dark for readability
              />
              <Button type="submit" variant="secondary" size="lg" className="bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen-dark">
                <Search size={20} className="mr-2 sm:mr-0 md:mr-2" />
                <span className="hidden sm:inline">Buscar</span>
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="quick-links" className="py-12 md:py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-text-dark text-center mb-10 md:mb-12">
            Accesos Rápidos a Servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                linkTo={service.linkTo}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* You can add more sections here, e.g., News, Events, etc. */}

    </MainLayout>
  );
};

export default Index;

