
import { ComfenalcoEvent } from '@/types/comfenalco';

export const comfenalcoEventsMock: ComfenalcoEvent[] = [
  {
    id: '1',
    title: 'Cata de Vinos Premium',
    bannerImage: '/images/comfenalcoSection/banner1.webp',
    description: 'Disfruta de una experiencia única degustando los mejores vinos con expertos sommeliers',
    publishDate: '2024-12-20',
    registrationDeadline: '2024-12-30',
    eventDate: '2025-01-15',
    registrationLink: '#',
    formLink: 'https://comfenalco.com/formulario-cata-vinos',
    isNew: true,
    category: 'experiencia',
    displaySize: 'carousel'
  },
  {
    id: '2',
    title: 'Experiencias Gastronómicas',
    bannerImage: '/images/comfenalcoSection/banner2.webp',
    description: 'Vive momentos únicos con nuestras experiencias culinarias especiales',
    publishDate: '2024-12-18',
    eventDate: '2025-01-20',
    registrationLink: '#',
    formLink: 'https://comfenalco.com/formulario-experiencias-gastronomicas',
    isNew: true,
    category: 'experiencia',
    displaySize: 'carousel'
  },
  {
    id: '3',
    title: 'Beneficios Exclusivos Comfenalco',
    bannerImage: '/images/comfenalcoSection/banner3.webp',
    description: 'Conoce todos los beneficios y servicios disponibles para ti y tu familia',
    publishDate: '2024-12-15',
    registrationLink: '#',
    formLink: 'https://comfenalco.com/formulario-beneficios-exclusivos',
    isNew: false,
    category: 'beneficio',
    displaySize: 'carousel'
  },
  {
    id: '4',
    title: 'Cine al Aire Libre',
    bannerImage: '/images/comfenalcoSection/banner4.webp',
    description: 'Disfruta de las mejores películas bajo las estrellas con toda la familia',
    publishDate: '2024-12-10',
    registrationDeadline: '2024-12-28',
    eventDate: '2025-01-05',
    registrationLink: '#',
    formLink: 'https://comfenalco.com/formulario-cine-aire-libre',
    isNew: false,
    category: 'recreacion',
    displaySize: 'mosaic'
  },
  {
    id: '5',
    title: 'Taller de Maquillaje Profesional',
    bannerImage: '/images/comfenalcoSection/banner5.webp',
    description: 'Aprende técnicas profesionales de maquillaje con expertos del sector',
    publishDate: '2024-12-22',
    registrationDeadline: '2025-01-05',
    eventDate: '2025-01-12',
    registrationLink: '#',
    formLink: 'https://comfenalco.com/formulario-taller-maquillaje',
    isNew: true,
    category: 'curso',
    displaySize: 'mosaic'
  }
];
