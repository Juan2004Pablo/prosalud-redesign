
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background-light">
      {/* Columna Izquierda: Ilustración - Oculta en móvil, visible en md y superior */}
      <div className="hidden md:flex md:w-3/5 relative overflow-hidden group"> {/* Contenedor de la imagen */}
        <img
          src="/images/foto_login.webp"
          alt="Ilustración de servicios de salud con estetoscopio y símbolos médicos"
          className="w-full h-full object-cover animate-fade-in transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary-prosalud/20 mix-blend-multiply pointer-events-none"></div> {/* Superposición de estilo */}
      </div>

      {/* Columna Derecha: Formulario de Login - Ajustada para móvil */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-start pt-20 md:justify-center md:pt-0 px-6 sm:px-10 md:px-8 lg:px-12 bg-white"> {/* Ajustado padding y justificación para móvil y escritorio */}
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img
                src="/images/logo_prosalud.webp"
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
