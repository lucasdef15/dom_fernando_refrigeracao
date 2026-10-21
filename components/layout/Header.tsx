'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { site } from '@/data/site';
import logo from '@/public/logo-dom-fernando.svg';
import wtsIcon from '@/public/whatsapp.svg';

function sectionIdFromHref(href: string) {
  const index = href.indexOf('#');
  if (index === -1) return null;
  const id = href.slice(index + 1);
  return id || null;
}

type Indicator = { x: number; y: number; w: number; h: number };

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const [indicator, setIndicator] = useState<Indicator | null>(null);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > 8;
      setScrolled((current) => (current === next ? current : next));
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = '5.75rem';
    return () => {
      root.style.scrollPaddingTop = previous;
    };
  }, []);

  useEffect(() => {
    function syncFromLocation() {
      const { hash, pathname } = window.location;
      const match = site.navigation.find(
        (item) =>
          item.href === hash || item.href === pathname || item.href === `${pathname}${hash}`,
      );
      if (match) setActiveHref(match.href);
    }

    syncFromLocation();
    window.addEventListener('hashchange', syncFromLocation);
    return () => window.removeEventListener('hashchange', syncFromLocation);
  }, []);

  useEffect(() => {
    const pairs = site.navigation.flatMap((item) => {
      const id = sectionIdFromHref(item.href);
      const element = id ? document.getElementById(id) : null;
      return element ? [{ href: item.href, element }] : [];
    });

    if (pairs.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) ratios.set(entry.target.id, entry.intersectionRatio);
          else ratios.delete(entry.target.id);
        }

        const top = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (!top) return;
        const match = pairs.find((pair) => pair.element.id === top[0]);
        if (match) setActiveHref(match.href);
      },
      { rootMargin: '-12% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75] },
    );

    pairs.forEach((pair) => observer.observe(pair.element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function measure() {
      const navList = navListRef.current;
      if (!navList) return;
      const current = navList.querySelector<HTMLAnchorElement>('[aria-current="page"]');
      if (!current || current.offsetWidth === 0) {
        setIndicator(null);
        return;
      }

      setIndicator({
        x: current.offsetLeft,
        y: current.offsetTop,
        w: current.offsetWidth,
        h: current.offsetHeight,
      });
    }

    measure();
    const observer = new ResizeObserver(measure);
    const navList = navListRef.current;
    if (navList) observer.observe(navList);
    return () => observer.disconnect();
  }, [activeHref]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const menu = menuRef.current;
    menu?.querySelector<HTMLAnchorElement>('a')?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !menu) return;

      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a, button'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

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

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    function onChange() {
      if (media.matches) setIsMenuOpen(false);
    }
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function selectHref(href: string) {
    setActiveHref(href);
    closeMenu();
  }

  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden={!isMenuOpen}
        aria-label="Fechar navegação"
        onClick={() => {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        className={`fixed inset-0 z-40 bg-[rgb(11_46_85/0.4)] motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
          isMenuOpen ? 'opacity-100 motion-safe:duration-[250ms]' : 'pointer-events-none opacity-0'
        }`}
      />

      <header
        className={`sticky top-0 z-50 w-full border-b motion-safe:transition-[border-color,box-shadow] motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          scrolled || isMenuOpen
            ? 'border-border bg-background shadow-[0_16px_40px_-28px_rgb(11_46_85/45%)]'
            : 'border-border/70 bg-background shadow-none'
        }`}
      >
        <div className="mx-auto grid h-[4.75rem] w-full max-w-(--content-max) grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-3 sm:px-6 lg:grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] lg:gap-8 lg:px-[var(--page-gutter)]">
          <a
            href="#inicio"
            aria-label={`${site.name} — página inicial`}
            className="focus-visible:outline-brand-ice-strong justify-self-start rounded-md transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Image
              src={logo}
              alt={site.name}
              preload
              className="h-17 w-auto max-w-[11.5rem] object-contain object-left sm:h-12 sm:max-w-[13.5rem]"
            />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden min-w-0 justify-center lg:col-start-2 lg:flex"
          >
            <ul
              ref={navListRef}
              className="bg-surface ring-border relative flex items-center gap-0.5 rounded-full p-1 ring-1"
            >
              {indicator ? (
                <span
                  aria-hidden
                  className="bg-background ring-border pointer-events-none absolute top-0 left-0 rounded-full shadow-[0_1px_2px_rgb(11_46_85/8%),0_8px_16px_-12px_rgb(11_46_85/40%)] ring-1 motion-safe:transition-[transform,width,height] motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{
                    transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
                    width: indicator.w,
                    height: indicator.h,
                  }}
                />
              ) : null}

              {site.navigation.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setActiveHref(item.href)}
                      className={`focus-visible:outline-brand-ice-strong relative z-10 inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-3.5 xl:text-sm ${
                        isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 justify-self-end lg:col-start-3">
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={site.whatsapp.label}
              className="rounded-control bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover hover:shadow-card focus-visible:outline-brand-ice-strong hidden h-11 shrink-0 items-center gap-2 px-3.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] motion-safe:transition-[background-color,box-shadow,transform] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] sm:inline-flex"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                <Image
                  src={wtsIcon}
                  alt=""
                  aria-hidden
                  className="h-3.5 w-3.5 brightness-0 invert"
                />
              </span>
              <span className="text-primary-foreground">Fale conosco</span>
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Fechar navegação' : 'Abrir navegação'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="border-border text-primary hover:bg-surface focus-visible:outline-brand-ice-strong bg-background inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
            >
              <span className="relative block h-3.5 w-[18px]" aria-hidden>
                <span
                  className={`absolute top-0 left-0 h-0.5 w-[18px] rounded-full bg-current motion-safe:transition-transform motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute top-[6px] left-0 h-0.5 w-[18px] rounded-full bg-current motion-safe:transition-opacity motion-safe:duration-150 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-3 left-0 h-0.5 w-[18px] rounded-full bg-current motion-safe:transition-transform motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
            isMenuOpen
              ? 'grid-rows-[1fr] opacity-100 motion-safe:duration-[250ms]'
              : 'grid-rows-[0fr] opacity-0 motion-safe:duration-150'
          }`}
        >
          <div className="overflow-hidden">
            <nav
              ref={menuRef}
              id="mobile-navigation"
              aria-label="Navegação mobile"
              aria-hidden={!isMenuOpen}
              inert={isMenuOpen ? undefined : true}
              className="border-border bg-background border-t px-3 py-4 sm:px-6"
            >
              <ul className="mx-auto flex w-full max-w-(--content-max) flex-col gap-1">
                {site.navigation.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => selectHref(item.href)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`rounded-control flex min-h-12 items-center justify-between px-3 text-base font-medium transition-colors duration-150 ${
                          isActive
                            ? 'bg-surface text-primary'
                            : 'text-text-secondary hover:bg-surface hover:text-primary'
                        }`}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={`bg-primary h-1.5 w-1.5 rounded-full motion-safe:transition-opacity motion-safe:duration-150 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
                <li className="pt-2 sm:hidden">
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="rounded-control bg-primary text-primary-foreground inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-sm font-semibold"
                  >
                    <Image
                      src={wtsIcon}
                      alt=""
                      aria-hidden
                      className="h-4 w-4 brightness-0 invert"
                    />
                    <span className="text-primary-foreground">Fale conosco pelo WhatsApp</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
