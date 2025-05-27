
export interface EventImage {
  src: string;
  alt: string;
}

export interface EventData {
  id: string;
  title: string;
  date: string; // Formato YYYY-MM-DD para facilitar ordenamiento si es necesario
  location?: string;
  mainImage: EventImage;
  description: string;
  gift?: string;
  attendees?: number;
  provider?: string;
  additionalImages?: EventImage[];
  category?: string; // Para futura categorización si se necesita
}
