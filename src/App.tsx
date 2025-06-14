
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/utils/ScrollToTop';

// Public Pages
import Index from '@/pages/Index';
import QuienesSomos from '@/pages/QuienesSomos';
import FAQPage from '@/pages/FAQPage';
import ContactoPage from '@/pages/ContactoPage';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import NotFound from '@/pages/NotFound';
import GaleriaBienestarPage from '@/pages/GaleriaBienestarPage';
import EstatutosBeneficiosPage from '@/pages/EstatutosBeneficiosPage';
import ContratoSindicalPage from '@/pages/ContratoSindicalPage';

// Service Pages
import SolicitudCertificadoConvenioPage from '@/pages/SolicitudCertificadoConvenioPage';
import SolicitudDescansoLaboralPage from '@/pages/SolicitudDescansoLaboralPage';
import SolicitudAnualDiferidaPage from '@/pages/SolicitudAnualDiferidaPage';
import VerificacionPagosPage from '@/pages/VerificacionPagosPage';
import CertificadoSeguridadSocialPage from '@/pages/CertificadoSeguridadSocialPage';
import ActualizarCuentaBancariaPage from '@/pages/ActualizarCuentaBancariaPage';
import IncapacidadesLicenciasPage from '@/pages/IncapacidadesLicenciasPage';
import SstPage from '@/pages/SstPage';
import SolicitudPermisosCambioTurnosPage from '@/pages/SolicitudPermisosCambioTurnosPage';
import SolicitudMicrocreditoPage from '@/pages/SolicitudMicrocreditoPage';
import SolicitudRetiroSindicalPage from '@/pages/SolicitudRetiroSindicalPage';

// Admin Pages
import AdminDashboard from '@/pages/AdminDashboard';
import AdminUsuariosPage from '@/pages/AdminUsuariosPage';
import AdminBienestarPage from '@/pages/AdminBienestarPage';
import AdminComfenalcoPage from '@/pages/AdminComfenalcoPage';
import AdminConveniosPage from '@/pages/AdminConveniosPage';
import AdminConfiguracionPage from '@/pages/AdminConfiguracionPage';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/nosotros" element={<QuienesSomos />} />
          <Route path="/nosotros/estatutos" element={<EstatutosBeneficiosPage />} />
          <Route path="/nosotros/contrato-sindical" element={<ContratoSindicalPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/bienestar" element={<GaleriaBienestarPage />} />
          
          {/* Service Routes */}
          <Route path="/servicios/certificado-convenio" element={<SolicitudCertificadoConvenioPage />} />
          <Route path="/servicios/descanso-sindical" element={<SolicitudDescansoLaboralPage />} />
          <Route path="/servicios/compensacion-anual" element={<SolicitudAnualDiferidaPage />} />
          <Route path="/servicios/consulta-pagos" element={<VerificacionPagosPage />} />
          <Route path="/servicios/certificado-seguridad-social" element={<CertificadoSeguridadSocialPage />} />
          <Route path="/servicios/actualizar-cuenta" element={<ActualizarCuentaBancariaPage />} />
          <Route path="/servicios/incapacidad-maternidad" element={<IncapacidadesLicenciasPage />} />
          <Route path="/servicios/sst" element={<SstPage />} />
          <Route path="/servicios/galeria-bienestar" element={<GaleriaBienestarPage />} />
          <Route path="/servicios/permisos-turnos" element={<SolicitudPermisosCambioTurnosPage />} />
          <Route path="/servicios/microcredito" element={<SolicitudMicrocreditoPage />} />
          <Route path="/servicios/retiro-sindical" element={<SolicitudRetiroSindicalPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/usuarios" element={<ProtectedRoute><AdminUsuariosPage /></ProtectedRoute>} />
          <Route path="/admin/bienestar" element={<ProtectedRoute><AdminBienestarPage /></ProtectedRoute>} />
          <Route path="/admin/comfenalco" element={<ProtectedRoute><AdminComfenalcoPage /></ProtectedRoute>} />
          <Route path="/admin/convenios" element={<ProtectedRoute><AdminConveniosPage /></ProtectedRoute>} />
          <Route path="/admin/configuracion" element={<ProtectedRoute><AdminConfiguracionPage /></ProtectedRoute>} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
