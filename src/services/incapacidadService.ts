
// Simulación de servicio de consulta de incapacidades
export interface IncapacidadData {
  radicado?: string;
  fechaRecibido?: string;
  nombres?: string;
  cargo?: string;
  fechaInicio?: string;
  fechaFin?: string;
  dias?: string;
  estado?: string;
  valor?: string;
  hospital?: string;
  administradora?: string;
}

export interface ConsultaIncapacidadRequest {
  tipoDocumento: string;
  numeroDocumento: string;
  fechaExpedicion: string;
}

// Datos mock más variados para simular diferentes escenarios
const mockIncapacidades: Record<string, IncapacidadData> = {
  '1234567890': {
    radicado: '003614',
    fechaRecibido: '13/6/24',
    nombres: 'JUAN CARLOS RODRIGUEZ',
    cargo: 'Auxiliar de enfermería',
    fechaInicio: '6/6/24',
    fechaFin: '12/6/24',
    dias: '6',
    estado: 'PAGADA',
    valor: '$2.160.000',
    hospital: 'HOSPITAL LA MARIA VIH 131 - PRINCIPAL',
    administradora: 'EPS SURA'
  },
  '9876543210': {
    radicado: '004521',
    fechaRecibido: '20/5/24',
    nombres: 'MARIA FERNANDA GUTIERREZ',
    cargo: 'Enfermera profesional',
    fechaInicio: '15/5/24',
    fechaFin: '25/5/24',
    dias: '10',
    estado: 'EN_PROCESO',
    valor: null,
    hospital: 'CLINICA SANTA MONICA',
    administradora: 'NUEVA EPS'
  },
  '5555444433': {
    radicado: null,
    fechaRecibido: null,
    nombres: null,
    cargo: null,
    fechaInicio: null,
    fechaFin: null,
    dias: null,
    estado: null,
    valor: null,
    hospital: null,
    administradora: null
  }
};

export const consultarIncapacidad = async (datos: ConsultaIncapacidadRequest): Promise<IncapacidadData | null> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Simular diferentes casos basados en el número de documento
  const incapacidad = mockIncapacidades[datos.numeroDocumento];
  
  if (!incapacidad) {
    // Generar datos aleatorios para otros números
    const randomStates = ['PAGADA', 'EN_PROCESO', 'RECHAZADA', 'PENDIENTE_DOCUMENTOS'];
    const randomState = randomStates[Math.floor(Math.random() * randomStates.length)];
    
    return {
      radicado: `00${Math.floor(Math.random() * 9999)}`,
      fechaRecibido: '10/12/24',
      nombres: 'USUARIO DE PRUEBA',
      cargo: 'Profesional de salud',
      fechaInicio: '5/12/24',
      fechaFin: '15/12/24',
      dias: '10',
      estado: randomState,
      valor: randomState === 'PAGADA' ? '$3.200.000' : null,
      hospital: 'HOSPITAL GENERAL',
      administradora: 'EPS SANITAS'
    };
  }
  
  return incapacidad;
};
