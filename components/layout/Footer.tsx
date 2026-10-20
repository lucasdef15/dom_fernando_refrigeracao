import Image from 'next/image';

import { site } from '@/data/site';
import logo from '@/public/logo-dom-fernando.svg';

export default function Footer() {
  return (
    <footer className="border-border border-t bg-background py-9">
      <div className="mx-auto flex max-w-(--content-max) flex-col items-center justify-between gap-6 px-[var(--page-gutter)] sm:flex-row">
        <a href="#inicio" aria-label={`${site.name} — voltar ao início`}>
          <Image src={logo} alt={site.name} className="h-auto w-44 sm:w-48" />
        </a>
        <div className="flex items-center gap-5 text-sm font-medium text-text-secondary">
          <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            Contato direto
          </a>
          <span aria-hidden="true" className="bg-border h-4 w-px" />
          <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
