export type GalleryImage = {
  id: string;
  kind: 'image';
  src: string;
  alt: string;
  label: string;
  sourceHref: string;
};

export type GalleryVideo = {
  id: string;
  kind: 'video';
  poster: string;
  alt: string;
  label: string;
  duration: string;
  sourceHref: string;
};

export type GalleryItem = GalleryImage | GalleryVideo;

export const site = {
  name: 'Dom Fernando Refrigerações',
  whatsapp: {
    href: 'https://wa.me/5516988398447',
    label: 'Fale com a Dom Fernando pelo WhatsApp',
  },
  navigation: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Automação', href: '#automacao' },
    { label: 'Sobre', href: '#sobre' },
  ],
  metadata: {
    title: 'Dom Fernando Refrigerações | Climatização e automação',
    description:
      'Instalação, manutenção e serviços técnicos em climatização, refrigeração, sistemas VRF e automação.',
  },
} as const;

export const services = [
  {
    id: 'instalacao',
    title: 'Instalação',
    description:
      'Ar-condicionado, refrigeração e a infraestrutura para o sistema funcionar direito.',
  },
  {
    id: 'manutencao',
    title: 'Manutenção',
    description: 'Limpeza e preventiva para o sistema manter desempenho, antes da falha aparecer.',
  },
  {
    id: 'vrf',
    title: 'Sistemas VRF',
    description: 'Projetos com vários ambientes, em que eficiência e controle pesam na operação.',
  },
  {
    id: 'assistencia',
    title: 'Assistência técnica',
    description: 'Diagnóstico e reparo em climatização, refrigeração e placas inverter.',
  },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'manutencao',
    kind: 'image',
    src: '/gallery/img_manutencao.jpg',
    alt: 'Manutenção técnica em equipamento de climatização.',
    label: 'Manutenção',
    sourceHref: '',
  },
  {
    id: 'video-instalacao',
    kind: 'video',
    poster: '/gallery/img_instalacao.jpg',
    alt: 'Instalação de equipamento de climatização.',
    label: 'Instalação',
    duration: '00:04',
    sourceHref: 'https://youtube.com/shorts/BhnMhAm90xo',
  },
  {
    id: 'video-manutencao',
    kind: 'video',
    poster: '/gallery/img_video_manutencao.jpg',
    alt: 'Manutenção em sistemas de refrigeração.',
    label: 'Manutenção técnica',
    duration: '00:06',
    sourceHref: 'https://youtube.com/shorts/73zg3b3MMGo',
  },
  {
    id: 'assistencia',
    kind: 'image',
    src: '/gallery/img_assistencia.jpg',
    alt: 'Detalhe técnico em um equipamento.',
    label: 'Assistência',
    sourceHref: '',
  },
  {
    id: 'video-refrigeracao',
    kind: 'video',
    poster: '/gallery/video_refrigeracao.mp4',
    alt: 'Referência refrigeração.',
    label: 'Refrigeração',
    duration: '00:20',
    sourceHref: 'https://youtube.com/shorts/0KHgnjSPhP8?feature=share',
  },
  {
    id: 'automacao',
    kind: 'image',
    src: '/gallery/img_automacao.jpg',
    alt: 'Painel de controle para automação em sistemas de UTAs.',
    label: 'Automação',
    sourceHref: '',
  },
];
