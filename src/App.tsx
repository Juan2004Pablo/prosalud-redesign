
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import QuienesSomos from "./pages/QuienesSomos";
import LoginPage from "./pages/LoginPage";
import SolicitudCertificadoConvenioPage from "./pages/SolicitudCertificadoConvenioPage";
import VerificacionPagosPage from "./pages/VerificacionPagosPage";
import EstatutosBeneficiosPage from "./pages/EstatutosBeneficiosPage";
import ContratoSindicalPage from "./pages/ContratoSindicalPage";

const queryClient = new QueryClient();

// Placeholder pages for navigation items
const PlaceholderPage = ({ title }: { title: string }) => (
  <MainLayout>
    <div className="container mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4">Contenido para {title} próximamente.</p>
    </div>
  </MainLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Adding placeholder routes for nav items */}
          <Route path="/prosalud" element={<PlaceholderPage title="ProSalud" />} />
          
          {/* Updated route for ¿Quiénes somos? */}
          <Route path="/nosotros/quienes-somos" element={<QuienesSomos />} /> 
          
          <Route path="/nosotros/estructura-organizacional" element={<PlaceholderPage title="Estructura organizacional" />} />
          {/* Actualizar la ruta para Estatutos y beneficios sindicales */}
          <Route path="/nosotros/estatutos" element={<EstatutosBeneficiosPage />} />
          <Route path="/nosotros/rol-economico" element={<PlaceholderPage title="Rol económico" />} />
          <Route path="/nosotros/compensaciones-beneficios" element={<PlaceholderPage title="Compensaciones y beneficios" />} />
          {/* Actualizar la ruta para Contrato sindical */}
          <Route path="/nosotros/contrato-sindical" element={<ContratoSindicalPage />} />
          
          <Route path="/salud-seguridad-laboral/campanas" element={<PlaceholderPage title="Campañas de Salud y Seguridad Laboral" />} />
          <Route path="/salud-seguridad-laboral/campanas/estilo-vida-trabajo-saludable" element={<PlaceholderPage title="Estilo de Vida y Trabajo Saludable" />} />

          <Route path="/documentos-formatos/documentos-publicos" element={<PlaceholderPage title="Documentos Públicos" />} />
          <Route path="/documentos-formatos/documentos-publicos/formatos-dotacion" element={<PlaceholderPage title="Formatos de dotación" />} />
          <Route path="/documentos-formatos/documentos-publicos/listados-asistencia" element={<PlaceholderPage title="Listados de asistencia" />} />
          <Route path="/documentos-formatos/documentos-publicos/mipres" element={<PlaceholderPage title="MIPRES" />} />
          <Route path="/documentos-formatos/documentos-publicos/requerimiento-verificacion-pagos" element={<PlaceholderPage title="Requerimiento y verificación de pagos" />} />
          <Route path="/documentos-formatos/documentos-publicos/retefuente-documentos-requeridos" element={<PlaceholderPage title="Retefuente: Documentos Requeridos" />} />

          {/* Actualizar ruta para verificación de pagos */}
          <Route path="/documentos-formatos/solicitudes-afiliados/verificacion-pagos" element={<VerificacionPagosPage />} />
          <Route path="/documentos-formatos/solicitudes-afiliados/certificado-convenio" element={<PlaceholderPage title="Certificado de Convenio (Solicitudes)" />} />
          <Route path="/documentos-formatos/solicitudes-afiliados/descanso" element={<PlaceholderPage title="Descanso (Solicitudes)" />} />
          <Route path="/documentos-formatos/solicitudes-afiliados/solicitud-anual-diferida" element={<PlaceholderPage title="Solicitud anual diferida (Solicitudes)" />} />
          
          <Route path="/archivo-digital/articulos-interes" element={<PlaceholderPage title="Artículos de interés" />} />
          
          <Route path="/recursos/video-prosanet" element={<PlaceholderPage title="Video ProSanet" />} />
          <Route path="/recursos/acceso-prosanet" element={<PlaceholderPage title="Acceso a ProSanet" />} />
          <Route path="/recursos/bienestar" element={<PlaceholderPage title="Bienestar" />} />

          <Route path="/convenios" element={<PlaceholderPage title="Convenios" />} />
          <Route path="/sgsst" element={<PlaceholderPage title="S.G.S.S.T." />} /> {/* This might be same as /servicios/sst */}
          <Route path="/documentos" element={<PlaceholderPage title="Documentos Públicos Generales" />} />
          <Route path="/archivo" element={<PlaceholderPage title="Archivo Digital General" />} />
          <Route path="/faq" element={<PlaceholderPage title="Preguntas Frecuentes" />} />
          <Route path="/contacto" element={<PlaceholderPage title="Contacto" />} />
          <Route path="/terminos" element={<PlaceholderPage title="Términos y Condiciones" />} />
          <Route path="/privacidad" element={<PlaceholderPage title="Política de Privacidad" />} />

          {/* New Service Routes */}
          {/* Updated route for Certificado de Convenio Sindical */}
          <Route path="/servicios/certificado-convenio" element={<SolicitudCertificadoConvenioPage />} />
          <Route path="/servicios/descanso-laboral" element={<PlaceholderPage title="Solicitud de Descanso Laboral" />} />
          <Route path="/servicios/compensacion-anual" element={<PlaceholderPage title="Compensación Anual Diferida" />} />
          {/* Nueva ruta para consulta de pagos desde servicios */}
          <Route path="/servicios/consulta-pagos" element={<VerificacionPagosPage />} />
          <Route path="/servicios/incapacidad-maternidad" element={<PlaceholderPage title="Incapacidad y Licencia de Maternidad" />} />
          <Route path="/servicios/certificado-seguridad-social" element={<PlaceholderPage title="Certificado de Seguridad Social" />} />
          <Route path="/servicios/actualizar-cuenta" element={<PlaceholderPage title="Actualizar Cuenta Bancaria" />} />
          <Route path="/servicios/sst" element={<PlaceholderPage title="Seguridad y Salud en el Trabajo (SST)" />} />
          <Route path="/servicios/galeria-bienestar" element={<PlaceholderPage title="Galería de Bienestar" />} />
          <Route path="/servicios/encuesta-bienestar" element={<PlaceholderPage title="Encuesta de Bienestar Laboral" />} />
          <Route path="/servicios/comfenalco" element={<PlaceholderPage title="Servicios de Comfenalco Antioquia" />} />
          <Route path="/servicios/permisos-turnos" element={<PlaceholderPage title="Permisos y Cambio de Turnos" />} />
          <Route path="/servicios/cuadro-turnos" element={<PlaceholderPage title="Cuadro de Turnos" />} />
          <Route path="/servicios/microcredito" element={<PlaceholderPage title="Solicitud de Microcrédito" />} />
          <Route path="/servicios/retiro-sindical" element={<PlaceholderPage title="Solicitud de Retiro Sindical" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
