'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { galleryItems, type GalleryItem } from '@/data/site';

function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getYouTubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      return parsedUrl.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (
      hostname === 'youtube.com' ||
      hostname === 'm.youtube.com' ||
      hostname === 'youtube-nocookie.com'
    ) {
      const segments = parsedUrl.pathname.split('/').filter(Boolean);

      if (segments[0] === 'shorts' || segments[0] === 'embed') {
        return segments[1] ?? null;
      }

      if (segments[0] === 'watch') {
        return parsedUrl.searchParams.get('v');
      }

      return parsedUrl.searchParams.get('v');
    }
  } catch {
    return null;
  }

  return null;
}

function getYouTubeThumbnail(url: string): string {
  const videoId = getYouTubeId(url);

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : '/gallery/img_manutencao.jpg';
}

function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeId(url);

  if (!videoId) return null;

  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
}

export default function Gallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);

  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (activeItem && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!activeItem && dialog.open) {
      dialog.close();
    }
  }, [activeItem]);

  function scrollGallery(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>('[data-gallery-card]');
    const distance = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;

    rail.scrollBy({
      left: distance * direction,
      behavior: isReducedMotion() ? 'auto' : 'smooth',
    });
  }

  function openItem(item: GalleryItem, trigger: HTMLButtonElement) {
    lastTriggerRef.current = trigger;
    setActiveItem(item);
  }

  function closeDialog() {
    setActiveItem(null);
  }

  return (
    <section
      id="galeria"
      aria-labelledby="gallery-title"
      className="bg-surface overflow-hidden py-(--section-space,6rem)"
    >
      <div className="mx-auto max-w-(--content-max) px-[var(--page-gutter)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-brand-gold h-px w-9" />
              <span className="text-brand-gold text-[11px] font-semibold tracking-[0.24em] uppercase">
                Nosso trabalho
              </span>
            </div>

            <h2
              id="gallery-title"
              className="text-primary max-w-xl text-3xl leading-[1.12] font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl"
            >
              Precisão técnica em cada detalhe.
            </h2>

            <p className="text-text-secondary mt-5 max-w-lg text-sm leading-7 sm:text-base">
              Conheça diferentes aplicações de climatização, refrigeração e automação em uma seleção
              de referências visuais.
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4">
            <p className="text-text-secondary text-xs tracking-wide">
              <span className="text-primary font-semibold">
                {String(galleryItems.length).padStart(2, '0')}
              </span>{' '}
              registros
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollGallery(-1)}
                aria-label="Ver mídias anteriores"
                className="border-border bg-background text-primary hover:border-brand-gold hover:text-brand-gold focus-visible:outline-brand-gold flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span aria-hidden="true">←</span>
              </button>

              <button
                type="button"
                onClick={() => scrollGallery(1)}
                aria-label="Ver próximas mídias"
                className="border-border bg-background text-primary hover:border-brand-gold hover:text-brand-gold focus-visible:outline-brand-gold flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        aria-label="Galeria de referências visuais"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--page-gutter)] pb-4 lg:px-[max(var(--page-gutter),calc((100vw-var(--content-max))/2)]"
      >
        {galleryItems.map((item, index) => (
          <button
            key={item.id}
            data-gallery-card
            type="button"
            onClick={(event) => openItem(item, event.currentTarget)}
            aria-label={`Ampliar ${item.label}${item.kind === 'video' ? ', reproduzir vídeo' : ', visualizar imagem'}`}
            className="group focus-visible:outline-brand-gold w-[82vw] max-w-[390px] shrink-0 snap-start text-left focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-[56vw] lg:w-[calc((min(80rem,100vw-var(--page-gutter)*2)/3)-1rem)]"
          >
            <div className="border-border/60 bg-surface-raised relative aspect-[4/3] overflow-hidden rounded-xl border">
              {item.kind === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 56vw, 390px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                />
              ) : (
                <Image
                  src={getYouTubeThumbnail(item.sourceHref)}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 56vw, 390px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="absolute top-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-white uppercase backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')}
              </span>

              {item.kind === 'video' && (
                <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-medium tracking-wider text-white backdrop-blur-sm">
                  {item.duration}
                </span>
              )}

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="group-hover:text-primary flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                  {item.kind === 'video' ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-5 w-5"
                    >
                      <path d="M8 5.5v13l10-6.5z" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-5 w-5"
                    >
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="m16 16 4 4" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  )}
                </span>
              </span>

              <span className="absolute right-4 bottom-4 left-4 text-left text-xs font-medium tracking-wide text-white/90">
                {item.kind === 'video' ? 'VÍDEO' : 'FOTOGRAFIA'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <h3 className="text-primary text-base font-semibold tracking-tight">
                  {item.label}
                </h3>
                <p className="text-text-secondary mt-1 text-xs">
                  {item.kind === 'video' ? 'Assistir registro' : 'Ampliar imagem'}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="border-border text-primary group-hover:border-brand-gold group-hover:text-brand-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
              >
                ↗
              </span>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => {
          setActiveItem(null);
          lastTriggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        aria-label="Visualização da galeria"
        className="bg-surface-dark m-auto max-h-[92dvh] w-[min(94vw,1100px)] max-w-none overflow-y-auto rounded-2xl border border-white/10 p-0 text-left text-white shadow-2xl backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {activeItem && (
          <>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
              <div>
                <p className="text-brand-ice text-[10px] font-semibold tracking-[0.2em] uppercase">
                  {activeItem.kind === 'video' ? 'Vídeo de referência' : 'Imagem de referência'}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                  {activeItem.label}
                </h3>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={closeDialog}
                className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden="true">×</span>
                Fechar
              </button>
            </div>

            <div className="relative flex min-h-48 items-center justify-center bg-black">
              {activeItem.kind === 'image' ? (
                <div className="relative aspect-video w-full">
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    sizes="94vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full">
                  {getYouTubeEmbedUrl(activeItem.sourceHref) ? (
                    <iframe
                      key={activeItem.id}
                      src={getYouTubeEmbedUrl(activeItem.sourceHref) ?? undefined}
                      title={activeItem.label}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <p className="p-6 text-sm text-white">
                      Não foi possível identificar este vídeo do YouTube.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="max-w-2xl text-sm leading-7 text-white/65">{activeItem.alt}</p>

              <a
                href={activeItem.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-ice mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-white"
              >
                {activeItem.kind === 'video' ? 'Assistir no YouTube' : 'Abrir imagem original'}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
