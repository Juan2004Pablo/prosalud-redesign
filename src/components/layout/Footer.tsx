
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-prosalud-dark text-text-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">ProSalud</h3>
            <p className="text-sm text-gray-300">Sindicato de Profesionales de la Salud.</p>
            {/* Add address or other info if needed */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Enlaces Útiles</h3>
            <ul className="space-y-1">
              <li><Link to="/faq" className="text-sm hover:text-secondary-prosaludgreen transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link to="/contacto" className="text-sm hover:text-secondary-prosaludgreen transition-colors">Contacto</Link></li>
              <li><Link to="/terminos" className="text-sm hover:text-secondary-prosaludgreen transition-colors">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="text-sm hover:text-secondary-prosaludgreen transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
            {/* Placeholder for social media icons/links */}
            <p className="text-sm text-gray-300">Próximamente</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ProSalud. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
