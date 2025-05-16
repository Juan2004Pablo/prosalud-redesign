
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background-light">
      {/* Columna Izquierda: Ilustración - Oculta en móvil, visible en md y superior */}
      <div className="hidden md:flex md:w-3/5 bg-primary-prosalud-light items-center justify-center p-6 sm:p-8 lg:p-12"> {/* Cambiado para ocultar en móvil */}
        <div className="max-w-md lg:max-w-lg xl:max-w-xl w-full">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
            alt="Personal de salud"
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Columna Derecha: Formulario de Login - Ajustada para móvil */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-start pt-20 md:justify-center md:pt-0 px-6 sm:px-10 md:px-8 lg:px-12 bg-white"> {/* Ajustado padding y justificación para móvil y escritorio */}
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img
                src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png"
                alt="ProSalud Logo"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Login Form Component */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
