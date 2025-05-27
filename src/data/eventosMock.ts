
import { EventData } from '@/types/eventos';

// Usando URLs de placeholder genéricas de un servicio como placeimg.com o unsplash
// O imágenes que ya tengas en public/lovable-uploads o public/images
// Por simplicidad, usaré placeholders abstractos.
// En una aplicación real, estas serían URLs a imágenes reales.

const baseEvents: EventData[] = [
  {
    id: 'evento-1',
    title: 'Acompañamiento Reunión Cirugía',
    date: '2024-12-05',
    location: 'Hospital Bello Sede Autopista',
    mainImage: { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241205&file=05d4262d-6f56-4fe5-a804-7f3b5edba7ad.jpg', alt: 'Acompañamiento Reunión Cirugía' },
    description: 'Un día especial para reconocer la labor y dedicación de todos nuestros afiliados. Hubo actividades recreativas, música y un almuerzo especial.',
    gift: 'Kit de bienestar ProSalud',
    attendees: 26,
    provider: 'ProSalud',
    additionalImages: [
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241205&file=543d6f5b-675a-4edb-8908-62a5524553e2.jpg', alt: 'Gente celebrando' },
    ],
    category: 'Acompañamiento'
  },
  {
    id: 'evento-2',
    title: 'Celebración día del medico y entrega de aguinaldo',
    date: '2024-12-03',
    location: 'Bello',
    mainImage: { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241203_2&file=3ded3ff3-84b3-4c7c-a5c6-1e2604dd770e.jpg', alt: 'Celebración día del medico' },
    description: 'Campaña de prevención y diagnóstico temprano de problemas visuales. Se ofrecieron exámenes gratuitos y descuentos en lentes.',
    gift: 'Gotas lubricantes para ojos',
    attendees: 9,
    provider: 'ProSalud',
    additionalImages: [
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241203_2&file=5fac6112-6971-4ba4-b082-9a5d99984788.jpg', alt: 'Examen visual' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241203_2&file=9249e7a2-2471-471f-9adc-452e53179499.jpg', alt: 'Lentes y equipos' },
    ],
    category: 'Celebración'
  },
  {
    id: 'evento-3',
    title: 'Celebración día del medico y entrega de aguinaldos',
    date: '2024-12-03',
    location: 'La María sede la 33',
    mainImage: { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=087e2a05-444f-4afe-afc2-ee6169b1efbc.jpg', alt: 'TCelebración día del medico y entrega de aguinaldos' },
    description: 'Un taller interactivo con técnicas y herramientas prácticas para gestionar el estrés laboral y personal, mejorando la calidad de vida.',
    attendees: 60,
    provider: 'ProSalud',
    additionalImages: [
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=38bb889f-a94b-49f8-8b62-43a701b10758.jpg', alt: 'Participantes en taller' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=58f0c0e1-ed25-43f4-ad1a-05b875508622.jpg', alt: 'Ejercicio de relajación' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=635aa054-c5bd-4acb-9f10-8b00530843ac.jpg', alt: 'Participantes en taller' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=83fa956d-0de5-4bf5-9e1d-3437cad82b14.jpg', alt: 'Ejercicio de relajación' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=9aff4819-ccff-49a7-a329-5319f594ec97.jpg', alt: 'Participantes en taller' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=a52b4ad2-f1a7-43ba-86a7-2d09f29c1a20.jpg', alt: 'Ejercicio de relajación' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=b00dd65f-4748-4003-bb3f-0e174881b8dc.jpg', alt: 'Participantes en taller' },
      { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HLM_241203&file=d06ae58a-dc2a-48b0-8b20-45d8de68de57.jpg', alt: 'Ejercicio de relajación' },
    ],
    category: 'Celebración'
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

