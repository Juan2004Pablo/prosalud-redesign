
import { EventData } from '@/types/eventos';

// Usando URLs de placeholder genéricas de un servicio como placeimg.com o unsplash
// O imágenes que ya tengas en public/lovable-uploads o public/images
// Por simplicidad, usaré placeholders abstractos.
// En una aplicación real, estas serían URLs a imágenes reales.

export const mockEvents: EventData[] = [
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
    title: 'Simulacro de evacuación HMFS sede Niquia',
    date: '2024-11-21',
    location: 'HMFS sede Niquia',
    mainImage: { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=0e0ea685-c576-43a5-99d5-d5d0484a5cda.jpg', alt: 'Simulacro emergencias' },
    description: 'Fomentando la integración y el espíritu deportivo, se realizaron torneos de fútbol, baloncesto y voleibol. ¡Una jornada llena de energía!',
    attendees: 200,
    provider: 'Departamento de Deportes ProSalud',
    additionalImages: [
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=2a5355fe-1f46-442f-978f-e0885f56b581.jpg', alt: 'Partido de fútbol' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=4846655f-b292-46d6-946a-36d65248cad2.jpg', alt: 'Jugada de baloncesto' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=5b7863e7-a7ee-45ec-b8e3-6d47eb8eff32.jpg', alt: 'Equipo de voleibol' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=a5b4812c-a395-4b47-86ba-dddaeba56533.jpg', alt: 'Partido de fútbol' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=baa857e4-8380-4a1b-9f66-365770c4630e.jpg', alt: 'Jugada de baloncesto' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241121&file=e606a432-13c5-4dbf-8437-22c62ab4b68b.jpg', alt: 'Equipo de voleibol' },
    ],
    category: 'Simulacro'
  },
  {
    id: 'evento-5',
    title: 'Integración y Esparcimiento Líderes',
    date: '2024-11-22',
    location: 'Hospital Bello Sede Autopista',
    mainImage: { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241122&file=27538880-85d5-4142-acf5-93029e94c768.jpg', alt: 'Cena grupal' },
    description: 'Fomentando la integración y el espíritu deportivo, se realizaron torneos de fútbol, baloncesto y voleibol. ¡Una jornada llena de energía!',
    attendees: 8,
    provider: 'CEISAS',
    additionalImages: [
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241122&file=753102bb-a90f-434e-a1d8-2e573a38e594.jpg', alt: 'Partido de fútbol' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241122&file=799c36a7-38d0-4c9d-90cf-56000989cbd4.jpg', alt: 'Jugada de baloncesto' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HMFS_241122&file=fe81ae0e-1b53-4c66-aa1b-981def0567b3.jpg', alt: 'Equipo de voleibol' },
    ],
    category: 'Integración'
  },
  {
    id: 'evento-6',
    title: 'Celebración día del niñ@ HSJD',
    date: '2024-10-25',
    location: 'Hospital san juan de Dios, sede GMM',
    mainImage: { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=415f8d7d-5833-44ce-88b2-3976df64b0a0.jpg', alt: 'Nino disfrutando' },
    description: 'Fomentando la integración y el espíritu deportivo, se realizaron torneos de fútbol, baloncesto y voleibol. ¡Una jornada llena de energía!',
    attendees: 100,
    gift: 'Regalos y juegos',
    provider: 'ProSalud',
    additionalImages: [
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=49888f05-f9e2-4493-9ddd-8e2b908c0f85.jpg', alt: 'Partido de fútbol' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=c19b7ce3-1128-4c3f-b756-ad5c180e91f3.jpg', alt: 'Jugada de baloncesto' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=8c055c15-6e96-4ad3-b6ca-701fcd4be287.jpg', alt: 'Equipo de voleibol' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=69fb6282-0bb8-4f09-b2dc-cd40815c4c73.jpg', alt: 'Jugada de baloncesto' },
        { src: 'https://www.sindicatoprosalud.com/portal/components/com_eventgallery/helpers/image.php?&width=1600&folder=HSJD_20241025&file=be936b77-a353-4c04-8ac0-37c0a303cc95.jpg', alt: 'Equipo de voleibol' },
    ],
    category: 'Celebración'
  },
];
export const mockEvents: EventData[] = [...events];

// Ordenar eventos por fecha descendente (más recientes primero)
mockEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

