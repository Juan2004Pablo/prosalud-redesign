
import { 
  User, 
  Convenio, 
  BienestarEvent, 
  ComfenalcoEvent, 
  AboutUs, 
  SiteMetrics,
  PaginatedResponse,
  CreateUserData,
  UpdateUserData,
  CreateConvenioData,
  CreateBienestarEventData,
  CreateComfenalcoEventData
} from '@/types/admin';

// Mock data
const mockUsers: User[] = [
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
  }
];

const mockConvenios: Convenio[] = [
  {
    id: '1',
    name: 'Hospital La Merced',
    image: '/images/convenios/hospital-la-merced-ciudad-bolivar.webp',
    isVisible: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Hospital Marco Fidel Suárez',
    image: '/images/convenios/hospital-marco-fidel-suarez.webp',
    isVisible: true,
    createdAt: '2024-01-02'
  }
];

const mockBienestarEvents: BienestarEvent[] = [
  {
    id: '1',
    title: 'Jornada de Vacunación COVID-19',
    date: '2024-06-15',
    category: 'Salud',
    description: 'Jornada especial de vacunación para todo el personal de salud',
    location: 'Sede Principal ProSalud',
    attendees: 150,
    gift: 'Kit de bioseguridad',
    provider: 'ProSalud',
    images: [
      { url: '/images/galeria_bienestar/evento1_1.webp', alt: 'Vacunación', isMain: true },
      { url: '/images/galeria_bienestar/evento1_2.webp', alt: 'Personal médico', isMain: false }
    ],
    isVisible: true,
    createdAt: '2024-06-01'
  }
];

const mockComfenalcoEvents: ComfenalcoEvent[] = [
  {
    id: '1',
    title: 'Curso de Primeros Auxilios',
    bannerImage: '/images/comfenalco_banners/banner1.webp',
    description: 'Aprende técnicas básicas de primeros auxilios',
    publishDate: '2024-06-01',
    registrationDeadline: '2024-06-20',
    eventDate: '2024-06-25',
    registrationLink: 'https://comfenalco.com/registro1',
    formLink: 'https://forms.comfenalco.com/primeros-auxilios',
    isNew: true,
    category: 'curso',
    displaySize: 'carousel',
    isVisible: true
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Users API
export const usersApi = {
  async getUsers(page = 1, pageSize = 10, search = '', status = ''): Promise<PaginatedResponse<User>> {
    await delay(500);
    
    let filteredUsers = [...mockUsers];
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status) {
      const isActive = status === 'active';
      filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    }
    
    const total = filteredUsers.length;
    const start = (page - 1) * pageSize;
    const data = filteredUsers.slice(start, start + pageSize);
    
    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  },

  async getUserById(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(user => user.id === id) || null;
  },

  async createUser(userData: CreateUserData): Promise<User> {
    await delay(800);
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    await delay(600);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('Usuario no encontrado');
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  },

  async toggleUserStatus(id: string): Promise<User> {
    await delay(400);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('Usuario no encontrado');
    
    mockUsers[userIndex].isActive = !mockUsers[userIndex].isActive;
    return mockUsers[userIndex];
  }
};

// Convenios API
export const conveniosApi = {
  async getConvenios(): Promise<Convenio[]> {
    await delay(400);
    return [...mockConvenios];
  },

  async createConvenio(data: CreateConvenioData): Promise<Convenio> {
    await delay(800);
    const newConvenio: Convenio = {
      id: String(mockConvenios.length + 1),
      name: data.name,
      image: URL.createObjectURL(data.image),
      isVisible: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockConvenios.push(newConvenio);
    return newConvenio;
  },

  async updateConvenio(id: string, data: Partial<CreateConvenioData & { isVisible: boolean }>): Promise<Convenio> {
    await delay(600);
    const convenioIndex = mockConvenios.findIndex(convenio => convenio.id === id);
    if (convenioIndex === -1) throw new Error('Convenio no encontrado');
    
    const updatedData: any = { ...data };
    if (data.image && data.image instanceof File) {
      updatedData.image = URL.createObjectURL(data.image);
    }
    
    mockConvenios[convenioIndex] = { ...mockConvenios[convenioIndex], ...updatedData };
    return mockConvenios[convenioIndex];
  }
};

// Bienestar Events API
export const bienestarApi = {
  async getEvents(): Promise<BienestarEvent[]> {
    await delay(400);
    return [...mockBienestarEvents];
  },

  async createEvent(data: CreateBienestarEventData): Promise<BienestarEvent> {
    await delay(1000);
    const images = data.images.map((file, index) => ({
      url: URL.createObjectURL(file),
      alt: `Imagen ${index + 1}`,
      isMain: index === data.mainImageIndex
    }));

    const newEvent: BienestarEvent = {
      id: String(mockBienestarEvents.length + 1),
      title: data.title,
      date: data.date,
      category: data.category,
      description: data.description,
      location: data.location,
      attendees: data.attendees,
      gift: data.gift,
      provider: data.provider || 'ProSalud',
      images,
      isVisible: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    mockBienestarEvents.push(newEvent);
    return newEvent;
  },

  async updateEvent(id: string, data: Partial<CreateBienestarEventData & { isVisible: boolean }>): Promise<BienestarEvent> {
    await delay(800);
    const eventIndex = mockBienestarEvents.findIndex(event => event.id === id);
    if (eventIndex === -1) throw new Error('Evento no encontrado');
    
    const updatedData: any = { ...data };
    if (data.images) {
      updatedData.images = data.images.map((file, index) => ({
        url: URL.createObjectURL(file),
        alt: `Imagen ${index + 1}`,
        isMain: index === data.mainImageIndex
      }));
    }
    
    mockBienestarEvents[eventIndex] = { ...mockBienestarEvents[eventIndex], ...updatedData };
    return mockBienestarEvents[eventIndex];
  }
};

// Comfenalco Events API
export const comfenalcoApi = {
  async getEvents(): Promise<ComfenalcoEvent[]> {
    await delay(400);
    return [...mockComfenalcoEvents];
  },

  async createEvent(data: CreateComfenalcoEventData): Promise<ComfenalcoEvent> {
    await delay(1000);
    const newEvent: ComfenalcoEvent = {
      id: String(mockComfenalcoEvents.length + 1),
      title: data.title,
      bannerImage: URL.createObjectURL(data.bannerImage),
      description: data.description,
      publishDate: new Date().toISOString().split('T')[0],
      registrationDeadline: data.registrationDeadline,
      eventDate: data.eventDate,
      registrationLink: data.registrationLink,
      formLink: data.formLink,
      isNew: true,
      category: data.category,
      displaySize: data.displaySize,
      isVisible: true
    };
    
    mockComfenalcoEvents.push(newEvent);
    return newEvent;
  },

  async updateEvent(id: string, data: Partial<CreateComfenalcoEventData & { isVisible: boolean }>): Promise<ComfenalcoEvent> {
    await delay(800);
    const eventIndex = mockComfenalcoEvents.findIndex(event => event.id === id);
    if (eventIndex === -1) throw new Error('Evento no encontrado');
    
    const updatedData: any = { ...data };
    if (data.bannerImage && data.bannerImage instanceof File) {
      updatedData.bannerImage = URL.createObjectURL(data.bannerImage);
    }
    
    mockComfenalcoEvents[eventIndex] = { ...mockComfenalcoEvents[eventIndex], ...updatedData };
    return mockComfenalcoEvents[eventIndex];
  }
};

// Site Configuration API
export const configApi = {
  async getAboutUs(): Promise<AboutUs> {
    await delay(300);
    return {
      mission: 'Promover y defender los derechos de los profesionales de la salud, mejorando sus condiciones laborales y fomentando su desarrollo profesional.',
      vision: 'Ser la organización sindical líder en la defensa de los derechos de los profesionales de la salud en Colombia.'
    };
  },

  async updateAboutUs(data: AboutUs): Promise<AboutUs> {
    await delay(600);
    return data;
  },

  async getMetrics(): Promise<SiteMetrics> {
    await delay(300);
    return {
      yearsExperience: 25,
      conventionsCount: mockConvenios.filter(c => c.isVisible).length,
      affiliatesCount: 1234
    };
  },

  async updateMetrics(data: SiteMetrics): Promise<SiteMetrics> {
    await delay(600);
    return data;
  }
};
