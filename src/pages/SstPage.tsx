import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CopyToClipboardButton from '@/components/ui/copyToClipboardButton';
import {
  ShieldAlert,
  Bomb,
  Activity,
  Flame,
  DoorOpen,
  FileText,
  Mail,
  Briefcase,
  HeartPulse,
  AlertTriangle,
  AlertCircle,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  Phone,
  Building,
  Info,
  ArrowRightCircle,
  Users,
  HelpCircle,
  WashingHands,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const SstPage: React.FC = () => {
  const proSaludLogoUrl = "/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png"; // ProSalud logo
  const tusManosSiembreLimpiasUrl = "/lovable-uploads/a1e97d0b-a5c4-4af9-b62d-e9afc323a614.png"; // Tus manos siempre limpias image

  const emergencyTypes = [
    {
      title: "Atraco",
      icon: <ShieldAlert size={48} className="text-red-500 mb-4" />,
      points: [
        "Conserve la calma, no grite.",
        "Observe los rasgos más destacados del asaltante como altura, edad, peso aproximado, color del cabello, ojos, cicatrices y tipos de armas, con el fin de informar a las autoridades.",
        "Obedezca las indicaciones del asaltante, de manera lenta y calmada.",
        "No se enfrente al asaltante, especialmente, cuando éste se encuentre armado.",
        "No toque nada en el área del atraco para no entorpecer la obtención de huellas."
      ],
      imagePlaceholder: true,
    },
    {
      title: "Bomba",
      icon: <Bomb size={48} className="text-gray-700 mb-4" />,
      points: [
        "No toque ni mueva ningún objeto.",
        "Observe la presencia de objetos desconocidos e inusuales y repórtelos."
      ],
      imagePlaceholder: true,
    },
    {
      title: "Sismos",
      icon: <Activity size={48} className="text-yellow-500 mb-4" />,
      points: [
        "En caso de encontrarse en la vía pública, diríjase a zonas verdes o parques donde no existan peligros con los cables eléctricos o estructuras que se derrumben.",
        "Si va en carro deténgalo inmediatamente, permaneciendo en el interior, o debajo de él si hay otros carros en movimiento.",
        "Si está en un bus permanezca adentro hasta que el sismo haya terminado.",
        "Si se encuentra cerca de un río o quebrada debe alejarse de la orilla y buscar refugio en un sitio alto y de poca pendiente, porque puede haber deslizamiento de tierra, represamientos y avalanchas.",
        "Apague equipos, maquinaria y sistema antes de salir.",
        "Mantenga la calma y evite correr. El pánico es tan peligroso como el terremoto."
      ],
      imagePlaceholder: true,
    },
    {
      title: "Incendio",
      icon: <Flame size={48} className="text-orange-500 mb-4" />,
      points: [
        "Si conoce el manejo de los extintores o de los hidrantes utilícelos, de lo contrario evacue la zona.",
        "Procure retirar los objetos que sirvan de combustible al fuego.",
        "Evite el pánico, no corra ni cause confusión. Utilice las escaleras nunca el ascensor.",
        "No se quede en los baños, vestieres o zonas de descanso.",
        "Si el lugar está lleno de humo, salga agachado, gateando, cubriéndose la nariz y la boca con un pañuelo húmedo.",
        "Si su ropa se incendia no corra; arrójese al suelo y dé vuelta sobre su cuerpo; si ve a alguien con su ropa encendida arrójele una cobija, manta o tela gruesa sobre el cuerpo."
      ],
      imagePlaceholder: true,
    },
    {
      title: "Evacuación",
      icon: <DoorOpen size={48} className="text-blue-500 mb-4" />,
      points: [
        "Al escuchar la señal de alarma desconecte todos los aparatos eléctricos.",
        "Suspenda toda actividad.",
        "Salga inmediatamente, no se devuelva por ningún motivo, evite congestiones.",
        "Salga despacio y sin correr por las rutas de evacuación establecidas.",
        "Utilice siempre las escaleras.",
        "Atienda y cumpla estrictamente las órdenes de los coordinadores de evacuación.",
        "Si cae un compañero retírelo de la ruta de evacuación para que no obstruya la vía.",
        "Si nota que falta algún compañero avise al coordinador.",
        "Apréndase los teléfonos de emergencia: Cruz Roja, Bomberos, Policía, Control de Tránsito."
      ],
      imagePlaceholder: true,
    }
  ];
  
  const [openCollapsible, setOpenCollapsible] = React.useState<Record<string, boolean>>({});

  const toggleCollapsible = (id: string) => {
    setOpenCollapsible(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handWashingSteps = [
    { number: 1, text: "Mójese las manos con agua corriente limpia (tibia o fría), cierre el grifo y enjabónese las manos." },
    { number: 2, text: "Frótese las manos con el jabón hasta que haga espuma. Frótese la espuma por el dorso de las manos, entre los dedos y debajo de las uñas." },
    { number: 3, text: "Restriéguese las manos durante al menos 20 segundos." },
    { number: 4, text: "Enjuáguese bien las manos con agua corriente limpia." },
    { number: 5, text: "Séquese las manos con una toalla limpia o al aire." },
  ];

  const articles = [
    { title: "Sus 5 momentos para la Higiene de las Manos", url: "https://www.sindicatoprosalud.com/portal/images/PROSALUD/Coronavirus/5%20Momentos%20para%20la%20Higiene%20de%20Manos.pdf" },
    { title: "¿Cómo desinfectarse las manos?", url: "https://www.sindicatoprosalud.com/portal/images/PROSALUD/Coronavirus/Como%20desinfectarse%20las%20manos.pdf" },
    { title: "Coronavirus: Higiene de las manos - por qué, cómo, cuándo", url: "https://www.sindicatoprosalud.com/portal/images/PROSALUD/Coronavirus/Higiene%20de%20las%20manos%20-%20por%20qu%C3%A9,%20c%C3%B3mo,%20cu%C3%A1ndo.pdf" },
    { title: "Medidas básicas para el Control de Infecciones en IPS", url: "https://www.sindicatoprosalud.com/portal/images/PROSALUD/Coronavirus/Cartilla%20Coronavirus.pdf" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center animate-fade-in">
          <img src={proSaludLogoUrl} alt="ProSalud Logo" className="h-20 w-auto mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">
            Seguridad y Salud en el Trabajo (SST)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Información esencial para actuar ante emergencias, accidentes e incidentes laborales.
          </p>
        </header>

        {/* Protocolo Incapacidades */}
        <Card className="mb-8 shadow-lg animate-[fadeInUp_0.5s_ease-out_0.2s_forwards] opacity-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <FileText size={28} className="mr-3 text-secondary-prosaludgreen" />
              Protocolo Incapacidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Las incapacidades son un aspecto crucial de la SST. Aquí encontrarás un resumen y cómo proceder:
            </p>
            <Alert variant="default" className="bg-primary-prosalud/5 border-primary-prosalud">
              <Mail className="h-5 w-5 text-primary-prosalud" />
              <AlertTitle className="font-semibold text-primary-prosalud">Envío de Incapacidades</AlertTitle>
              <AlertDescription>
                Los formatos por incapacidad solo se reciben en el correo:
                <div className="flex items-center my-2">
                  <strong className="text-secondary-prosaludgreen mr-2">incapacidades@sindicatoprosalud.com</strong>
                  <CopyToClipboardButton textToCopy="incapacidades@sindicatoprosalud.com" />
                </div>
              </AlertDescription>
            </Alert>
            <p>
              Para una guía detallada sobre el trámite de incapacidades y licencias, incluyendo requisitos y recomendaciones, visita nuestra página dedicada.
            </p>
            <Link to="/servicios/incapacidad-maternidad">
              <Button className="bg-secondary-prosaludgreen hover:bg-secondary-prosaludgreen/90 text-white">
                Ver Guía Completa de Incapacidades y Licencias
                <ArrowRightCircle size={20} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Definiciones Clave */}
        <section className="mb-12 animate-[fadeInUp_0.5s_ease-out_0.4s_forwards] opacity-0">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Definiciones Clave en SST</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <HelpCircle size={24} className="mr-2 text-primary-prosalud" />
                  ¿Qué es un accidente de trabajo?
                </CardTitle>
                <CardDescription>(Ley 1562 de 2012)</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>Es accidente de trabajo todo suceso repentino que sobrevenga por causa o con ocasión del trabajo, y que produzca en el trabajador una lesión orgánica, una perturbación funcional o psiquiátrica, una invalidez o la muerte.</p>
                <p>Es también accidente de trabajo aquel que se produce durante la ejecución de órdenes del empleador, o contratante durante la ejecución de una labor bajo su autoridad, aún fuera del lugar y horas de trabajo.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                   <HelpCircle size={24} className="mr-2 text-primary-prosalud" />
                  ¿Qué es una enfermedad laboral?
                </CardTitle>
                <CardDescription>(Ley 1562 de 2012)</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Es enfermedad laboral la contraída como resultado de la exposición a factores de riesgo inherentes a la actividad laboral o del medio en el que el trabajador se ha visto obligado a trabajar.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Actos Inseguros, Condiciones Inseguras, Incidente */}
        <section className="mb-12 animate-[fadeInUp_0.5s_ease-out_0.6s_forwards] opacity-0">
           <h2 className="text-3xl font-bold text-primary mb-6 text-center">Identificando Riesgos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Alert variant="default" className="border-yellow-400 bg-yellow-50">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <AlertTitle className="font-semibold text-yellow-700">Actos Inseguros</AlertTitle>
              <AlertDescription className="text-yellow-600">Son las fallas, olvidos, errores u omisiones que hacen las personas al realizar un trabajo.</AlertDescription>
            </Alert>
            <Alert variant="default" className="border-orange-400 bg-orange-50">
              <Building className="h-5 w-5 text-orange-500" />
              <AlertTitle className="font-semibold text-orange-700">Condiciones Inseguras</AlertTitle>
              <AlertDescription className="text-orange-600">Son las instalaciones, equipos de trabajo, maquinaria y herramientas que NO están en condiciones de ser usados.</AlertDescription>
            </Alert>
            <Alert variant="default" className="border-blue-400 bg-blue-50">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <AlertTitle className="font-semibold text-blue-700">Incidente</AlertTitle>
              <AlertDescription className="text-blue-600">Es un acontecimiento no deseado, que bajo circunstancias diferentes, podría haber resultado en lesiones. Es decir UN CASI ACCIDENTE.</AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Protocolo en caso de accidente de trabajo */}
        <Card className="mb-12 shadow-lg animate-[fadeInUp_0.5s_ease-out_0.8s_forwards] opacity-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Briefcase size={28} className="mr-3 text-secondary-prosaludgreen" />
              Protocolo a seguir en caso de accidente de trabajo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:w-2/3 space-y-3">
                <p className="text-lg font-semibold text-muted-foreground">El afiliado debe:</p>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Informar a su jefe inmediato y comunicarse a la <strong className="text-primary">Línea Efectiva de Colmena Seguros al 018000919667</strong>.</li>
                  <li>Dirigirse al centro asistencial notificado por la ARL en el menor tiempo posible.</li>
                  <li>Comunicarse con el área de SST a fin de realizar la pertinente legalización del accidente de trabajo <strong className="text-primary">antes de las 48 horas</strong>.</li>
                  <li>El área de SST remitirá el informe individual del AT y reconocimiento económico según el caso.</li>
                </ol>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0">
                <img src="" alt="Protocolo accidente de trabajo" className="rounded-lg shadow-md bg-gray-200 aspect-video object-cover w-full h-auto" />
                <p className="text-xs text-center text-muted-foreground mt-2">Referencia visual del protocolo</p>
              </div>
            </div>
             <Alert variant="default" className="bg-primary-prosalud/5 border-primary-prosalud mt-6">
              <Info className="h-5 w-5 text-primary-prosalud" />
              <AlertTitle className="font-semibold text-primary-prosalud">Contacto ProSalud</AlertTitle>
              <AlertDescription className="text-sm">
                <p>PBX: (57)(4) 448 9232</p>
                <p>RUT: 900.444.737-1</p>
                <p>Dirección: Carrera 50 N° 127 Sur 61 Int. 802 / Caldas (Ant.)</p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Cómo estar preparados para una emergencia */}
        <Card className="mb-12 shadow-lg animate-[fadeInUp_0.5s_ease-out_1.0s_forwards] opacity-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <ClipboardCheck size={28} className="mr-3 text-secondary-prosaludgreen" />
              Cómo estar preparados para una emergencia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="md:flex md:items-start md:gap-6">
                <div className="md:w-1/3 mb-6 md:mb-0">
                    <img src="" alt="Preparación para emergencias" className="rounded-lg shadow-md bg-gray-200 aspect-[3/4] object-cover w-full h-auto" />
                    <p className="text-xs text-center text-muted-foreground mt-2">Infografía de preparación</p>
                </div>
                <div className="md:w-2/3 space-y-4">
                    <Collapsible className="border rounded-md p-4 shadow-sm">
                        <CollapsibleTrigger onClick={() => toggleCollapsible('q1')} className="flex justify-between items-center w-full font-semibold text-lg text-primary-prosalud hover:underline">
                        ¿Qué hacer en casos de emergencias?
                        {openCollapsible['q1'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 text-muted-foreground">
                        Sismos, terremotos, inundaciones, aludes, tormentas... hay una enorme cantidad de emergencias posibles, y para todos debemos estar bien preparados. En esta nota haremos un repaso de lo que debemos hacer y de cómo prepararnos para evitar el apuro en estos momentos indeseables.
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible className="border rounded-md p-4 shadow-sm">
                        <CollapsibleTrigger onClick={() => toggleCollapsible('q2')} className="flex justify-between items-center w-full font-semibold text-lg text-primary-prosalud hover:underline">
                        ¿Cómo estar preparados para una emergencia?
                        {openCollapsible['q2'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 text-muted-foreground space-y-2">
                        <p>Es fundamental estar preparados y educados, pues esta es la manera de no caer presa del pánico en casos de emergencia. Cerca de la puerta de entrada ten preparado tu bolso con todos los elementos que pudieran servirte: linternas a baterías, radio, botiquín de primeros auxilios, comida y agua, mantas, prendas de abrigo y todo lo que ya hemos aprendido que debe tener un kit de emergencias.</p>
                        <p>En casa, en un sitio al alcance de todos, ten siempre completo tu botiquín de primeros auxilios, pues los accidentes y las emergencias llegan sin previo aviso. Ubícalo en un lugar seguro, lejos del alcance de mascotas y niños pequeños, pero sí al alcance de hijos menores y de invitados frecuentes.</p>
                        <p>Los matafuegos o extintores nunca deben faltar en el hogar, y no te olvides de conocer y explicarle a tu familia con precisión la ubicación de las cajas y las llaves de cierre de los ductos de electricidad, agua y gas.</p>
                        </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible className="border rounded-md p-4 shadow-sm">
                        <CollapsibleTrigger onClick={() => toggleCollapsible('q3')} className="flex justify-between items-center w-full font-semibold text-lg text-primary-prosalud hover:underline">
                        ¿Simulacros para saber cómo actuar en emergencias?
                        {openCollapsible['q3'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 text-muted-foreground space-y-2">
                        <p>Es buena idea tomar clases y leer información sobre cómo se debe actuar en casos de emergencia. Tal y como los niños suelen hacer simulacros de sismos y de incendios en las escuelas, en casa podemos practicar lo mismo para acostumbrarnos a actuar apresuradamente y a conciencia en casos de emergencia. Debes conocer los puntos seguros del hogar, y prepararse para cada uno: que una sepa dónde colocarse en casos de sismos, cómo salir de casa ante incendios, etc.</p>
                        <p>Los simulacros son una actividad que puede ser entretenida para los niños, pero que ciertamente puede salvar su vida algún día. En especial si vives en zonas de riesgos de desastres climáticos, la preparación será tu principal arma de defensa contra estas agresiones inesperadas.</p>
                        <p>Saber qué debemos hacer, cómo hacerlo y hacia dónde ir nos ayudará a mantener la calma. Tener a mano los elementos de seguridad y primeros auxilios nos permitirá actuar a tiempo, para no lamentar situaciones de ningún tipo. Y la preparación en simulacros o revisiones periódicas del hogar puede ser lo que salve tu vida y la de tu familia. Puede ser fatalista o pesimista para algunos, pero quienes han atravesado estas desagradables situaciones saben decirte que el saber actuar a tiempo y con calma lo que les permitió salir vivos y contar la historia.</p>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Tus manos siempre limpias */}
        <Card className="mb-12 shadow-lg animate-[fadeInUp_0.5s_ease-out_1.2s_forwards] opacity-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <WashingHands size={28} className="mr-3 text-secondary-prosaludgreen" />
              Tus manos siempre limpias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              A pesar de que no haya un número específico de veces para lavarse las manos a diario, existen ciertas situaciones en las que es fundamental hacerlo. Asegúrese de que usted y los niños siempre se limpien las manos antes de comer, así como después de usar el baño y de entrar en contacto con cualquier superficie potencialmente contaminada con microbios.
            </p>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <img src={tusManosSiembreLimpiasUrl} alt="Pasos para lavarse las manos" className="rounded-lg shadow-md w-full h-auto" />
              </div>
              <ol className="space-y-3 text-muted-foreground">
                {handWashingSteps.map(step => (
                  <li key={step.number} className="flex items-start">
                    <span className="flex-shrink-0 mr-3 bg-primary-prosalud text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </span>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Artículos */}
        <section className="mb-12 animate-[fadeInUp_0.5s_ease-out_1.4s_forwards] opacity-0">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            <FileText size={32} className="mr-3 inline-block text-secondary-prosaludgreen" />
            Artículos: Para que estemos preparados ten en cuenta lo siguiente
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary-prosalud flex items-center">
                    <FileText size={22} className="mr-2 text-primary-prosalud" />
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary-prosaludgreen hover:text-secondary-prosaludgreen/80 font-medium"
                  >
                    Ver documento
                    <ExternalLink size={18} className="ml-2" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tipos de emergencias */}
        <section className="mb-12 animate-[fadeInUp_0.5s_ease-out_1.6s_forwards] opacity-0">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Tipos de Emergencias y Cómo Actuar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {emergencyTypes.map((emergency, index) => (
              <Card key={index} className="shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="text-center">
                  {emergency.icon}
                  <CardTitle className="text-xl font-semibold text-primary-prosalud">{emergency.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    {emergency.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  {emergency.imagePlaceholder && (
                     <div className="mt-4">
                        <img src="" alt={`${emergency.title} ilustración`} className="rounded-md bg-gray-200 aspect-video object-cover w-full h-auto" />
                         <p className="text-xs text-center text-muted-foreground mt-1">Ilustración para {emergency.title}</p>
                     </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default SstPage;
