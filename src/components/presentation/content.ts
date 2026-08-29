/** Conteúdo padrão da apresentação — Proposta de Atuação iCEV. */

export const DECK_META = {
  title: "Proposta de Atuação — Coordenador de Marketing",
  shortTitle: "Proposta de Atuação · iCEV",
  subtitle: "Instituto de Ensino Superior | iCEV",
  institutionFooter: "Instituto de Ensino Superior | iCEV — Teresina/PI",
  deckFooter: "iCEV | Proposta de Atuação — Coordenador de Marketing",
} as const;

export interface CoverContent { badge: string; title: string; subtitle: string; lines: string[]; }
export interface SummaryItem { number: string; label: string; }
export interface ColumnContent { heading: string; items: string[]; }
export interface MonthContent { kicker: string; title: string; activeTab: number; pillars: string[]; leftItems: string[]; rightItems: string[]; deliverableLabel: string; deliverable: string; }
export interface BadgeCard { badge: string; body: string; meta: string; }
export interface JourneyStep { number: string; title: string; body: string; }
export interface KpiRow { indicator: string; target: string; frequency: string; }
export interface NumberedCard { number: string; title: string; }

export const SLIDE_01: CoverContent = {
  badge: "PRIMEIROS 3 MESES",
  title: "Proposta de Atuação",
  subtitle: "Coordenador de Marketing",
  lines: ["Antonio Fontes", "comfontes@gmail.com", "(86) 99997-4164"],
};

export const SLIDE_02 = {
  kicker: "VISÃO EXECUTIVA",
  title: "O que esta proposta entrega",
  items: [
    { number: "01", label: "Diagnóstico: entender funil, canais, dados, equipe e gargalos" },
    { number: "02", label: "Captação: transformar diferenciais em demanda qualificada" },
    { number: "03", label: "Jornada: reduzir atritos do primeiro contato à matrícula" },
    { number: "04", label: "Pessoas: fortalecer comunicação, colaboração e pertencimento" },
    { number: "05", label: "Gestão: acompanhar KPIs e decidir com evidências" },
    { number: "06", label: "90 dias: diagnosticar, implementar, medir e otimizar" },
  ] satisfies SummaryItem[],
};

export const SLIDE_03 = {
  kicker: "LEITURA DO DESAFIO",
  title: "Captação e clima exigem a mesma disciplina de gestão",
  left: {
    heading: "01 · Captação e matrícula",
    items: [
      "Construir um funil por escola/curso: atração → lead → oportunidade → inscrição → matrícula.",
      "Traduzir os diferenciais acadêmicos em mensagens que respondam por que escolher o iCEV.",
      "Combinar mídia, conteúdo, redes sociais, eventos, landing pages, WhatsApp e CRM.",
      "Reduzir perda entre interesse, atendimento e inscrição com processos e acompanhamento.",
      "Trabalhar aquisição e conversão como uma única operação, não como campanhas isoladas.",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "02 · Clima e colaboração",
    items: [
      "Dar clareza de prioridades, responsáveis, prazos e critérios de qualidade.",
      "Criar rituais curtos de alinhamento e retrospectiva das campanhas.",
      "Estimular troca entre criação, mídia, conteúdo, comercial e áreas acadêmicas.",
      "Reconhecer resultado, evolução, colaboração e boas iniciativas.",
      "Criar espaço para testar ideias sem perder disciplina de mensuração.",
    ],
  } satisfies ColumnContent,
};

export const SLIDE_04 = {
  kicker: "1º MÊS · DIAGNÓSTICO",
  title: "Antes de acelerar, descobrir onde está o ganho",
  left: {
    heading: "Dados que eu buscaria",
    items: [
      "Leads, inscrições e matrículas por escola/curso, período e origem.",
      "Conversão entre etapas e tempo de resposta do atendimento.",
      "CPL, CAC, investimento, retorno e qualidade dos leads por canal.",
      "Performance de campanhas, páginas, conteúdos e processos comerciais.",
      "Abandono, motivos de perda e oportunidades de recuperação.",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "Perguntas que eu responderia",
    items: [
      "Onde o candidato abandona e por quê?",
      "Quais mensagens e diferenciais geram mais interesse e confiança?",
      "Quais canais geram volume e quais geram matrícula?",
      "Marketing e Comercial trabalham com o mesmo conceito de lead qualificado?",
      "O que já funciona e deve receber mais investimento antes de criar algo novo?",
    ],
  } satisfies ColumnContent,
};

export const MONTH_TABS = ["1º mês", "2º mês", "3º mês"] as const;

export const SLIDE_05: MonthContent = {
  kicker: "PLANO DOS 3 PRIMEIROS MESES",
  title: "1º mês — Diagnóstico e planejamento",
  activeTab: 0,
  pillars: ["Diagnosticar", "Alinhar", "Priorizar"],
  leftItems: [
    "Auditar funil, canais, campanhas, conteúdo, CRM e jornada do candidato.",
    "Entrevistar Marketing, Comercial, Coordenações e lideranças para entender operação e gargalos.",
    "Mapear quick wins e oportunidades por escola/curso, sem assumir soluções antes dos dados.",
  ],
  rightItems: [
    "Definir baseline e painel inicial de KPIs.",
    "Escolher 3–5 prioridades para o trimestre e respectivos responsáveis.",
    "Criar calendário de campanhas e rotina de alinhamento entre áreas.",
  ],
  deliverableLabel: "ENTREGA DO MÊS",
  deliverable: "Diagnóstico 360º + baseline + prioridades + plano tático de 90 dias",
};

export const SLIDE_06: MonthContent = {
  kicker: "PLANO DOS 3 PRIMEIROS MESES",
  title: "2º mês — Implementação",
  activeTab: 1,
  pillars: ["Executar", "Testar", "Acompanhar"],
  leftItems: [
    "Colocar no ar campanhas prioritárias com mensagem, público, oferta e CTA definidos.",
    "Criar conteúdos que transformem diferenciais em prova: alunos, professores, projetos, experiências e carreira.",
    "Ativar landing pages, remarketing e fluxos de WhatsApp/CRM para não perder o lead após a mídia.",
  ],
  rightItems: [
    "Definir responsáveis, prazos e critérios de aprovação das entregas.",
    "Implantar reunião semanal Marketing + Comercial baseada no funil e nos leads da semana.",
    "Testar criativos, públicos, CTAs e abordagens de atendimento antes de ampliar investimento.",
  ],
  deliverableLabel: "ENTREGA DO MÊS",
  deliverable: "Campanhas no ar + operação integrada + primeiros testes e aprendizados",
};

export const SLIDE_07: MonthContent = {
  kicker: "PLANO DOS 3 PRIMEIROS MESES",
  title: "3º mês — Otimização e resultados",
  activeTab: 2,
  pillars: ["Medir", "Otimizar", "Escalar"],
  leftItems: [
    "Comparar resultados com o baseline e localizar os maiores ganhos e gargalos.",
    "Analisar performance por escola/curso, canal, campanha e etapa do funil.",
    "Cortar desperdícios e reforçar ações com melhor conversão e qualidade de lead.",
  ],
  rightItems: [
    "Realocar verba e esforço para os canais e mensagens vencedores.",
    "Consolidar processos, aprendizados e responsabilidades do time.",
    "Apresentar roadmap do próximo trimestre com metas, testes e prioridades.",
  ],
  deliverableLabel: "ENTREGA DO MÊS",
  deliverable: "Relatório executivo + otimizações + roadmap do próximo trimestre",
};

export const SLIDE_08 = {
  kicker: "CAPTAÇÃO · PROPOSTA DE VALOR",
  title: "Transformar diferenciais reais em argumentos de escolha",
  cards: [
    {
      badge: "ESCOLAS E POSICIONAMENTO",
      body: "Organizar a comunicação a partir dos territórios já reconhecidos pelo iCEV: Direito Aplicado, Negócios e Gestão e Tecnologia Aplicada.",
      meta: "Não criar uma campanha genérica para toda a instituição: adaptar promessa, prova e linguagem ao público e à oferta.",
    },
    {
      badge: "PROVA DE VALOR",
      body: "Mostrar na prática aquilo que pode ser percebido como diferencial: professores, alunos, projetos, experiências, empregabilidade e conexão com mercado.",
      meta: "Conteúdo de prova social + demonstrações + histórias reais + argumentos para as principais objeções.",
    },
    {
      badge: "CONVERSÃO",
      body: "Levar o interessado para uma próxima ação simples e mensurável, sem depender apenas de alcance e engajamento.",
      meta: "Landing page/WhatsApp → CRM → atendimento → follow-up → inscrição → matrícula.",
    },
  ] satisfies BadgeCard[],
};

export const SLIDE_09 = {
  kicker: "CAPTAÇÃO · MIX DE CANAIS",
  title: "Cada canal cumpre um papel no funil",
  cards: [
    { badge: "Instagram", body: "Construir desejo, identificação e prova social", meta: "Reels • stories • alunos • professores • rotina e experiências" },
    { badge: "TikTok", body: "Ganhar relevância junto ao público jovem", meta: "Conteúdo nativo • carreira • bastidores • linguagem da plataforma" },
    { badge: "Google Ads", body: "Capturar intenção de quem já procura uma graduação", meta: "Busca por curso • região • termos de alta intenção" },
    { badge: "Meta Ads", body: "Escalar descoberta e recuperar interesse", meta: "Prospecção • remarketing • testes de criativos e públicos" },
    { badge: "Landing pages", body: "Transformar interesse em ação", meta: "Oferta clara • prova • CTA • formulário curto • rastreamento" },
    { badge: "WhatsApp + CRM", body: "Transformar lead em oportunidade e matrícula", meta: "SLA • follow-up • nutrição • recuperação de abandono" },
  ] satisfies BadgeCard[],
  note: "Eventos, experiências no campus e parcerias entram como canais de confiança e consideração — com rastreamento da origem sempre que possível.",
};

export const SLIDE_10 = {
  kicker: "JORNADA DO CANDIDATO",
  title: "Menos atrito. Mais velocidade. Mais conversão.",
  sectionLabel: "O que muda em cada etapa",
  steps: [
    { number: "01", title: "Descoberta", body: "Conteúdo e mídia levam o público certo para uma proposta de valor clara." },
    { number: "02", title: "Lead", body: "Página/formulário simples, origem registrada e próximo passo explícito." },
    { number: "03", title: "Atendimento", body: "Lead quente recebe contato rápido, consultivo e contextualizado ao interesse." },
    { number: "04", title: "Decisão", body: "Objeções são tratadas com prova social, diferenciais, conteúdo e follow-up." },
    { number: "05", title: "Matrícula", body: "Processo simples, recuperação de abandono e comunicação clara até a conclusão." },
  ] satisfies JourneyStep[],
};

export const SLIDE_11 = {
  kicker: "PESSOAS · CLIMA E ENGAJAMENTO",
  title: "Um time alinhado entrega melhor e mais rápido",
  cards: [
    { badge: "COMUNICAÇÃO", body: "Daily curta + reunião semanal de prioridades + canal único para demandas.", meta: "Menos ruído • mais previsibilidade" },
    { badge: "COLABORAÇÃO", body: "Brainstorm quinzenal e retrospectiva das campanhas com troca de aprendizados.", meta: "Ideias melhores • aprendizado compartilhado" },
    { badge: "PERTENCIMENTO", body: "Conectar cada entrega ao propósito e aos resultados da jornada do aluno.", meta: "Mais participação • mais senso de dono" },
    { badge: "RECONHECIMENTO", body: "Celebrar resultados, evolução, colaboração e boas iniciativas.", meta: "Feedback frequente • valorização" },
    { badge: "CRIATIVIDADE", body: "Reservar espaço para testes de formatos, mensagens e experiências novas.", meta: "Experimentar • medir • aprender" },
    { badge: "INTEGRAÇÃO", body: "Marketing + Comercial + Coordenações em rituais orientados ao mesmo funil.", meta: "Decisão mais rápida • jornada integrada" },
  ] satisfies BadgeCard[],
};

export const SLIDE_12 = {
  kicker: "GESTÃO POR DADOS",
  title: "KPIs que mostram onde agir — não apenas o que aconteceu",
  headers: { indicator: "Indicador", target: "Referência em 3 meses", frequency: "Frequência" },
  rows: [
    { indicator: "Leads qualificados", target: "Crescer vs. baseline", frequency: "Semanal" },
    { indicator: "Inscrições", target: "+20%", frequency: "Semanal" },
    { indicator: "Matrículas", target: "Crescer vs. baseline", frequency: "Semanal" },
    { indicator: "Conversão do funil", target: "+10% vs. baseline", frequency: "Semanal" },
    { indicator: "CPL", target: "-15%", frequency: "Semanal" },
    { indicator: "Abandono", target: "-10%", frequency: "Quinzenal" },
    { indicator: "Tempo de resposta", target: "≤ 15 min", frequency: "Diário" },
    { indicator: "Engajamento social", target: "+25%", frequency: "Semanal" },
    { indicator: "Clima / satisfação", target: "≥ 85%", frequency: "Mensal" },
  ] satisfies KpiRow[],
  note: "As metas são referências iniciais; o baseline real será definido no diagnóstico do 1º mês.",
};

export const SLIDE_13 = {
  kicker: "RESULTADOS ESPERADOS",
  title: "Ao final de 90 dias, o que deve estar diferente",
  items: [
    "Funil de captação visível, com origem, qualidade e conversão por etapa.",
    "Campanhas e mensagens prioritárias estruturadas por público e oferta.",
    "Mais previsibilidade de geração e tratamento de leads qualificados.",
    "Jornada com menos atritos, SLA de atendimento e recuperação de abandonos.",
    "Marketing e Comercial acompanhando os mesmos números e prioridades.",
    "Equipe com rituais de comunicação, colaboração, reconhecimento e aprendizado.",
  ],
};

export const SLIDE_14 = {
  kicker: "DIFERENCIAIS DA PROPOSTA",
  title: "Como eu atuaria como Coordenador",
  cards: [
    { number: "01", title: "Estratégia antes da execução: entender o problema antes de aumentar investimento." },
    { number: "02", title: "Visão de funil: conectar aquisição, atendimento, inscrição e matrícula." },
    { number: "03", title: "Decisão por dados: testar, comparar, aprender e realocar recursos." },
    { number: "04", title: "Visão por oferta: mensagem, público e prova de valor precisam conversar." },
    { number: "05", title: "Liderança próxima: clareza, autonomia, feedback e reconhecimento." },
    { number: "06", title: "Integração: Marketing trabalha junto de Comercial e áreas acadêmicas." },
  ] satisfies NumberedCard[],
  note: "Meu foco nos 90 dias: gerar tração sem perder qualidade, pessoas e experiência do candidato.",
};

export const SLIDE_15: CoverContent = {
  badge: "FECHAMENTO",
  title: "Estratégia que vira execução",
  subtitle: "Diagnosticar. Priorizar. Executar. Medir. Melhorar.",
  lines: [
    "Nos primeiros 90 dias, meu objetivo é criar clareza sobre o funil, colocar as prioridades em movimento e construir uma rotina de gestão que permaneça depois do trimestre.",
    "Captação e clima caminham juntos: resultados sustentáveis dependem de processos, dados e pessoas trabalhando na mesma direção.",
  ],
};

export const SLIDE_16: CoverContent = {
  badge: "ENCERRAMENTO",
  title: "OBRIGADO!",
  subtitle: "Proposta de Atuação — Coordenador de Marketing",
  lines: ["Antonio Fontes", "comfontes@gmail.com", "(86) 99997-4164"],
};

export const SLIDE_TITLES = [
  "Capa", "Visão Executiva", "Leitura do Desafio", "Diagnóstico Inicial",
  "Mês 1 — Diagnóstico e Planejamento", "Mês 2 — Implementação", "Mês 3 — Otimização e Resultados",
  "Captação — Proposta de Valor", "Mix de Canais", "Jornada do Candidato", "Clima e Engajamento",
  "Indicadores e KPIs", "Resultados Esperados", "Diferenciais da Proposta", "Fechamento", "Encerramento",
] as const;

export const TOTAL_SLIDES = SLIDE_TITLES.length;
