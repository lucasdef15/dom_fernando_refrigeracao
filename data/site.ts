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
    description: 'Ar-condicionado, refrigeração e a infraestrutura para o sistema funcionar direito.',
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
    src: 'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Imagem de referência de manutenção técnica em equipamento de climatização.',
    label: 'Manutenção',
    sourceHref: 'https://www.pexels.com/search/air%20condition%20repair/',
  },
  {
    id: 'instalacao',
    kind: 'image',
    src: 'https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Imagem de referência de uma unidade externa de climatização.',
    label: 'Instalação',
    sourceHref: 'https://www.pexels.com/search/air%20conditioning/',
  },
  {
    id: 'video-manutencao',
    kind: 'video',
    poster: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Vídeo de referência sobre manutenção em sistemas de refrigeração.',
    label: 'Manutenção técnica',
    duration: '00:18',
    sourceHref: 'https://www.pexels.com/search/videos/hvac%20maintenance/',
  },
  {
    id: 'assistencia',
    kind: 'image',
    src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Imagem de referência de detalhe técnico em um equipamento.',
    label: 'Assistência',
    sourceHref: 'https://www.pexels.com/search/refrigeration%20technicians/',
  },
  {
    id: 'video-refrigeracao',
    kind: 'video',
    poster: 'https://images.pexels.com/photos/257881/pexels-photo-257881.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Vídeo de referência de equipamento de refrigeração.',
    label: 'Refrigeração',
    duration: '00:32',
    sourceHref: 'https://www.pexels.com/search/videos/refrigeration/',
  },
  {
    id: 'automacao',
    kind: 'image',
    src: 'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Imagem de referência de painel de controle para automação.',
    label: 'Automação',
    sourceHref: 'https://www.pexels.com/search/automation%20control%20panel/',
  },
];
