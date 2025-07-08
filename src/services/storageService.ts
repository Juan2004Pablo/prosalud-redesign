
// Servicio de almacenamiento escalable - puede usar cualquier proveedor
interface StorageProvider {
  uploadFile(file: File, path: string): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): string;
}

// Implementación mock para desarrollo (puede ser reemplazada por AWS S3, Cloudinary, etc.)
class MockStorageProvider implements StorageProvider {
  private storage = new Map<string, string>();

  async uploadFile(file: File, path: string): Promise<string> {
    // Simular upload - en producción aquí iría la lógica real de upload
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.storage.set(path, dataUrl);
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  }

  async deleteFile(path: string): Promise<void> {
    this.storage.delete(path);
  }

  getFileUrl(path: string): string {
    return this.storage.get(path) || '';
  }
}

// Servicio principal - fácil de cambiar el proveedor
class StorageService {
  private provider: StorageProvider;

  constructor() {
    // Aquí se puede configurar el proveedor (AWS S3, Cloudinary, etc.)
    this.provider = new MockStorageProvider();
  }

  async uploadComfenalcoEventImage(file: File): Promise<string> {
    const path = `comfenalco-events/${Date.now()}-${file.name}`;
    return await this.provider.uploadFile(file, path);
  }

  async deleteComfenalcoEventImage(path: string): Promise<void> {
    return await this.provider.deleteFile(path);
  }

  getImageUrl(path: string): string {
    return this.provider.getFileUrl(path);
  }
}

export const storageService = new StorageService();
