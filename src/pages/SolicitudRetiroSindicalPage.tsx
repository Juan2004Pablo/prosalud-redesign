
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SolicitudRetiroHeader from '@/components/solicitud-retiro/SolicitudRetiroHeader';
import InformacionGeneralRetiroSection from '@/components/solicitud-retiro/InformacionGeneralRetiroSection';
import DescargarFormatoRetiroSection from '@/components/solicitud-retiro/DescargarFormatoRetiroSection';
import InstruccionesEnvioRetiroSection from '@/components/solicitud-retiro/InstruccionesEnvioRetiroSection';
import MensajeDespedidaRetiroSection from '@/components/solicitud-retiro/MensajeDespedidaRetiroSection';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Home, FileText } from 'lucide-react';

const SolicitudRetiroSindicalPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home className="h-4 w-4 mr-1 inline-block" /> Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <FileText className="h-4 w-4 mr-1 inline-block" /> Solicitud de Retiro Sindical
                </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <SolicitudRetiroHeader />
        <div className="max-w-3xl mx-auto">
          <InformacionGeneralRetiroSection />
          <DescargarFormatoRetiroSection />
          <InstruccionesEnvioRetiroSection />
          <MensajeDespedidaRetiroSection />
        </div>
      </div>
    </MainLayout>
  );
};

export default SolicitudRetiroSindicalPage;
