
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Building, AlertCircle } from 'lucide-react';

const IdentificandoRiesgosSection: React.FC = () => {
  return (
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
  );
};

export default IdentificandoRiesgosSection;
