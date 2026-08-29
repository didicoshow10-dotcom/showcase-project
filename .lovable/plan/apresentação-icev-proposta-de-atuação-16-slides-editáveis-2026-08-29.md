# Apresentação iCEV — Proposta de Atuação (16 slides editáveis)

Construir no projeto atual a apresentação "Proposta de Atuação — Coordenador(a) de Marketing" do iCEV, replicando fielmente o layout, paleta e conteúdo do deck de referência `projeto-icev.lovable.app`, e aplicando os ajustes de conteúdo e edição solicitados.

Observação importante: este projeto está vazio (só tem o placeholder padrão). O deck de referência vive em outra conta e não pode ser copiado como código — ele foi mapeado slide a slide por screenshots e extração de texto. Portanto a construção aqui é uma réplica fiel, e os "ajustes" listados são aplicados já nessa primeira versão, não como retrabalho.

## Estrutura fixa: 16 slides, nesta ordem

Capa → Sumário → Contexto → Diagnóstico → Mês 1 → Mês 2 → Mês 3 → Mensagem por Curso → Canais → Jornada do Candidato → Clima Organizacional → KPIs → Resultados Esperados → Diferenciais → Conclusão → Encerramento.

Ordem e quantidade não mudam.

## Ajustes de conteúdo aplicados

**Slide 11 — Clima organizacional e engajamento.** Seis ações explícitas, com "Engajamento e sentimento de pertencimento" como item nomeado:
comunicação interna; engajamento e sentimento de pertencimento; colaboração e troca de ideias; reconhecimento de resultados e boas iniciativas; criatividade e inovação; integração entre Marketing, Comercial, Coordenações e demais áreas.

**Slide 16 — Encerramento.** Mantém agradecimento, campos de contato (nome, e-mail, telefone), prazo `31/08/2026 às 10h` e e-mail `amandaleticia@grupocev.com`, e traz em destaque o lembrete de que o portfólio profissional será enviado em anexo, separadamente desta apresentação.

## Ajustes de layout

**Slides 15 e 16 herdam a composição do Slide 1.** Um único componente de capa (`CoverSlide`) parametrizado por conteúdo é usado nos três: mesma foto do campus ao fundo, mesmo overlay roxo, logo no mesmo ponto, badge pill, título grande, subtítulo e bloco de linhas de apoio nas mesmas posições. Muda só o texto:

| Slide | Badge | Título | Subtítulo |
|---|---|---|---|
| 01 | PRIMEIROS 3 MESES | Proposta de Atuação | Coordenador(a) de Marketing |
| 15 | FECHAMENTO | Conclusão | Presença em captação, captação em matrícula |
| 16 | INFORMAÇÕES DO PROCESSO | Obrigado(a). | iCEV – Instituto de Ensino Superior \| Teresina/PI |

## Edição na interface

**Todo texto é editável inline, sem exceção** — títulos, subtítulos, kickers, corpo, itens de lista, células da tabela de KPIs, rótulos de badge, rodapé. Implementado por um componente `EditableText` (contentEditable com estilo herdado) usado em todo lugar onde há texto de slide. Clicar posiciona o cursor; sair salva.

**Toda imagem/logo é editável** — componente `EditableImage` com:
- Substituir: clique abre seletor de arquivo, lê como data URL.
- Redimensionar: alças nos cantos, arraste proporcional.
- Reposicionar: arraste livre dentro do slide.

**Persistência.** Todo o conteúdo (textos, imagens, posições, tamanhos) vive num store React único, serializado em `localStorage`. Botão "Restaurar" volta ao conteúdo original. Sem backend.

## Arquitetura de slides

Seguindo o padrão de deck escalado:

- Slides renderizam em **1920×1080 fixos** e escalam com `transform: scale(min(scaleX, scaleY))`, absolutamente centrados, container pai com `overflow: hidden`.
- Tipografia semântica em tokens `--slide-title`, `--slide-subtitle`, `--slide-body`, `--slide-caption`, `--slide-kicker`, `--slide-chrome` definidos em `src/styles.css`, com classes `.slide-title`, `.slide-body`, etc. Nada de `text-lg` para texto de slide.
- Máximo de 6 linhas de conteúdo por slide, respeitando o limite pedido.
- Navegação: setas ←/→, botões na tela, e indicador de progresso `NN / 16` no rodapé.
- Índice do slide na URL (`?slide=N`) via `replaceState`, para refresh e compartilhamento manterem a posição.
- `document.title` sincronizado com o slide atual.
- Modo grade (tecla `G`) e modo apresentação em tela cheia.
- Rota de impressão (`?print`) que empilha os 16 slides para exportar PDF.

## Paleta e identidade

Extraídas do deck de referência, definidas como tokens em `src/styles.css` (oklch), sem cores hardcoded nos componentes:

- Roxo institucional profundo (fundo dos slides de capa e sidebar)
- Roxo médio (gradientes de cards e cabeçalho de tabela)
- Magenta/vinho de destaque (kickers, números, badges, bullets)
- Fundo claro quase branco com leve tom lilás (slides de conteúdo)
- Círculos decorativos grandes em lilás translúcido no canto superior direito e inferior esquerdo
- Barra vertical roxa na borda esquerda dos slides claros

Estilo institucional e elegante, sem poluição visual. Linguagem formal e acessível.

## Responsividade

- Desktop: deck escalado ao viewport, chrome completo.
- Mobile: mesma escala proporcional, chrome compacto, navegação por swipe além dos botões.

## Assets

- Logo iCEV e foto do campus baixados do deck de referência, enviados via `lovable-assets` e referenciados por ponteiros `.asset.json` em `src/assets/`.
- Favicon quadrado gerado a partir do logo em `public/favicon.png`, declarado em `src/routes/__root.tsx`; o `favicon.ico` padrão é removido.

## Arquivos

- `src/routes/index.tsx` — rota da apresentação, com `head()` próprio (título, description, og/twitter, og:image apontando para a foto do campus no CDN).
- `src/components/presentation/content.ts` — todo o texto dos 16 slides como estrutura de dados.
- `src/components/presentation/store.ts` — estado editável + persistência em `localStorage`.
- `src/components/presentation/EditableText.tsx`, `EditableImage.tsx` — primitivas de edição.
- `src/components/presentation/SlideLayout.tsx`, `ScaledSlide.tsx` — escala e moldura.
- `src/components/presentation/slides/` — um componente por slide, com `CoverSlide` compartilhado entre 01, 15 e 16.
- `src/components/presentation/Deck.tsx` — navegação, grade, tela cheia, impressão.

## Verificação

- Build limpo.
- Comparar os 16 slides renderizados com os screenshots de referência (paleta, posição, tipografia, espaçamento).
- Confirmar que 15 e 16 são visualmente irmãos do slide 1.
- Confirmar edição inline em cada tipo de texto e substituição/redimensão/reposição de logo e imagem.
- Testar teclado, grade, tela cheia, `?print`, refresh mantendo o slide, e layout em largura mobile.
