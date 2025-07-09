// Mock data centralizado para todas las páginas admin
import { User, Convenio, BienestarEvent, ComfenalcoEvent } from '@/types/admin';
import { Product, SupplierDelivery, Return, Request, Hospital } from '@/types/inventory';
import { Request as SolicitudRequest } from '@/types/requests';

// Users Mock Data - Expandido a 25 usuarios
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez García',
    email: 'juan.perez@prosalud.com',
    isActive: true,
    createdAt: '2024-01-15',
    lastLogin: '2024-06-01'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'González Rodríguez',
    email: 'maria.gonzalez@prosalud.com',
    isActive: true,
    createdAt: '2024-02-10',
    lastLogin: '2024-05-28'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Rodríguez Silva',
    email: 'carlos.rodriguez@prosalud.com',
    isActive: false,
    createdAt: '2024-03-05',
    lastLogin: '2024-04-15'
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'López Herrera',
    email: 'ana.lopez@prosalud.com',
    isActive: true,
    createdAt: '2024-03-20',
    lastLogin: '2024-06-02'
  },
  {
    id: '5',
    firstName: 'Luis',
    lastName: 'Martínez Castro',
    email: 'luis.martinez@prosalud.com',
    isActive: true,
    createdAt: '2024-04-01',
    lastLogin: '2024-05-30'
  },
  {
    id: '6',
    firstName: 'Patricia',
    lastName: 'Ruiz Morales',
    email: 'patricia.ruiz@prosalud.com',
    isActive: false,
    createdAt: '2024-04-15',
    lastLogin: '2024-05-15'
  },
  {
    id: '7',
    firstName: 'Roberto',
    lastName: 'Silva Jiménez',
    email: 'roberto.silva@prosalud.com',
    isActive: true,
    createdAt: '2024-05-01',
    lastLogin: '2024-06-01'
  },
  {
    id: '8',
    firstName: 'Elena',
    lastName: 'Castro Vega',
    email: 'elena.castro@prosalud.com',
    isActive: true,
    createdAt: '2024-05-10',
    lastLogin: '2024-05-31'
  },
  {
    id: '9',
    firstName: 'Diego',
    lastName: 'Ramírez Torres',
    email: 'diego.ramirez@prosalud.com',
    isActive: true,
    createdAt: '2024-05-15',
    lastLogin: '2024-06-03'
  },
  {
    id: '10',
    firstName: 'Sofía',
    lastName: 'Vargas Pineda',
    email: 'sofia.vargas@prosalud.com',
    isActive: true,
    createdAt: '2024-05-20',
    lastLogin: '2024-06-02'
  },
  {
    id: '11',
    firstName: 'Andrés',
    lastName: 'Moreno Díaz',
    email: 'andres.moreno@prosalud.com',
    isActive: false,
    createdAt: '2024-05-25',
    lastLogin: '2024-05-29'
  },
  {
    id: '12',
    firstName: 'Valentina',
    lastName: 'Sánchez Restrepo',
    email: 'valentina.sanchez@prosalud.com',
    isActive: true,
    createdAt: '2024-06-01',
    lastLogin: '2024-06-03'
  },
  {
    id: '13',
    firstName: 'Fernando',
    lastName: 'Gómez Hurtado',
    email: 'fernando.gomez@prosalud.com',
    isActive: true,
    createdAt: '2024-06-05',
    lastLogin: '2024-06-03'
  },
  {
    id: '14',
    firstName: 'Isabella',
    lastName: 'Torres Mendoza',
    email: 'isabella.torres@prosalud.com',
    isActive: true,
    createdAt: '2024-06-08',
    lastLogin: '2024-06-03'
  },
  {
    id: '15',
    firstName: 'Sebastián',
    lastName: 'Rojas Medina',
    email: 'sebastian.rojas@prosalud.com',
    isActive: false,
    createdAt: '2024-06-10',
    lastLogin: '2024-06-02'
  },
  {
    id: '16',
    firstName: 'Camila',
    lastName: 'Hernández Arias',
    email: 'camila.hernandez@prosalud.com',
    isActive: true,
    createdAt: '2024-06-12',
    lastLogin: '2024-06-03'
  },
  {
    id: '17',
    firstName: 'Alejandro',
    lastName: 'Cardona Mejía',
    email: 'alejandro.cardona@prosalud.com',
    isActive: true,
    createdAt: '2024-06-14',
    lastLogin: '2024-06-03'
  },
  {
    id: '18',
    firstName: 'Natalia',
    lastName: 'Osorio Valencia',
    email: 'natalia.osorio@prosalud.com',
    isActive: true,
    createdAt: '2024-06-16',
    lastLogin: '2024-06-03'
  },
  {
    id: '19',
    firstName: 'Mateo',
    lastName: 'Quintero Franco',
    email: 'mateo.quintero@prosalud.com',
    isActive: false,
    createdAt: '2024-06-18',
    lastLogin: '2024-06-01'
  },
  {
    id: '20',
    firstName: 'Gabriela',
    lastName: 'Bedoya Correa',
    email: 'gabriela.bedoya@prosalud.com',
    isActive: true,
    createdAt: '2024-06-20',
    lastLogin: '2024-06-03'
  },
  {
    id: '21',
    firstName: 'Nicolás',
    lastName: 'Agudelo Zapata',
    email: 'nicolas.agudelo@prosalud.com',
    isActive: true,
    createdAt: '2024-06-22',
    lastLogin: '2024-06-03'
  },
  {
    id: '22',
    firstName: 'Juliana',
    lastName: 'Montoya Giraldo',
    email: 'juliana.montoya@prosalud.com',
    isActive: true,
    createdAt: '2024-06-24',
    lastLogin: '2024-06-03'
  },
  {
    id: '23',
    firstName: 'Santiago',
    lastName: 'Ochoa Peña',
    email: 'santiago.ochoa@prosalud.com',
    isActive: false,
    createdAt: '2024-06-26',
    lastLogin: '2024-06-02'
  },
  {
    id: '24',
    firstName: 'Mariana',
    lastName: 'Betancur Salazar',
    email: 'mariana.betancur@prosalud.com',
    isActive: true,
    createdAt: '2024-06-28',
    lastLogin: '2024-06-03'
  },
  {
    id: '25',
    firstName: 'Emilio',
    lastName: 'Cárdenas Upegui',
    email: 'emilio.cardenas@prosalud.com',
    isActive: true,
    createdAt: '2024-06-30',
    lastLogin: '2024-06-03'
  }
];

// Convenios Mock Data - Usando los 7 convenios reales del sitio web
export const mockConvenios: Convenio[] = [
  {
    id: '1',
    name: 'E.S.E. HOSPITAL MARCO FIDEL SUÁREZ - BELLO',
    image: '/images/convenios/hospital-marco-fidel-suarez.webp',
    isVisible: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'E.S.E. HOSPITAL SAN JUAN DE DIOS - RIONEGRO',
    image: '/images/convenios/hospital-san-juan-de-dios-rionegro.webp',
    isVisible: true,
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'PROMOTORA MÉDICA Y ODONTOLÓGICA S.A.',
    image: '/images/convenios/promotora-medica-odontologica.webp',
    isVisible: true,
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'SOCIEDAD MÉDICA RIONEGRO SOMER S.A.',
    image: '/images/convenios/somer-sa.webp',
    isVisible: true,
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    name: 'E.S.E. HOSPITAL VENANCIO DÍAZ DÍAZ',
    image: '/images/convenios/hospital-venancio-diaz.webp',
    isVisible: true,
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'E.S.E. HOSPITAL LA MERCED - CIUDAD BOLÍVAR',
    image: '/images/convenios/hospital-la-merced-ciudad-bolivar.webp',
    isVisible: true,
    createdAt: '2024-01-06'
  },
  {
    id: '7',
    name: 'E.S.E. HOSPITAL SANTA ELENA - FREDONIA',
    image: '/images/convenios/hospital-santa-elena-fredonia.webp',
    isVisible: true,
    createdAt: '2024-01-07'
  }
];

// Products Mock Data - Expandido significativamente
export const mockProducts: Product[] = [
  // Uniformes
  {
    id: '1',
    name: 'Uniforme Quirúrgico Azul Clásico',
    category: 'uniforme',
    description: 'Uniforme quirúrgico completo color azul, tela antifluidos resistente',
    image: '/images/inventory/uniforme-azul.webp',
    variants: [
      { id: '1', product_id: '1', size: 'XS', color: 'Azul', stock: 8, min_stock: 5, max_stock: 25, sku: 'UNI-AZ-XS' },
      { id: '2', product_id: '1', size: 'S', color: 'Azul', stock: 15, min_stock: 10, max_stock: 50, sku: 'UNI-AZ-S' },
      { id: '3', product_id: '1', size: 'M', color: 'Azul', stock: 8, min_stock: 10, max_stock: 50, sku: 'UNI-AZ-M' },
      { id: '4', product_id: '1', size: 'L', color: 'Azul', stock: 25, min_stock: 15, max_stock: 60, sku: 'UNI-AZ-L' },
      { id: '5', product_id: '1', size: 'XL', color: 'Azul', stock: 12, min_stock: 8, max_stock: 40, sku: 'UNI-AZ-XL' },
      { id: '6', product_id: '1', size: 'XXL', color: 'Azul', stock: 6, min_stock: 5, max_stock: 20, sku: 'UNI-AZ-XXL' }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Uniforme Quirúrgico Verde Hospitalario',
    category: 'uniforme',
    description: 'Uniforme quirúrgico completo color verde, ideal para quirófanos',
    image: '/images/inventory/uniforme-verde.webp',
    variants: [
      { id: '7', product_id: '2', size: 'XS', color: 'Verde', stock: 5, min_stock: 3, max_stock: 20, sku: 'UNI-VE-XS' },
      { id: '8', product_id: '2', size: 'S', color: 'Verde', stock: 3, min_stock: 5, max_stock: 30, sku: 'UNI-VE-S' },
      { id: '9', product_id: '2', size: 'M', color: 'Verde', stock: 18, min_stock: 10, max_stock: 50, sku: 'UNI-VE-M' },
      { id: '10', product_id: '2', size: 'L', color: 'Verde', stock: 22, min_stock: 15, max_stock: 60, sku: 'UNI-VE-L' },
      { id: '11', product_id: '2', size: 'XL', color: 'Verde', stock: 14, min_stock: 8, max_stock: 40, sku: 'UNI-VE-XL' }
    ],
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-06-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Uniforme Blanco Médico',
    category: 'uniforme',
    description: 'Uniforme médico blanco tradicional para consulta externa',
    image: '/images/inventory/uniforme-blanco.webp',
    variants: [
      { id: '12', product_id: '3', size: 'S', color: 'Blanco', stock: 20, min_stock: 8, max_stock: 35, sku: 'UNI-BL-S' },
      { id: '13', product_id: '3', size: 'M', color: 'Blanco', stock: 28, min_stock: 12, max_stock: 45, sku: 'UNI-BL-M' },
      { id: '14', product_id: '3', size: 'L', color: 'Blanco', stock: 22, min_stock: 10, max_stock: 40, sku: 'UNI-BL-L' },
      { id: '15', product_id: '3', size: 'XL', color: 'Blanco', stock: 16, min_stock: 8, max_stock: 30, sku: 'UNI-BL-XL' }
    ],
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-06-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Uniforme Rosa Pediátrico',
    category: 'uniforme',
    description: 'Uniforme especializado para área de pediatría',
    image: '/images/inventory/uniforme-rosa.webp',
    variants: [
      { id: '16', product_id: '4', size: 'S', color: 'Rosa', stock: 12, min_stock: 6, max_stock: 25, sku: 'UNI-RO-S' },
      { id: '17', product_id: '4', size: 'M', color: 'Rosa', stock: 15, min_stock: 8, max_stock: 30, sku: 'UNI-RO-M' },
      { id: '18', product_id: '4', size: 'L', color: 'Rosa', stock: 10, min_stock: 6, max_stock: 25, sku: 'UNI-RO-L' }
    ],
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-06-04T00:00:00Z'
  },
  // Tapabocas
  {
    id: '5',
    name: 'Tapabocas N95 Certificado',
    category: 'tapabocas',
    description: 'Tapabocas de alta filtración N95, certificado FDA',
    image: '/images/inventory/n95.webp',
    variants: [
      { id: '19', product_id: '5', stock: 45, min_stock: 100, max_stock: 500, sku: 'TAP-N95-STD' }
    ],
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-06-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Tapabocas Quirúrgico Desechable',
    category: 'tapabocas',
    description: 'Tapabocas quirúrgico desechable de 3 capas',
    image: '/images/inventory/quirurgico.webp',
    variants: [
      { id: '20', product_id: '6', stock: 1200, min_stock: 500, max_stock: 2000, sku: 'TAP-QUI-STD' }
    ],
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-06-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Tapabocas KN95 Colores',
    category: 'tapabocas',
    description: 'Tapabocas KN95 en varios colores para identificación',
    image: '/images/inventory/kn95-colores.webp',
    variants: [
      { id: '21', product_id: '7', color: 'Azul', stock: 200, min_stock: 150, max_stock: 400, sku: 'TAP-KN95-AZ' },
      { id: '22', product_id: '7', color: 'Rosa', stock: 180, min_stock: 150, max_stock: 400, sku: 'TAP-KN95-RO' },
      { id: '23', product_id: '7', color: 'Verde', stock: 160, min_stock: 150, max_stock: 400, sku: 'TAP-KN95-VE' }
    ],
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-06-07T00:00:00Z'
  },
  {
    id: '8',
    name: 'Tapabocas Pediátrico',
    category: 'tapabocas',
    description: 'Tapabocas especial para niños con diseños divertidos',
    image: '/images/inventory/tapabocas-pediatrico.webp',
    variants: [
      { id: '24', product_id: '8', stock: 295, min_stock: 200, max_stock: 600, sku: 'TAP-PED-STD' }
    ],
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-06-08T00:00:00Z'
  },
  // Batas
  {
    id: '9',
    name: 'Bata Médica Blanca Manga Larga',
    category: 'batas',
    description: 'Bata médica blanca manga larga, algodón poliéster',
    image: '/images/inventory/bata-blanca.webp',
    variants: [
      { id: '25', product_id: '9', size: 'S', color: 'Blanco', stock: 12, min_stock: 8, max_stock: 30, sku: 'BAT-BL-S' },
      { id: '26', product_id: '9', size: 'M', color: 'Blanco', stock: 18, min_stock: 12, max_stock: 40, sku: 'BAT-BL-M' },
      { id: '27', product_id: '9', size: 'L', color: 'Blanco', stock: 2, min_stock: 8, max_stock: 30, sku: 'BAT-BL-L' },
      { id: '28', product_id: '9', size: 'XL', color: 'Blanco', stock: 14, min_stock: 8, max_stock: 25, sku: 'BAT-BL-XL' }
    ],
    created_at: '2024-01-09T00:00:00Z',
    updated_at: '2024-06-09T00:00:00Z'
  },
  {
    id: '10',
    name: 'Bata de Laboratorio Resistente',
    category: 'batas',
    description: 'Bata especializada para laboratorio, resistente a químicos',
    image: '/images/inventory/bata-laboratorio.webp',
    variants: [
      { id: '29', product_id: '10', size: 'M', color: 'Blanco', stock: 15, min_stock: 10, max_stock: 35, sku: 'BAT-LAB-M' },
      { id: '30', product_id: '10', size: 'L', color: 'Blanco', stock: 20, min_stock: 12, max_stock: 40, sku: 'BAT-LAB-L' },
      { id: '31', product_id: '10', size: 'XL', color: 'Blanco', stock: 8, min_stock: 8, max_stock: 25, sku: 'BAT-LAB-XL' }
    ],
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-06-10T00:00:00Z'
  },
  {
    id: '11',
    name: 'Bata Desechable Polipropileno',
    category: 'batas',
    description: 'Bata desechable de polipropileno para protección básica',
    image: '/images/inventory/bata-desechable.webp',
    variants: [
      { id: '32', product_id: '11', stock: 85, min_stock: 50, max_stock: 150, sku: 'BAT-DES-STD' }
    ],
    created_at: '2024-01-11T00:00:00Z',
    updated_at: '2024-06-11T00:00:00Z'
  },
  // Regalos e Implementos
  {
    id: '12',
    name: 'Kit de Bienvenida ProSalud Completo',
    category: 'regalo',
    description: 'Kit de bienvenida con termo, agenda y artículos corporativos',
    image: '/images/inventory/kit-bienvenida.webp',
    variants: [
      { id: '33', product_id: '12', stock: 15, min_stock: 10, max_stock: 50, sku: 'REG-KIT-COMP' }
    ],
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-06-12T00:00:00Z'
  },
  {
    id: '13',
    name: 'Termo ProSalud Acero Inoxidable',
    category: 'regalo',
    description: 'Termo corporativo de acero inoxidable con logo ProSalud',
    image: '/images/inventory/termo-prosalud.webp',
    variants: [
      { id: '34', product_id: '13', stock: 35, min_stock: 20, max_stock: 80, sku: 'REG-TER-ACERO' }
    ],
    created_at: '2024-01-13T00:00:00Z',
    updated_at: '2024-06-13T00:00:00Z'
  },
  {
    id: '14',
    name: 'Agenda Corporativa 2024',
    category: 'regalo',
    description: 'Agenda ejecutiva con logo ProSalud para el año 2024',
    image: '/images/inventory/agenda-corporativa.webp',
    variants: [
      { id: '35', product_id: '14', stock: 28, min_stock: 15, max_stock: 60, sku: 'REG-AGE-2024' }
    ],
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-06-14T00:00:00Z'
  },
  {
    id: '15',
    name: 'USB Corporativo 32GB',
    category: 'regalo',
    description: 'Memoria USB corporativa de 32GB con logo ProSalud',
    image: '/images/inventory/usb-corporativo.webp',
    variants: [
      { id: '36', product_id: '15', stock: 3, min_stock: 10, max_stock: 40, sku: 'REG-USB-32GB' }
    ],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-06-15T00:00:00Z'
  },
  {
    id: '16',
    name: 'Guantes Desechables Nitrilo',
    category: 'implemento',
    description: 'Guantes desechables de nitrilo, caja x100 unidades',
    image: '/images/inventory/guantes.webp',
    variants: [
      { id: '37', product_id: '16', size: 'S', stock: 80, min_stock: 50, max_stock: 200, sku: 'GUA-NIT-S' },
      { id: '38', product_id: '16', size: 'M', stock: 120, min_stock: 80, max_stock: 300, sku: 'GUA-NIT-M' },
      { id: '39', product_id: '16', size: 'L', stock: 95, min_stock: 60, max_stock: 250, sku: 'GUA-NIT-L' },
      { id: '40', product_id: '16', size: 'XL', stock: 40, min_stock: 30, max_stock: 150, sku: 'GUA-NIT-XL' }
    ],
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-06-16T00:00:00Z'
  },
  {
    id: '17',
    name: 'Estetoscopio Profesional',
    category: 'implemento',
    description: 'Estetoscopio profesional para personal médico',
    image: '/images/inventory/estetoscopio.webp',
    variants: [
      { id: '41', product_id: '17', stock: 12, min_stock: 8, max_stock: 25, sku: 'IMP-EST-PROF' }
    ],
    created_at: '2024-01-17T00:00:00Z',
    updated_at: '2024-06-17T00:00:00Z'
  },
  {
    id: '18',
    name: 'Tensiómetro Digital',
    category: 'implemento',
    description: 'Tensiómetro digital automático para consultas',
    image: '/images/inventory/tensiometro.webp',
    variants: [
      { id: '42', product_id: '18', stock: 8, min_stock: 5, max_stock: 20, sku: 'IMP-TEN-DIG' }
    ],
    created_at: '2024-01-18T00:00:00Z',
    updated_at: '2024-06-18T00:00:00Z'
  },
  {
    id: '19',
    name: 'Termómetro Infrarrojo',
    category: 'implemento',
    description: 'Termómetro infrarrojo sin contacto',
    image: '/images/inventory/termometro.webp',
    variants: [
      { id: '43', product_id: '19', stock: 15, min_stock: 10, max_stock: 30, sku: 'IMP-TER-INF' }
    ],
    created_at: '2024-01-19T00:00:00Z',
    updated_at: '2024-06-19T00:00:00Z'
  },
  {
    id: '20',
    name: 'Camiseta ProSalud Algodón',
    category: 'regalo',
    description: 'Camiseta corporativa de algodón con logo ProSalud',
    image: '/images/inventory/camiseta-prosalud.webp',
    variants: [
      { id: '44', product_id: '20', size: 'S', stock: 18, min_stock: 10, max_stock: 40, sku: 'REG-CAM-S' },
      { id: '45', product_id: '20', size: 'M', stock: 22, min_stock: 15, max_stock: 50, sku: 'REG-CAM-M' },
      { id: '46', product_id: '20', size: 'L', stock: 20, min_stock: 12, max_stock: 45, sku: 'REG-CAM-L' },
      { id: '47', product_id: '20', size: 'XL', stock: 14, min_stock: 8, max_stock: 30, sku: 'REG-CAM-XL' }
    ],
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-06-20T00:00:00Z'
  }
];

// Hospitals Mock Data - Expandido
export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Hospital Marco Fidel Suárez',
    location: 'Bello, Antioquia',
    coordinator_name: 'María González Rodríguez',
    coordinator_email: 'maria.gonzalez@hmarcosfidel.gov.co',
    coordinator_phone: '+57 604 4619500',
    stock_allocation: []
  },
  {
    id: '2',
    name: 'Hospital San Juan de Dios',
    location: 'Rionegro, Antioquia',
    coordinator_name: 'Carlos Martínez Silva',
    coordinator_email: 'carlos.martinez@hsanjuan.gov.co',
    coordinator_phone: '+57 604 5620100',
    stock_allocation: []
  },
  {
    id: '3',
    name: 'Hospital La Merced',
    location: 'Ciudad Bolívar, Antioquia',
    coordinator_name: 'Ana López Herrera',
    coordinator_email: 'ana.lopez@hlamerced.gov.co',
    coordinator_phone: '+57 604 8590200',
    stock_allocation: []
  },
  {
    id: '4',
    name: 'Hospital Santa Elena',
    location: 'Fredonia, Antioquia',
    coordinator_name: 'Luis Rivera Castro',
    coordinator_email: 'luis.rivera@hsantaelena.gov.co',
    coordinator_phone: '+57 604 8673000',
    stock_allocation: []
  },
  {
    id: '5',
    name: 'Hospital Venancio Díaz Díaz',
    location: 'La Estrella, Antioquia',
    coordinator_name: 'Patricia Ruiz Morales',
    coordinator_email: 'patricia.ruiz@hvenancio.gov.co',
    coordinator_phone: '+57 604 2796000',
    stock_allocation: []
  },
  {
    id: '6',
    name: 'Promotora Médica y Odontológica',
    location: 'Medellín, Antioquia',
    coordinator_name: 'Roberto Silva Jiménez',
    coordinator_email: 'roberto.silva@promotora.com.co',
    coordinator_phone: '+57 604 3206500',
    stock_allocation: []
  },
  {
    id: '7',
    name: 'Sociedad Médica Rionegro SOMER',
    location: 'Rionegro, Antioquia',
    coordinator_name: 'Elena Castro Vega',
    coordinator_email: 'elena.castro@somer.com.co',
    coordinator_phone: '+57 604 5318800',
    stock_allocation: []
  }
];

// Supplier Deliveries Mock Data - Expandido significativamente
export const mockSupplierDeliveries: SupplierDelivery[] = [
  {
    id: '1',
    supplier_name: 'Textiles Médicos S.A.',
    delivery_date: '2024-06-15',
    items: [
      { id: '1', delivery_id: '1', product_id: '1', variant_id: '2', quantity: 50, unit_cost: 45000 },
      { id: '2', delivery_id: '1', product_id: '2', variant_id: '8', quantity: 30, unit_cost: 45000 }
    ],
    total_items: 80,
    status: 'completed',
    notes: 'Entrega completa y en buen estado',
    created_at: '2024-06-10T00:00:00Z'
  },
  {
    id: '2',
    supplier_name: 'Suministros ProSalud',
    delivery_date: '2024-06-20',
    items: [
      { id: '3', delivery_id: '2', product_id: '5', variant_id: '19', quantity: 1000, unit_cost: 2500 },
      { id: '4', delivery_id: '2', product_id: '6', variant_id: '20', quantity: 500, unit_cost: 800 }
    ],
    total_items: 1500,
    status: 'received',
    notes: 'Pendiente verificación de calidad',
    created_at: '2024-06-18T00:00:00Z'
  },
  {
    id: '3',
    supplier_name: 'Distribuciones Médicas Antioquia',
    delivery_date: '2024-06-25',
    items: [
      { id: '5', delivery_id: '3', product_id: '9', variant_id: '25', quantity: 25, unit_cost: 35000 },
      { id: '6', delivery_id: '3', product_id: '9', variant_id: '26', quantity: 30, unit_cost: 35000 }
    ],
    total_items: 55,
    status: 'pending',
    created_at: '2024-06-22T00:00:00Z'
  },
  {
    id: '4',
    supplier_name: 'Equipos y Dotaciones Hospitalarias',
    delivery_date: '2024-06-28',
    items: [
      { id: '7', delivery_id: '4', product_id: '16', variant_id: '37', quantity: 100, unit_cost: 15000 },
      { id: '8', delivery_id: '4', product_id: '16', variant_id: '38', quantity: 150, unit_cost: 15000 }
    ],
    total_items: 250,
    status: 'completed',
    notes: 'Entrega satisfactoria, productos verificados',
    created_at: '2024-06-25T00:00:00Z'
  },
  {
    id: '5',
    supplier_name: 'Protección Personal Colombia',
    delivery_date: '2024-07-02',
    items: [
      { id: '9', delivery_id: '5', product_id: '7', variant_id: '21', quantity: 200, unit_cost: 1800 },
      { id: '10', delivery_id: '5', product_id: '7', variant_id: '22', quantity: 150, unit_cost: 1800 },
      { id: '11', delivery_id: '5', product_id: '8', variant_id: '24', quantity: 300, unit_cost: 1200 }
    ],
    total_items: 650,
    status: 'received',
    notes: 'Entrega de tapabocas especializados',
    created_at: '2024-06-30T00:00:00Z'
  },
  {
    id: '6',
    supplier_name: 'Implementos Médicos del Oriente',
    delivery_date: '2024-07-05',
    items: [
      { id: '12', delivery_id: '6', product_id: '17', variant_id: '41', quantity: 15, unit_cost: 120000 },
      { id: '13', delivery_id: '6', product_id: '18', variant_id: '42', quantity: 10, unit_cost: 85000 },
      { id: '14', delivery_id: '6', product_id: '19', variant_id: '43', quantity: 20, unit_cost: 45000 }
    ],
    total_items: 45,
    status: 'pending',
    notes: 'Entrega de equipos médicos especializados',
    created_at: '2024-07-02T00:00:00Z'
  },
  {
    id: '7',
    supplier_name: 'Confecciones Hospitalarias Medellín',
    delivery_date: '2024-07-08',
    items: [
      { id: '15', delivery_id: '7', product_id: '3', variant_id: '12', quantity: 40, unit_cost: 48000 },
      { id: '16', delivery_id: '7', product_id: '3', variant_id: '13', quantity: 50, unit_cost: 48000 },
      { id: '17', delivery_id: '7', product_id: '4', variant_id: '16', quantity: 25, unit_cost: 50000 }
    ],
    total_items: 115,
    status: 'completed',
    notes: 'Uniformes especializados entregados correctamente',
    created_at: '2024-07-05T00:00:00Z'
  },
  {
    id: '8',
    supplier_name: 'Regalos Corporativos ProSalud',
    delivery_date: '2024-07-10',
    items: [
      { id: '18', delivery_id: '8', product_id: '12', variant_id: '33', quantity: 30, unit_cost: 25000 },
      { id: '19', delivery_id: '8', product_id: '13', variant_id: '34', quantity: 50, unit_cost: 18000 },
      { id: '20', delivery_id: '8', product_id: '14', variant_id: '35', quantity: 40, unit_cost: 12000 }
    ],
    total_items: 120,
    status: 'received',
    notes: 'Artículos promocionales para eventos',
    created_at: '2024-07-08T00:00:00Z'
  },
  {
    id: '9',
    supplier_name: 'Batas y Protección Médica',
    delivery_date: '2024-07-12',
    items: [
      { id: '21', delivery_id: '9', product_id: '10', variant_id: '29', quantity: 20, unit_cost: 42000 },
      { id: '22', delivery_id: '9', product_id: '10', variant_id: '30', quantity: 25, unit_cost: 42000 },
      { id: '23', delivery_id: '9', product_id: '11', variant_id: '32', quantity: 100, unit_cost: 3500 }
    ],
    total_items: 145,
    status: 'pending',
    notes: 'Batas especializadas para laboratorio',
    created_at: '2024-07-10T00:00:00Z'
  },
  {
    id: '10',
    supplier_name: 'Textiles y Uniformes Medellín',
    delivery_date: '2024-07-15',
    items: [
      { id: '24', delivery_id: '10', product_id: '20', variant_id: '44', quantity: 30, unit_cost: 15000 },
      { id: '25', delivery_id: '10', product_id: '20', variant_id: '45', quantity: 40, unit_cost: 15000 },
      { id: '26', delivery_id: '10', product_id: '20', variant_id: '46', quantity: 35, unit_cost: 15000 }
    ],
    total_items: 105,
    status: 'completed',
    notes: 'Camisetas corporativas para personal administrativo',
    created_at: '2024-07-12T00:00:00Z'
  }
];

// Inventory Requests Mock Data - Expandido significativamente
export const mockInventoryRequests: Request[] = [
  {
    id: '1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'María González Rodríguez',
    coordinator_email: 'maria.gonzalez@hmarcosfidel.gov.co',
    request_date: '2024-06-20',
    items: [
      { id: '1', request_id: '1', product_id: '1', variant_id: '3', quantity_requested: 20, quantity_approved: 18, justification: 'Reposición stock bajo' },
      { id: '2', request_id: '1', product_id: '5', variant_id: '19', quantity_requested: 100, quantity_approved: 100, justification: 'Aumento en demanda' }
    ],
    priority: 'high',
    status: 'delivered',
    notes: 'Entrega completada satisfactoriamente',
    approved_by: 'Admin ProSalud',
    approved_date: '2024-06-21',
    created_at: '2024-06-20T00:00:00Z'
  },
  {
    id: '2',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Carlos Martínez Silva',
    coordinator_email: 'carlos.martinez@hsanjuan.gov.co',
    request_date: '2024-06-22',
    items: [
      { id: '3', request_id: '2', product_id: '9', variant_id: '26', quantity_requested: 15, justification: 'Nueva área de consulta externa' },
      { id: '4', request_id: '2', product_id: '6', variant_id: '20', quantity_requested: 200, justification: 'Protocolo COVID actualizado' }
    ],
    priority: 'medium',
    status: 'approved',
    notes: 'Aprobado para entrega la próxima semana',
    approved_by: 'Admin ProSalud',
    approved_date: '2024-06-23',
    created_at: '2024-06-22T00:00:00Z'
  },
  {
    id: '3',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Ana López Herrera',
    coordinator_email: 'ana.lopez@hlamerced.gov.co',
    request_date: '2024-06-24',
    items: [
      { id: '5', request_id: '3', product_id: '6', variant_id: '20', quantity_requested: 10, justification: 'Programa de incentivos personal' },
      { id: '6', request_id: '3', product_id: '7', variant_id: '15', quantity_requested: 50, justification: 'Renovación stock mensual' }
    ],
    priority: 'low',
    status: 'pending',
    created_at: '2024-06-24T00:00:00Z'
  },
  {
    id: '4',
    hospital_name: 'Hospital Santa Elena',
    coordinator_name: 'Luis Rivera Castro',
    coordinator_email: 'luis.rivera@hsantaelena.gov.co',
    request_date: '2024-06-25',
    items: [
      { id: '7', request_id: '4', product_id: '2', variant_id: '6', quantity_requested: 25, justification: 'Ampliación quirófanos' }
    ],
    priority: 'urgent',
    status: 'preparing',
    notes: 'Preparando para envío urgente',
    approved_by: 'Admin ProSalud',
    approved_date: '2024-06-25',
    created_at: '2024-06-25T00:00:00Z'
  },
  {
    id: '15',
    hospital_name: 'Hospital Venancio Díaz Díaz',
    coordinator_name: 'Patricia Ruiz Morales',
    coordinator_email: 'patricia.ruiz@hvenancio.gov.co',
    request_date: '2024-07-08',
    items: [
      { id: '45', request_id: '15', product_id: '17', variant_id: '41', quantity_requested: 5, justification: 'Renovación equipos consulta externa' },
      { id: '46', request_id: '15', product_id: '19', variant_id: '43', quantity_requested: 8, justification: 'Control temperatura pacientes' }
    ],
    priority: 'low',
    status: 'pending',
    created_at: '2024-07-08T00:00:00Z'
  }
];

// Returns Mock Data - Expandido significativamente
export const mockReturns: Return[] = [
  {
    id: '1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'María González Rodríguez',
    return_date: '2024-06-19',
    items: [
      { id: '1', return_id: '1', product_id: '1', variant_id: '2', quantity: 5, condition: 'new' }
    ],
    reason: 'incorrect',
    status: 'processed',
    notes: 'Talla incorrecta - productos reingresados al inventario',
    created_at: '2024-06-19T00:00:00Z'
  },
  {
    id: '2',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Carlos Martínez Silva',
    return_date: '2024-06-21',
    items: [
      { id: '2', return_id: '2', product_id: '9', variant_id: '27', quantity: 3, condition: 'damaged' }
    ],
    reason: 'defective',
    status: 'processed',
    notes: 'Productos defectuosos - recolección completada',
    created_at: '2024-06-21T00:00:00Z'
  },
  {
    id: '3',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Ana López Herrera',
    return_date: '2024-06-23',
    items: [
      { id: '3', return_id: '3', product_id: '6', variant_id: '20', quantity: 50, condition: 'new' }
    ],
    reason: 'excess',
    status: 'pending',
    notes: 'Exceso de stock - solicitud de devolución',
    created_at: '2024-06-23T00:00:00Z'
  },
  {
    id: '12',
    hospital_name: 'Sociedad Médica Rionegro SOMER',
    coordinator_name: 'Elena Castro Vega',
    return_date: '2024-07-10',
    items: [
      { id: '24', return_id: '12', product_id: '15', variant_id: '36', quantity: 2, condition: 'damaged' }
    ],
    reason: 'defective',
    status: 'pending',
    notes: 'USB defectuosos - pendiente recolección',
    created_at: '2024-07-10T00:00:00Z'
  }
];

// Solicitudes de Trámites Mock Data - Expandido a 60+ solicitudes
export const mockSolicitudesRequests: SolicitudRequest[] = [
  {
    id: 'req-001',
    request_type: 'certificado-convenio',
    id_type: 'CC',
    id_number: '123456789',
    name: 'María',
    last_name: 'González Rodríguez',
    email: 'maria.gonzalez@hospital.com',
    phone_number: '3001234567',
    payload: {
      convenio: 'Hospital Marco Fidel Suárez',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-12-31',
      motivoSolicitud: 'Renovación de convenio anual'
    },
    status: 'resolved',
    created_at: '2024-12-10T03:30:00.000Z',
    processed_at: '2024-12-10T08:00:00.000Z',
    resolved_at: '2024-12-10T09:20:00.000Z'
  },
  {
    id: 'req-002',
    request_type: 'compensacion-anual',
    id_type: 'CC',
    id_number: '987654321',
    name: 'Carlos',
    last_name: 'Martínez Silva',
    email: 'carlos.martinez@clinica.com',
    phone_number: '3007654321',
    payload: {
      año: '2024',
      monto: 2500000,
      concepto: 'Vacaciones no disfrutadas',
      cuentaBancaria: '****7890',
      banco: 'Bancolombia'
    },
    status: 'in_progress',
    created_at: '2024-12-15T04:45:00.000Z',
    processed_at: '2024-12-15T10:00:00.000Z'
  },
  {
    id: 'req-003',
    request_type: 'verificacion-pagos',
    id_type: 'CC',
    id_number: '112233445',
    name: 'Ana',
    last_name: 'López Herrera',
    email: 'ana.lopez@enfermeria.com',
    phone_number: '3009876543',
    payload: {
      periodo: 'Noviembre 2024',
      concepto: 'Horas extras',
      valor: 850000,
      fechaPago: '2024-11-30'
    },
    status: 'pending',
    created_at: '2024-12-16T11:20:00.000Z'
  },
  {
    id: 'req-004',
    request_type: 'descanso-laboral',
    id_type: 'CC',
    id_number: '556677889',
    name: 'Roberto',
    last_name: 'Jiménez Castro',
    email: 'roberto.jimenez@urgencias.com',
    phone_number: '3005556677',
    payload: {
      fechaInicio: '2024-12-20',
      fechaFin: '2024-12-27',
      motivo: 'Descanso médico',
      tipoDescanso: 'Médico',
      documentoSoporte: 'incapacidad_medica.pdf'
    },
    status: 'pending',
    created_at: '2024-12-17T06:15:00.000Z'
  },
  {
    id: 'req-005',
    request_type: 'actualizar-cuenta',
    id_type: 'CC',
    id_number: '778899001',
    name: 'Elena',
    last_name: 'Ramírez Vega',
    email: 'elena.ramirez@laboratorio.com',
    phone_number: '3008889900',
    payload: {
      banco: 'Bancolombia',
      tipoCuenta: 'Ahorros',
      numeroCuenta: '****7890',
      certificacionBancaria: 'certificacion_bancaria.pdf'
    },
    status: 'resolved',
    created_at: '2024-12-12T09:30:00.000Z',
    processed_at: '2024-12-12T11:00:00.000Z',
    resolved_at: '2024-12-12T14:15:00.000Z'
  },
  {
    id: 'req-006',
    request_type: 'retiro-sindical',
    id_type: 'CC',
    id_number: '102345679',
    name: 'Alejandro',
    last_name: 'Torres Mendoza',
    email: 'alejandro.torres@radiologia.com',
    phone_number: '3001023456',
    payload: {
      fechaRetiro: '2024-12-31',
      motivo: 'Pensión por vejez',
      documentos: ['carta_retiro.pdf', 'cedula.pdf'],
      observaciones: 'Retiro voluntario por pensión'
    },
    status: 'in_progress',
    created_at: '2024-12-14T08:45:00.000Z',
    processed_at: '2024-12-14T14:00:00.000Z'
  },
  {
    id: 'req-007',
    request_type: 'microcredito',
    id_type: 'CC',
    id_number: '334556677',
    name: 'Patricia',
    last_name: 'Sánchez Morales',
    email: 'patricia.sanchez@farmacia.com',
    phone_number: '3003345566',
    payload: {
      monto: 5000000,
      plazo: '36 meses',
      destino: 'Mejoras en vivienda',
      ingresos: 3500000,
      documentos: ['cedula.pdf', 'certificado_ingresos.pdf', 'cotizacion_obras.pdf']
    },
    status: 'pending',
    created_at: '2024-12-16T05:00:00.000Z'
  },
  {
    id: 'req-008',
    request_type: 'incapacidad-maternidad',
    id_type: 'CC',
    id_number: '445566778',
    name: 'Sofía',
    last_name: 'Vargas Pineda',
    email: 'sofia.vargas@pediatria.com',
    phone_number: '3004455667',
    payload: {
      fechaInicio: '2024-11-01',
      fechaFin: '2025-02-28',
      tipoIncapacidad: 'Maternidad',
      eps: 'Sura EPS',
      documentoMedico: 'incapacidad_maternidad.pdf'
    },
    status: 'resolved',
    created_at: '2024-10-25T07:30:00.000Z',
    processed_at: '2024-10-26T09:00:00.000Z',
    resolved_at: '2024-10-28T10:15:00.000Z'
  },
  {
    id: 'req-009',
    request_type: 'permisos-turnos',
    id_type: 'CC',
    id_number: '667788990',
    name: 'Diego',
    last_name: 'Morales Castillo',
    email: 'diego.morales@urgencias.com',
    phone_number: '3006677889',
    payload: {
      fechaSolicitud: '2024-12-20',
      tipoPermiso: 'Cambio de turno',
      turnoActual: 'Nocturno',
      turnoSolicitado: 'Diurno',
      justificacion: 'Estudios universitarios',
      fechaEfectiva: '2025-01-15'
    },
    status: 'in_progress',
    created_at: '2024-12-18T16:20:00.000Z',
    processed_at: '2024-12-19T08:30:00.000Z'
  },
  {
    id: 'req-010',
    request_type: 'certificado-convenio',
    id_type: 'CE',
    id_number: '998877665',
    name: 'Valentina',
    last_name: 'Restrepo Gómez',
    email: 'valentina.restrepo@cirugia.com',
    phone_number: '3009988776',
    payload: {
      convenio: 'Hospital La Merced',
      fechaInicio: '2024-06-01',
      fechaFin: '2025-05-31',
      motivoSolicitud: 'Certificación para entidad externa'
    },
    status: 'pending',
    created_at: '2024-12-19T12:45:00.000Z'
  },
  {
    id: 'req-011',
    request_type: 'verificacion-pagos',
    id_type: 'CC',
    id_number: '223344556',
    name: 'Fernando',
    last_name: 'Gómez Hurtado',
    email: 'fernando.gomez@hospital.com',
    phone_number: '3002233445',
    payload: {
      periodo: 'Octubre 2024',
      concepto: 'Bonificaciones',
      valor: 450000,
      fechaPago: '2024-10-31'
    },
    status: 'resolved',
    created_at: '2024-11-05T14:25:00.000Z',
    processed_at: '2024-11-06T09:15:00.000Z',
    resolved_at: '2024-11-08T16:30:00.000Z'
  },
  {
    id: 'req-012',
    request_type: 'descanso-laboral',
    id_type: 'CC',
    id_number: '889900123',
    name: 'Isabella',
    last_name: 'Torres Mendoza',
    email: 'isabella.torres@enfermeria.com',
    phone_number: '3008899001',
    payload: {
      fechaInicio: '2024-12-23',
      fechaFin: '2024-12-30',
      motivo: 'Vacaciones familiares',
      tipoDescanso: 'Vacacional',
      documentoSoporte: 'solicitud_vacaciones.pdf'
    },
    status: 'in_progress',
    created_at: '2024-12-18T11:40:00.000Z',
    processed_at: '2024-12-19T13:20:00.000Z'
  },
  {
    id: 'req-013',
    request_type: 'microcredito',
    id_type: 'CC',
    id_number: '345678901',
    name: 'Sebastián',
    last_name: 'Rojas Medina',
    email: 'sebastian.rojas@laboratorio.com',
    phone_number: '3003456789',
    payload: {
      monto: 3000000,
      plazo: '24 meses',
      destino: 'Educación superior',
      ingresos: 2800000,
      documentos: ['cedula.pdf', 'certificado_ingresos.pdf', 'matricula_universidad.pdf']
    },
    status: 'pending',
    created_at: '2024-12-17T09:30:00.000Z'
  },
  {
    id: 'req-014',
    request_type: 'actualizar-cuenta',
    id_type: 'CC',
    id_number: '456789012',
    name: 'Camila',
    last_name: 'Hernández Arias',
    email: 'camila.hernandez@urgencias.com',
    phone_number: '3004567890',
    payload: {
      banco: 'Banco de Bogotá',
      tipoCuenta: 'Ahorros',
      numeroCuenta: '****4567',
      certificacionBancaria: 'cert_banco_bogota.pdf'
    },
    status: 'resolved',
    created_at: '2024-12-11T16:45:00.000Z',
    processed_at: '2024-12-12T08:30:00.000Z',
    resolved_at: '2024-12-13T10:15:00.000Z'
  },
  {
    id: 'req-015',
    request_type: 'compensacion-anual',
    id_type: 'CC',
    id_number: '567890123',
    name: 'Alejandro',
    last_name: 'Cardona Mejía',
    email: 'alejandro.cardona@radiologia.com',
    phone_number: '3005678901',
    payload: {
      año: '2024',
      monto: 1800000,
      concepto: 'Prima de navidad',
      cuentaBancaria: '****2345',
      banco: 'Banco Popular'
    },
    status: 'in_progress',
    created_at: '2024-12-16T07:20:00.000Z',
    processed_at: '2024-12-17T14:10:00.000Z'
  },
  {
    id: 'req-016',
    request_type: 'incapacidad-maternidad',
    id_type: 'CC',
    id_number: '678901234',
    name: 'Natalia',
    last_name: 'Osorio Valencia',
    email: 'natalia.osorio@pediatria.com',
    phone_number: '3006789012',
    payload: {
      fechaInicio: '2024-12-01',
      fechaFin: '2025-03-28',
      tipoIncapacidad: 'Maternidad',
      eps: 'Coomeva EPS',
      documentoMedico: 'incapacidad_coomeva.pdf'
    },
    status: 'pending',
    created_at: '2024-11-28T13:15:00.000Z'
  },
  {
    id: 'req-017',
    request_type: 'permisos-turnos',
    id_type: 'CC',
    id_number: '789012345',
    name: 'Mateo',
    last_name: 'Quintero Franco',
    email: 'mateo.quintero@cirugia.com',
    phone_number: '3007890123',
    payload: {
      fechaSolicitud: '2025-01-02',
      tipoPermiso: 'Permiso por calamidad',
      turnoActual: 'Diurno',
      turnoSolicitado: 'Libre',
      justificacion: 'Emergencia familiar',
      fechaEfectiva: '2025-01-05'
    },
    status: 'pending',
    created_at: '2024-12-19T18:25:00.000Z'
  },
  {
    id: 'req-018',
    request_type: 'retiro-sindical',
    id_type: 'CC',
    id_number: '890123456',
    name: 'Gabriela',
    last_name: 'Bedoya Correa',
    email: 'gabriela.bedoya@farmacia.com',
    phone_number: '3008901234',
    payload: {
      fechaRetiro: '2025-03-31',
      motivo: 'Cambio de trabajo',
      documentos: ['carta_retiro_voluntario.pdf', 'cedula.pdf'],
      observaciones: 'Retiro por nueva oportunidad laboral'
    },
    status: 'in_progress',
    created_at: '2024-12-15T12:30:00.000Z',
    processed_at: '2024-12-16T09:45:00.000Z'
  },
  {
    id: 'req-019',
    request_type: 'certificado-convenio',
    id_type: 'CC',
    id_number: '901234567',
    name: 'Nicolás',
    last_name: 'Agudelo Zapata',
    email: 'nicolas.agudelo@hospital.com',
    phone_number: '3009012345',
    payload: {
      convenio: 'Hospital Venancio Díaz',
      fechaInicio: '2024-03-01',
      fechaFin: '2025-02-28',
      motivoSolicitud: 'Certificación académica'
    },
    status: 'resolved',
    created_at: '2024-12-08T10:15:00.000Z',
    processed_at: '2024-12-09T15:30:00.000Z',
    resolved_at: '2024-12-10T11:45:00.000Z'
  },
  {
    id: 'req-020',
    request_type: 'verificacion-pagos',
    id_type: 'CC',
    id_number: '012345678',
    name: 'Juliana',
    last_name: 'Montoya Giraldo',
    email: 'juliana.montoya@urgencias.com',
    phone_number: '3000123456',
    payload: {
      periodo: 'Septiembre 2024',
      concepto: 'Turnos nocturnos',
      valor: 720000,
      fechaPago: '2024-09-30'
    },
    status: 'pending',
    created_at: '2024-12-18T08:50:00.000Z'
  },
  {
    id: 'req-021',
    request_type: 'descanso-laboral',
    id_type: 'CC',
    id_number: '123456780',
    name: 'Santiago',
    last_name: 'Ochoa Peña',
    email: 'santiago.ochoa@laboratorio.com',
    phone_number: '3001234567',
    payload: {
      fechaInicio: '2025-01-15',
      fechaFin: '2025-01-22',
      motivo: 'Incapacidad médica',
      tipoDescanso: 'Médico',
      documentoSoporte: 'incapacidad_eps.pdf'
    },
    status: 'in_progress',
    created_at: '2024-12-19T14:30:00.000Z',
    processed_at: '2024-12-20T10:15:00.000Z'
  },
  {
    id: 'req-022',
    request_type: 'microcredito',
    id_type: 'CE',
    id_number: '234567891',
    name: 'Mariana',
    last_name: 'Betancur Salazar',
    email: 'mariana.betancur@enfermeria.com',
    phone_number: '3002345678',
    payload: {
      monto: 4500000,
      plazo: '30 meses',
      destino: 'Negocio familiar',
      ingresos: 3200000,
      documentos: ['cedula_extranjeria.pdf', 'certificado_ingresos.pdf', 'plan_negocio.pdf']
    },
    status: 'resolved',
    created_at: '2024-11-15T11:20:00.000Z',
    processed_at: '2024-11-18T14:30:00.000Z',
    resolved_at: '2024-11-25T09:45:00.000Z'
  },
  {
    id: 'req-023',
    request_type: 'actualizar-cuenta',
    id_type: 'CC',
    id_number: '345678902',
    name: 'Emilio',
    last_name: 'Cárdenas Upegui',
    email: 'emilio.cardenas@radiologia.com',
    phone_number: '3003456789',
    payload: {
      banco: 'Banco Caja Social',
      tipoCuenta: 'Corriente',
      numeroCuenta: '****8901',
      certificacionBancaria: 'cert_caja_social.pdf'
    },
    status: 'pending',
    created_at: '2024-12-19T16:40:00.000Z'
  },
  {
    id: 'req-024',
    request_type: 'compensacion-anual',
    id_type: 'CC',
    id_number: '456789013',
    name: 'Esperanza',
    last_name: 'Montoya Giraldo',
    email: 'esperanza.montoya@pediatria.com',
    phone_number: '3004567890',
    payload: {
      año: '2024',
      monto: 3200000,
      concepto: 'Compensación por horas extras',
      cuentaBancaria: '****5432',
      banco: 'Davivienda'
    },
    status: 'in_progress',
    created_at: '2024-12-14T13:25:00.000Z',
    processed_at: '2024-12-15T11:40:00.000Z'
  },
  {
    id: 'req-025',
    request_type: 'incapacidad-maternidad',
    id_type: 'CC',
    id_number: '567890124',
    name: 'Carolina',
    last_name: 'Mejía Vásquez',
    email: 'carolina.mejia@cirugia.com',
    phone_number: '3005678901',
    payload: {
      fechaInicio: '2025-02-01',
      fechaFin: '2025-05-28',
      tipoIncapacidad: 'Maternidad',
      eps: 'Nueva EPS',
      documentoMedico: 'incapacidad_nueva_eps.pdf'
    },
    status: 'pending',
    created_at: '2024-12-18T09:35:00.000Z'
  },
  {
    id: 'req-026',
    request_type: 'permisos-turnos',
    id_type: 'CC',
    id_number: '678901235',
    name: 'Andrés',
    last_name: 'Suárez Herrera',
    email: 'andres.suarez@urgencias.com',
    phone_number: '3006789012',
    payload: {
      fechaSolicitud: '2025-01-10',
      tipoPermiso: 'Cambio de horario',
      turnoActual: '6am-2pm',
      turnoSolicitado: '2pm-10pm',
      justificacion: 'Cuidado de familiar enfermo',
      fechaEfectiva: '2025-01-20'
    },
    status: 'resolved',
    created_at: '2024-12-12T15:50:00.000Z',
    processed_at: '2024-12-13T10:25:00.000Z',
    resolved_at: '2024-12-14T14:15:00.000Z'
  },
  {
    id: 'req-027',
    request_type: 'retiro-sindical',
    id_type: 'CC',
    id_number: '789012346',
    name: 'Lucía',
    last_name: 'Ramírez Castaño',
    email: 'lucia.ramirez@farmacia.com',
    phone_number: '3007890123',
    payload: {
      fechaRetiro: '2025-06-30',
      motivo: 'Jubilación anticipada',
      documentos: ['solicitud_jubilacion.pdf', 'cedula.pdf', 'cesantias.pdf'],
      observaciones: 'Retiro por cumplimiento de tiempo de servicio'
    },
    status: 'in_progress',
    created_at: '2024-12-10T12:15:00.000Z',
    processed_at: '2024-12-11T16:30:00.000Z'
  },
  {
    id: 'req-028',
    request_type: 'certificado-convenio',
    id_type: 'CC',
    id_number: '890123457',
    name: 'Ricardo',
    last_name: 'Palacio Giraldo',
    email: 'ricardo.palacio@hospital.com',
    phone_number: '3008901234',
    payload: {
      convenio: 'Hospital Santa Elena',
      fechaInicio: '2024-08-01',
      fechaFin: '2025-07-31',
      motivoSolicitud: 'Trámite visa de trabajo'
    },
    status: 'pending',
    created_at: '2024-12-19T11:25:00.000Z'
  },
  {
    id: 'req-029',
    request_type: 'verificacion-pagos',
    id_type: 'CC',
    id_number: '901234568',
    name: 'Paola',
    last_name: 'Jiménez Torres',
    email: 'paola.jimenez@laboratorio.com',
    phone_number: '3009012345',
    payload: {
      periodo: 'Agosto 2024',
      concepto: 'Dominicales y festivos',
      valor: 980000,
      fechaPago: '2024-08-31'
    },
    status: 'resolved',
    created_at: '2024-09-15T10:40:00.000Z',
    processed_at: '2024-09-16T13:20:00.000Z',
    resolved_at: '2024-09-18T11:30:00.000Z'
  },
  {
    id: 'req-030',
    request_type: 'descanso-laboral',
    id_type: 'TI',
    id_number: '012345679',
    name: 'Tomás',
    last_name: 'Vargas Sánchez',
    email: 'tomas.vargas@enfermeria.com',
    phone_number: '3000123456',
    payload: {
      fechaInicio: '2025-02-14',
      fechaFin: '2025-02-16',
      motivo: 'Asuntos personales',
      tipoDescanso: 'Personal',
      documentoSoporte: 'solicitud_personal.pdf'
    },
    status: 'pending',
    created_at: '2024-12-19T17:20:00.000Z'
  }
];
