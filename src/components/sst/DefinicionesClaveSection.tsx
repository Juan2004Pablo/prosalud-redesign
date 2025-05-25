
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const DefinicionesClaveSection: React.FC = () => {
  return (
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
  );
};

export default DefinicionesClaveSection;
