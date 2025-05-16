
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-grow flex-col md:flex-row items-stretch min-h-[calc(100vh-80px-var(--footer-height,0px))]"> {/* Ajusta 80px por la altura del header, y --footer-height para el footer si se conoce */}
        {/* Columna Izquierda: Ilustración */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-primary-prosalud-light p-8 lg:p-12">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1974&auto=format&fit=crop"
            alt="Personal de salud trabajando"
            className="max-w-lg w-full h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
        {/* Columna Derecha: Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 bg-background-light">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
