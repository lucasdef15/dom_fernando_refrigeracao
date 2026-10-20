export default function TrustBar() {
  return (
    <section aria-label="Destaques da Dom Fernando" className="border-y border-border bg-surface py-10 sm:py-12">
      <div className="mx-auto grid max-w-(--content-max) gap-7 px-[var(--page-gutter)] sm:grid-cols-3 sm:gap-8">
        <div>
          <span className="text-brand-gold text-3xl font-bold tracking-tight">17+</span>
          <p className="mt-1 text-sm font-semibold text-primary">Anos de experiência</p>
        </div>
        <div className="border-border sm:border-l sm:pl-8">
          <p className="text-sm font-semibold text-primary">Atendimento residencial e empresarial</p>
          <p className="mt-1 text-sm leading-6 text-text-secondary">
            Soluções para diferentes ambientes e necessidades de operação.
          </p>
        </div>
        <div className="border-border sm:border-l sm:pl-8">
          <p className="text-sm font-semibold text-primary">Climatização, refrigeração e automação</p>
          <p className="mt-1 text-sm leading-6 text-text-secondary">
            Do atendimento técnico à manutenção de sistemas.
          </p>
        </div>
      </div>
    </section>
  );
}
