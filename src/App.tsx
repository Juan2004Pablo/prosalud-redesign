
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import ScrollToTop from '@/components/utils/ScrollToTop';

// Pages
import Index from '@/pages/Index';
import QuienesSomos from '@/pages/QuienesSomos';
import ContactoPage from '@/pages/ContactoPage';
import SstPage from '@/pages/SstPage';
import VerificacionPagosPage from '@/pages/VerificacionPagosPage';
import SolicitudCertificadoConvenioPage from '@/pages/SolicitudCertificadoConvenioPage';
import SolicitudDescansoLaboralPage from '@/pages/SolicitudDescansoLaboralPage';
import SolicitudAnualDiferidaPage from '@/pages/SolicitudAnualDiferidaPage';
import SolicitudRetiroSindicalPage from '@/pages/SolicitudRetiroSindicalPage';
import ActualizarCuentaBancariaPage from '@/pages/ActualizarCuentaBancariaPage';
import GaleriaBienestarPage from '@/pages/GaleriaBienestarPage';
import EventoDetallePage from '@/pages/EventoDetallePage';
import ContratoSindicalPage from '@/pages/ContratoSindicalPage';
import EstatutosBeneficiosPage from '@/pages/EstatutosBeneficiosPage';
import EpsSuraPage from '@/pages/EpsSuraPage';
import IncapacidadesLicenciasPage from '@/pages/IncapacidadesLicenciasPage';
import CertificadoSeguridadSocialPage from '@/pages/CertificadoSeguridadSocialPage';
import SolicitudMicrocreditoPage from '@/pages/SolicitudMicrocreditoPage';
import SolicitudPermisosCambioTurnosPage from '@/pages/SolicitudPermisosCambioTurnosPage';
import FAQPage from '@/pages/FAQPage';
import NotFound from '@/pages/NotFound';

// Auth Pages
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';

// Admin Pages
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminUsuariosPage from '@/pages/AdminUsuariosPage';
import AdminInventarioPage from '@/pages/AdminInventarioPage';
import AdminSolicitudesPage from '@/pages/AdminSolicitudesPage';
import AdminConveniosPage from '@/pages/AdminConveniosPage';
import AdminBienestarPage from '@/pages/AdminBienestarPage';
import AdminComfenalcoPage from '@/pages/AdminComfenalcoPage';
import AdminConfiguracionPage from '@/pages/AdminConfiguracionPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/nosotros" element={<QuienesSomos />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/servicios/sst" element={<SstPage />} />
            <Route path="/servicios/consulta-pagos" element={<VerificacionPagosPage />} />
            <Route path="/servicios/certificado-convenio" element={<SolicitudCertificadoConvenioPage />} />
            <Route path="/servicios/descanso-sindical" element={<SolicitudDescansoLaboralPage />} />
            <Route path="/servicios/compensacion-anual" element={<SolicitudAnualDiferidaPage />} />
            <Route path="/servicios/retiro-sindical" element={<SolicitudRetiroSindicalPage />} />
            <Route path="/servicios/actualizar-cuenta-bancaria" element={<ActualizarCuentaBancariaPage />} />
            <Route path="/servicios/galeria-bienestar" element={<GaleriaBienestarPage />} />
            <Route path="/evento/:id" element={<EventoDetallePage />} />
            <Route path="/nosotros/contrato-sindical" element={<ContratoSindicalPage />} />
            <Route path="/nosotros/estatutos" element={<EstatutosBeneficiosPage />} />
            <Route path="/servicios/eps-sura" element={<EpsSuraPage />} />
            <Route path="/servicios/incapacidades-licencias" element={<IncapacidadesLicenciasPage />} />
            <Route path="/servicios/certificado-seguridad-social" element={<CertificadoSeguridadSocialPage />} />
            <Route path="/servicios/microcredito" element={<SolicitudMicrocreditoPage />} />
            <Route path="/servicios/permisos-cambio-turnos" element={<SolicitudPermisosCambioTurnosPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/usuarios" element={<ProtectedRoute><AdminUsuariosPage /></ProtectedRoute>} />
            <Route path="/admin/inventario" element={<ProtectedRoute><AdminInventarioPage /></ProtectedRoute>} />
            <Route path="/admin/solicitudes" element={<ProtectedRoute><AdminSolicitudesPage /></ProtectedRoute>} />
            <Route path="/admin/convenios" element={<ProtectedRoute><AdminConveniosPage /></ProtectedRoute>} />
            <Route path="/admin/bienestar" element={<ProtectedRoute><AdminBienestarPage /></ProtectedRoute>} />
            <Route path="/admin/comfenalco" element={<ProtectedRoute><AdminComfenalcoPage /></ProtectedRoute>} />
            <Route path="/admin/configuracion" element={<ProtectedRoute><AdminConfiguracionPage /></ProtectedRoute>} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
        <SonnerToaster richColors />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
