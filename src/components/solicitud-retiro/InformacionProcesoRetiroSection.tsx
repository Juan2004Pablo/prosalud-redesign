
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const InformacionProcesoRetiroSection: React.FC = () => {
  return (
    <section className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
      <Alert variant="default" className="border-blue-300 bg-blue-50 text-blue-800 [&>svg]:text-blue-800">
        <Info className="h-5 w-5" />
        <AlertTitle className="font-semibold text-blue-900">Atención Afiliado Partícipe Independiente Agremiado (Código 53)</AlertTitle>
        <AlertDescription className="mt-2 text-blue-700 space-y-3">
          <p>
            Señor(a) afiliado, al pertenecer به este sindicato en calidad de AFILIADO PARTÍCIPE INDEPENDIENTE AGREMIADO CODIGO (53), le recordamos el proceso para notificación de Retiro como Afiliado Partícipe el cual es de <strong>carácter obligatorio</strong>.
          </p>
          <p>
            Teniendo en cuenta la importancia de esto para varios procesos administrativos, contables, de seguridad social y de SST. Por lo tanto, le invitamos a leer y tener en cuenta el siguiente instructivo para cuando tenga lugar.
          </p>
        </AlertDescription>
      </Alert>
    </section>
  );
};

export default InformacionProcesoRetiroSection;
