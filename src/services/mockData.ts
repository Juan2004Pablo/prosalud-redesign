import { Product, InventoryRequest } from './types/mockTypes';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Uniforme Azul - Talla S',
    category: 'uniforme',
    description: 'Uniforme médico de alta calidad',
    variants: [
      {
        id: 'var-1',
        size: 'S',
        color: 'Azul',
        stock: 15,
        min_stock: 10,
        max_stock: 30,
        sku: 'UA-S-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-2',
    name: 'Uniforme Azul - Talla M',
    category: 'uniforme',
    description: 'Uniforme médico de alta calidad',
    variants: [
      {
        id: 'var-2',
        size: 'M',
        color: 'Azul',
        stock: 8,
        min_stock: 10,
        max_stock: 30,
        sku: 'UA-M-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-3',
    name: 'Uniforme Verde - Talla S',
    category: 'uniforme',
    description: 'Uniforme médico de alta calidad',
    variants: [
      {
        id: 'var-3',
        size: 'S',
        color: 'Verde',
        stock: 3,
        min_stock: 5,
        max_stock: 30,
        sku: 'UV-S-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-4',
    name: 'Tapabocas Quirúrgico',
    category: 'tapabocas',
    description: 'Tapabocas desechable de alta filtración',
    variants: [
      {
        id: 'var-4',
        size: 'Única',
        color: 'Blanco',
        stock: 1200,
        min_stock: 500,
        max_stock: 2000,
        sku: 'TQ-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-5',
    name: 'Bata Blanca - Talla M',
    category: 'batas',
    description: 'Bata médica de alta calidad',
    variants: [
      {
        id: 'var-5',
        size: 'M',
        color: 'Blanco',
        stock: 18,
        min_stock: 12,
        max_stock: 30,
        sku: 'BW-M-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-6',
    name: 'Guantes Nitrilo - Talla M',
    category: 'implemento',
    description: 'Guantes desechables de nitrilo',
    variants: [
      {
        id: 'var-6',
        size: 'M',
        color: 'Azul',
        stock: 120,
        min_stock: 80,
        max_stock: 200,
        sku: 'GN-M-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-7',
    name: 'Termómetro Digital',
    category: 'implemento',
    description: 'Termómetro digital para mediciones precisas',
    variants: [
      {
        id: 'var-7',
        size: 'Única',
        color: 'Blanco',
        stock: 50,
        min_stock: 20,
        max_stock: 100,
        sku: 'TD-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-8',
    name: 'Alcohol Antiséptico 500ml',
    category: 'implemento',
    description: 'Alcohol antiséptico para desinfección',
    variants: [
      {
        id: 'var-8',
        size: '500ml',
        color: 'Transparente',
        stock: 180,
        min_stock: 100,
        max_stock: 300,
        sku: 'AA-500-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-9',
    name: 'Gel Antibacterial 250ml',
    category: 'implemento',
    description: 'Gel antibacterial para manos',
    variants: [
      {
        id: 'var-9',
        size: '250ml',
        color: 'Transparente',
        stock: 240,
        min_stock: 150,
        max_stock: 400,
        sku: 'GA-250-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-10',
    name: 'Kit de Bienvenida',
    category: 'regalo',
    description: 'Kit de bienvenida para nuevos empleados',
    variants: [
      {
        id: 'var-10',
        size: 'Estándar',
        color: 'Multicolor',
        stock: 15,
        min_stock: 10,
        max_stock: 30,
        sku: 'KB-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-11',
    name: 'Termo ProSalud',
    category: 'regalo',
    description: 'Termo de acero inoxidable',
    variants: [
      {
        id: 'var-11',
        size: '500ml',
        color: 'Negro',
        stock: 35,
        min_stock: 20,
        max_stock: 50,
        sku: 'TP-500-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-12',
    name: 'Agenda Corporativa',
    category: 'regalo',
    description: 'Agenda para planificación',
    variants: [
      {
        id: 'var-12',
        size: 'A5',
        color: 'Negro',
        stock: 28,
        min_stock: 15,
        max_stock: 50,
        sku: 'AC-A5-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-13',
    name: 'USB Corporativo',
    category: 'regalo',
    description: 'USB de 16GB con logo',
    variants: [
      {
        id: 'var-13',
        size: '16GB',
        color: 'Negro',
        stock: 3,
        min_stock: 10,
        max_stock: 20,
        sku: 'USB-16-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-14',
    name: 'Camiseta ProSalud - Talla M',
    category: 'regalo',
    description: 'Camiseta de algodón con logo',
    variants: [
      {
        id: 'var-14',
        size: 'M',
        color: 'Blanco',
        stock: 22,
        min_stock: 15,
        max_stock: 50,
        sku: 'CP-M-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-15',
    name: 'Camiseta ProSalud - Talla L',
    category: 'regalo',
    description: 'Camiseta de algodón con logo',
    variants: [
      {
        id: 'var-15',
        size: 'L',
        color: 'Blanco',
        stock: 20,
        min_stock: 12,
        max_stock: 50,
        sku: 'CP-L-001'
      }
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 'prod-16',
    name: 'Uniforme Quirúrgico Premium',
    category: 'uniforme',
    description: 'Uniforme quirúrgico de alta calidad con tecnología antimicrobiana',
    variants: [
      {
        id: 'var-40',
        size: 'XS',
        color: 'Verde Hospital',
        stock: 12,
        min_stock: 8,
        max_stock: 30,
        sku: 'UQ-GH-XS-001'
      },
      {
        id: 'var-41',
        size: 'S',
        color: 'Verde Hospital',
        stock: 25,
        min_stock: 15,
        max_stock: 50,
        sku: 'UQ-GH-S-001'
      },
      {
        id: 'var-42',
        size: 'M',
        color: 'Verde Hospital',
        stock: 18,
        min_stock: 12,
        max_stock: 45,
        sku: 'UQ-GH-M-001'
      }
    ],
    createdAt: '2024-07-15'
  },
  {
    id: 'prod-17',
    name: 'Mascarilla FFP2',
    category: 'tapabocas',
    description: 'Mascarilla de protección respiratoria FFP2 certificada',
    variants: [
      {
        id: 'var-43',
        size: 'Única',
        color: 'Blanco',
        stock: 450,
        min_stock: 200,
        max_stock: 800,
        sku: 'FFP2-BL-U-001'
      },
      {
        id: 'var-44',
        size: 'Única',
        color: 'Azul',
        stock: 320,
        min_stock: 150,
        max_stock: 600,
        sku: 'FFP2-AZ-U-001'
      }
    ],
    createdAt: '2024-08-01'
  },
  {
    id: 'prod-18',
    name: 'Bata Quirúrgica Estéril',
    category: 'batas',
    description: 'Bata quirúrgica desechable estéril para procedimientos',
    variants: [
      {
        id: 'var-45',
        size: 'M',
        color: 'Azul Cielo',
        stock: 85,
        min_stock: 50,
        max_stock: 150,
        sku: 'BQE-AC-M-001'
      },
      {
        id: 'var-46',
        size: 'L',
        color: 'Azul Cielo',
        stock: 92,
        min_stock: 60,
        max_stock: 180,
        sku: 'BQE-AC-L-001'
      },
      {
        id: 'var-47',
        size: 'XL',
        color: 'Azul Cielo',
        stock: 45,
        min_stock: 30,
        max_stock: 100,
        sku: 'BQE-AC-XL-001'
      }
    ],
    createdAt: '2024-08-05'
  },
  {
    id: 'prod-19',
    name: 'Kit Médico de Emergencia',
    category: 'regalo',
    description: 'Kit completo de emergencia para personal médico',
    variants: [
      {
        id: 'var-48',
        size: 'Estándar',
        color: 'Rojo',
        stock: 28,
        min_stock: 15,
        max_stock: 60,
        sku: 'KME-RJ-E-001'
      }
    ],
    createdAt: '2024-08-10'
  },
  {
    id: 'prod-20',
    name: 'Oxímetro de Pulso Digital',
    category: 'implemento',
    description: 'Oxímetro digital para medición de saturación de oxígeno',
    variants: [
      {
        id: 'var-49',
        size: 'Portátil',
        color: 'Blanco',
        stock: 15,
        min_stock: 10,
        max_stock: 35,
        sku: 'OPD-BL-P-001'
      },
      {
        id: 'var-50',
        size: 'Portátil',
        color: 'Azul',
        stock: 12,
        min_stock: 8,
        max_stock: 30,
        sku: 'OPD-AZ-P-001'
      }
    ],
    createdAt: '2024-08-12'
  },
  {
    id: 'prod-21',
    name: 'Gafas de Protección Anti-vaho',
    category: 'implemento',
    description: 'Gafas de protección con tecnología anti-vaho',
    variants: [
      {
        id: 'var-51',
        size: 'Ajustable',
        color: 'Transparente',
        stock: 75,
        min_stock: 40,
        max_stock: 120,
        sku: 'GPA-TR-A-001'
      }
    ],
    createdAt: '2024-08-15'
  },
  {
    id: 'prod-22',
    name: 'Uniforme Pediátrico',
    category: 'uniforme',
    description: 'Uniforme especializado para área pediátrica con diseños amigables',
    variants: [
      {
        id: 'var-52',
        size: 'S',
        color: 'Rosa Pastel',
        stock: 22,
        min_stock: 12,
        max_stock: 40,
        sku: 'UP-RP-S-001'
      },
      {
        id: 'var-53',
        size: 'M',
        color: 'Rosa Pastel',
        stock: 18,
        min_stock: 10,
        max_stock: 35,
        sku: 'UP-RP-M-001'
      },
      {
        id: 'var-54',
        size: 'L',
        color: 'Celeste',
        stock: 16,
        min_stock: 8,
        max_stock: 30,
        sku: 'UP-CE-L-001'
      }
    ],
    createdAt: '2024-08-18'
  },
  {
    id: 'prod-23',
    name: 'Tapabocas Infantil Decorado',
    category: 'tapabocas',
    description: 'Tapabocas especial para niños con diseños coloridos',
    variants: [
      {
        id: 'var-55',
        size: 'Infantil',
        color: 'Multicolor',
        stock: 180,
        min_stock: 100,
        max_stock: 300,
        sku: 'TID-MC-I-001'
      }
    ],
    createdAt: '2024-08-20'
  },
  {
    id: 'prod-24',
    name: 'Delantal de Radiología',
    category: 'batas',
    description: 'Delantal plomado para protección radiológica',
    variants: [
      {
        id: 'var-56',
        size: 'M',
        color: 'Plomo',
        stock: 8,
        min_stock: 5,
        max_stock: 20,
        sku: 'DR-PL-M-001'
      },
      {
        id: 'var-57',
        size: 'L',
        color: 'Plomo',
        stock: 6,
        min_stock: 4,
        max_stock: 15,
        sku: 'DR-PL-L-001'
      }
    ],
    createdAt: '2024-08-22'
  },
  {
    id: 'prod-25',
    name: 'Mochila Sanitaria',
    category: 'regalo',
    description: 'Mochila especializada para transporte de material sanitario',
    variants: [
      {
        id: 'var-58',
        size: 'Grande',
        color: 'Verde Militar',
        stock: 35,
        min_stock: 20,
        max_stock: 70,
        sku: 'MS-VM-G-001'
      },
      {
        id: 'var-59',
        size: 'Mediana',
        color: 'Azul Marino',
        stock: 42,
        min_stock: 25,
        max_stock: 80,
        sku: 'MS-AM-M-001'
      }
    ],
    createdAt: '2024-08-25'
  }
];

export const mockInventoryRequests: InventoryRequest[] = [
  {
    id: 'req-1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'Dr. Patricia Morales',
    request_date: '2024-10-01',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        product_id: 'prod-1',
        variant_id: 'var-1',
        quantity: 15,
        requested_quantity: 15
      }
    ],
    notes: 'Solicitud urgente para área de cirugía'
  },
  {
    id: 'req-2',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Enf. Miguel Ángel Torres',
    request_date: '2024-10-02',
    status: 'approved',
    priority: 'medium',
    items: [
      {
        product_id: 'prod-2',
        variant_id: 'var-2',
        quantity: 25,
        requested_quantity: 25
      }
    ],
    notes: 'Para renovación de equipos UCI'
  },
  {
    id: 'req-3',
    hospital_name: 'Promotora Médica y Odontológica',
    coordinator_name: 'Dra. Isabella Ramírez',
    request_date: '2024-10-03',
    status: 'shipped',
    priority: 'low',
    items: [
      {
        product_id: 'prod-3',
        variant_id: 'var-3',
        quantity: 20,
        requested_quantity: 20
      }
    ],
    notes: 'Equipamiento para nueva área pediátrica'
  },
  {
    id: 'req-4',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Dr. Fernando Castillo',
    request_date: '2024-10-04',
    status: 'pending',
    priority: 'urgent',
    items: [
      {
        product_id: 'prod-4',
        variant_id: 'var-4',
        quantity: 50,
        requested_quantity: 50
      }
    ],
    notes: 'Solicitud para área de radiología pediátrica'
  },
  {
    id: 'req-5',
    hospital_name: 'Sociedad Médica Rionegro SOMER',
    coordinator_name: 'Enf. Claudia Hernández',
    request_date: '2024-10-05',
    status: 'delivered',
    priority: 'medium',
    items: [
      {
        product_id: 'prod-5',
        variant_id: 'var-5',
        quantity: 10,
        requested_quantity: 10
      }
    ],
    notes: 'Material para brigadas de salud externas'
  },
  {
    id: 'req-6',
    hospital_name: 'Hospital Venancio Díaz',
    coordinator_name: 'Dr. Roberto Silva',
    request_date: '2024-10-06',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        product_id: 'prod-6',
        variant_id: 'var-6',
        quantity: 80,
        requested_quantity: 80
      }
    ],
    notes: 'Reposición mensual de EPP'
  },
  {
    id: 'req-7',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'Dr. Patricia Morales',
    request_date: '2024-10-15',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        product_id: 'prod-16',
        variant_id: 'var-41',
        quantity: 15,
        requested_quantity: 15
      },
      {
        product_id: 'prod-17',
        variant_id: 'var-43',
        quantity: 100,
        requested_quantity: 100
      }
    ],
    notes: 'Solicitud urgente para área de cirugía'
  },
  {
    id: 'req-8',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Enf. Miguel Ángel Torres',
    request_date: '2024-10-16',
    status: 'approved',
    priority: 'medium',
    items: [
      {
        product_id: 'prod-18',
        variant_id: 'var-45',
        quantity: 25,
        requested_quantity: 25
      },
      {
        product_id: 'prod-20',
        variant_id: 'var-49',
        quantity: 3,
        requested_quantity: 3
      }
    ],
    notes: 'Para renovación de equipos UCI'
  },
  {
    id: 'req-9',
    hospital_name: 'Promotora Médica y Odontológica',
    coordinator_name: 'Dra. Isabella Ramírez',
    request_date: '2024-10-17',
    status: 'shipped',
    priority: 'low',
    items: [
      {
        product_id: 'prod-21',
        variant_id: 'var-51',
        quantity: 20,
        requested_quantity: 20
      },
      {
        product_id: 'prod-22',
        variant_id: 'var-52',
        quantity: 8,
        requested_quantity: 8
      }
    ],
    notes: 'Equipamiento para nueva área pediátrica'
  },
  {
    id: 'req-10',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Dr. Fernando Castillo',
    request_date: '2024-10-18',
    status: 'pending',
    priority: 'urgent',
    items: [
      {
        product_id: 'prod-23',
        variant_id: 'var-55',
        quantity: 50,
        requested_quantity: 50
      },
      {
        product_id: 'prod-24',
        variant_id: 'var-56',
        quantity: 2,
        requested_quantity: 2
      }
    ],
    notes: 'Solicitud para área de radiología pediátrica'
  },
  {
    id: 'req-11',
    hospital_name: 'Sociedad Médica Rionegro SOMER',
    coordinator_name: 'Enf. Claudia Hernández',
    request_date: '2024-10-19',
    status: 'delivered',
    priority: 'medium',
    items: [
      {
        product_id: 'prod-25',
        variant_id: 'var-58',
        quantity: 10,
        requested_quantity: 10
      },
      {
        product_id: 'prod-19',
        variant_id: 'var-48',
        quantity: 5,
        requested_quantity: 5
      }
    ],
    notes: 'Material para brigadas de salud externas'
  },
  {
    id: 'req-12',
    hospital_name: 'Hospital Venancio Díaz',
    coordinator_name: 'Dr. Roberto Silva',
    request_date: '2024-10-20',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        product_id: 'prod-17',
        variant_id: 'var-44',
        quantity: 80,
        requested_quantity: 80
      },
      {
        product_id: 'prod-18',
        variant_id: 'var-46',
        quantity: 15,
        requested_quantity: 15
      }
    ],
    notes: 'Reposición mensual de EPP'
  }
];
