
import { ComfenalcoEvent } from '@/types/comfenalco';

export const comfenalcoEventsMock: ComfenalcoEvent[] = [
  {
    id: '1',
    title: 'Curso de Gastronomía Internacional',
    bannerImage: '/images/comfenalco_banners/banner1.webp',
    description: 'Aprende técnicas culinarias de diferentes culturas del mundo',
    publishDate: '2024-01-15',
    registrationDeadline: '2024-02-01',
    eventDate: '2024-02-15',
    registrationLink: 'https://comfenalco.com/registro-gastronomia',
    formLink: 'https://forms.comfenalco.com/gastronomia',
    isNew: true,
    isVisible: true,
    category: 'curso',
    displaySize: 'carousel'
  },
  {
    id: '2',
    title: 'Experiencia de Relajación en Spa',
    bannerImage: '/images/comfenalco_banners/banner2.webp',
    description: 'Disfruta de un día completo de relajación y bienestar',
    publishDate: '2024-01-20',
    registrationDeadline: '2024-02-05',
    eventDate: '2024-02-20',
    registrationLink: 'https://comfenalco.com/registro-spa',
    formLink: 'https://forms.comfenalco.com/spa',
    isNew: false,
    isVisible: true,
    category: 'experiencia',
    displaySize: 'mosaic'
  },
  {
    id: '3',
    title: 'Beneficio Descuento en Gimnasios',
    bannerImage: '/images/comfenalco_banners/banner3.webp',
    description: 'Obtén descuentos especiales en gimnasios afiliados',
    publishDate: '2024-01-25',
    registrationDeadline: '2024-02-10',
    eventDate: '2024-03-01',
    registrationLink: 'https://comfenalco.com/registro-gimnasio',
    formLink: 'https://forms.comfenalco.com/gimnasio',
    isNew: true,
    isVisible: false,
    category: 'beneficio',
    displaySize: 'carousel'
  },
  {
    id: '4',
    title: 'Regalo Kit de Bienestar',
    bannerImage: '/images/comfenalco_banners/banner4.webp',
    description: 'Recibe un kit completo para tu bienestar personal',
    publishDate: '2024-02-01',
    registrationDeadline: '2024-02-15',
    eventDate: '2024-03-05',
    registrationLink: 'https://comfenalco.com/registro-kit',
    formLink: 'https://forms.comfenalco.com/kit-bienestar',
    isNew: false,
    isVisible: true,
    category: 'regalo',
    displaySize: 'mosaic'
  },
  {
    id: '5',
    title: 'Recreación Familiar en el Parque',
    bannerImage: '/images/comfenalco_banners/banner5.webp',
    description: 'Disfruta de actividades recreativas para toda la familia',
    publishDate: '2024-02-05',
    registrationDeadline: '2024-02-20',
    eventDate: '2024-03-10',
    registrationLink: 'https://comfenalco.com/registro-recreacion',
    formLink: 'https://forms.comfenalco.com/recreacion-familiar',
    isNew: true,
    isVisible: true,
    category: 'recreacion',
    displaySize: 'carousel'
  }
];
