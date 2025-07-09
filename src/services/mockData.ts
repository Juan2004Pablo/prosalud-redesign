
// Mock data centralizado para todas las páginas admin
import { User, Convenio, BienestarEvent, ComfenalcoEvent } from '@/types/admin';
import { Product, SupplierDelivery, Return, Request, Hospital } from '@/types/inventory';
import { Request as SolicitudRequest } from '@/types/requests';

// Users Mock Data
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@prosalud.com',
    isActive: true,
    createdAt: '2024-01-15',
    lastLogin: '2024-06-01'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@prosalud.com',
    isActive: true,
    createdAt: '2024-02-10',
    lastLogin: '2024-05-28'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@prosalud.com',
    isActive: false,
    createdAt: '2024-03-05',
    lastLogin: '2024-04-15'
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'López',
    email: 'ana.lopez@prosalud.com',
    isActive: true,
    createdAt: '2024-03-20',
    lastLogin: '2024-06-02'
  },
  {
    id: '5',
    firstName: 'Luis',
    lastName: 'Martínez',
    email: 'luis.martinez@prosalud.com',
    isActive: true,
    createdAt: '2024-04-01',
    lastLogin: '2024-05-30'
  },
  {
    id: '6',
    firstName: 'Patricia',
    lastName: 'Ruiz',
    email: 'patricia.ruiz@prosalud.com',
    isActive: false,
    createdAt: '2024-04-15',
    lastLogin: '2024-05-15'
  },
  {
    id: '7',
    firstName: 'Roberto',
    lastName: 'Silva',
    email: 'roberto.silva@prosalud.com',
    isActive: true,
    createdAt: '2024-05-01',
    lastLogin: '2024-06-01'
  },
  {
    id: '8',
    firstName: 'Elena',
    lastName: 'Castro',
    email: 'elena.castro@prosalud.com',
    isActive: true,
    createdAt: '2024-05-10',
    lastLogin: '2024-05-31'
  }
];

// Convenios Mock Data - Usando los 7 convenios del sitio web
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

// Products Mock Data - Expandido
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Uniforme Quirúrgico Azul',
    category: 'uniforme',
    description: 'Uniforme quirúrgico completo color azul, tela antifluidos',
    image: '/images/inventory/uniforme-azul.webp',
    variants: [
      { id: '1', product_id: '1', size: 'S', color: 'Azul', stock: 15, min_stock: 10, max_stock: 50, sku: 'UNI-AZ-S' },
      { id: '2', product_id: '1', size: 'M', color: 'Azul', stock: 8, min_stock: 10, max_stock: 50, sku: 'UNI-AZ-M' },
      { id: '3', product_id: '1', size: 'L', color: 'Azul', stock: 25, min_stock: 15, max_stock: 60, sku: 'UNI-AZ-L' },
      { id: '4', product_id: '1', size: 'XL', color: 'Azul', stock: 12, min_stock: 8, max_stock: 40, sku: 'UNI-AZ-XL' }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Uniforme Quirúrgico Verde',
    category: 'uniforme',
    description: 'Uniforme quirúrgico completo color verde, tela antifluidos',
    image: '/images/inventory/uniforme-verde.webp',
    variants: [
      { id: '5', product_id: '2', size: 'S', color: 'Verde', stock: 3, min_stock: 5, max_stock: 30, sku: 'UNI-VE-S' },
      { id: '6', product_id: '2', size: 'M', color: 'Verde', stock: 18, min_stock: 10, max_stock: 50, sku: 'UNI-VE-M' },
      { id: '7', product_id: '2', size: 'L', color: 'Verde', stock: 22, min_stock: 15, max_stock: 60, sku: 'UNI-VE-L' }
    ],
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-06-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Tapabocas N95',
    category: 'tapabocas',
    description: 'Tapabocas de alta filtración N95, desechable',
    image: '/images/inventory/n95.webp',
    variants: [
      { id: '8', product_id: '3', stock: 45, min_stock: 100, max_stock: 500, sku: 'TAP-N95' }
    ],
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-06-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Tapabocas Quirúrgico',
    category: 'tapabocas',
    description: 'Tapabocas quirúrgico desechable de 3 capas',
    image: '/images/inventory/quirurgico.webp',
    variants: [
      { id: '9', product_id: '4', stock: 1200, min_stock: 500, max_stock: 2000, sku: 'TAP-QUI' }
    ],
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-06-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Bata Médica Blanca',
    category: 'batas',
    description: 'Bata médica blanca manga larga, algodón poliéster',
    image: '/images/inventory/bata-blanca.webp',
    variants: [
      { id: '10', product_id: '5', size: 'S', color: 'Blanco', stock: 12, min_stock: 8, max_stock: 30, sku: 'BAT-BL-S' },
      { id: '11', product_id: '5', size: 'M', color: 'Blanco', stock: 18, min_stock: 12, max_stock: 40, sku: 'BAT-BL-M' },
      { id: '12', product_id: '5', size: 'L', color: 'Blanco', stock: 2, min_stock: 8, max_stock: 30, sku: 'BAT-BL-L' }
    ],
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-06-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Kit de Bienvenida ProSalud',
    category: 'regalo',
    description: 'Kit de bienvenida con termo, agenda y artículos corporativos',
    image: '/images/inventory/kit-bienvenida.webp',
    variants: [
      { id: '13', product_id: '6', stock: 15, min_stock: 10, max_stock: 50, sku: 'REG-KIT' }
    ],
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-06-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Guantes Desechables',
    category: 'implemento',
    description: 'Guantes desechables de nitrilo, caja x100 unidades',
    image: '/images/inventory/guantes.webp',
    variants: [
      { id: '14', product_id: '7', size: 'S', stock: 80, min_stock: 50, max_stock: 200, sku: 'GUA-NIT-S' },
      { id: '15', product_id: '7', size: 'M', stock: 120, min_stock: 80, max_stock: 300, sku: 'GUA-NIT-M' },
      { id: '16', product_id: '7', size: 'L', stock: 95, min_stock: 60, max_stock: 250, sku: 'GUA-NIT-L' }
    ],
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-06-07T00:00:00Z'
  }
];

// Hospitals Mock Data
export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Hospital Marco Fidel Suárez',
    location: 'Bello, Antioquia',
    coordinator_name: 'María González',
    coordinator_email: 'maria.gonzalez@hmarcosfidel.gov.co',
    coordinator_phone: '+57 604 4619500',
    stock_allocation: []
  },
  {
    id: '2',
    name: 'Hospital San Juan de Dios',
    location: 'Rionegro, Antioquia',
    coordinator_name: 'Carlos Martínez',
    coordinator_email: 'carlos.martinez@hsanjuan.gov.co',
    coordinator_phone: '+57 604 5620100',
    stock_allocation: []
  },
  {
    id: '3',
    name: 'Hospital La Merced',
    location: 'Ciudad Bolívar, Antioquia',
    coordinator_name: 'Ana López',
    coordinator_email: 'ana.lopez@hlamerced.gov.co',
    coordinator_phone: '+57 604 8590200',
    stock_allocation: []
  },
  {
    id: '4',
    name: 'Hospital Santa Elena',
    location: 'Fredonia, Antioquia',
    coordinator_name: 'Luis Rivera',
    coordinator_email: 'luis.rivera@hsantaelena.gov.co',
    coordinator_phone: '+57 604 8673000',
    stock_allocation: []
  }
];

// Supplier Deliveries Mock Data
export const mockSupplierDeliveries: SupplierDelivery[] = [
  {
    id: '1',
    supplier_name: 'Textiles Médicos S.A.',
    delivery_date: '2024-06-15',
    items: [
      { id: '1', delivery_id: '1', product_id: '1', variant_id: '1', quantity: 50, unit_cost: 45000 },
      { id: '2', delivery_id: '1', product_id: '2', variant_id: '5', quantity: 30, unit_cost: 45000 }
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
      { id: '3', delivery_id: '2', product_id: '3', variant_id: '8', quantity: 1000, unit_cost: 2500 },
      { id: '4', delivery_id: '2', product_id: '4', variant_id: '9', quantity: 500, unit_cost: 800 }
    ],
    total_items: 1500,
    status: 'received',
    notes: 'Pendiente verificación de calidad',
    created_at: '2024-06-18T00:00:00Z'
  },
  {
    id: '3',
    supplier_name: 'Distribuciones Médicas',
    delivery_date: '2024-06-25',
    items: [
      { id: '5', delivery_id: '3', product_id: '5', variant_id: '10', quantity: 25, unit_cost: 35000 },
      { id: '6', delivery_id: '3', product_id: '5', variant_id: '11', quantity: 30, unit_cost: 35000 }
    ],
    total_items: 55,
    status: 'pending',
    created_at: '2024-06-22T00:00:00Z'
  },
  {
    id: '4',
    supplier_name: 'Equipos y Dotaciones',
    delivery_date: '2024-06-28',
    items: [
      { id: '7', delivery_id: '4', product_id: '7', variant_id: '14', quantity: 100, unit_cost: 15000 },
      { id: '8', delivery_id: '4', product_id: '7', variant_id: '15', quantity: 150, unit_cost: 15000 }
    ],
    total_items: 250,
    status: 'completed',
    notes: 'Entrega satisfactoria, productos verificados',
    created_at: '2024-06-25T00:00:00Z'
  }
];

// Inventory Requests Mock Data
export const mockInventoryRequests: Request[] = [
  {
    id: '1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'María González',
    coordinator_email: 'maria.gonzalez@hmarcosfidel.gov.co',
    request_date: '2024-06-20',
    items: [
      { id: '1', request_id: '1', product_id: '1', variant_id: '2', quantity_requested: 20, quantity_approved: 18, justification: 'Reposición stock bajo' },
      { id: '2', request_id: '1', product_id: '3', variant_id: '8', quantity_requested: 100, quantity_approved: 100, justification: 'Aumento en demanda' }
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
    coordinator_name: 'Carlos Martínez',
    coordinator_email: 'carlos.martinez@hsanjuan.gov.co',
    request_date: '2024-06-22',
    items: [
      { id: '3', request_id: '2', product_id: '5', variant_id: '11', quantity_requested: 15, justification: 'Nueva área de consulta externa' },
      { id: '4', request_id: '2', product_id: '4', variant_id: '9', quantity_requested: 200, justification: 'Protocolo COVID actualizado' }
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
    coordinator_name: 'Ana López',
    coordinator_email: 'ana.lopez@hlamerced.gov.co',
    request_date: '2024-06-24',
    items: [
      { id: '5', request_id: '3', product_id: '6', variant_id: '13', quantity_requested: 10, justification: 'Programa de incentivos personal' },
      { id: '6', request_id: '3', product_id: '7', variant_id: '15', quantity_requested: 50, justification: 'Renovación stock mensual' }
    ],
    priority: 'low',
    status: 'pending',
    created_at: '2024-06-24T00:00:00Z'
  },
  {
    id: '4',
    hospital_name: 'Hospital Santa Elena',
    coordinator_name: 'Luis Rivera',
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
  }
];

// Returns Mock Data
export const mockReturns: Return[] = [
  {
    id: '1',
    hospital_name: 'Hospital Marco Fidel Suárez',
    coordinator_name: 'María González',
    return_date: '2024-06-19',
    items: [
      { id: '1', return_id: '1', product_id: '1', variant_id: '1', quantity: 5, condition: 'new' }
    ],
    reason: 'incorrect',
    status: 'processed',
    notes: 'Talla incorrecta - productos reingresados al inventario',
    created_at: '2024-06-19T00:00:00Z'
  },
  {
    id: '2',
    hospital_name: 'Hospital San Juan de Dios',
    coordinator_name: 'Carlos Martínez',
    return_date: '2024-06-21',
    items: [
      { id: '2', return_id: '2', product_id: '5', variant_id: '12', quantity: 3, condition: 'damaged' }
    ],
    reason: 'defective',
    status: 'approved',
    notes: 'Productos defectuosos - pendiente recolección',
    created_at: '2024-06-21T00:00:00Z'
  },
  {
    id: '3',
    hospital_name: 'Hospital La Merced',
    coordinator_name: 'Ana López',
    return_date: '2024-06-23',
    items: [
      { id: '3', return_id: '3', product_id: '4', variant_id: '9', quantity: 50, condition: 'new' }
    ],
    reason: 'excess',
    status: 'pending',
    notes: 'Exceso de stock - solicitud de devolución',
    created_at: '2024-06-23T00:00:00Z'
  }
];

// Solicitudes de Trámites Mock Data
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
  }
];
