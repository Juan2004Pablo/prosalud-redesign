
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { Button } from '@/components/ui/button'; // Import Button

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeLinkClass = "text-primary-prosalud font-bold border-b-2 border-secondary-prosaludgreen";
  const inactiveLinkClass = "text-text-gray hover:text-primary-prosalud transition-colors";
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png" alt="ProSalud Logo" className="h-12 w-auto" />
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Navigation with dropdowns */}
            <div className="hidden md:block">
              <DesktopMenu inactiveLinkClass={inactiveLinkClass} />
            </div>

            {/* Login Button */}
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary-prosalud text-primary-prosalud hover:bg-primary-prosalud-light hover:text-primary-prosalud focus:ring-primary-prosalud"
              >
                Login
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-text-dark hover:text-primary-prosalud focus:outline-none p-2 -mr-2" // Added padding for easier click and negative margin to align
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu 
          onClose={() => setIsMobileMenuOpen(false)} 
          activeLinkClass={activeLinkClass} 
          inactiveLinkClass={inactiveLinkClass} 
        />
      )}
    </header>
  );
};

export default Header;
