
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '@/components/chatbot/chatbot.jsx'; // Importar el nuevo Chatbot.jsx

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
      <Chatbot /> {/* Usar el nuevo Chatbot.jsx aquí */}
    </div>
  );
};

export default MainLayout;
