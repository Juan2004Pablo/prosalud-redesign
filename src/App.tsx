
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/utils/ScrollToTop';

// Public Pages
import Index from '@/pages/Index';
import QuienesSomos from '@/pages/QuienesSomos';
import FAQPage from '@/pages/FAQPage';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import NotFound from '@/pages/NotFound';
import GaleriaBienestarPage from '@/pages/GaleriaBienestarPage';

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
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/bienestar" element={<GaleriaBienestarPage />} />
          <Route path="*" element={<NotFound />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/usuarios" element={<ProtectedRoute><AdminUsuariosPage /></ProtectedRoute>} />
          <Route path="/admin/bienestar" element={<ProtectedRoute><AdminBienestarPage /></ProtectedRoute>} />
          <Route path="/admin/comfenalco" element={<ProtectedRoute><AdminComfenalcoPage /></ProtectedRoute>} />
          <Route path="/admin/convenios" element={<ProtectedRoute><AdminConveniosPage /></ProtectedRoute>} />
          <Route path="/admin/configuracion" element={<ProtectedRoute><AdminConfiguracionPage /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
