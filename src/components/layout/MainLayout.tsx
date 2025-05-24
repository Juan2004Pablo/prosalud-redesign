
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '@/components/chatbot/Chatbot'; // Importar el nuevo Chatbot

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Chatbot /> {/* Agregar el nuevo Chatbot aquí */}
    </div>
  );
};

export default MainLayout;
