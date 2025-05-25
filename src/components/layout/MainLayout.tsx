
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatbotFab from '@/components/home/ChatbotFab';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <Header />
      <main className="flex-grow animate-fade-in"> {/* Añadida clase de animación */}
        {children}
      </main>
      <Footer />
      <ChatbotFab />
    </div>
  );
};

export default MainLayout;
