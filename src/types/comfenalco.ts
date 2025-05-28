
export interface ComfenalcoEvent {
  id: string;
  title: string;
  bannerImage: string;
  description?: string;
  publishDate: string;
  registrationDeadline?: string;
  eventDate?: string;
  registrationLink?: string;
  isNew: boolean;
  category: 'curso' | 'experiencia' | 'beneficio' | 'regalo' | 'recreacion';
}
