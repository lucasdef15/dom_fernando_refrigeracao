import React from 'react';

export default function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-slate-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a
          href="/"
          aria-label="Dom Fernando Refrigeração - início"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
            DF
          </div>

          <div className="leading-none">
            <span className="block text-sm font-bold tracking-tight text-slate-950">
              DOM FERNANDO
            </span>

            <span className="mt-1 block text-[10px] font-medium tracking-[0.16em] text-slate-500 uppercase">
              Refrigeração
            </span>
          </div>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          <a
            href="#servicos"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Serviços
          </a>

          <a
            href="#experiencia"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Experiência
          </a>

          <a
            href="#sobre"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Sobre
          </a>

          <a
            href="#contato"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            Fale conosco
          </a>
        </nav>

        <a
          href="#contato"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 md:hidden"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
