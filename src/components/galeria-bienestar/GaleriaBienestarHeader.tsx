
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, GalleryVertical, Image } from "lucide-react";

const GaleriaBienestarHeader: React.FC = () => {
  return (
    <>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">
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
                <GalleryVertical className="h-4 w-4" />
                Galería de Bienestar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">  
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Image className="h-8 w-8 text-primary-prosalud-dark" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark tracking-tight">
              Galería de Bienestar
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-4">
            Explora los momentos y actividades que hemos compartido juntos, fortaleciendo nuestra comunidad ProSalud.
          </p>
        </div>
      </div>
    </>
  );
};

export default GaleriaBienestarHeader;
