# Réplica fiel da apresentação iCEV

Reconstruir o projeto atual como uma apresentação de 16 slides idêntica ao site publicado `https://projeto-icev.lovable.app`, mantendo todos os textos e logos editáveis no código.

## O que será entregue

- Aplicação de apresentação full-screen com 16 slides.
- Navegação por setas do teclado, botões na tela e contador `X / 16`.
- Top bar com título, subtítulo e botões de ação (estáticos: Editar, Grade, Apresentar, PDF, Restaurar).
- Rodapé com marca iCEV e contador.
- Dois temas visuais: slides 1, 15 e 16 com fundo escuro + foto do campus; demais slides com fundo claro + sidebar roxa e círculos decorativos.
- Todos os textos extraídos dos 16 slides replicados exatamente.
- Logo iCEV e imagem do campus como assets editáveis (upload para CDN + referência em `.asset.json`).
- Favicon derivado do logo iCEV.
- Metadados SEO únicos na rota `/`.

## Assets

1. Fazer upload do logo `icev-logo.jpg` e da imagem do campus `icev-campus.png` via `lovable-assets create`, gerando ponteiros `.asset.json` em `src/assets/`.
2. Criar favicon quadrado a partir do logo em `public/favicon.png` e atualizar `src/routes/__root.tsx`.
3. Remover o favicon padrão `public/favicon.ico`.

## Design system

- Cores principais:
  - Roxo escuro de fundo: `#1a0b2e` / similar
  - Roxo médio: `#4a2b6b`
  - Magenta/rosa destaque: `#c2185b`
  - Fundo claro dos slides: branco / `#f8f5fa`
  - Texto escuro: `#1f0a33`
- Tipografia: fonte sans-serif, pesos bold para títulos.
- Elementos decorativos: círculos grandes com gradiente roxo/rosa e opacidade baixa; sidebar roxa à esquerda nos slides claros.
- Cards com bordas arredondadas, sombras suaves e bordas finas.
- Botões de navegação arredondados, estilo pill.

## Estrutura do app

- Substituir `src/routes/index.tsx` pelo componente principal da apresentação.
- Criar `src/components/presentation/`:
  - `PresentationShell.tsx`: layout com top bar, rodapé e navegação.
  - `SlideRenderer.tsx`: renderiza o slide ativo por índice.
  - `slides/`: um componente por slide (01 a 16) ou um único arquivo `slides.tsx` com array de configuração + componentes.
- Estado global do slide atual via `useState` + `useEffect` para listeners de teclado (`ArrowLeft`, `ArrowRight`).
- Persistir slide atual no `localStorage` para restaurar ao recarregar (botão Restaurar).

## Slides

Replicar cada um dos 16 slides com base nos screenshots e texto extraído:

1. **Capa**: fundo escuro + campus, logo, badge "PRIMEIROS 3 MESES", título, subtítulo, campos editáveis de nome/email/telefone/data.
2. **Sumário**: 10 itens numerados em grid 2 colunas.
3. **Contexto e objetivos**: duas colunas de cards (desafio e objetivos).
4. **Diagnóstico inicial**: duas colunas de cards (avaliação e oportunidades).
5. **1º mês**: tabs 1º/2º/3º mês, 3 cards de pilares, lista de ações, entregável.
6. **2º mês**: mesma estrutura do slide 5 com conteúdo do 2º mês.
7. **3º mês**: mesma estrutura com conteúdo do 3º mês.
8. **Mensagem por curso**: 3 cards com Direito, Administração Tech, Engenharia de Software.
9. **Canais e ferramentas**: 6 cards de canais + destaque para eventos presenciais.
10. **Jornada do candidato**: 5 cards numerados (01 a 05) com etapas e SLAs.
11. **Clima organizacional**: 6 cards com título, descrição e impacto.
12. **Indicadores e KPIs**: tabela com 7 linhas (indicador, meta, frequência).
13. **Resultados esperados**: 7 itens com ícone de check em cards.
14. **Diferenciais**: 6 cards numerados (01 a 06) + frase de destaque.
15. **Conclusão**: fundo escuro + campus, título, frase e parágrafos.
16. **Obrigado**: fundo escuro + campus, informações de contato e prazo.

## Textos e logos editáveis

- Todos os textos dos slides devem estar em arquivos TypeScript (não hardcoded em JSX sem variáveis), preferencialmente em um objeto `slidesContent` exportado de `src/components/presentation/content.ts`.
- Campos editáveis do usuário (nome, email, telefone, data) devem ser inputs controlados com estado React, permitindo digitação direta na tela.
- Logo e imagem do campus referenciados via import dos `.asset.json`, facilitando substituição futura.

## SEO

- Atualizar `src/routes/index.tsx` com `head()` contendo título, descrição, og:title, og:description, og:type, twitter:card e og:image (usar a URL absoluta da imagem do campus no CDN).

## Verificação

- Build deve passar sem erros.
- Comparar screenshots dos 16 slides originais com o preview local para validar alinhamento visual, tipografia, cores e espaçamento.
- Testar navegação por teclado e botões.
- Confirmar que todos os textos são editáveis no código e campos do usuário são editáveis na interface.
