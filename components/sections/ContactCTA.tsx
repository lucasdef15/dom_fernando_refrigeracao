import { site } from '@/data/site';

export default function ContactCTA() {
  return (
    <section id="contato" className="bg-background py-(--section-space,5rem)">
      <div className="mx-auto max-w-(--content-max) px-[var(--page-gutter)]">
        <div className="bg-primary relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20 lg:px-20">
          <div className="bg-brand-ice/10 pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="text-brand-ice text-xs font-semibold tracking-[0.22em] uppercase">
              Atendimento direto
            </span>
            <h2 className="mt-5 text-3xl leading-[1.1] font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Vamos conversar sobre o seu sistema?
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Abra uma conversa pelo WhatsApp para explicar o que você precisa.
            </p>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-control bg-secondary text-secondary-foreground hover:bg-white mt-9 inline-flex min-h-14 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold transition-colors"
            >
              Iniciar atendimento via WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
