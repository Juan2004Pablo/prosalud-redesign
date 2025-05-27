
import { EventData } from '@/types/eventos';

// Usando URLs de placeholder genéricas de un servicio como placeimg.com o unsplash
// O imágenes que ya tengas en public/lovable-uploads o public/images
// Por simplicidad, usaré placeholders abstractos.
// En una aplicación real, estas serían URLs a imágenes reales.

const baseEvents: EventData[] = [
  {
    id: 'evento-1',
    title: 'Acompañamiento Reunión Cirugía',
    date: '05 Diciembre 2024',
    location: 'Sede Principal ProSalud',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?event,celebration&sig=1', alt: 'Celebración Día del Trabajo' },
    description: 'Un día especial para reconocer la labor y dedicación de todos nuestros afiliados. Hubo actividades recreativas, música y un almuerzo especial.',
    gift: 'Kit de bienestar ProSalud',
    attendees: 150,
    provider: 'Comité de Bienestar ProSalud',
    additionalImages: [
      { src: 'https://source.unsplash.com/random/800x600?party,people&sig=2', alt: 'Gente celebrando' },
      { src: 'https://source.unsplash.com/random/800x600?event,music&sig=3', alt: 'Música en el evento' },
      { src: 'https://source.unsplash.com/random/800x600?food,gathering&sig=4', alt: 'Comida del evento' },
    ],
    category: 'Celebraciones'
  },
  {
    id: 'evento-2',
    title: 'Jornada de Salud Visual',
    date: '2024-06-15',
    location: 'Clínica Oftalmológica Aliada',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?health,eyes&sig=5', alt: 'Jornada de Salud Visual' },
    description: 'Campaña de prevención y diagnóstico temprano de problemas visuales. Se ofrecieron exámenes gratuitos y descuentos en lentes.',
    gift: 'Gotas lubricantes para ojos',
    attendees: 85,
    provider: 'Óptica Visión Clara',
    additionalImages: [
      { src: 'https://source.unsplash.com/random/800x600?doctor,patient&sig=6', alt: 'Examen visual' },
      { src: 'https://source.unsplash.com/random/800x600?glasses,optometry&sig=7', alt: 'Lentes y equipos' },
    ],
    category: 'Salud'
  },
  {
    id: 'evento-3',
    title: 'Taller de Manejo del Estrés',
    date: '2024-07-20',
    location: 'Auditorio Bienestar Integral',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?wellness,meditation&sig=8', alt: 'Taller de Manejo del Estrés' },
    description: 'Un taller interactivo con técnicas y herramientas prácticas para gestionar el estrés laboral y personal, mejorando la calidad de vida.',
    attendees: 60,
    provider: 'Consultores en Bienestar Holístico',
    additionalImages: [
      { src: 'https://source.unsplash.com/random/800x600?yoga,workshop&sig=9', alt: 'Participantes en taller' },
      { src: 'https://source.unsplash.com/random/800x600?mindfulness,relax&sig=10', alt: 'Ejercicio de relajación' },
    ],
    category: 'Bienestar Mental'
  },
  {
    id: 'evento-4',
    title: 'Torneo Deportivo Anual',
    date: '2024-08-10',
    location: 'Complejo Deportivo Municipal',
    mainImage: { src: 'https://source.unsplash.com/random/400x300?sports,team&sig=11', alt: 'Torneo Deportivo Anual' },
    description: 'Fomentando la integración y el espíritu deportivo, se realizaron torneos de fútbol, baloncesto y voleibol. ¡Una jornada llena de energía!',
    gift: 'Medallas y trofeos para los ganadores',
    attendees: 200,
    provider: 'Departamento de Deportes ProSalud',
    additionalImages: [
        { src: 'https://source.unsplash.com/random/800x600?soccer,game&sig=12', alt: 'Partido de fútbol' },
        { src: 'https://source.unsplash.com/random/800x600?basketball,action&sig=13', alt: 'Jugada de baloncesto' },
        { src: 'https://source.unsplash.com/random/800x600?volleyball,team&sig=14', alt: 'Equipo de voleibol' },
    ],
    category: 'Deportes'
  },
];

export const mockEvents: EventData[] = [...baseEvents];

const totalEventsToGenerate = 72;
const existingEventsCount = baseEvents.length;

for (let i = existingEventsCount + 1; i <= totalEventsToGenerate; i++) {
  const baseEventIndex = (i - 1) % existingEventsCount;
  const baseEvent = baseEvents[baseEventIndex];
  
  // Create a slightly varied date to avoid exact duplicates if sorting by date later
  const baseDate = new Date(baseEvent.date);
  const newDate = new Date(baseDate.setDate(baseDate.getDate() + (i - baseEventIndex * 4))); // Simple date variation

  mockEvents.push({
    ...baseEvent,
    id: `evento-${i}`,
    title: `${baseEvent.title} (Edición ${Math.ceil(i / existingEventsCount)})`,
    // Ensure unique image by adding a unique query param (sig for signature)
    mainImage: { 
      ...baseEvent.mainImage, 
      src: `${baseEvent.mainImage.src.split('&sig=')[0]}&sig=${i * 100}` 
    },
    date: newDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
    additionalImages: baseEvent.additionalImages?.map((img, index) => ({
      ...img,
      src: `${img.src.split('&sig=')[0]}&sig=${i * 100 + index + 1}`
    }))
  });
}

// Ordenar eventos por fecha descendente (más recientes primero)
mockEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

