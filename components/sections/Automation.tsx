import { site } from '@/data/site';

const topics = [
  {
    title: 'Temperatura',
    description:
      'Monitoramento contínuo e ajuste automático para manter a faixa ideal sem desperdício de energia.',
  },
  {
    title: 'Rotinas',
    description:
      'Programação de ciclos, descongelamento e horários de operação de acordo com a rotina do ambiente.',
  },
  {
    title: 'Controle',
    description:
      'Acesso remoto, alertas em tempo real e histórico de desempenho para agir antes da falha.',
  },
];

export default function Automation() {
  return (
    <section
      id="automacao"
      className="bg-surface-dark text-text-inverse overflow-hidden py-(--section-space,5rem)"
    >
      <div className="mx-auto grid max-w-(--content-max) gap-12 px-[var(--page-gutter)] lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-brand-gold h-px w-10" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.22em] uppercase">
              Automação
            </span>
          </div>
          <h2 className="max-w-xl text-3xl leading-[1.12] font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Automação que organiza a temperatura e as rotinas do seu sistema.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            De splits a câmaras frias, a automação transforma o sistema de refrigeração em algo
            previsível: controla a temperatura com precisão, programa rotinas de operação e avisa
            quando algo precisa de atenção — tudo para o equipamento trabalhar com mais eficiência e
            menos intervenção manual.
          </p>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-control bg-secondary text-secondary-foreground mt-9 inline-flex min-h-13 items-center justify-center px-6 py-3 text-sm font-semibold transition-colors hover:bg-white"
          >
            Falar sobre automação <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {topics.map((topic, index) => (
            <div
              key={topic.title}
              className={`flex min-h-40 flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:min-h-48 sm:p-7 ${index === 2 ? 'col-span-2' : ''}`}
            >
              <span className="text-brand-ice-strong text-xs font-semibold tracking-[0.2em] uppercase">
                0{index + 1}
              </span>
              <strong className="mt-3 text-xl text-white sm:text-2xl">{topic.title}</strong>
              <span className="mt-2 text-sm leading-6 text-white/60">{topic.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
