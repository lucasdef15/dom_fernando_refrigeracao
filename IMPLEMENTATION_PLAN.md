# Plano de implementação — Dom Fernando Refrigerações

## Origem aprovada para implementação

- Projeto Superdesign: `ab7d33be-fe9d-4aea-9d42-bb11b461dc26`
- Draft: `7e71251d-7814-40b5-8d4b-18b36b82fa4e`
- Versão: `4` — **Galeria e Refinamento Operacional**
- Preview: <https://p.superdesign.dev/draft/7e71251d-7814-40b5-8d4b-18b36b82fa4e>

O escopo abaixo transforma a direção operacional em uma única landing page no App Router, preservando a paleta navy/gelo/dourado, a tipografia Geist e o logo oficial. Não cria rotas nem inventa provas sociais, garantias, clientes, endereços ou métricas além de `17+ anos`.

## Estado atual e diferença a cobrir

| Área | Implementação atual | Design selecionado |
| --- | --- | --- |
| Estrutura | Hero e Serviços | Header, hero, faixa de autoridade, serviços, galeria, automação, sobre, CTA final e rodapé |
| Navegação | Links para âncoras inexistentes; sem menu mobile | Âncoras reais e menu mobile acessível |
| Mídia | Uma foto local no hero | Hero + galeria de imagens e vídeos com visualização ampliada |
| Metadata | Padrão do Next.js | Título e descrição institucionais |
| Interação | Links e CTAs | Carrossel, diálogo de imagem, diálogo de vídeo, teclado e redução de movimento |

## Arquitetura proposta

### 1. Centralizar conteúdo e tipos

Criar `data/site.ts` como fonte única para:

- número e URL do WhatsApp;
- navegação (`Serviços`, `Galeria`, `Automação`, `Sobre`);
- lista de serviços e conteúdo institucional confirmado;
- cards da galeria com `id`, `kind` (`image` ou `video`), `src`, `poster`, `alt`, `label`, `duration` e fonte/licença;
- conteúdo do rodapé e metadata.

Isso remove cópia e URLs repetidas e permite receber novas fotos e vídeos apenas adicionando itens declarativos à lista.

### 2. Reorganizar a página como composição de seções

Atualizar `app/page.tsx` para renderizar, nesta ordem:

1. `Hero` revisado;
2. `TrustBar` com experiência e escopo residencial/empresarial;
3. `Services` revisado;
4. `Gallery`;
5. `Automation`;
6. `About`;
7. `ContactCTA`;
8. `Footer`.

As seções estáticas permanecem Server Components. Apenas os componentes que precisam de estado ou APIs do navegador serão Client Components.

### 3. Corrigir e tornar o header responsivo

Reescrever `components/layout/Header.tsx` para:

- trocar a lista atual por âncoras existentes e manter o CTA do WhatsApp;
- usar o logo oficial com `preload` no lugar de `priority`, já depreciado no Next 16;
- manter navegação horizontal a partir de `md`;
- incluir botão de menu abaixo de `md`, com `aria-expanded`, `aria-controls`, fechamento por Escape e fechamento após escolher uma âncora;
- conter o foco no menu aberto e devolver o foco ao botão ao fechar;
- manter alvos de toque de pelo menos 44 px e estados de foco visíveis.

### 4. Alinhar hero, serviços e automação ao draft sem ampliar claims

- Atualizar `Hero.tsx` para a composição clara do draft: foto técnica, headline, CTAs para WhatsApp e serviços, e card `17+`.
- Migrar o preload do LCP para `preload` e manter `sizes` correto na imagem de hero.
- Revisar `Services.tsx` para a grade modular, preservando os quatro serviços confirmados e o destaque de automação.
- Criar `Automation.tsx` com apenas fatos confirmados: automação aplicada a refrigeração, temperatura e rotinas; evitar afirmar acesso remoto, sensores, alertas, economia ou estabilidade garantida sem confirmação.
- Criar `About.tsx` usando exclusivamente a apresentação fornecida: profissional responsável, experiência em refrigeração e automação, VRF e inverter, atendimento residencial e empresarial.

### 5. Implementar a galeria como componente de mídia acessível

Criar `components/sections/gallery/Gallery.tsx` como Client Component isolado:

- trilho horizontal com `scroll-snap`; desktop mostra cartões parciais e controles anterior/próximo, mobile permite arrastar ou rolar horizontalmente;
- os controles fazem `scrollBy` em uma largura de card e têm rótulos acessíveis;
- cada imagem abre um diálogo com imagem ampliada, legenda e botão de fechar;
- cada vídeo mostra poster, duração e botão de play; abre um diálogo sem autoplay, com controles nativos, `track` de legendas e aviso de que a mídia é de referência quando aplicável;
- Escape fecha o diálogo, o foco retorna ao card de origem e o conteúdo de fundo fica inacessível enquanto o diálogo estiver aberto;
- suportar Enter e Espaço nos cartões acionáveis;
- respeitar `prefers-reduced-motion` e não depender de animação para acesso ao conteúdo.

Usar `next/image` para fotos com dimensões conhecidas e poster explícito para vídeos. A galeria não deve fazer hotlink de mídia remota em produção.

### 6. Preparar o contrato de ativos de galeria

Criar a estrutura abaixo quando os arquivos forem selecionados:

```text
public/gallery/
  images/
  videos/
  posters/
  captions/
```

Para cada item, registrar em `data/site.ts`:

- descrição alternativa específica da cena;
- classificação de conteúdo (`imagem` ou `vídeo`);
- duração quando aplicável;
- URL/fonte e licença;
- arquivo `.vtt` de legenda para cada vídeo com fala ou informação sonora relevante.

As referências Pexels do draft são apenas temporárias. Antes de publicar, substituí-las por fotos/vídeos próprios da Dom Fernando ou por mídia com direitos e créditos confirmados. Mantendo os arquivos em `public/gallery`, evitamos abrir `remotePatterns` para hosts de terceiros e mantemos previsibilidade de performance e licença.

### 7. Rodapé, CTA e metadata

- Criar `ContactCTA.tsx` com uma única ação principal para WhatsApp, sem prometer prazo de resposta.
- Criar `Footer.tsx` com logo, contato direto e WhatsApp; omitir links legais inexistentes.
- Atualizar `app/layout.tsx` com título e descrição de Dom Fernando Refrigerações e com a descrição de compartilhamento somente quando houver imagem social aprovada.

### 8. Estilos globais e responsividade

Atualizar `app/globals.css` apenas onde necessário para:

- manter o grid, superfícies, bordas e espaçamentos já definidos;
- adicionar classe utilitária local para ocultar a barra do trilho sem remover sua capacidade de rolagem;
- normalizar estado bloqueado de fundo durante diálogos;
- garantir que o modo de movimento reduzido também não aplique rolagem suave programática.

Manter estilos de seção e componentes prioritariamente nas classes Tailwind; não introduzir biblioteca de carrossel nem dependência de ícones.

## Sequência de execução

1. Criar `data/site.ts` e o contrato dos assets.
2. Implementar Header/mobile menu, Footer e metadata.
3. Compor as novas seções estáticas e atualizar a página.
4. Implementar a galeria interativa isoladamente.
5. Inserir os ativos licenciados, posters e legendas.
6. Fazer a passagem de responsividade, foco, teclado e movimento reduzido.
7. Executar validação técnica e visual.

## Critérios de aceite

- Cada link do header leva a uma seção existente; o menu mobile é totalmente utilizável por teclado.
- A galeria funciona por toque, mouse e teclado; não corta conteúdo essencial em 320 px.
- Imagem e vídeo abrem/fecham corretamente, sem autoplay e com retorno de foco.
- Nenhuma foto ou vídeo provisório é apresentado como trabalho, cliente ou prova da Dom Fernando.
- O hero mantém LCP otimizado e as demais mídias usam carregamento preguiçoso ou metadata conforme apropriado.
- O site não inclui claims não confirmados pelo material do cliente.
- `npm run lint`, `npx tsc --noEmit`, `npm run build` e `git diff --check` passam.
- Conferência funcional manual em desktop e 320 px, 375 px, 430 px e 1440 px; testar menu, âncoras, carrossel, diálogos, Escape, Tab/Shift+Tab e `prefers-reduced-motion`.

## Dependências do cliente antes da publicação

1. Fotos e vídeos próprios ou confirmação explícita dos itens de estoque a licenciar.
2. Texto/legendas de cada vídeo que tenha fala ou informação sonora relevante.
3. Confirmação de quais serviços e escopo devem aparecer na seção Sobre.
4. Imagem social e informações legais, caso devam constar no rodapé ou metadata pública.
