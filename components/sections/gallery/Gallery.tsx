'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { galleryItems, type GalleryItem } from '@/data/site';

function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Gallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (activeItem) {
      dialog.showModal();
      closeRef.current?.focus();
      return;
    }

    if (dialog.open) {
      dialog.close();
      lastTriggerRef.current?.focus();
    }
  }, [activeItem]);

  function scrollGallery(direction: 1 | -1) {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * rail.clientWidth * 0.82,
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
    <section id="galeria" className="overflow-hidden bg-surface py-(--section-space,5rem)">
      <div className="mx-auto flex max-w-(--content-max) items-end justify-between gap-5 px-[var(--page-gutter)]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-brand-gold h-px w-10" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.22em] uppercase">
              Galeria
            </span>
          </div>
          <h2 className="text-primary text-3xl leading-[1.12] font-bold tracking-[-0.03em] sm:text-4xl">
            Registros técnicos de referência visual.
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl text-sm leading-6 sm:text-base">
            Imagens e vídeos de estoque usados como demonstração de linguagem visual. Eles não
            representam serviços ou clientes da Dom Fernando.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollGallery(-1)}
            aria-label="Ver mídias anteriores"
            className="border-border text-primary hover:bg-primary hover:text-primary-foreground inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background text-lg transition-colors"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollGallery(1)}
            aria-label="Ver próximas mídias"
            className="border-border text-primary hover:bg-primary hover:text-primary-foreground inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background text-lg transition-colors"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        aria-label="Galeria de imagens e vídeos de referência"
        className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--page-gutter)] pb-2 lg:px-[max(var(--page-gutter),calc((100vw-var(--content-max))/2))]"
      >
        {galleryItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={(event) => openItem(item, event.currentTarget)}
            className="border-border bg-surface-raised group relative w-[84vw] shrink-0 snap-start overflow-hidden rounded-card border text-left shadow-soft sm:w-[52vw] lg:w-[calc((min(80rem,100vw-var(--page-gutter)*2)/4.25)-0.75rem)]"
          >
            <div className="relative aspect-square overflow-hidden bg-surface-muted">
              <Image
                src={item.kind === 'image' ? item.src : item.poster}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) 84vw, (max-width: 1023px) 52vw, 19vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.12em] text-primary uppercase backdrop-blur">
                {item.kind === 'video' ? 'Vídeo de referência' : 'Imagem de referência'}
              </span>
              {item.kind === 'video' ? (
                <>
                  <span className="bg-secondary text-secondary-foreground absolute top-1/2 left-1/2 inline-flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg shadow-card">
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">Abrir referência de vídeo</span>
                  </span>
                  <span className="absolute right-3 bottom-3 rounded bg-black/70 px-2 py-1 font-mono text-[0.65rem] text-white">
                    {item.duration}
                  </span>
                </>
              ) : null}
            </div>
            <span className="block p-4 text-xs font-bold tracking-[0.15em] text-text-secondary uppercase">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        className="m-auto w-[min(92vw,68rem)] overflow-visible border-0 bg-transparent p-0 text-left backdrop:bg-brand-navy-deep/90"
        aria-labelledby="gallery-dialog-title"
      >
        {activeItem ? (
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-surface-dark shadow-card">
            <button
              ref={closeRef}
              type="button"
              onClick={closeDialog}
              className="absolute top-4 right-4 z-10 inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-primary shadow-soft"
            >
              <span aria-hidden="true">×</span> Fechar
            </button>
            <div className="relative aspect-video bg-black">
              {activeItem.kind === 'image' ? (
                <Image src={activeItem.src} alt={activeItem.alt} fill sizes="92vw" className="object-contain" />
              ) : (
                <Image
                  src={activeItem.poster}
                  alt={activeItem.alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              )}
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-brand-ice text-xs font-semibold tracking-[0.18em] uppercase">
                {activeItem.kind === 'video' ? 'Vídeo de referência' : 'Imagem de referência'}
              </p>
              <h3 id="gallery-dialog-title" className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                {activeItem.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{activeItem.alt}</p>
              <a
                href={activeItem.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-ice-light hover:text-white mt-4 inline-flex text-sm font-semibold underline underline-offset-4"
              >
                {activeItem.kind === 'video'
                  ? 'Abrir referência de vídeo'
                  : 'Ver fonte temporária'}
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
