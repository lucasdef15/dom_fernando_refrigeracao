'use client';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo-dom-fernando.svg';
import wtsIcon from '@/public/whatsapp.svg';

const navigation = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Sobre nós', href: '#sobre' },
];

export default function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b border-white/60 shadow-[0_4px_24px_rgb(11_46_85/5%)] backdrop-blur-2xl">
      <div className="relative mx-auto flex min-h-[72px] w-full max-w-(--content-max) items-center justify-between gap-2 px-3 py-2 sm:min-h-[76px] sm:gap-4 sm:px-6 lg:px-[var(--page-gutter)]">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Dom Fernando Refrigerações — página inicial"
          className="relative z-10 flex min-w-0 flex-1 items-center md:flex-none"
        >
          <Image
            src={logo}
            alt="Dom Fernando Refrigerações"
            priority
            sizes="(max-width: 639px) 200px, 240px"
            className="h-auto w-full max-w-[205px] object-contain object-left sm:max-w-[240px]"
          />
        </Link>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul className="flex items-center gap-1 lg:gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group text-text-secondary hover:text-primary relative px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 lg:px-4"
                >
                  {item.label}

                  <span className="bg-brand-ice-strong absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 lg:inset-x-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* WhatsApp */}
        <a
          href="https://wa.me/5516988398447"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale com a Dom Fernando pelo WhatsApp"
          className="rounded-control bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover hover:shadow-card focus-visible:outline-brand-ice-strong relative z-10 inline-flex shrink-0 items-center justify-center gap-1.5 border border-white/70 px-3 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-2 sm:px-5"
        >
          <Image
            src={wtsIcon}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 shrink-0 brightness-0 invert"
          />

          <span className="text-primary-foreground hidden sm:inline">Fale conosco</span>
          <span className="text-primary-foreground text-xs sm:hidden">WhatsApp</span>
        </a>
      </div>

      <div className="via-brand-ice/50 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
    </header>
  );
}
