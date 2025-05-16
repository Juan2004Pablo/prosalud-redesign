
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search, Briefcase, Home, Users, FileText, FolderArchive, Shield, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Define menu structure for dropdown navigation
const menuItems = [
  { 
    name: 'Nosotros', 
    icon: Users,
    submenu: [
      { name: '¿Quienes somos?', path: '/nosotros/quienes-somos' },
      { name: 'Estructura organizacional', path: '/nosotros/estructura' },
      { name: 'Estatutos', path: '/nosotros/estatutos' },
      { name: 'Rol económico', path: '/nosotros/rol-economico' },
      { name: 'Compensaciones y beneficios', path: '/nosotros/compensaciones' },
      { name: 'Contrato sindical', path: '/nosotros/contrato-sindical' },
    ]
  },
  { 
    name: 'Salud y seguridad laboral', 
    icon: Shield,
    submenu: [
      { 
        name: 'Campañas', 
        path: '/salud/campanas',
        submenu: [
          { name: 'Estilo de Vida y Trabajo Saludable', path: '/salud/campanas/estilo-vida-saludable' },
        ]
      },
    ]
  },
  { 
    name: 'Documentos y formatos', 
    icon: FileText,
    submenu: [
      { 
        name: 'Documentos públicos', 
        path: '/documentos/publicos',
        submenu: [
          { name: 'Formatos de dotación', path: '/documentos/publicos/formatos-dotacion' },
          { name: 'Listados de asistencia', path: '/documentos/publicos/listados-asistencia' },
          { name: 'MIPRES', path: '/documentos/publicos/mipres' },
          { name: 'Requerimiento y verificación de pagos', path: '/documentos/publicos/verificacion-pagos' },
          { name: 'Retefuente: documentos Requeridos', path: '/documentos/publicos/retefuente' },
        ]
      },
      { 
        name: 'Solicitudes de afiliados', 
        path: '/documentos/solicitudes',
        submenu: [
          { name: 'Verificación de pagos', path: '/documentos/solicitudes/verificacion-pagos' },
          { name: 'Certificado de Convenio', path: '/documentos/solicitudes/certificado-convenio' },
          { name: 'Descanso', path: '/documentos/solicitudes/descanso' },
          { name: 'Solicitud anual diferida', path: '/documentos/solicitudes/solicitud-anual' },
        ]
      },
    ]
  },
  { 
    name: 'Artículos de interés', 
    icon: FolderArchive,
    path: '/archivo/articulos'
  },
  { 
    name: 'Recursos', 
    icon: Briefcase,
    submenu: [
      { name: 'Video ProSanet (YouTube)', path: '/recursos/video-prosanet', external: true, url: 'https://youtube.com' },
      { name: 'Acceso a ProSanet', path: '/recursos/acceso-prosanet' },
      { name: 'Bienestar', path: '/recursos/bienestar' },
    ]
  },
];

// Simplified nav items for mobile view
const mobileNavItems = menuItems.map(item => ({
  name: item.name,
  path: item.submenu ? item.submenu[0].path : item.path || '/',
  icon: item.icon
}));

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkClass = "text-red-500 font-bold";
  const inactiveLinkClass = "text-text-gray hover:text-primary-prosalud transition-colors";
  
  // Custom component for NavigationMenuLink
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png" alt="ProSalud Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation with dropdowns */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.name} className="relative">
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-600 hover:text-primary-prosalud transition-colors text-sm py-1 px-2 font-normal bg-transparent hover:bg-transparent">
                          <span className="flex items-center gap-1">
                            {item.name}
                            <ChevronDown className="h-3 w-3" />
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white">
                          <ul className="grid w-[400px] gap-3 p-4">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.name}>
                                {subItem.submenu ? (
                                  <div className="mb-2">
                                    <h4 className="font-medium mb-1 text-sm text-primary-prosalud">{subItem.name}</h4>
                                    <ul className="grid gap-1 pl-2">
                                      {subItem.submenu.map((subSubItem) => (
                                        <li key={subSubItem.name}>
                                          <Link
                                            to={subSubItem.path}
                                            className="text-sm text-text-gray hover:text-primary-prosalud block p-2 rounded hover:bg-gray-50"
                                          >
                                            {subSubItem.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : (
                                  <Link
                                    to={subItem.path}
                                    className="text-sm text-text-gray hover:text-primary-prosalud block p-2 rounded hover:bg-gray-50"
                                  >
                                    {subItem.name}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.path || '/'}
                        className="text-gray-600 hover:text-primary-prosalud transition-colors text-sm py-1 px-2 font-normal"
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search button */}
          <button aria-label="Buscar" className="hidden md:flex text-text-gray hover:text-primary-prosalud">
            <Search size={20} />
          </button>

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
            {mobileNavItems.map((item) => (
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
