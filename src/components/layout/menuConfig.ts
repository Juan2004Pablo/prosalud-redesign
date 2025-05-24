import { Briefcase, Home, Users, FileText, FolderArchive, Shield, LucideIcon } from 'lucide-react';

// Define types for menu items
export interface MenuSubItem {
  name: string;
  path?: string; // Path is optional, especially if it's a header for another submenu
  external?: boolean;
  url?: string;
  submenu?: MenuSubItem[];
}

export interface BaseMenuItem {
  name: string;
  icon: LucideIcon;
}

export interface TopLevelMenuItemWithSubmenu extends BaseMenuItem {
  submenu: MenuSubItem[];
  path?: undefined; 
}

export interface TopLevelMenuItemDirectLink extends BaseMenuItem {
  path: string;
  submenu?: undefined; 
}

export type MenuItemType = TopLevelMenuItemWithSubmenu | TopLevelMenuItemDirectLink;

// Define menu structure for dropdown navigation
export const menuItems: MenuItemType[] = [
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
          { name: 'Certificado de Convenio', path: '/servicios/certificado-convenio' }, 
          { name: 'Descanso', path: '/documentos-formatos/solicitudes-afiliados/descanso' },
          { name: 'Solicitud anual diferida', path: '/documentos-formatos/solicitudes-afiliados/solicitud-anual-diferida' }, // Path updated below
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
export const mobileNavItems = menuItems.map(item => {
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
