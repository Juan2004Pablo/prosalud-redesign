import { Product, InventoryRequest, SupplierDelivery, Return, Hospital, SolicitudRequest } from './types/mockTypes';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Uniforme Azul - Talla S',
    category: 'uniforme',
    description: 'Uniforme médico de alta calidad',
    variants: [
      {
        id: 'var-1',
        product_id: 'prod-1',
        size: 'S',
        color: 'Azul',
        stock: 15,
        min_stock: 10,
        max_stock: 30,
        sku: 'UA-S-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Uniforme Azul - Talla M',
    category: 'uniforme',
    description: 'Uniforme médico de alta calidad',
    variants: [
      {
        id: 'var-2',
        product_id: 'prod-2',
        size: 'M',
        color: 'Azul',
        stock: 8,
        min_stock: 10,
        max_stock: 30,
        sku: 'UA-M-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Uniforme Verde - Talla S',
    category: 'uniforme',
    description: 'Uniforme médico de alta calidad',
    variants: [
      {
        id: 'var-3',
        product_id: 'prod-3',
        size: 'S',
        color: 'Verde',
        stock: 3,
        min_stock: 5,
        max_stock: 30,
        sku: 'UV-S-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Tapabocas Quirúrgico',
    category: 'tapabocas',
    description: 'Tapabocas desechable de alta filtración',
    variants: [
      {
        id: 'var-4',
        product_id: 'prod-4',
        size: 'Única',
        color: 'Blanco',
        stock: 1200,
        min_stock: 500,
        max_stock: 2000,
        sku: 'TQ-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Bata Blanca - Talla M',
    category: 'batas',
    description: 'Bata médica de alta calidad',
    variants: [
      {
        id: 'var-5',
        product_id: 'prod-5',
        size: 'M',
        color: 'Blanco',
        stock: 18,
        min_stock: 12,
        max_stock: 30,
        sku: 'BW-M-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Guantes Nitrilo - Talla M',
    category: 'implemento',
    description: 'Guantes desechables de nitrilo',
    variants: [
      {
        id: 'var-6',
        product_id: 'prod-6',
        size: 'M',
        color: 'Azul',
        stock: 120,
        min_stock: 80,
        max_stock: 200,
        sku: 'GN-M-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Termómetro Digital',
    category: 'implemento',
    description: 'Termómetro digital para mediciones precisas',
    variants: [
      {
        id: 'var-7',
        product_id: 'prod-7',
        size: 'Única',
        color: 'Blanco',
        stock: 50,
        min_stock: 20,
        max_stock: 100,
        sku: 'TD-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-8',
    name: 'Alcohol Antiséptico 500ml',
    category: 'implemento',
    description: 'Alcohol antiséptico para desinfección',
    variants: [
      {
        id: 'var-8',
        product_id: 'prod-8',
        size: '500ml',
        color: 'Transparente',
        stock: 180,
        min_stock: 100,
        max_stock: 300,
        sku: 'AA-500-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-9',
    name: 'Gel Antibacterial 250ml',
    category: 'implemento',
    description: 'Gel antibacterial para manos',
    variants: [
      {
        id: 'var-9',
        product_id: 'prod-9',
        size: '250ml',
        color: 'Transparente',
        stock: 240,
        min_stock: 150,
        max_stock: 400,
        sku: 'GA-250-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-10',
    name: 'Kit de Bienvenida',
    category: 'regalo',
    description: 'Kit de bienvenida para nuevos empleados',
    variants: [
      {
        id: 'var-10',
        product_id: 'prod-10',
        size: 'Estándar',
        color: 'Multicolor',
        stock: 15,
        min_stock: 10,
        max_stock: 30,
        sku: 'KB-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-11',
    name: 'Termo ProSalud',
    category: 'regalo',
    description: 'Termo de acero inoxidable',
    variants: [
      {
        id: 'var-11',
        product_id: 'prod-11',
        size: '500ml',
        color: 'Negro',
        stock: 35,
        min_stock: 20,
        max_stock: 50,
        sku: 'TP-500-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-12',
    name: 'Agenda Corporativa',
    category: 'regalo',
    description: 'Agenda para planificación',
    variants: [
      {
        id: 'var-12',
        product_id: 'prod-12',
        size: 'A5',
        color: 'Negro',
        stock: 28,
        min_stock: 15,
        max_stock: 50,
        sku: 'AC-A5-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-13',
    name: 'USB Corporativo',
    category: 'regalo',
    description: 'USB de 16GB con logo',
    variants: [
      {
        id: 'var-13',
        product_id: 'prod-13',
        size: '16GB',
        color: 'Negro',
        stock: 3,
        min_stock: 10,
        max_stock: 20,
        sku: 'USB-16-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-14',
    name: 'Camiseta ProSalud - Talla M',
    category: 'regalo',
    description: 'Camiseta de algodón con logo',
    variants: [
      {
        id: 'var-14',
        product_id: 'prod-14',
        size: 'M',
        color: 'Blanco',
        stock: 22,
        min_stock: 15,
        max_stock: 50,
        sku: 'CP-M-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-15',
    name: 'Camiseta ProSalud - Talla L',
    category: 'regalo',
    description: 'Camiseta de algodón con logo',
    variants: [
      {
        id: 'var-15',
        product_id: 'prod-15',
        size: 'L',
        color: 'Blanco',
        stock: 20,
        min_stock: 12,
        max_stock: 50,
        sku: 'CP-L-001'
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'prod-16',
    name: 'Uniforme Quirúrgico Premium',
    category: 'uniforme',
    description: 'Uniforme quirúrgico de alta calidad con tecnología antimicrobiana',
    variants: [
      {
        id: 'var-40',
        product_id: 'prod-16',
        size: 'XS',
        color: 'Verde Hospital',
        stock: 12,
        min_stock: 8,
        max_stock: 30,
        sku: 'UQ-GH-XS-001'
      },
      {
        id: 'var-41',
        product_id: 'prod-16',
        size: 'S',
        color: 'Verde Hospital',
        stock: 25,
        min_stock: 15,
        max_stock: 50,
        sku: 'UQ-GH-S-001'
      },
      {
        id: 'var-42',
        product_id: 'prod-16',
        size: 'M',
        color: 'Verde Hospital',
        stock: 18,
        min_stock: 12,
        max_stock: 45,
        sku: 'UQ-GH-M-001'
      }
    ],
    created_at: '2024-07-15T00:00:00Z',
    updated_at: '2024-07-15T00:00:00Z'
  },
  {
    id: 'prod-17',
    name: 'Mascarilla FFP2',
    category: 'tapabocas',
    description: 'Mascarilla de protección respiratoria FFP2 certificada',
    variants: [
      {
        id: 'var-43',
        product_id: 'prod-17',
        size: 'Única',
        color: 'Blanco',
        stock: 450,
        min_stock: 200,
        max_stock: 800,
        sku: 'FFP2-BL-U-001'
      },
      {
        id: 'var-44',
        product_id: 'prod-17',
        size: 'Única',
        color: 'Azul',
        stock: 320,
        min_stock: 150,
        max_stock: 600,
        sku: 'FFP2-AZ-U-001'
      }
    ],
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z'
  },
  {
    id: 'prod-18',
    name: 'Bata Quirúrgica Estéril',
    category: 'batas',
    description: 'Bata quirúrgica desechable estéril para procedimientos',
    variants: [
      {
        id: 'var-45',
        product_id: 'prod-18',
        size: 'M',
        color: 'Azul Cielo',
        stock: 85,
        min_stock: 50,
        max_stock: 150,
        sku: 'BQE-AC-M-001'
      },
      {
        id: 'var-46',
        product_id: 'prod-18',
        size: 'L',
        color: 'Azul Cielo',
        stock: 92,
        min_stock: 60,
        max_stock: 180,
        sku: 'BQE-AC-L-001'
      },
      {
        id: 'var-47',
        product_id: 'prod-18',
        size: 'XL',
        color: 'Azul Cielo',
        stock: 45,
        min_stock: 30,
        max_stock: 100,
        sku: 'BQE-AC-XL-001'
      }
    ],
    created_at: '2024-08-05T00:00:00Z',
    updated_at: '2024-08-05T00:00:00Z'
  },
  {
    id: 'prod-19',
    name: 'Kit Médico de Emergencia',
    category: 'regalo',
    description: 'Kit completo de emergencia para personal médico',
    variants: [
      {
        id: 'var-48',
        product_id: 'prod-19',
        size: 'Estándar',
        color: 'Rojo',
        stock: 28,
        min_stock: 15,
        max_stock: 60,
        sku: 'KME-RJ-E-001'
      }
    ],
    created_at: '2024-08-10T00:00:00Z',
    updated_at: '2024-08-10T00:00:00Z'
  },
  {
    id: 'prod-20',
    name: 'Oxímetro de Pulso Digital',
    category: 'implemento',
    description: 'Oxímetro digital para medición de saturación de oxígeno',
    variants: [
      {
        id: 'var-49',
        product_id: 'prod-20',
        size: 'Portátil',
        color: 'Blanco',
        stock: 15,
        min_stock: 10,
        max_stock: 35,
        sku: 'OPD-BL-P-001'
      },
      {
        id: 'var-50',
        product_id: 'prod-20',
        size: 'Portátil',
        color: 'Azul',
        stock: 12,
        min_stock: 8,
        max_stock: 30,
        sku: 'OPD-AZ-P-001'
      }
    ],
    created_at: '2024-08-12T00:00:00Z',
    updated_at: '2024-08-12T00:00:00Z'
  },
  {
    id: 'prod-21',
    name: 'Gafas de Protección Anti-vaho',
    category: 'implemento',
    description: 'Gafas de protección con tecnología anti-vaho',
    variants: [
      {
        id: 'var-51',
        product_id: 'prod-21',
        size: 'Ajustable',
        color: 'Transparente',
        stock: 75,
        min_stock: 40,
        max_stock: 120,
        sku: 'GPA-TR-A-001'
      }
    ],
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-08-15T00:00:00Z'
  },
  {
    id: 'prod-22',
    name: 'Uniforme Pediátrico',
    category: 'uniforme',
    description: 'Uniforme especializado para área pediátrica con diseños amigables',
    variants: [
      {
        id: 'var-52',
        product_id: 'prod-22',
        size: 'S',
        color: 'Rosa Pastel',
        stock: 22,
        min_stock: 12,
        max_stock: 40,
        sku: 'UP-RP-S-001'
      },
      {
        id: 'var-53',
        product_id: 'prod-22',
        size: 'M',
        color: 'Rosa Pastel',
        stock: 18,
        min_stock: 10,
        max_stock: 35,
        sku: 'UP-RP-M-001'
      },
      {
        id: 'var-54',
        product_id: 'prod-22',
        size: 'L',
        color: 'Celeste',
        stock: 16,
        min_stock: 8,
        max_stock: 30,
        sku: 'UP-CE-L-001'
      }
    ],
    created_at: '2024-08-18T00:00:00Z',
    updated_at: '2024-08-18T00:00:00Z'
  },
  {
    id: 'prod-23',
    name: 'Tapabocas Infantil Decorado',
    category: 'tapabocas',
    description: 'Tapabocas especial para niños con diseños coloridos',
    variants: [
      {
        id: 'var-55',
        product_id: 'prod-23',
        size: 'Infantil',
        color: 'Multicolor',
        stock: 180,
        min_stock: 100,
        max_stock: 300,
        sku: 'TID-MC-I-001'
      }
    ],
    created_at: '2024-08-20T00:00:00Z',
    updated_at: '2024-08-20T00:00:00Z'
  },
  {
    id: 'prod-24',
    name: 'Delantal de Radiología',
    category: 'batas',
    description: 'Delantal plomado para protección radiológica',
    variants: [
      {
        id: 'var-56',
        product_id: 'prod-24',
        size: 'M',
        color: 'Plomo',
        stock: 8,
        min_stock: 5,
        max_stock: 20,
        sku: 'DR-PL-M-001'
      },
      {
        id: 'var-57',
        product_id: 'prod-24',
        size: 'L',
        color: 'Plomo',
        stock: 6,
        min_stock: 4,
        max_stock: 15,
        sku: 'DR-PL-L-001'
      }
    ],
    created_at: '2024-08-22T00:00:00Z',
    updated_at: '2024-08-22T00:00:00Z'
  },
  {
    id: 'prod-25',
    name: 'Mochila Sanitaria',
    category: 'regalo',
    description: 'Mochila especializada para transporte de material sanitario',
    variants: [
      {
        id: 'var-58',
        product_id: 'prod-25',
        size: 'Grande',
        color: 'Verde Militar',
        stock: 35,
        min_stock: 20,
        max_stock: 70,
        sku: 'MS-VM-G-001'
      },
      {
        id: 'var-59',
        product_id: 'prod-25',
        size: 'Mediana',
        color: 'Azul Marino',
        stock: 42,
        min_stock: 25,
        max_stock: 80,
        sku: 'MS-AM-M-001'
      }
    ],
    created_at: '2024-08-25T00:00:00Z',
    updated_at: '2024-08-25T00:00:00Z'
  }
];

export const mockInventoryRequests: InventoryRequest[] = [
  {
    id: 'req-1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'Dr. Patricia Morales',
    coordinator_email: 'patricia.morales@hmfs.gov.co',
    request_date: '2024-10-01',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        id: 'item-1',
        request_id: 'req-1',
        product_id: 'prod-1',
        variant_id: 'var-1',
        quantity_requested: 15,
        quantity_approved: 15
      }
    ],
    notes: 'Solicitud urgente para área de cirugía',
    created_at: '2024-10-01T08:00:00Z'
  },
  {
    id: 'req-2',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Enf. Miguel Ángel Torres',
    coordinator_email: 'miguel.torres@hsjd.gov.co',
    request_date: '2024-10-02',
    status: 'approved',
    priority: 'medium',
    items: [
      {
        id: 'item-2',
        request_id: 'req-2',
        product_id: 'prod-2',
        variant_id: 'var-2',
        quantity_requested: 25,
        quantity_approved: 25
      }
    ],
    notes: 'Para renovación de equipos UCI',
    created_at: '2024-10-02T09:30:00Z'
  },
  {
    id: 'req-3',
    hospital_name: 'Promotora Médica y Odontológica',
    coordinator_name: 'Dra. Isabella Ramírez',
    coordinator_email: 'isabella.ramirez@pmo.com.co',
    request_date: '2024-10-03',
    status: 'shipped',
    priority: 'low',
    items: [
      {
        id: 'item-3',
        request_id: 'req-3',
        product_id: 'prod-3',
        variant_id: 'var-3',
        quantity_requested: 20,
        quantity_approved: 20
      }
    ],
    notes: 'Equipamiento para nueva área pediátrica',
    created_at: '2024-10-03T11:15:00Z'
  },
  {
    id: 'req-4',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Dr. Fernando Castillo',
    coordinator_email: 'fernando.castillo@lamerced.gov.co',
    request_date: '2024-10-04',
    status: 'pending',
    priority: 'urgent',
    items: [
      {
        id: 'item-4',
        request_id: 'req-4',
        product_id: 'prod-4',
        variant_id: 'var-4',
        quantity_requested: 50,
        quantity_approved: 50
      }
    ],
    notes: 'Solicitud para área de radiología pediátrica',
    created_at: '2024-10-04T14:20:00Z'
  },
  {
    id: 'req-5',
    hospital_name: 'Sociedad Médica Rionegro SOMER',
    coordinator_name: 'Enf. Claudia Hernández',
    coordinator_email: 'claudia.hernandez@somer.com.co',
    request_date: '2024-10-05',
    status: 'delivered',
    priority: 'medium',
    items: [
      {
        id: 'item-5',
        request_id: 'req-5',
        product_id: 'prod-5',
        variant_id: 'var-5',
        quantity_requested: 10,
        quantity_approved: 10
      }
    ],
    notes: 'Material para brigadas de salud externas',
    created_at: '2024-10-05T16:45:00Z'
  },
  {
    id: 'req-6',
    hospital_name: 'Hospital Venancio Díaz',
    coordinator_name: 'Dr. Roberto Silva',
    coordinator_email: 'roberto.silva@hvd.gov.co',
    request_date: '2024-10-06',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        id: 'item-6',
        request_id: 'req-6',
        product_id: 'prod-6',
        variant_id: 'var-6',
        quantity_requested: 80,
        quantity_approved: 80
      }
    ],
    notes: 'Reposición mensual de EPP',
    created_at: '2024-10-06T10:30:00Z'
  },
  {
    id: 'req-7',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'Dr. Patricia Morales',
    coordinator_email: 'patricia.morales@hmfs.gov.co',
    request_date: '2024-10-15',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        id: 'item-7a',
        request_id: 'req-7',
        product_id: 'prod-16',
        variant_id: 'var-41',
        quantity_requested: 15,
        quantity_approved: 15
      },
      {
        id: 'item-7b',
        request_id: 'req-7',
        product_id: 'prod-17',
        variant_id: 'var-43',
        quantity_requested: 100,
        quantity_approved: 100
      }
    ],
    notes: 'Solicitud urgente para área de cirugía',
    created_at: '2024-10-15T08:00:00Z'
  },
  {
    id: 'req-8',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Enf. Miguel Ángel Torres',
    coordinator_email: 'miguel.torres@hsjd.gov.co',
    request_date: '2024-10-16',
    status: 'approved',
    priority: 'medium',
    items: [
      {
        id: 'item-8a',
        request_id: 'req-8',
        product_id: 'prod-18',
        variant_id: 'var-45',
        quantity_requested: 25,
        quantity_approved: 25
      },
      {
        id: 'item-8b',
        request_id: 'req-8',
        product_id: 'prod-20',
        variant_id: 'var-49',
        quantity_requested: 3,
        quantity_approved: 3
      }
    ],
    notes: 'Para renovación de equipos UCI',
    created_at: '2024-10-16T09:30:00Z'
  },
  {
    id: 'req-9',
    hospital_name: 'Promotora Médica y Odontológica',
    coordinator_name: 'Dra. Isabella Ramírez',
    coordinator_email: 'isabella.ramirez@pmo.com.co',
    request_date: '2024-10-17',
    status: 'shipped',
    priority: 'low',
    items: [
      {
        id: 'item-9a',
        request_id: 'req-9',
        product_id: 'prod-21',
        variant_id: 'var-51',
        quantity_requested: 20,
        quantity_approved: 20
      },
      {
        id: 'item-9b',
        request_id: 'req-9',
        product_id: 'prod-22',
        variant_id: 'var-52',
        quantity_requested: 8,
        quantity_approved: 8
      }
    ],
    notes: 'Equipamiento para nueva área pediátrica',
    created_at: '2024-10-17T11:15:00Z'
  },
  {
    id: 'req-10',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Dr. Fernando Castillo',
    coordinator_email: 'fernando.castillo@lamerced.gov.co',
    request_date: '2024-10-18',
    status: 'pending',
    priority: 'urgent',
    items: [
      {
        id: 'item-10a',
        request_id: 'req-10',
        product_id: 'prod-23',
        variant_id: 'var-55',
        quantity_requested: 50,
        quantity_approved: 50
      },
      {
        id: 'item-10b',
        request_id: 'req-10',
        product_id: 'prod-24',
        variant_id: 'var-56',
        quantity_requested: 2,
        quantity_approved: 2
      }
    ],
    notes: 'Solicitud para área de radiología pediátrica',
    created_at: '2024-10-18T14:20:00Z'
  },
  {
    id: 'req-11',
    hospital_name: 'Sociedad Médica Rionegro SOMER',
    coordinator_name: 'Enf. Claudia Hernández',
    coordinator_email: 'claudia.hernandez@somer.com.co',
    request_date: '2024-10-19',
    status: 'delivered',
    priority: 'medium',
    items: [
      {
        id: 'item-11a',
        request_id: 'req-11',
        product_id: 'prod-25',
        variant_id: 'var-58',
        quantity_requested: 10,
        quantity_approved: 10
      },
      {
        id: 'item-11b',
        request_id: 'req-11',
        product_id: 'prod-19',
        variant_id: 'var-48',
        quantity_requested: 5,
        quantity_approved: 5
      }
    ],
    notes: 'Material para brigadas de salud externas',
    created_at: '2024-10-19T16:45:00Z'
  },
  {
    id: 'req-12',
    hospital_name: 'Hospital Venancio Díaz',
    coordinator_name: 'Dr. Roberto Silva',
    coordinator_email: 'roberto.silva@hvd.gov.co',
    request_date: '2024-10-20',
    status: 'preparing',
    priority: 'high',
    items: [
      {
        id: 'item-12a',
        request_id: 'req-12',
        product_id: 'prod-17',
        variant_id: 'var-44',
        quantity_requested: 80,
        quantity_approved: 80
      },
      {
        id: 'item-12b',
        request_id: 'req-12',
        product_id: 'prod-18',
        variant_id: 'var-46',
        quantity_requested: 15,
        quantity_approved: 15
      }
    ],
    notes: 'Reposición mensual de EPP',
    created_at: '2024-10-20T10:30:00Z'
  },
  // Nuevas solicitudes de inventario adicionales
  {
    id: 'req-13',
    hospital_name: 'Hospital Santa Elena',
    coordinator_name: 'Dra. Ana López',
    coordinator_email: 'ana.lopez@santaelena.gov.co',
    request_date: '2024-10-22',
    status: 'approved',
    priority: 'medium',
    items: [
      {
        id: 'item-13a',
        request_id: 'req-13',
        product_id: 'prod-4',
        variant_id: 'var-4',
        quantity_requested: 300,
        quantity_approved: 300,
        justification: 'Reposición semanal de tapabocas'
      },
      {
        id: 'item-13b',
        request_id: 'req-13',
        product_id: 'prod-6',
        variant_id: 'var-6',
        quantity_requested: 50,
        quantity_approved: 45,
        justification: 'Guantes para área de emergencias'
      }
    ],
    notes: 'Solicitud para área de consulta externa',
    created_at: '2024-10-22T09:15:00Z'
  },
  {
    id: 'req-14',
    hospital_name: 'Hospital Regional Norte',
    coordinator_name: 'Dr. Luis Martínez',
    coordinator_email: 'luis.martinez@hrn.gov.co',
    request_date: '2024-10-23',
    status: 'pending',
    priority: 'high',
    items: [
      {
        id: 'item-14a',
        request_id: 'req-14',
        product_id: 'prod-1',
        variant_id: 'var-1',
        quantity_requested: 25,
        quantity_approved: null,
        justification: 'Uniformes nuevos para personal de enfermería'
      },
      {
        id: 'item-14b',
        request_id: 'req-14',
        product_id: 'prod-5',
        variant_id: 'var-5',
        quantity_requested: 20,
        quantity_approved: null,
        justification: 'Batas para médicos residentes'
      }
    ],
    notes: 'Solicitud urgente - nuevo personal médico',
    created_at: '2024-10-23T07:30:00Z'
  },
  {
    id: 'req-15',
    hospital_name: 'Clínica del Oriente',
    coordinator_name: 'Enf. Patricia Gómez',
    coordinator_email: 'patricia.gomez@cliorien.com',
    request_date: '2024-10-24',
    status: 'shipped',
    priority: 'low',
    items: [
      {
        id: 'item-15a',
        request_id: 'req-15',
        product_id: 'prod-10',
        variant_id: 'var-10',
        quantity_requested: 5,
        quantity_approved: 5,
        justification: 'Kits de bienvenida para nuevos empleados'
      },
      {
        id: 'item-15b',
        request_id: 'req-15',
        product_id: 'prod-11',
        variant_id: 'var-11',
        quantity_requested: 10,
        quantity_approved: 10,
        justification: 'Termos corporativos para personal administrativo'
      }
    ],
    notes: 'Material promocional para evento corporativo',
    created_at: '2024-10-24T11:45:00Z'
  },
  {
    id: 'req-16',
    hospital_name: 'Centro Médico Antioquia',
    coordinator_name: 'Dr. Fernando Vargas',
    coordinator_email: 'fernando.vargas@cma.com.co',
    request_date: '2024-10-25',
    status: 'delivered',
    priority: 'urgent',
    items: [
      {
        id: 'item-16a',
        request_id: 'req-16',
        product_id: 'prod-7',
        variant_id: 'var-7',
        quantity_requested: 15,
        quantity_approved: 15,
        justification: 'Termómetros para triaje COVID-19'
      },
      {
        id: 'item-16b',
        request_id: 'req-16',
        product_id: 'prod-8',
        variant_id: 'var-8',
        quantity_requested: 30,
        quantity_approved: 30,
        justification: 'Alcohol antiséptico para desinfección'
      }
    ],
    notes: 'Equipamiento para protocolo de bioseguridad',
    created_at: '2024-10-25T14:20:00Z'
  },
  {
    id: 'req-17',
    hospital_name: 'Hospital Universitario',
    coordinator_name: 'Dra. Carmen Silva',
    coordinator_email: 'carmen.silva@huniv.edu.co',
    request_date: '2024-10-26',
    status: 'preparing',
    priority: 'medium',
    items: [
      {
        id: 'item-17a',
        request_id: 'req-17',
        product_id: 'prod-2',
        variant_id: 'var-2',
        quantity_requested: 12,
        quantity_approved: 12,
        justification: 'Uniformes para estudiantes de medicina'
      },
      {
        id: 'item-17b',
        request_id: 'req-17',
        product_id: 'prod-9',
        variant_id: 'var-9',
        quantity_requested: 40,
        quantity_approved: 40,
        justification: 'Gel antibacterial para consultorios'
      }
    ],
    notes: 'Material para prácticas académicas',
    created_at: '2024-10-26T16:10:00Z'
  }
];

export const mockUsers = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@prosalud.com',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@prosalud.com',
    isActive: true,
    createdAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@prosalud.com',
    isActive: false,
    createdAt: '2024-01-20T00:00:00Z'
  }
];

export const mockConvenios = [
  {
    id: '1',
    name: 'Hospital Marco Fidel Suárez',
    image: '/images/convenios/hospital-marco-fidel-suarez.webp',
    isVisible: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Hospital San Juan de Dios',
    image: '/images/convenios/hospital-san-juan-de-dios-rionegro.webp',
    isVisible: true,
    createdAt: '2024-01-02T00:00:00Z'
  }
];

export const mockSupplierDeliveries: SupplierDelivery[] = [
  {
    id: 'del-1',
    supplier_name: 'Distribuidora Médica Sur',
    delivery_date: '2024-10-01',
    status: 'completed',
    total_items: 150,
    items: [
      {
        id: 'del-item-1',
        delivery_id: 'del-1',
        product_id: 'prod-1',
        variant_id: 'var-1',
        quantity: 50,
        unit_cost: 45000
      }
    ],
    created_at: '2024-10-01T10:00:00Z'
  },
  {
    id: 'del-2',
    supplier_name: 'Suministros Hospitalarios',
    delivery_date: '2024-10-05',
    status: 'pending',
    total_items: 200,
    items: [
      {
        id: 'del-item-2',
        delivery_id: 'del-2',
        product_id: 'prod-2',
        variant_id: 'var-2',
        quantity: 75,
        unit_cost: 45000
      }
    ],
    created_at: '2024-10-05T14:30:00Z'
  }
];

export const mockReturns: Return[] = [
  {
    id: 'ret-1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'Dr. Patricia Morales',
    return_date: '2024-10-10',
    reason: 'incorrect',
    status: 'pending',
    items: [
      {
        id: 'ret-item-1',
        return_id: 'ret-1',
        product_id: 'prod-1',
        variant_id: 'var-1',
        quantity: 5,
        condition: 'new'
      }
    ],
    created_at: '2024-10-10T09:15:00Z'
  },
  {
    id: 'ret-2',
    hospital_name: 'Hospital San Juan de Dios',
    return_date: '2024-10-12',
    coordinator_name: 'Enf. Miguel Ángel Torres',
    reason: 'defective',
    status: 'approved',
    items: [
      {
        id: 'ret-item-2',
        return_id: 'ret-2',
        product_id: 'prod-3',
        variant_id: 'var-3',
        quantity: 3,
        condition: 'damaged'
      }
    ],
    created_at: '2024-10-12T11:20:00Z'
  }
];

export const mockHospitals: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Hospital Marco Fidel Suárez',
    location: 'Bello',
    coordinator_name: 'Dr. Patricia Morales',
    coordinator_email: 'patricia.morales@hmfs.gov.co',
    coordinator_phone: '+57 4 123-4567',
    stock_allocation: []
  },
  {
    id: 'hosp-2',
    name: 'Hospital San Juan de Dios',
    location: 'Rionegro',
    coordinator_name: 'Enf. Miguel Ángel Torres',
    coordinator_email: 'miguel.torres@hsjd.gov.co',
    coordinator_phone: '+57 4 765-4321',
    stock_allocation: []
  },
  {
    id: 'hosp-3',
    name: 'Promotora Médica y Odontológica',
    location: 'Medellín',
    coordinator_name: 'Dra. Isabella Ramírez',
    coordinator_email: 'isabella.ramirez@pmo.com.co',
    coordinator_phone: '+57 4 987-6543',
    stock_allocation: []
  }
];

export const mockSolicitudesRequests: SolicitudRequest[] = [
  {
    id: 'sol-1',
    request_type: 'certificado-convenio',
    id_type: 'CC',
    id_number: '12345678',
    name: 'María',
    last_name: 'García López',
    email: 'maria.garcia@prosalud.com',
    phone_number: '+57 300 123 4567',
    payload: { convenio: 'EPS Sura', motivo: 'Certificación laboral' },
    status: 'pending',
    created_at: '2024-10-15T10:30:00Z'
  },
  {
    id: 'sol-2',
    request_type: 'actualizar-cuenta',
    id_type: 'CC',
    id_number: '87654321',
    name: 'Carlos',
    last_name: 'Rodríguez Pérez',
    email: 'carlos.rodriguez@prosalud.com',
    phone_number: '+57 300 765 4321',
    payload: { banco: 'Bancolombia', numero_cuenta: '****1234' },
    status: 'resolved',
    created_at: '2024-10-10T14:20:00Z',
    processed_at: '2024-10-11T09:15:00Z',
    resolved_at: '2024-10-12T16:45:00Z'
  },
  {
    id: 'sol-3',
    request_type: 'descanso-laboral',
    id_type: 'CE',
    id_number: '98765432',
    name: 'Ana',
    last_name: 'López Martínez',
    email: 'ana.lopez@prosalud.com',
    phone_number: '+57 301 234 5678',
    payload: { fecha_inicio: '2024-02-01', fecha_fin: '2024-02-15', motivo: 'Descanso médico' },
    status: 'in_progress',
    created_at: '2024-10-13T14:20:00Z',
    processed_at: '2024-10-14T10:00:00Z'
  }
];
