const services = [
  {
    title: 'Instalação',
    description:
      'Ar-condicionado, refrigeração e a infraestrutura para o sistema funcionar direito.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="7" rx="1.5" />
        <path d="M7 11v3M12 11v5M17 11v3M8 20h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Manutenção',
    description: 'Limpeza e preventiva para o sistema manter desempenho, antes da falha aparecer.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          d="M14.5 6.5a4 4 0 0 0-5.7 5.3L4 16.6 7.4 20l4.8-4.8a4 4 0 0 0 5.3-5.7l-2.4 2.4-2.2-2.2 2.4-2.4Z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Sistemas VRF',
    description: 'Projetos com vários ambientes, em que eficiência e controle pesam na operação.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <rect x="4" y="3" width="10" height="8" rx="1.2" />
        <rect x="10" y="13" width="10" height="8" rx="1.2" />
        <path d="M14 7h6M4 17h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Assistência técnica',
    description: 'Diagnóstico e reparo em climatização, refrigeração e placas inverter.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          strokeLinecap="round"
          d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6"
        />
      </svg>
    ),
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="bg-surface py-(--section-space,5rem)">
      <div className="mx-auto max-w-(--content-max) px-[var(--page-gutter)]">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              className="text-brand-gold h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 16.5 5.2 8l3.3 3.2L12 5l3.5 6.2L18.8 8 20 16.5H4Zm1.2 1.5h13.6v1.6c0 .5-.4.9-.9.9H6.1c-.5 0-.9-.4-.9-.9V18Z" />
            </svg>
            <span className="text-text-secondary text-xs font-semibold tracking-[0.22em] uppercase">
              Serviços
            </span>
            <span className="bg-brand-gold/70 h-px w-10" />
          </div>

          <h2 className="text-primary text-3xl leading-[1.12] font-bold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]">
            Soluções completas em climatização e refrigeração.
          </h2>

          <p className="text-text-secondary mt-4 text-base leading-7">
            Instalação, manutenção e assistência para residência e empresa. E, quando o sistema
            precisa trabalhar sozinho, a automação entra em qualquer refrigeração.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="bg-surface-dark shadow-card rounded-card relative flex flex-col overflow-hidden p-6 sm:col-span-2 sm:p-8 lg:row-span-2">
            <span className="via-brand-ice-strong absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />

            <div className="flex items-center justify-between gap-4">
              <span className="bg-brand-ice/15 text-brand-ice-light inline-flex h-12 w-12 items-center justify-center rounded-xl">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M8 20h8M9 10.5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-brand-gold text-[0.68rem] font-semibold tracking-[0.2em] uppercase">
                Destaque
              </span>
            </div>

            <h3 className="text-text-inverse mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
              Automação que vale para qualquer refrigeração.
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              Split, VRF ou câmara fria: o controle deixa de depender de alguém no painel. O sistema
              segura temperatura, rotina e resposta — no ar-condicionado e em todo tipo de
              refrigeração.
            </p>

            <a
              href="https://wa.me/5516988398447"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
            >
              <span className="text-brand-ice-light">Quero automatizar o sistema</span>
              <span aria-hidden="true" className="text-brand-ice-light">
                →
              </span>
            </a>
          </li>

          {services.map((service) => (
            <li
              key={service.title}
              className="border-border bg-surface-raised shadow-soft rounded-card flex flex-col border p-6"
            >
              <span className="bg-surface text-primary mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl">
                <span className="h-6 w-6">{service.icon}</span>
              </span>
              <h3 className="text-primary text-lg font-semibold tracking-tight">{service.title}</h3>
              <p className="text-text-secondary mt-2 text-sm leading-6">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
