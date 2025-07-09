
import { Convenio, CreateConvenioData } from '@/types/admin';
import { mockConvenios } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const conveniosService = {
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
