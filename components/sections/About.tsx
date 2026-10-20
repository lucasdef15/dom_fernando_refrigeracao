import Image from 'next/image';

import heroImage from '@/public/hero-img.webp';

export default function About() {
  return (
    <section id="sobre" className="bg-surface py-(--section-space,5rem)">
      <div className="mx-auto grid max-w-(--content-max) gap-10 px-[var(--page-gutter)] lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="order-2 lg:order-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-brand-gold text-xs font-semibold tracking-[0.22em] uppercase">
              Sobre Fernando
            </span>
            <span className="bg-brand-gold h-px w-10" />
          </div>
          <h2 className="text-primary text-3xl leading-[1.12] font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Experiência técnica para cuidar de sistemas de refrigeração.
          </h2>
          <div className="text-text-secondary mt-6 max-w-xl space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
            <p>
              Fernando é o profissional responsável pela Dom Fernando Refrigerações, com atuação
              em refrigeração e automação de sistemas de ar-condicionado.
            </p>
            <p>
              A experiência abrange manutenção, instalação, sistemas VRF e equipamentos inverter
              para atendimento residencial e empresarial.
            </p>
          </div>
        </div>

        <div className="order-1 overflow-hidden rounded-[1.5rem] border border-border bg-surface-muted shadow-card lg:order-2">
          <div className="relative aspect-[4/5]">
            <Image
              src={heroImage}
              alt="Profissional realizando atendimento técnico em climatização."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
