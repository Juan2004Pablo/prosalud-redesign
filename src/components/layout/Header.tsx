
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import GlobalSearch from './GlobalSearch';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkClass = "text-primary-prosalud font-bold border-b-2 border-secondary-prosaludgreen";
  const inactiveLinkClass = "text-text-gray hover:text-primary-prosalud transition-colors";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/images/logo_prosalud.webp" 
              alt="ProSalud Logo" 
              className="h-12 w-auto" 
              width={120}
              height={48}
            />
          </Link>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex flex-grow justify-center">
            <DesktopMenu inactiveLinkClass={inactiveLinkClass} />
          </div>

          {/* Search, Login Button & Mobile Menu Toggle (Right) */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            {/* Global Search */}
            <div className="hidden sm:block">
              <GlobalSearch />
            </div>

            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-primary-prosalud text-primary-prosalud hover:bg-primary-prosalud-light hover:text-primary-prosalud focus:ring-primary-prosalud flex items-center gap-2"
              >
                <LogIn size={16} />
                <span className="hidden sm:inline">Acceder</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-text-dark hover:text-primary-prosalud focus:outline-none p-2 -mr-2"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar - Below header on mobile */}
        <div className="sm:hidden pb-3">
          <GlobalSearch />
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
