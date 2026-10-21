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

function isYouTubeShort(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '');
    const segments = parsedUrl.pathname.split('/').filter(Boolean);

    return (
      (hostname === 'youtube.com' ||
        hostname === 'm.youtube.com' ||
        hostname === 'youtube-nocookie.com') &&
      segments[0] === 'shorts'
    );
  } catch {
    return false;
  }
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
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
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
      // Pequeno delay para o foco funcionar bem no mobile
      requestAnimationFrame(() => closeRef.current?.focus());
    } else if (!activeItem && dialog.open) {
      dialog.close();
    }
  }, [activeItem]);

  function scrollGallery(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>('[data-gallery-card]');
    const gap = 16; // gap-4
    const distance = card ? card.offsetWidth + gap : rail.clientWidth * 0.85;

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
      {/* Header */}
      <div className="mx-auto max-w-(--content-max) px-[var(--page-gutter)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-brand-gold h-px w-8" />
              <span className="text-brand-gold text-[11px] font-semibold tracking-[0.22em] uppercase">
                Nosso trabalho
              </span>
            </div>

            <h2
              id="gallery-title"
              className="text-primary text-3xl leading-[1.15] font-semibold tracking-[-0.04em] sm:text-4xl lg:text-[2.75rem]"
            >
              Precisão técnica em cada detalhe.
            </h2>

            <p className="text-text-secondary mt-4 max-w-md text-[15px] leading-relaxed sm:text-base">
              Conheça diferentes aplicações de climatização, refrigeração e automação em uma seleção
              de referências visuais.
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="text-text-secondary text-sm">
              <span className="text-primary font-semibold tabular-nums">
                {String(galleryItems.length).padStart(2, '0')}
              </span>{' '}
              registros
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollGallery(-1)}
                aria-label="Ver mídias anteriores"
                className="border-border bg-background text-primary hover:border-brand-gold hover:text-brand-gold focus-visible:outline-brand-gold flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ←
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollGallery(1)}
                aria-label="Ver próximas mídias"
                className="border-border bg-background text-primary hover:border-brand-gold hover:text-brand-gold focus-visible:outline-brand-gold flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rail */}
      <div
        ref={railRef}
        aria-label="Galeria de referências visuais"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[var(--page-gutter)] pb-6 sm:gap-5 lg:px-[max(var(--page-gutter),calc((100vw-var(--content-max))/2))]"
      >
        {galleryItems.map((item, index) => (
          <button
            key={item.id}
            data-gallery-card
            type="button"
            onClick={(event) => openItem(item, event.currentTarget)}
            aria-label={`Ampliar ${item.label}${item.kind === 'video' ? ', reproduzir vídeo' : ', visualizar imagem'}`}
            className="group focus-visible:outline-brand-gold w-[min(85vw,340px)] shrink-0 snap-start text-left focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-[min(70vw,380px)] lg:w-[min(32vw,400px)]"
          >
            {/* Card media */}
            <div className="border-border/50 bg-surface-raised relative aspect-[4/5] overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-500 group-hover:shadow-lg sm:aspect-[4/3]">
              {item.kind === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transform-none"
                />
              ) : (
                <Image
                  src={getYouTubeThumbnail(item.sourceHref)}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transform-none"
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Index badge */}
              <span className="absolute top-3.5 left-3.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-white/90 uppercase backdrop-blur-md">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Duration (videos) */}
              {item.kind === 'video' && (
                <span className="absolute top-3.5 right-3.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white/90 backdrop-blur-md">
                  {item.duration}
                </span>
              )}

              {/* Play / Zoom icon */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="group-hover:text-primary flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 group-hover:bg-white">
                  {item.kind === 'video' ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-0.5 h-5 w-5"
                    >
                      <path d="M8 5.5v13l10-6.5z" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="m16 16 4 4" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  )}
                </span>
              </span>

              {/* Type label */}
              <span className="absolute right-3.5 bottom-3.5 left-3.5 flex items-end justify-between gap-2">
                <span className="text-[11px] font-medium tracking-[0.12em] text-white/80 uppercase">
                  {item.kind === 'video' ? 'Vídeo' : 'Fotografia'}
                </span>
              </span>
            </div>

            {/* Card footer */}
            <div className="flex items-start justify-between gap-3 pt-4">
              <div className="min-w-0">
                <h3 className="text-primary truncate text-[15px] font-semibold tracking-tight sm:text-base">
                  {item.label}
                </h3>
                <p className="text-text-secondary mt-0.5 text-xs">
                  {item.kind === 'video' ? 'Assistir registro' : 'Ampliar imagem'}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="border-border text-primary group-hover:border-brand-gold group-hover:text-brand-gold mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox / Dialog */}
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
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-black p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-md open:flex open:flex-col sm:m-auto sm:h-auto sm:max-h-[92dvh] sm:w-[min(94vw,1080px)] sm:rounded-2xl sm:border sm:border-white/10"
      >
        {activeItem && (
          <>
            {/* Header (mobile: minimal, desktop: full) */}
            <div className="absolute top-0 right-0 left-0 z-20 flex items-start justify-between gap-4 bg-gradient-to-b from-black/80 to-transparent px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-12 sm:static sm:bg-none sm:px-6 sm:pt-5 sm:pb-4">
              <div className="min-w-0 pt-1 sm:pt-0">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                  {activeItem.kind === 'video' ? 'Vídeo de referência' : 'Imagem de referência'}
                </p>
                <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight sm:text-lg">
                  {activeItem.label}
                </h3>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={closeDialog}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 sm:h-10 sm:w-auto sm:gap-2 sm:px-4 sm:text-sm"
              >
                <span aria-hidden="true" className="text-xl leading-none sm:text-base">
                  ×
                </span>
                <span className="hidden sm:inline">Fechar</span>
              </button>
            </div>

            {/* Media area */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
              {activeItem.kind === 'image' ? (
                <div className="relative h-full w-full sm:aspect-video sm:h-auto sm:max-h-[70vh]">
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`relative w-full ${
                    isYouTubeShort(activeItem.sourceHref)
                      ? // Shorts → vertical (9:16)
                        'aspect-[9/16] max-h-[min(85dvh,720px)] max-w-[min(100%,420px)]'
                      : // Vídeos normais → horizontal (16:9)
                        'aspect-video max-h-[70vh]'
                  }`}
                >
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
                    <p className="p-6 text-center text-sm text-white/70">
                      Não foi possível carregar este vídeo.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="shrink-0 border-t border-white/10 bg-black/80 px-5 py-5 backdrop-blur-md sm:bg-transparent sm:px-6 sm:py-5">
              <p className="max-w-2xl text-sm leading-relaxed text-white/65">{activeItem.alt}</p>

              {activeItem.sourceHref && (
                <a
                  href={activeItem.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                >
                  {activeItem.kind === 'video' ? 'Assistir no YouTube' : 'Abrir imagem original'}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
