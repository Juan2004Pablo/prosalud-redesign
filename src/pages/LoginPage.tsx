
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background-light">
      {/* Columna Izquierda: Ilustración */}
      <div className="w-full md:w-3/5 bg-primary-prosalud-light flex items-center justify-center p-6 sm:p-8 lg:p-12 order-1 md:order-none"> {/* Cambiado md:w-1/2 a md:w-3/5 */}
        <div className="max-w-md lg:max-w-lg xl:max-w-xl w-full">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
            alt="Personal de salud"
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Columna Derecha: Formulario de Login */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center px-6 sm:p-10 lg:p-12 order-2 md:order-none bg-white"> {/* Cambiado md:w-1/2 a md:w-2/5 */}
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
