
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Users2, Network, UserCog, UserSquare, UsersRound, Calculator, ShieldQuestion,
  ClipboardList, Workflow, BriefcaseBusiness, FileText, Laptop, Users, Shield
} from 'lucide-react';

const OrganizationalStructureSection: React.FC = () => {
  return (
    <section id="estructura-organizacional" className="py-16 md:py-24 bg-slate-50">
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
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center transform hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${index * 100 + 400}ms` }}>
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
              <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center transform hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `600ms` }}>
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
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center transform hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${index * 100 + 800}ms` }}>
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
