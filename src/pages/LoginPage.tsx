// src/pages/LoginPage.tsx
import React from 'react';
import Header from '@/components/layout/Header';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-16 flex flex-col">
      {/* Header fijo */}
      <Header />

      {/* Cuerpo: dos columnas / responsive */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Columna Izquierda: Ilustración */}
        <div className="w-full md:w-1/2 bg-primary-prosalud-light flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="max-w-md lg:max-w-lg xl:max-w-xl w-full">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Personal de salud"
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Columna Derecha: Formulario de Login */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo en la sección (opcional, si quieres repetirlo) */}
            <div className="flex justify-center md:hidden">
              <Link to="/">
                <img
                  src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png"
                  alt="ProSalud Logo"
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            {/* Formulario */}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
