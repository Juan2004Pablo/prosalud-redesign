
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hand } from 'lucide-react';

interface HandWashingStep {
  number: number;
  text: string;
}

interface HigieneManosCardProps {
  tusManosSiembreLimpiasUrl: string;
  handWashingSteps: HandWashingStep[];
}

const HigieneManosCard: React.FC<HigieneManosCardProps> = ({ tusManosSiembreLimpiasUrl, handWashingSteps }) => {
  return (
    <Card className="mb-12 shadow-lg animate-[fadeInUp_0.5s_ease-out_1.2s_forwards] opacity-0">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <Hand size={28} className="mr-3 text-secondary-prosaludgreen" />
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
  );
};

export default HigieneManosCard;
