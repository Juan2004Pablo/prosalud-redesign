import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/utils/ScrollToTop';

// Public Pages
import HomePage from '@/pages/HomePage';
import AboutUsPage from '@/pages/AboutUsPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import BienestarPage from '@/pages/BienestarPage';
import ConveniosPage from '@/pages/ConveniosPage';
import ComfenalcoPage from '@/pages/ComfenalcoPage';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<AboutUsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/bienestar" element={<BienestarPage />} />
          <Route path="/convenios" element={<ConveniosPage />} />
          <Route path="/comfenalco" element={<ComfenalcoPage />} />
          <Route path="*" element={<NotFoundPage />} />
          
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
