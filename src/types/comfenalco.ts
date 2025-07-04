
export interface ComfenalcoEvent {
  id: string;
  title: string;
  bannerImage: string;
  description?: string;
  publishDate: string;
  registrationDeadline?: string;
  eventDate?: string;
  registrationLink?: string;
  formLink: string; // Nuevo campo para el enlace del formulario de Comfenalco
  isNew: boolean;
  isVisible: boolean; // Nueva propiedad para controlar la visibilidad
  category: 'curso' | 'experiencia' | 'beneficio' | 'regalo' | 'recreacion';
  displaySize: 'carousel' | 'mosaic'; // Nueva propiedad para controlar dónde se muestra
}
