import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BadgeCheck, Handshake, Shield, Users, Scale, HandHelping, Briefcase, Ban, Library, Megaphone, ClipboardCheck, HeartHandshake, Target, Eye, Flag, ArrowDownCircle,
  Info, Building2, UserCircle, Users2, ShieldCheck, ClipboardList, BriefcaseBusiness, Cog, UserCog, Network, Workflow, UserSquare, FileText, Calculator, UsersRound, Laptop, ShieldQuestion,
  Award
} from 'lucide-react';

const valoresData = [
  {
    icon: BadgeCheck,
    title: "Ética",
    description: "Capacitación permanente, principios morales y credibilidad alcanzada por cada afiliado."
  },
  {
    icon: Handshake,
    title: "Fe en Dios, Lealtad y Colaboración",
    description: "Con la comunidad y las entidades donde laboremos, como guía para nuestros objetivos."
  }
];

const principiosData = [
  { icon: Shield, title: "Defensa de Intereses", content: "Mantener una permanente actitud de defensa de los intereses de sus Afiliados, respetando y haciendo respetar las leyes vigentes, haciéndolas compatibles con el interés general." },
  { icon: Users, title: "Solidaridad y Honradez", content: "Hacer prevalecer en todas las acciones y conductas los principios de solidaridad y honradez para con sus representados." },
  { icon: Scale, title: "No Discriminación", content: "No realizar ni tolerar actos o acciones que signifiquen trato discriminatorio o preferencial para un determinado grupo de Afiliados." },
  { icon: HandHelping, title: "Colaboración y Asistencia", content: "Colaborar con los Afiliados, no solo para el cumplimiento de las normas legales y convencionales del trabajo, sino también asistiéndolos en sus contingencias personales y familiares." },
  { icon: Briefcase, title: "Servicio sin Ventajas", content: "Mantenerse en una actitud permanente de servicio, sin utilizar el cargo o función gremial para obtener ventajas, concesiones o privilegios en beneficio propio." },
  { icon: Ban, title: "Evitar Conducta Abusiva", content: "Evitar toda conducta abusiva que pueda interpretarse como coacción o uso arbitrario de sus funciones sindicales, que pudieran comprometer el prestigio de la Organización ante los trabajadores o la sociedad." },
  { icon: Library, title: "Transparencia Administrativa", content: "Administrar los bienes y fondos sindicales con transparencia, rindiendo debida cuenta de sus actos, respetando las normas legales y/o establecidas en nuestros estatutos." },
  { icon: Megaphone, title: "Promover Acción Sindical", content: "Promover la acción sindical de sus compañeros procurando su afiliación y participación activa en la vida de la organización." },
  { icon: ClipboardCheck, title: "Acatar Directivas", content: "Acatar las directivas emanadas por la conducción gremial a fin de preservar la unidad de criterio y de acción." },
  { icon: HeartHandshake, title: "Vocación de Servicio", content: "Demostrar en todos sus actos la vocación de servicio que impulsa su tarea en representación de los trabajadores." }
];

const QuienesSomos: React.FC = () => {

  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statsData = [
    {
      icon: Award,
      mainText: "+8 años",
      subText: "de experiencia",
      iconColor: "text-primary-prosalud",
      textColor: "text-primary-prosalud",
    },
    {
      icon: Briefcase, // Usando Briefcase como alternativa a Handshake de la lista permitida
      mainText: "10 convenios",
      subText: "en Antioquia",
      iconColor: "text-secondary-prosaludgreen",
      textColor: "text-secondary-prosaludgreen",
    },
    {
      icon: Users,
      mainText: "Aprox 600",
      subText: "afiliados",
      iconColor: "text-accent-prosaludteal",
      textColor: "text-accent-prosaludteal",
    },
  ];

  return (
    <MainLayout>
      {/* Encabezado Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-prosalud via-primary-prosalud-dark to-slate-900 text-text-light py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Subtle pattern or abstract shape if desired */}
          {/* <img src="/path-to-abstract-bg.svg" alt="" className="w-full h-full object-cover" /> */}
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in tracking-tight">
            ¿Quiénes somos?
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in animation-delay-200 font-light">
            Conoce la esencia de ProSalud, el Sindicato de Profesionales de la Salud.
          </p>
          <a 
            href="#descripcion-prosalud" 
            onClick={(e) => handleScrollToSection(e, 'descripcion-prosalud')}
            className="mt-10 inline-block animate-fade-in animation-delay-400"
            aria-label="Ir a Descripción de ProSalud"
          >
            <ArrowDownCircle size={40} className="text-secondary-prosaludgreen hover:text-white transition-colors hover:scale-110" />
          </a>
        </div>
      </section>

      {/* Descripción de ProSalud Section - ACTUALIZADA */}
      <section id="descripcion-prosalud" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-prosalud mb-4 tracking-tight">
              Descubre ProSalud
            </h2>
            <p className="text-xl text-text-gray max-w-3xl mx-auto font-light">
              Una mirada profunda a nuestra identidad y compromiso.
            </p>
          </div>

          {/* Stats Section inspired by the image */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 md:mb-16 text-center">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <stat.icon size={56} className={`${stat.iconColor} mb-4`} />
                <h3 className={`text-3xl font-bold ${stat.textColor} mb-2`}>{stat.mainText}</h3>
                <p className="text-text-gray text-lg">{stat.subText}</p>
              </div>
            ))}
          </div>

          {/* Main Description Paragraph */}
          <div className="max-w-3xl mx-auto text-center animate-fade-in" style={{ animationDelay: `${statsData.length * 150}ms` }}>
            <p className="text-lg text-text-gray leading-relaxed px-4">
              El Sindicato de Profesionales de la Salud ProSalud, es un Sindicato de gremio que funciona de conformidad con la Constitución Nacional, está orientado al bienestar de los afiliados de manera autogestionaria y autónoma, permitiendo el logro de los objetivos establecidos y la atención de procesos y subprocesos con capital humano capacitado en beneficio de todos los usuarios en las diferentes empresas receptoras del Servicio.
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section id="mision-vision" className="py-16 md:py-24 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-stretch"> {/* items-stretch for equal height cards */}
            <div className="animate-slide-in-right">
              <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group transform hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-primary-prosalud to-accent-prosaludteal text-white p-6 rounded-t-xl">
                  <CardTitle className="flex items-center text-3xl font-semibold">
                    <Flag size={32} className="mr-4 opacity-80 group-hover:opacity-100 transition-opacity" /> Misión
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8 p-6 text-text-gray">
                  <p className="text-lg leading-relaxed">
                    "Representar y fortalecer el oficio de los Profesionales de la Salud generando bienestar laboral y económico a todos sus afiliados partícipes, buscando así el mejoramiento en los estándares de calidad en la prestación de los servicios de las Instituciones contractuales."
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="animate-slide-in-right animation-delay-200">
              <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group transform hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-secondary-prosaludgreen to-green-400 text-white p-6 rounded-t-xl">
                  <CardTitle className="flex items-center text-3xl font-semibold">
                    <Eye size={32} className="mr-4 opacity-80 group-hover:opacity-100 transition-opacity" /> Visión
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8 p-6 text-text-gray">
                  <p className="text-lg leading-relaxed">
                    "En el 2018 nuestro Sindicato de Oficio será líder en el departamento de Antioquia, reconocida por el fortalecimiento en la modalidad de contrato colectivo laboral en beneficio de los afiliados y las empresas contractuales."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-prosalud mb-4 tracking-tight">Nuestros Valores</h2>
            <p className="text-xl text-text-gray max-w-2xl mx-auto font-light">
              Los pilares que guían cada una de nuestras acciones y decisiones.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {valoresData.map((valor, index) => (
              <div 
                key={index} 
                className="bg-card p-8 rounded-xl shadow-lg border border-prosalud-border hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-scale-in group transform hover:scale-105" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="p-4 bg-primary-prosalud-light rounded-full mb-6 group-hover:bg-primary-prosalud transition-colors duration-300">
                  <valor.icon size={48} className="text-primary-prosalud group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold text-text-dark mb-3">{valor.title}</h3>
                <p className="text-text-gray text-base leading-relaxed">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Principios Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background-light to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-prosalud mb-4 tracking-tight">Nuestros Principios</h2>
            <p className="text-xl text-text-gray max-w-2xl mx-auto font-light">
              Compromisos fundamentales que rigen nuestra labor sindical.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-3">
            {principiosData.map((principio, index) => (
              <AccordionItem 
                value={`item-${index}`} 
                key={index} 
                className="border border-prosalud-border bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 px-6 text-lg font-medium text-text-dark hover:text-primary-prosalud group w-full">
                  {/* The div structure ensures the text and icon are on the left, and the default chevron (from AccordionTrigger component) is on the right */}
                  <div className="flex items-center">
                    <principio.icon size={26} className="mr-4 text-secondary-prosaludgreen shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    {principio.title}
                  </div>
                  {/* The explicit ChevronDown icon that was causing duplication has been removed from here.
                      The AccordionTrigger component itself provides the necessary ChevronDown icon.
                  */}
                </AccordionTrigger>
                <AccordionContent className="text-text-gray pt-0 p-6 text-base leading-relaxed bg-slate-50 rounded-b-lg">
                  {principio.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Estructura Organizacional Section */}
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
            {/* Afiliados Participes - Central Element */}
            <div className="mb-12 animate-scale-in animation-delay-200">
              <Card className="bg-primary-prosalud text-white shadow-xl rounded-xl text-center p-6 transform hover:scale-105 transition-transform duration-300">
                <CardHeader className="p-0 mb-3">
                  <Users2 size={40} className="mx-auto mb-2" />
                  <CardTitle className="text-2xl font-semibold">Afiliados Partícipes</CardTitle>
                </CardHeader>
                <CardDescription className="text-primary-prosalud-light text-sm">El corazón de ProSalud, participando activamente en la vida sindical.</CardDescription>
              </Card>
            </div>

            {/* Órganos de Dirección y Control */}
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

            {/* Nivel Administrativo */}
            <div className="mb-12 animate-fade-in animation-delay-600">
              <h3 className="text-2xl md:text-3xl font-semibold text-secondary-prosaludgreen mb-8 text-center flex items-center justify-center">
                <ClipboardList size={30} className="mr-3" /> Nivel Administrativo
              </h3>
              <div className="flex justify-center">
                <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center transform hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `600ms` }}>
                  <UserCog size={36} className="mx-auto mb-3 text-primary-prosalud" /> {/* Assuming similar icon for subdirector */}
                  <CardTitle className="text-xl font-medium text-text-dark mb-1">Subdirección Administrativa</CardTitle>
                  <CardDescription className="text-sm text-text-gray">Coordinación y gestión de operaciones administrativas.</CardDescription>
                </Card>
              </div>
            </div>

            {/* Áreas Operativas */}
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
    </MainLayout>
  );
};

export default QuienesSomos;
