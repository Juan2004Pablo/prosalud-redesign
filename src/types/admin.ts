
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Convenio {
  id: string;
  name: string;
  image: string;
  isVisible: boolean;
  createdAt: string;
}

export interface BienestarEvent {
  id: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  category: string;
  description?: string;
  location?: string;
  attendees?: number;
  gift?: string;
  provider: string;
  images: { url: string; alt?: string; isMain: boolean }[];
  isVisible: boolean;
  createdAt: string;
}

export interface ComfenalcoEvent {
  id: string;
  title: string;
  bannerImage: string;
  description?: string;
  publishDate: string;
  registrationDeadline?: string;
  eventDate?: string;
  registrationLink: string;
  formLink: string;
  isNew: boolean;
  category: string;
  displaySize: 'carousel' | 'mosaic';
  isVisible: boolean;
}

export interface AboutUs {
  mission: string;
  vision: string;
}

export interface SiteMetrics {
  yearsExperience: number;
  conventionsCount: number;
  affiliatesCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  isActive?: boolean;
}

export interface CreateConvenioData {
  name: string;
  image: File;
}

export interface CreateBienestarEventData {
  title: string;
  date: string;
  category: string;
  description?: string;
  location?: string;
  attendees?: number;
  gift?: string;
  provider?: string;
  images: File[];
  mainImageIndex: number;
}

export interface CreateComfenalcoEventData {
  title: string;
  bannerImage: string; // Changed from File to string since we store the URL
  description?: string;
  registrationDeadline?: string;
  eventDate?: string;
  registrationLink: string;
  formLink: string;
  category: string;
  displaySize: 'carousel' | 'mosaic';
}
