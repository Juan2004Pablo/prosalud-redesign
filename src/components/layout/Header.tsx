import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search, Briefcase, Home, Users, FileText, FolderArchive, Shield } from 'lucide-react';

const navItems = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'ProSalud', path: '/prosalud', icon: Briefcase }, // Placeholder icon
  { name: 'Convenios', path: '/convenios', icon: Users }, // Placeholder icon
  { name: 'S.G.S.S.T.', path: '/sgsst', icon: Shield },
  { name: 'Documentos Públicos', path: '/documentos', icon: FileText },
  { name: 'Archivo Digital', path: '/archivo', icon: FolderArchive },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkClass = "text-secondary-prosaludgreen font-bold border-b-2 border-secondary-prosaludgreen";
  const inactiveLinkClass = "text-text-gray hover:text-primary-prosalud transition-colors";
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png" alt="ProSalud Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} py-2 text-sm font-medium`}
              >
                {item.name}
              </NavLink>
            ))}
            <button aria-label="Buscar" className="text-text-gray hover:text-primary-prosalud">
              <Search size={20} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-dark hover:text-primary-prosalud focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-4 z-40">
          <nav className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
            <div className="flex items-center space-x-2 px-3 py-2 text-text-gray hover:text-primary-prosalud cursor-pointer">
              <Search size={20} />
              <span>Buscar</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
