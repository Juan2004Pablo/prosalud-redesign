
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout"; // Import MainLayout

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
          {/* Adding placeholder routes for nav items */}
          <Route path="/prosalud" element={<PlaceholderPage title="ProSalud" />} />
          <Route path="/convenios" element={<PlaceholderPage title="Convenios" />} />
          <Route path="/sgsst" element={<PlaceholderPage title="S.G.S.S.T." />} />
          <Route path="/documentos" element={<PlaceholderPage title="Documentos Públicos" />} />
          <Route path="/archivo" element={<PlaceholderPage title="Archivo Digital" />} />
          <Route path="/faq" element={<PlaceholderPage title="Preguntas Frecuentes" />} />
          <Route path="/contacto" element={<PlaceholderPage title="Contacto" />} />
          <Route path="/terminos" element={<PlaceholderPage title="Términos y Condiciones" />} />
          <Route path="/privacidad" element={<PlaceholderPage title="Política de Privacidad" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
