
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatbotFab from '@/components/home/ChatbotFab'; // Fixed the import path and case

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
      <ChatbotFab /> {/* Fixed ChatbotFab component */}
    </div>
  );
};

export default MainLayout;
