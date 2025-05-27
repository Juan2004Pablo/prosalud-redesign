
import { EventData } from '@/types/eventos';

// Usando URLs de placeholder genéricas de un servicio como placeimg.com o unsplash
// O imágenes que ya tengas en public/lovable-uploads o public/images
// Por simplicidad, usaré placeholders abstractos.
// En una aplicación real, estas serían URLs a imágenes reales.

export const mockEvents: EventData[] = [
  {
    id: 'evento-1',
    title: 'Celebración Día del Trabajo ProSalud',
    date: '2024-05-01',
    location: 'Sede Principal ProSalud',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?event,celebration', alt: 'Celebración Día del Trabajo' },
    description: 'Un día especial para reconocer la labor y dedicación de todos nuestros afiliados. Hubo actividades recreativas, música y un almuerzo especial.',
    gift: 'Kit de bienestar ProSalud',
    attendees: 150,
    provider: 'Comité de Bienestar ProSalud',
    additionalImages: [
      { src: 'https://source.unsplash.com/random/800x600?party,people', alt: 'Gente celebrando' },
      { src: 'https://source.unsplash.com/random/800x600?event,music', alt: 'Música en el evento' },
      { src: 'https://source.unsplash.com/random/800x600?food,gathering', alt: 'Comida del evento' },
    ],
    category: 'Celebraciones'
  },
  {
    id: 'evento-2',
    title: 'Jornada de Salud Visual',
    date: '2024-06-15',
    location: 'Clínica Oftalmológica Aliada',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?health,eyes', alt: 'Jornada de Salud Visual' },
    description: 'Campaña de prevención y diagnóstico temprano de problemas visuales. Se ofrecieron exámenes gratuitos y descuentos en lentes.',
    gift: 'Gotas lubricantes para ojos',
    attendees: 85,
    provider: 'Óptica Visión Clara',
    additionalImages: [
      { src: 'https://source.unsplash.com/random/800x600?doctor,patient', alt: 'Examen visual' },
      { src: 'https://source.unsplash.com/random/800x600?glasses,optometry', alt: 'Lentes y equipos' },
    ],
    category: 'Salud'
  },
  {
    id: 'evento-3',
    title: 'Taller de Manejo del Estrés',
    date: '2024-07-20',
    location: 'Auditorio Bienestar Integral',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?wellness,meditation', alt: 'Taller de Manejo del Estrés' },
    description: 'Un taller interactivo con técnicas y herramientas prácticas para gestionar el estrés laboral y personal, mejorando la calidad de vida.',
    attendees: 60,
    provider: 'Consultores en Bienestar Holístico',
    additionalImages: [
      { src: 'https://source.unsplash.com/random/800x600?yoga,workshop', alt: 'Participantes en taller' },
      { src: 'https://source.unsplash.com/random/800x600?mindfulness,relax', alt: 'Ejercicio de relajación' },
    ],
    category: 'Bienestar Mental'
  },
  {
    id: 'evento-4',
    title: 'Torneo Deportivo Anual',
    date: '2024-08-10',
    location: 'Complejo Deportivo Municipal',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?sports,team', alt: 'Torneo Deportivo Anual' },
    description: 'Fomentando la integración y el espíritu deportivo, se realizaron torneos de fútbol, baloncesto y voleibol. ¡Una jornada llena de energía!',
    gift: 'Medallas y trofeos para los ganadores',
    attendees: 200,
    provider: 'Departamento de Deportes ProSalud',
    additionalImages: [
        { src: 'https://source.unsplash.com/random/800x600?soccer,game', alt: 'Partido de fútbol' },
        { src: 'https://source.unsplash.com/random/800x600?basketball,action', alt: 'Jugada de baloncesto' },
        { src: 'https://source.unsplash.com/random/800x600?volleyball,team', alt: 'Equipo de voleibol' },
    ],
    category: 'Deportes'
  },
  // Agrega más eventos si es necesario para probar la paginación más adelante
];
