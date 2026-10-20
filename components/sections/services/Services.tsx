import { services, site } from '@/data/site';

function ServiceIcon({ id }: { id: (typeof services)[number]['id'] }) {
  if (id === 'instalacao') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="7" rx="1.5" /><path d="M7 11v3M12 11v5M17 11v3M8 20h8" strokeLinecap="round" /></svg>;
  }

  if (id === 'manutencao') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.7 5.3L4 16.6 7.4 20l4.8-4.8a4 4 0 0 0 5.3-5.7l-2.4 2.4-2.2-2.2 2.4-2.4Z" strokeLinejoin="round" /></svg>;
  }

  if (id === 'vrf') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="4" y="3" width="10" height="8" rx="1.2" /><rect x="10" y="13" width="10" height="8" rx="1.2" /><path d="M14 7h6M4 17h4" strokeLinecap="round" /></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" /></svg>;
}

export default function Services() {
  return (
    <section id="servicos" className="bg-background py-(--section-space,5rem)">
      <div className="mx-auto max-w-(--content-max) px-[var(--page-gutter)]">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-brand-gold h-px w-10" />
              <span className="text-brand-gold text-xs font-semibold tracking-[0.22em] uppercase">Serviços</span>
            </div>
            <h2 className="text-primary text-3xl leading-[1.12] font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Soluções completas em climatização e refrigeração.
            </h2>
          </div>
          <p className="text-text-secondary max-w-xl text-base leading-7 lg:col-span-6 lg:col-start-7 sm:text-lg sm:leading-8">
            Instalação, manutenção e assistência para residência e empresa. Quando o sistema precisa
            trabalhar com mais autonomia, a automação entra em qualquer refrigeração.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          <article className="bg-surface-dark shadow-card relative overflow-hidden rounded-card p-6 sm:p-8 lg:col-span-2 lg:row-span-2">
            <span className="via-brand-ice-strong absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <span className="bg-brand-ice/15 text-brand-ice-light inline-flex h-12 w-12 items-center justify-center rounded-xl">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M9 10.5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="text-brand-gold text-[0.68rem] font-semibold tracking-[0.2em] uppercase">Destaque</span>
            </div>
            <h3 className="text-text-inverse mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">Automação que vale para qualquer refrigeração.</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              Split, VRF ou câmara fria: a automação ajuda a organizar temperatura e rotinas do
              sistema de refrigeração.
            </p>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-brand-ice-light mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              Quero conversar sobre automação <span aria-hidden="true">→</span>
            </a>
          </article>

          {services.map((service) => (
            <article key={service.id} className="border-border bg-surface-raised shadow-soft rounded-card border p-6">
              <span className="bg-surface text-primary mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl"><span className="h-6 w-6"><ServiceIcon id={service.id} /></span></span>
              <h3 className="text-primary text-lg font-semibold tracking-tight">{service.title}</h3>
              <p className="text-text-secondary mt-2 text-sm leading-6">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
