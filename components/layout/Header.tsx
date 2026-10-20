'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { site } from '@/data/site';
import logo from '@/public/logo-dom-fernando.svg';
import wtsIcon from '@/public/whatsapp.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const menu = menuRef.current;
    const firstLink = menu?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key !== 'Tab' || !menu) {
        return;
      }

      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a, button'));
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-white/60 shadow-[0_4px_24px_rgb(11_46_85/5%)]">
      <div className="relative mx-auto flex min-h-[72px] w-full max-w-(--content-max) items-center justify-between gap-2 px-3 py-2 sm:min-h-[76px] sm:gap-4 sm:px-6 lg:px-[var(--page-gutter)]">
        <a
          href="#inicio"
          aria-label={`${site.name} — página inicial`}
          className="relative z-10 flex min-w-0 flex-1 items-center md:flex-none"
        >
          <Image
            src={logo}
            alt={site.name}
            preload
            sizes="(max-width: 639px) 200px, 240px"
            className="h-auto w-full max-w-[205px] object-contain object-left sm:max-w-[240px]"
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul className="flex items-center gap-1 lg:gap-2">
            {site.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group text-text-secondary hover:text-primary relative px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 lg:px-4"
                >
                  {item.label}
                  <span className="bg-brand-ice-strong absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 lg:inset-x-4" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={site.whatsapp.label}
          className="rounded-control bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover hover:shadow-card focus-visible:outline-brand-ice-strong relative z-10 hidden shrink-0 items-center justify-center gap-1.5 border border-white/70 px-3 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex sm:gap-2 sm:px-5"
        >
          <Image
            src={wtsIcon}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 shrink-0 brightness-0 invert"
          />

          <span className="text-primary-foreground">Fale conosco</span>
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Fechar navegação' : 'Abrir navegação'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="border-border text-primary bg-background inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1 rounded-full border md:hidden"
        >
          <span className="sr-only">{isMenuOpen ? 'Fechar' : 'Abrir'} menu</span>
          <span
            className={`h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          aria-label="Navegação mobile"
          className="border-border bg-background border-t px-[var(--page-gutter)] py-5 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {site.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="hover:bg-surface text-primary block rounded-xl px-4 py-3 text-base font-semibold"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="rounded-control bg-primary text-primary-foreground inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                Fale conosco pelo WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      ) : null}

      <div className="via-brand-ice/50 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
    </header>
  );
}
