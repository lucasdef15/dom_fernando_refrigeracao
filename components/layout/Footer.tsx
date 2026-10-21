import Image from 'next/image';
import { site } from '@/data/site';
import wtsIcon from '@/public/whatsapp.svg';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy border-t border-white/10">
      <div className="mx-auto w-full max-w-(--content-max) px-3 pt-10 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-[var(--page-gutter)] lg:pt-8 lg:pb-6">
        <div className="lg:grid lg:grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] lg:items-center lg:gap-x-8">
          {/* Logo */}
          <a
            href="#inicio"
            aria-label={`${site.name} — voltar ao início`}
            className="focus-visible:outline-brand-ice inline-flex w-max justify-self-start rounded-md transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="980"
              height="220"
              viewBox="0 0 980 220"
              role="img"
              aria-labelledby="footer-logo-title footer-logo-desc"
              className="h-10 w-auto sm:h-11"
            >
              <title id="footer-logo-title">Dom Fernando Refrigerações</title>
              <desc id="footer-logo-desc">
                Coroa dourada acima de um floco de neve azul-gelo de seis pontas, ao lado do nome
                Dom Fernando Refrigerações.
              </desc>

              <defs>
                <linearGradient id="footer-ice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7DD3E8" />
                  <stop offset="0.55" stopColor="#4BB8D4" />
                  <stop offset="1" stopColor="#2A9BB8" />
                </linearGradient>
              </defs>

              <g transform="translate(88 138)">
                <g
                  fill="none"
                  stroke="url(#footer-ice)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.95"
                >
                  <path d="M0 0 L0 -42 M0 -23.1 L12.12 -30.1 M0 -23.1 L-12.12 -30.1 M0 -32.76 L6.93 -36.76 M0 -32.76 L-6.93 -36.76 M0 0 L-36.37 -21 M-20.01 -11.55 L-20.01 -25.55 M-20.01 -11.55 L-32.13 -4.55 M-28.37 -16.38 L-28.37 -24.38 M-28.37 -16.38 L-35.3 -12.38 M0 0 L-36.37 21 M-20.01 11.55 L-32.13 4.55 M-20.01 11.55 L-20.01 25.55 M-28.37 16.38 L-35.3 12.38 M-28.37 16.38 L-28.37 24.38 M0 0 L-0 42 M-0 23.1 L-12.12 30.1 M-0 23.1 L12.12 30.1 M-0 32.76 L-6.93 36.76 M-0 32.76 L6.93 36.76 M0 0 L36.37 21 M20.01 11.55 L20.01 25.55 M20.01 11.55 L32.13 4.55 M28.37 16.38 L28.37 24.38 M28.37 16.38 L35.3 12.38 M0 0 L36.37 -21 M20.01 -11.55 L32.13 -4.55 M20.01 -11.55 L20.01 -25.55 M28.37 -16.38 L35.3 -12.38 M28.37 -16.38 L28.37 -24.38" />
                </g>

                <circle r="4.5" fill="#E8F7FB" stroke="#4BB8D4" strokeWidth="1.8" />

                <g transform="translate(0 -78)">
                  <path
                    d="M-44 16 L-36 -6 L-16 6 L0 -24 L16 6 L36 -6 L44 16 Z"
                    fill="#C9A86C"
                    stroke="#C9A86C"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M-40 18 H40 v5.5 c0 2.6-2.2 4.6-5 4.6 H-35 c-2.8 0-5-2-5-4.6 Z"
                    fill="#C9A86C"
                  />
                  <circle cx="-36" cy="-8" r="3.4" fill="#C9A86C" />
                  <circle cx="0" cy="-26" r="4.1" fill="#C9A86C" />
                  <circle cx="36" cy="-8" r="3.4" fill="#C9A86C" />
                </g>
              </g>

              <g fontFamily="Montserrat, Arial, Helvetica, sans-serif">
                <text
                  x="178"
                  y="108"
                  fill="#F0F4F8"
                  fontSize="50"
                  fontWeight="800"
                  letterSpacing="-0.6"
                >
                  DOM FERNANDO
                </text>
                <text
                  x="180"
                  y="146"
                  fill="#7DD3E8"
                  fontSize="28"
                  fontWeight="600"
                  letterSpacing="5.4"
                >
                  REFRIGERAÇÕES
                </text>
                <path
                  d="M180 162 H490"
                  stroke="#C9A86C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </g>
            </svg>
          </a>

          <nav
            aria-label="Navegação do rodapé"
            className="mt-8 min-w-0 lg:mt-0 lg:justify-self-center"
          >
            <ul className="grid w-full max-w-sm grid-cols-2 gap-x-6 gap-y-1 lg:flex lg:w-auto lg:max-w-none lg:flex-wrap lg:justify-center lg:gap-1">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="">
                    <span className="flex min-h-11 items-center text-[15px] font-medium text-white/80 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3E8] active:opacity-70 lg:min-h-10 lg:rounded-full lg:px-3.5 lg:text-sm lg:hover:bg-white/10 lg:hover:text-white">
                      {item.label}
                    </span>
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
            className="mt-8 inline-flex h-11 w-max items-center gap-2.5 rounded-full bg-[#C9A86C] px-4 text-sm font-semibold text-[#0B1F33] shadow-sm transition-all duration-150 hover:bg-[#D4B57A] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3E8] active:scale-[0.98] lg:mt-0 lg:justify-self-end"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10">
              <Image src={wtsIcon} alt="" aria-hidden className="h-3.5 w-3.5 brightness-0" />
            </span>
            Fale conosco
          </a>
        </div>

        <p className="mt-8 border-t border-white/10 pt-5 text-[13px] leading-5 text-white/45 lg:mt-6">
          © {year} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
