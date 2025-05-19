
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Users2, Network, UserCog, UserSquare, UsersRound, Calculator, ShieldQuestion,
  ClipboardList, Workflow, BriefcaseBusiness, FileText, Laptop, Users, Shield
} from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

const OrganizationalStructureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.05, freezeOnceVisible: true }); // Lower threshold for large section

  const renderSkeletonCard = (key: number, wide: boolean = false) => (
    <div key={key} className={`shadow-lg rounded-lg p-6 text-center ${wide ? 'max-w-md w-full' : ''}`}>
      <Skeleton className="h-9 w-9 mx-auto mb-3 rounded-full" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
      <Skeleton className="h-4 w-full mx-auto" />
      {wide && <Skeleton className="h-4 w-1/2 mx-auto mt-1" />}
    </div>
  );

  const renderSkeleton = () => (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-7 w-1/2 mx-auto" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
             <div className="bg-primary-prosalud text-white shadow-xl rounded-xl text-center p-6">
                <Skeleton className="h-10 w-10 mx-auto mb-2 rounded-full bg-primary-prosalud-light opacity-50" />
                <Skeleton className="h-7 w-1/2 mx-auto bg-primary-prosalud-light opacity-50" />
                <Skeleton className="h-4 w-3/4 mx-auto mt-2 bg-primary-prosalud-light opacity-50" />
             </div>
          </div>

          <div className="mb-12">
            <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => renderSkeletonCard(i))}
            </div>
          </div>

          <div className="mb-12">
            <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
            <div className="flex justify-center">
              {renderSkeletonCard(0, true)}
            </div>
          </div>

          <div>
            <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => renderSkeletonCard(i))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  if (!isIntersecting) {
    return renderSkeleton();
  }

  return (
    <section ref={sectionRef} id="estructura-organizacional" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-prosalud mb-4 tracking-tight">
            Nuestra Estructura Organizacional
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto font-light">
            Así nos organizamos para servirte mejor.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="mb-12 animate-scale-in animation-delay-200">
            <Card className="bg-primary-prosalud text-white shadow-xl rounded-xl text-center p-6 transform hover:scale-105 transition-transform duration-300">
              <CardHeader className="p-0 mb-3">
                <Users2 size={40} className="mx-auto mb-2" />
                <CardTitle className="text-2xl font-semibold">Afiliados Partícipes</CardTitle>
              </CardHeader>
              <CardDescription className="text-primary-prosalud-light text-sm">El corazón de ProSalud, participando activamente en la vida sindical.</CardDescription>
            </Card>
          </div>

          <div className="mb-12 animate-fade-in animation-delay-400">
            <h3 className="text-2xl md:text-3xl font-semibold text-secondary-prosaludgreen mb-8 text-center flex items-center justify-center">
              <Network size={30} className="mr-3" /> Órganos de Dirección y Control
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Presidente", icon: UserCog, description: "Liderazgo y representación general." },
                { title: "Vicepresidente", icon: UserSquare, description: "Apoyo en liderazgo y funciones delegadas." },
                { title: "Vocales", icon: UsersRound, description: "Representación y voz de los afiliados." },
                { title: "Tesorero", icon: Calculator, description: "Gestión financiera y de recursos." },
                { title: "Fiscal", icon: ShieldQuestion, description: "Vigilancia y control normativo." },
              ].map((item, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center animate-scale-in" style={{ animationDelay: `${index * 100 + 400}ms` }}>
                  <item.icon size={36} className="mx-auto mb-3 text-primary-prosalud" />
                  <CardTitle className="text-xl font-medium text-text-dark mb-1">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-text-gray">{item.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12 animate-fade-in animation-delay-600">
            <h3 className="text-2xl md:text-3xl font-semibold text-secondary-prosaludgreen mb-8 text-center flex items-center justify-center">
              <ClipboardList size={30} className="mr-3" /> Nivel Administrativo
            </h3>
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center animate-scale-in" style={{ animationDelay: `600ms` }}>
                <UserCog size={36} className="mx-auto mb-3 text-primary-prosalud" />
                <CardTitle className="text-xl font-medium text-text-dark mb-1">Subdirección Administrativa</CardTitle>
                <CardDescription className="text-sm text-text-gray">Coordinación y gestión de operaciones administrativas.</CardDescription>
              </Card>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-800">
            <h3 className="text-2xl md:text-3xl font-semibold text-secondary-prosaludgreen mb-8 text-center flex items-center justify-center">
              <Workflow size={30} className="mr-3" /> Áreas Operativas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "S. Gerencia", icon: BriefcaseBusiness, description: "Soporte a la gerencia y procesos estratégicos." },
                { title: "Nómina", icon: FileText, description: "Gestión de pagos y compensaciones." },
                { title: "Sistemas", icon: Laptop, description: "Infraestructura tecnológica y soporte." },
                { title: "Recursos Humanos", icon: Users, description: "Gestión del talento humano y bienestar." },
                { title: "S.S.T.", icon: Shield, subTitle: "(Salud y Seguridad en el Trabajo)", description: "Promoción de un entorno laboral seguro y saludable." },
              ].map((item, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center animate-scale-in" style={{ animationDelay: `${index * 100 + 800}ms` }}>
                  <item.icon size={36} className="mx-auto mb-3 text-primary-prosalud" />
                  <CardTitle className="text-xl font-medium text-text-dark mb-1">{item.title} {item.subTitle && <span className="block text-xs text-muted-foreground">{item.subTitle}</span>}</CardTitle>
                  <CardDescription className="text-sm text-text-gray">{item.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationalStructureSection;
