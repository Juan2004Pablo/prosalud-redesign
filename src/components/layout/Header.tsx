
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Briefcase, Home, Users, FileText, FolderArchive, Shield, ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Define types for menu items
interface MenuSubItem {
  name: string;
  path?: string; // Path is optional, especially if it's a header for another submenu
  external?: boolean;
  url?: string;
  submenu?: MenuSubItem[];
}

interface BaseMenuItem {
  name: string;
  icon: LucideIcon;
}

interface TopLevelMenuItemWithSubmenu extends BaseMenuItem {
  submenu: MenuSubItem[];
  path?: undefined; 
}

interface TopLevelMenuItemDirectLink extends BaseMenuItem {
  path: string;
  submenu?: undefined; 
}

type MenuItemType = TopLevelMenuItemWithSubmenu | TopLevelMenuItemDirectLink;

// Define menu structure for dropdown navigation
const menuItems: MenuItemType[] = [
  {
    name: 'Inicio',
    icon: Home,
    path: '/'
  },
  {
    name: 'Nosotros',
    icon: Users,
    submenu: [
      { name: '¿Quiénes somos?', path: '/nosotros/quienes-somos' },
      // { name: 'Estructura organizacional', path: '/nosotros/estructura-organizacional' },
      { name: 'Estatutos y beneficios sindicales', path: '/nosotros/estatutos' },
      // { name: 'Rol económico', path: '/nosotros/rol-economico' },
      // { name: 'Compensaciones y beneficios', path: '/nosotros/compensaciones-beneficios' },
      { name: 'Contrato sindical', path: '/nosotros/contrato-sindical' },
    ]
  },
  {
    name: 'Salud y seguridad laboral',
    icon: Shield,
    submenu: [
      {
        name: 'Campañas', // This MenuSubItem acts as a header, path is not needed
        submenu: [
          { name: 'Estilo de Vida y Trabajo Saludable', path: '/salud-seguridad-laboral/campanas/estilo-vida-trabajo-saludable' },
        ]
      },
    ]
  },
  {
    name: 'Documentos y formatos',
    icon: FileText,
    submenu: [
      {
        name: 'Documentos públicos', // This MenuSubItem acts as a header
        submenu: [
          { name: 'Formatos de dotación', path: '/documentos-formatos/documentos-publicos/formatos-dotacion' },
          { name: 'Listados de asistencia', path: '/documentos-formatos/documentos-publicos/listados-asistencia' },
          { name: 'MIPRES', path: '/documentos-formatos/documentos-publicos/mipres' },
          { name: 'Requerimiento y verificación de pagos', path: '/documentos-formatos/documentos-publicos/requerimiento-verificacion-pagos' },
          { name: 'Retefuente: documentos Requeridos', path: '/documentos-formatos/documentos-publicos/retefuente-documentos-requeridos' },
        ]
      },
      {
        name: 'Solicitudes de afiliados', // This MenuSubItem acts as a header
        submenu: [
          { name: 'Verificación de pagos', path: '/documentos-formatos/solicitudes-afiliados/verificacion-pagos' },
          { name: 'Certificado de Convenio', path: '/documentos-formatos/solicitudes-afiliados/certificado-convenio' },
          { name: 'Descanso', path: '/documentos-formatos/solicitudes-afiliados/descanso' },
          { name: 'Solicitud anual diferida', path: '/documentos-formatos/solicitudes-afiliados/solicitud-anual-diferida' },
        ]
      },
    ]
  },
  {
    name: 'Archivo Digital',
    icon: FolderArchive,
    submenu: [
      { name: 'Artículos de interés', path: '/archivo-digital/articulos-interes' },
    ]
  },
  {
    name: 'Recursos',
    icon: Briefcase,
    submenu: [
      { name: 'Video ProSanet (YouTube)', path: 'https://www.youtube.com', external: true, url: 'https://www.youtube.com' },
      { name: 'Acceso a ProSanet', path: '/recursos/acceso-prosanet' },
      { name: 'Bienestar', path: '/recursos/bienestar' },
    ]
  },
];

// Simplified nav items for mobile view - Adjusted to pick first sensible path
const mobileNavItems = menuItems.map(item => {
  let path = '/'; // Default path
  if (item.submenu && item.submenu.length > 0) {
    const firstSubItem = item.submenu[0];
    if (firstSubItem.path) {
      path = firstSubItem.path;
    } else if (firstSubItem.submenu && firstSubItem.submenu.length > 0) {
      // Drill down to the first actual link if the first sub-item is also a group
      const firstNestedSubItem = firstSubItem.submenu[0];
      if (firstNestedSubItem.path) {
        path = firstNestedSubItem.path;
      }
      // If even deeper nesting exists and no path is found, it will default to '/'
      // This logic assumes paths are primarily on the second level of submenu or deeper.
    }
  } else if (item.path) {
    path = item.path;
  }
  return {
    name: item.name,
    path: path,
    icon: item.icon
  };
});

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkClass = "text-primary-prosalud font-bold border-b-2 border-secondary-prosaludgreen";
  const inactiveLinkClass = "text-text-gray hover:text-primary-prosalud transition-colors";
  
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
  >(({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
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
  
  // Function to determine if a menu has only a single column of items
  const hasSingleColumn = (submenu: MenuSubItem[]): boolean => {
    // Check if there's only one submenu item with direct links or
    // if all items are direct links without nested submenus
    if (submenu.length === 1 && submenu[0].submenu) return false;
    return !submenu.some(item => item.submenu);
  };

  // Function to determine if a menu has multiple sections that should be displayed in separate columns
  const hasMultipleSections = (submenu: MenuSubItem[]): boolean => {
    // If there are multiple submenu items with their own submenus, we should display them in separate columns
    return submenu.filter(item => item.submenu).length > 1;
  };
  
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
              <NavigationMenuList className="flex space-x-2">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.name} className="relative">
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-600 hover:text-primary-prosalud transition-colors text-sm py-1 px-2 font-normal bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                          <span className="flex items-center gap-1">
                            {item.name}
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={cn(
                            "grid gap-3 p-4",
                            hasSingleColumn(item.submenu)
                              ? "w-[300px]" // Single column width for direct links
                              : hasMultipleSections(item.submenu)
                                ? "w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2" // Equal columns for multiple sections
                                : "w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[minmax(150px,_.75fr)_1fr]" // Asymmetric for one section with nested items
                          )}>
                            {item.submenu.map((subItem) => (
                              <li key={subItem.name} className="break-inside-avoid">
                                {subItem.submenu ? (
                                  <div className="mb-2">
                                    <h4 className="font-medium mb-1 text-sm text-primary-prosalud px-3 py-1">{subItem.name}</h4>
                                    <ul className="grid gap-1">
                                      {subItem.submenu.map((subSubItem) => (
                                        <ListItem
                                          key={subSubItem.name}
                                          title={subSubItem.name}
                                          href={subSubItem.external ? subSubItem.url : subSubItem.path}
                                          target={subSubItem.external ? "_blank" : undefined}
                                          rel={subSubItem.external ? "noopener noreferrer" : undefined}
                                        >
                                          {/* Optional: Add description for subSubItem if available */}
                                        </ListItem>
                                      ))}
                                    </ul>
                                  </div>
                                ) : (
                                  <ListItem
                                    key={subItem.name}
                                    title={subItem.name}
                                    href={subItem.external ? subItem.url : subItem.path}
                                    target={subItem.external ? "_blank" : undefined}
                                    rel={subItem.external ? "noopener noreferrer" : undefined}
                                  >
                                     {/* Optional: Add description for subItem if available */}
                                  </ListItem>
                                )}
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : ( 
                      <Link
                        to={item.path!}
                        className={`text-sm font-medium py-2 px-3 block ${inactiveLinkClass} hover:bg-gray-50 rounded-md`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
