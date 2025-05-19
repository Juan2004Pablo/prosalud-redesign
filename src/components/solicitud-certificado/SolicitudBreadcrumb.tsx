
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const SolicitudBreadcrumb: React.FC = () => {
  return (
    <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                Inicio
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
              <FileText className="h-4 w-4" />
              Solicitud Certificado Convenio
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default SolicitudBreadcrumb;
