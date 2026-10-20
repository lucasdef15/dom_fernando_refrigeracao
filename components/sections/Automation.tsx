import { site } from '@/data/site';

const topics = ['Temperatura', 'Rotinas', 'Controle'];

export default function Automation() {
  return (
    <section id="automacao" className="bg-surface-dark overflow-hidden py-(--section-space,5rem) text-text-inverse">
      <div className="mx-auto grid max-w-(--content-max) gap-12 px-[var(--page-gutter)] lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-brand-gold h-px w-10" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.22em] uppercase">
              Automação
            </span>
          </div>
          <h2 className="max-w-xl text-3xl leading-[1.12] font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Controle de refrigeração pensado para a sua rotina.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            De splits a câmaras frias, a automação pode organizar o controle de temperatura e as
            rotinas do sistema de refrigeração.
          </p>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-control bg-secondary text-secondary-foreground hover:bg-white mt-9 inline-flex min-h-13 items-center justify-center px-6 py-3 text-sm font-semibold transition-colors"
          >
            Falar sobre automação <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {topics.map((topic, index) => (
            <div
              key={topic}
              className={`flex min-h-40 flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:min-h-48 sm:p-7 ${index === 2 ? 'col-span-2' : ''}`}
            >
              <span className="text-brand-ice-strong text-xs font-semibold tracking-[0.2em] uppercase">
                0{index + 1}
              </span>
              <strong className="mt-3 text-xl text-white sm:text-2xl">{topic}</strong>
              <span className="mt-2 text-sm leading-6 text-white/60">
                Uma camada de organização para o sistema.
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
