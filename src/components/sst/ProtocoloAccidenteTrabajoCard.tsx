
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Briefcase, Info, ZoomIn } from 'lucide-react';

interface ProtocoloAccidenteTrabajoCardProps {
  setSelectedImage: (image: string | null) => void;
}

const ProtocoloAccidenteTrabajoCard: React.FC<ProtocoloAccidenteTrabajoCardProps> = ({ setSelectedImage }) => {
  return (
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
            <div 
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage("/images/sst/referencia_visual_protocolo.png")}
            >
              <img 
                src="/images/sst/referencia_visual_protocolo.png" 
                alt="Protocolo accidente de trabajo" 
                className="rounded-lg shadow-md bg-gray-200 aspect-video object-contain w-full h-auto" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                <ZoomIn size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">Referencia visual del protocolo (clic para ampliar)</p>
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
  );
};

export default ProtocoloAccidenteTrabajoCard;
