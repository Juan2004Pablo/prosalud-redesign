import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProSaludChatbot from '@/components/chatbot/bot';
import ChatbotFab from '@/components/home/ChatbotFab';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(false);

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
    setIsChatbotMinimized(false);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
    setIsChatbotMinimized(false);
  };

  const handleToggleChatbotSize = () => {
    setIsChatbotMinimized(!isChatbotMinimized);
  };

  // Listen for custom chatbot events
  useEffect(() => {
    const handleOpenChatbotEvent = () => {
      handleOpenChatbot();
    };

    window.addEventListener('openChatbot', handleOpenChatbotEvent);
    
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbotEvent);
    };
  }, []);

  // Security: Add security headers and basic protections
  useEffect(() => {
    // Security: Add meta tags for security
    const addSecurityMeta = () => {
      // Prevent clickjacking
      const frameOptions = document.querySelector('meta[http-equiv="X-Frame-Options"]');
      if (!frameOptions) {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'X-Frame-Options';
        meta.content = 'DENY';
        document.head.appendChild(meta);
      }

      // Content type sniffing protection
      const contentType = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
      if (!contentType) {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'X-Content-Type-Options';
        meta.content = 'nosniff';
        document.head.appendChild(meta);
      }

      // Referrer policy
      const referrer = document.querySelector('meta[name="referrer"]');
      if (!referrer) {
        const meta = document.createElement('meta');
        meta.name = 'referrer';
        meta.content = 'strict-origin-when-cross-origin';
        document.head.appendChild(meta);
      }
    };

    addSecurityMeta();

    // Security: Clear any potential XSS vectors from URL
    const cleanUrl = () => {
      const url = new URL(window.location.href);
      let needsRedirect = false;
      
      // Remove potentially dangerous parameters
      const dangerousParams = ['script', 'javascript', 'vbscript', 'onload', 'onerror'];
      dangerousParams.forEach(param => {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
          needsRedirect = true;
        }
      });

      if (needsRedirect) {
        window.history.replaceState({}, '', url.toString());
      }
    };

    cleanUrl();

    // Security: Remove any console.log statements in production
    if (import.meta.env.PROD) {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
    }

  }, []);

  // Security: Content Security Policy (basic implementation)
  useEffect(() => {
    // Add basic CSP through meta tag (more comprehensive CSP should be done server-side)
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!csp && import.meta.env.PROD) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.gpteng.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <Header />
      <main className="flex-grow animate-fade-in">
        {children}
      </main>
      <Footer />
      
      {/* Chatbot FAB - only show when chatbot is closed */}
      {!isChatbotOpen && (
        <ChatbotFab onOpenChatbot={handleOpenChatbot} />
      )}
      
      {/* Chatbot Component */}
      <ProSaludChatbot
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        onToggleSize={handleToggleChatbotSize}
        isMinimized={isChatbotMinimized}
      />
    </div>
  );
};

export default MainLayout;
