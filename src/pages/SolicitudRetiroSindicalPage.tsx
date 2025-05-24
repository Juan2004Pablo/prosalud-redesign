
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import RetiroHeader from '@/components/solicitud-retiro/RetiroHeader';
import InformacionProcesoRetiroSection from '@/components/solicitud-retiro/InformacionProcesoRetiroSection';
import DescargarFormatoRetiroSection from '@/components/solicitud-retiro/DescargarFormatoRetiroSection';
import InstruccionesEnvioSection from '@/components/solicitud-retiro/InstruccionesEnvioSection';
import MensajeAgradecimientoSection from '@/components/solicitud-retiro/MensajeAgradecimientoSection';
import { Separator } from "@/components/ui/separator";

const SolicitudRetiroSindicalPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <RetiroHeader />
        <div className="max-w-4xl mx-auto space-y-10">
          <InformacionProcesoRetiroSection />
          <Separator className="my-6" />
          <DescargarFormatoRetiroSection />
          <Separator className="my-6" />
          <InstruccionesEnvioSection />
          <Separator className="my-6" />
          <MensajeAgradecimientoSection />
        </div>
      </div>
    </MainLayout>
  );
};

export default SolicitudRetiroSindicalPage;
