import Physiotherapist from '@/public/hero-image.webp';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Content */}
          <div className="flex flex-col">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase">
                Dom Fernando Refrigeração
              </span>
            </div>

            <h1 className="max-w-xl text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
              Climatização profissional para empresas que{' '}
              <span className="text-blue-600">exigem qualidade.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Soluções em instalação, manutenção e serviços técnicos em sistemas de ar-condicionado,
              com{' '}
              <strong className="font-semibold text-slate-800">
                17 anos de experiência profissional.
              </strong>
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contato"
                className="inline-flex min-h-14 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Solicitar atendimento
              </a>

              <a
                href="#servicos"
                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 active:scale-[0.98]"
              >
                Conhecer serviços
              </a>
            </div>

            {/* Trust */}
            <div className="mt-8 flex items-center gap-5 border-t border-slate-200 pt-6">
              <div>
                <strong className="block text-2xl font-semibold tracking-tight text-slate-950">
                  17+
                </strong>

                <span className="text-xs text-slate-500">anos de experiência</span>
              </div>

              <div className="h-9 w-px bg-slate-200" />

              <div>
                <strong className="block text-sm font-semibold text-slate-950">Atendimento</strong>

                <span className="text-xs text-slate-500">residencial e empresarial</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

            <figure className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-2xl shadow-slate-900/10">
              <Image
                src={Physiotherapist}
                alt="Imagem de um técnico em ar-condicionado realizando manutenção em um aparelho de ar-condicionado."
                className=""
              />

              <figcaption className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-slate-950/80 p-4 text-white backdrop-blur-md">
                <span className="text-xs font-medium tracking-wider text-blue-300 uppercase">
                  Experiência & qualidade
                </span>

                <p className="mt-1 text-sm font-medium">Soluções em climatização.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
