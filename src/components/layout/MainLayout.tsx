
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatbotFab from '@/components/home/ChatbotFab'; // Importar ChatbotFab

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
      <ChatbotFab /> {/* Agregar ChatbotFab aquí */}
    </div>
  );
};

export default MainLayout;
