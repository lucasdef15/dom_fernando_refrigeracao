import Image from 'next/image';
import heroImage from '@/public/hero-img.webp';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-brand-navy-deep text-text-inverse relative isolate overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 lg:left-[30%]">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover object-center lg:object-[center_42%]"
          />
        </div>

        <div className="bg-brand-navy-deep/35 absolute inset-0" />
        <div className="from-brand-navy-deep via-brand-navy-deep/95 to-brand-navy-deep/15 absolute inset-0 bg-gradient-to-r" />
        <div className="from-brand-navy-deep/75 to-brand-navy-deep/10 absolute inset-0 bg-gradient-to-t via-transparent" />
        <div className="bg-brand-navy-deep/55 absolute inset-0 lg:hidden" />
        <div className="from-brand-navy-deep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r to-transparent" />
        <div className="via-brand-ice/60 absolute top-0 right-0 hidden h-px w-2/3 bg-gradient-to-r from-transparent to-transparent lg:block" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-(--content-max) grid-rows-[1fr_auto] content-between gap-10 px-[var(--page-gutter)] py-10 sm:gap-12 sm:py-12 lg:min-h-[min(760px,calc(100dvh-76px))] lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-8 lg:py-[clamp(2rem,6dvh,5rem)] xl:gap-12">
        <div className="relative z-10 flex flex-col justify-center gap-0">
          <div className="mb-5 flex items-center gap-3 sm:mb-6 lg:mb-4">
            <span className="bg-brand-ice-strong h-2 w-2 rounded-full shadow-[0_0_14px_var(--brand-ice-strong)]" />
            <span className="text-brand-ice text-xs font-semibold tracking-[0.2em] uppercase">
              Climatização, refrigeração e automação
            </span>
          </div>

          <h1 className="text-text-inverse max-w-2xl text-[clamp(2rem,3.2vw,4.25rem)] leading-[1.06] font-bold tracking-[-0.04em]">
            Sistemas que mantêm a operação.{' '}
            <span className="text-brand-ice-strong">Com quem entende do sistema.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">
            Instalação, manutenção e serviços técnicos em refrigeração, ar-condicionado,{' '}
            <strong className="font-semibold text-white">sistemas VRF e automação.</strong>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a
              href="#contato"
              className="rounded-control bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary-hover hover:shadow-card inline-flex min-h-14 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Solicitar atendimento
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#servicos"
              className="group rounded-control hover:border-brand-ice hover:bg-brand-ice/10 inline-flex min-h-14 items-center justify-center gap-3 border border-white/25 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300"
            >
              Conhecer serviços
              <span className="text-brand-ice transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 sm:mt-9 sm:gap-5 lg:mt-7">
            {/* Experiência */}
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-sm sm:gap-4 sm:p-4">
              <span className="shrink-0 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                17<span className="text-brand-ice-strong">+</span>
              </span>

              <div className="min-w-0">
                <span className="block text-[11px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                  Anos de
                </span>
                <strong className="block text-xs leading-4 font-semibold text-white sm:text-sm sm:leading-5">
                  experiência
                </strong>
              </div>
            </div>

            {/* Especialidade */}
            <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-sm sm:gap-3 sm:p-4">
              <span
                aria-hidden="true"
                className="text-brand-ice-strong shrink-0 text-2xl sm:text-3xl"
              >
                ◈
              </span>

              <div className="min-w-0">
                <strong className="block text-xs leading-4 font-semibold text-white sm:text-sm sm:leading-5">
                  VRF e automação
                </strong>
                <span className="mt-1 block text-[10px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                  Residencial e empresarial
                </span>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="hidden min-h-[300px] lg:block lg:min-h-0" />
      </div>

      <div className="via-brand-ice/50 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />
    </section>
  );
}
