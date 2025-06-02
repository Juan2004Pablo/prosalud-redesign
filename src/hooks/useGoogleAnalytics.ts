
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declarar gtag globalmente
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Verificar si gtag está disponible
    if (typeof window.gtag !== 'undefined') {
      // Enviar página vista cuando cambia la ruta
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [location]);

  // Función para trackear eventos personalizados
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Función para trackear conversiones
  const trackConversion = (conversionName: string, value?: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        send_to: `GA_MEASUREMENT_ID/${conversionName}`,
        value: value,
      });
    }
  };

  return {
    trackEvent,
    trackConversion,
  };
};
