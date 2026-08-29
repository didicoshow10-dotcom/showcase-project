/**
 * Every string rendered on a slide lives here.
 *
 * Each entry is paired with a stable id inside the slide components so the
 * editable-text store can override it without touching this file. Editing a
 * default here changes what the deck falls back to after "Restaurar".
 */

export const DECK_META = {
  title: "Proposta de Atuação — Coordenador(a) de Marketing",
  shortTitle: "Proposta de Atuação · iCEV",
  subtitle: "iCEV | Use ← → para navegar, G para a grade",
  institutionFooter: "iCEV — Instituto de Ensino Superior | Teresina/PI",
  deckFooter: "iCEV | Proposta de Atuação — Coordenador(a) de Marketing",
} as const;

export interface CoverContent {
  badge: string;
  title: string;
  subtitle: string;
  lines: string[];
}

export interface SummaryItem {
  number: string;
  label: string;
}

export interface ColumnContent {
  heading: string;
  items: string[];
}

export interface MonthPillar {
  label: string;
}

export interface MonthContent {
  kicker: string;
  title: string;
  activeTab: number;
  pillars: string[];
  leftItems: string[];
  rightItems: string[];
  deliverableLabel: string;
  deliverable: string;
}

export interface BadgeCard {
  badge: string;
  body: string;
  meta: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  body: string;
}

export interface KpiRow {
  indicator: string;
  target: string;
  frequency: string;
}

export interface NumberedCard {
  number: string;
  title: string;
}

/* ---------------------------------------------------------------- *
 * 01 — Capa
 * ---------------------------------------------------------------- */

export const SLIDE_01: CoverContent = {
  badge: "Primeiros 3 meses",
  title: "Proposta de Atuação",
  subtitle: "Coordenador(a) de Marketing",
  lines: [
    "iCEV – Instituto de Ensino Superior | Teresina/PI",
    "Nome: [Seu nome completo]",
    "[seu@email.com] | [(00) 00000-0000] | Data: [__/__/2026]",
  ],
};

/* ---------------------------------------------------------------- *
 * 02 — Sumário
 * ---------------------------------------------------------------- */

export const SLIDE_02 = {
  kicker: "Conteúdo",
  title: "Sumário",
  items: [
    { number: "01", label: "Contexto e objetivos" },
    { number: "02", label: "Diagnóstico inicial" },
    { number: "03", label: "Plano de 90 dias" },
    { number: "04", label: "Estratégias de captação" },
    { number: "05", label: "Jornada do candidato" },
    { number: "06", label: "Clima e engajamento" },
    { number: "07", label: "Indicadores e KPIs" },
    { number: "08", label: "Resultados esperados" },
    { number: "09", label: "Diferenciais da proposta" },
    { number: "10", label: "Conclusão e encerramento" },
  ] satisfies SummaryItem[],
};

/* ---------------------------------------------------------------- *
 * 03 — Contexto e objetivos
 * ---------------------------------------------------------------- */

export const SLIDE_03 = {
  kicker: "Ponto de partida",
  title: "Contexto e objetivos estratégicos",
  left: {
    heading: "O desafio",
    items: [
      "Fortalecer a marca iCEV",
      "Ampliar a captação de alunos",
      "Conectar a marca com o público certo",
      "Aliar resultado comercial a um ambiente colaborativo",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "Objetivos",
    items: [
      "Fortalecer a presença institucional",
      "Aumentar captação e conversão",
      "Melhorar a jornada do candidato",
      "Engajar e desenvolver a equipe",
      "Integrar Marketing, Comercial e Acadêmico",
    ],
  } satisfies ColumnContent,
};

/* ---------------------------------------------------------------- *
 * 04 — Diagnóstico inicial
 * ---------------------------------------------------------------- */

export const SLIDE_04 = {
  kicker: "Escuta e análise",
  title: "Diagnóstico inicial",
  left: {
    heading: "O que será avaliado",
    items: [
      "Dados comerciais",
      "Canais de marketing",
      "Público-alvo",
      "Concorrência",
      "Processos",
      "Equipe",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "Oportunidades identificadas",
    items: [
      "Diferenciais da instituição pouco explorados",
      "Potencial de crescimento nos canais digitais",
      "Integração entre áreas ainda a consolidar",
      "Prova social (alunos e egressos) subutilizada",
      "Maior aproximação com o público jovem",
    ],
  } satisfies ColumnContent,
};

/* ---------------------------------------------------------------- *
 * 05 / 06 / 07 — Plano de 90 dias
 * ---------------------------------------------------------------- */

export const MONTH_TABS = ["1º mês", "2º mês", "3º mês"] as const;

export const SLIDE_05: MonthContent = {
  kicker: "Plano de 90 dias",
  title: "1º mês — Diagnóstico e planejamento",
  activeTab: 0,
  pillars: ["Conhecer", "Alinhar", "Estruturar"],
  leftItems: [
    "Levantamento de dados e histórico",
    "Construção do plano estratégico",
    "Alinhamento interdepartamental",
  ],
  rightItems: [
    "Escuta com equipes e lideranças",
    "Definição de KPIs e baselines",
    "Estruturação da comunicação interna",
  ],
  deliverableLabel: "Entregável",
  deliverable: "Diagnóstico 360º + plano tático de 90 dias",
};

export const SLIDE_06: MonthContent = {
  kicker: "Plano de 90 dias",
  title: "2º mês — Implementação",
  activeTab: 1,
  pillars: ["Executar", "Acompanhar", "Ajustar"],
  leftItems: [
    "Campanhas por curso e por ingresso",
    "Otimização da jornada do candidato",
    "Integração entre as áreas",
  ],
  rightItems: [
    "Ativação dos canais prioritários",
    "Organização e rotina da equipe",
    "Acompanhamento semanal de resultados",
  ],
  deliverableLabel: "Entregável",
  deliverable: "Campanhas ativas + painel de acompanhamento",
};

export const SLIDE_07: MonthContent = {
  kicker: "Plano de 90 dias",
  title: "3º mês — Otimização e resultados",
  activeTab: 2,
  pillars: ["Analisar", "Otimizar", "Consolidar"],
  leftItems: [
    "Análise de desempenho por canal",
    "Testes de mensagem e criativo",
    "Clima e desenvolvimento do time",
  ],
  rightItems: [
    "Otimização de investimentos",
    "Consolidação de processos",
    "Plano de longo prazo",
  ],
  deliverableLabel: "Entregável",
  deliverable: "Relatório executivo + roadmap trimestral",
};

/* ---------------------------------------------------------------- *
 * 08 — Mensagem por curso
 * ---------------------------------------------------------------- */

export const SLIDE_08 = {
  kicker: "Estratégias de captação",
  title: "Mensagem por curso",
  cards: [
    {
      badge: "Direito",
      body: "“Formação jurídica para liderar decisões e transformar realidades.”",
      meta: "Prática • Reputação • Rede profissional",
    },
    {
      badge: "Administração Tech",
      body: "“Negócios, dados e tecnologia para liderar o mercado.”",
      meta: "Visão aplicada • Inovação • Empregabilidade",
    },
    {
      badge: "Engenharia de Software",
      body: "“Construa soluções digitais que movem o futuro.”",
      meta: "Tecnologia • Projetos práticos • Carreira em alta",
    },
  ] satisfies BadgeCard[],
};

/* ---------------------------------------------------------------- *
 * 09 — Canais e ferramentas
 * ---------------------------------------------------------------- */

export const SLIDE_09 = {
  kicker: "Estratégias de captação",
  title: "Canais e ferramentas",
  cards: [
    { badge: "Instagram", body: "Prova social e rotina do campus", meta: "" },
    { badge: "TikTok", body: "Conteúdos autênticos e tendências", meta: "" },
    { badge: "Google Ads", body: "Captura da intenção de busca", meta: "" },
    { badge: "Meta Ads", body: "Alcance e remarketing", meta: "" },
    { badge: "LinkedIn", body: "Reputação e conexões profissionais", meta: "" },
    { badge: "E-mail / WhatsApp", body: "Nutrição e resposta rápida", meta: "" },
  ] satisfies BadgeCard[],
  note: "Eventos presenciais — experiência e conversão",
};

/* ---------------------------------------------------------------- *
 * 10 — Jornada do candidato
 * ---------------------------------------------------------------- */

export const SLIDE_10 = {
  kicker: "Experiência",
  title: "Jornada do candidato",
  sectionLabel: "Melhoria e SLA por etapa",
  steps: [
    { number: "01", title: "1º contato", body: "Landing page clara com CTA imediato" },
    { number: "02", title: "Nutrição", body: "Conteúdo segmentado em até 24h" },
    { number: "03", title: "Interesse", body: "Atendimento consultivo em até 15 min" },
    {
      number: "04",
      title: "Conversão",
      body: "Inscrição simplificada + recuperação de abandono",
    },
    {
      number: "05",
      title: "Pós-matrícula",
      body: "Onboarding e acolhimento na 1ª semana",
    },
  ] satisfies JourneyStep[],
};

/* ---------------------------------------------------------------- *
 * 11 — Clima organizacional e engajamento
 * ---------------------------------------------------------------- */

export const SLIDE_11 = {
  kicker: "Pessoas",
  title: "Clima organizacional e engajamento",
  cards: [
    {
      badge: "Comunicação interna",
      body: "Rituais claros e alinhamento",
      meta: "Impacto: menos ruído, mais foco",
    },
    {
      badge: "Engajamento e sentimento de pertencimento",
      body: "Time conectado ao propósito do iCEV",
      meta: "Impacto: orgulho de pertencer e mais entrega",
    },
    {
      badge: "Colaboração e troca de ideias",
      body: "Espaços abertos de construção conjunta",
      meta: "Impacto: times remando junto",
    },
    {
      badge: "Reconhecimento de resultados",
      body: "Celebrar resultados e boas iniciativas",
      meta: "Impacto: motivação e retenção",
    },
    {
      badge: "Criatividade e inovação",
      body: "Sprints e banco de ideias",
      meta: "Impacto: campanhas mais originais",
    },
    {
      badge: "Integração entre áreas",
      body: "Marketing, Comercial, Coordenações e demais áreas",
      meta: "Impacto: decisões mais rápidas",
    },
  ] satisfies BadgeCard[],
};

/* ---------------------------------------------------------------- *
 * 12 — Indicadores e KPIs
 * ---------------------------------------------------------------- */

export const SLIDE_12 = {
  kicker: "Gestão por dados",
  title: "Indicadores e KPIs",
  headers: {
    indicator: "Indicador",
    target: "Meta em 3 meses",
    frequency: "Frequência",
  },
  rows: [
    { indicator: "Volume de inscrições", target: "+20%", frequency: "Semanal" },
    {
      indicator: "Taxa de conversão",
      target: "+10% sobre baseline",
      frequency: "Semanal",
    },
    { indicator: "CPL (custo por lead)", target: "-15%", frequency: "Semanal" },
    { indicator: "Engajamento nas redes", target: "+25%", frequency: "Semanal" },
    { indicator: "Tempo de resposta", target: "Até 15 min", frequency: "Diário" },
    { indicator: "Satisfação interna", target: "≥ 85%", frequency: "Mensal" },
    { indicator: "Taxa de abandono", target: "-10%", frequency: "Quinzenal" },
  ] satisfies KpiRow[],
  note: "As metas são referências iniciais e devem ser calibradas após o diagnóstico de baseline.",
};

/* ---------------------------------------------------------------- *
 * 13 — Resultados esperados
 * ---------------------------------------------------------------- */

export const SLIDE_13 = {
  kicker: "Entrega",
  title: "Resultados esperados em 3 meses",
  items: [
    "Funil mensurável e otimizado",
    "Campanhas por curso ativas",
    "Mais volume e qualidade de leads",
    "Jornada do candidato mais rápida",
    "Marketing, Comercial e Acadêmico integrados",
    "Time alinhado e reconhecido",
    "Rotina consolidada de indicadores",
  ],
};

/* ---------------------------------------------------------------- *
 * 14 — Diferenciais
 * ---------------------------------------------------------------- */

export const SLIDE_14 = {
  kicker: "Por que esta proposta",
  title: "Diferenciais",
  cards: [
    { number: "01", title: "Gestão orientada por dados" },
    { number: "02", title: "Comunicação por curso e perfil" },
    { number: "03", title: "Jornada centrada no candidato" },
    { number: "04", title: "Mídia e conteúdo integrados" },
    { number: "05", title: "Liderança próxima e colaborativa" },
    { number: "06", title: "Melhoria contínua com testes" },
  ] satisfies NumberedCard[],
  note: "Uma atuação que une análise, execução e pessoas.",
};

/* ---------------------------------------------------------------- *
 * 15 — Conclusão (mesma composição da capa)
 * ---------------------------------------------------------------- */

export const SLIDE_15: CoverContent = {
  badge: "Fechamento",
  title: "Conclusão",
  subtitle: "Presença em captação, captação em matrícula",
  lines: [
    "Nos primeiros 90 dias, a proposta combina diagnóstico rigoroso, execução orientada por dados e liderança colaborativa.",
    "O objetivo é transformar metas em um time mais integrado, confiante e preparado para crescer.",
  ],
};

/* ---------------------------------------------------------------- *
 * 16 — Encerramento (mesma composição da capa)
 * ---------------------------------------------------------------- */

export const SLIDE_16: CoverContent = {
  badge: "Informações do processo",
  title: "Obrigado(a).",
  subtitle: "iCEV – Instituto de Ensino Superior | Teresina/PI",
  lines: [
    "O portfólio profissional será enviado em anexo, separadamente desta apresentação.",
    "Prazo de entrega: 31/08/2026 às 10h | Envio: amandaleticia@grupocev.com",
    "[Seu nome completo] | [seu@email.com] | [(00) 00000-0000]",
  ],
};

export const SLIDE_TITLES = [
  "Capa",
  "Sumário",
  "Contexto e objetivos",
  "Diagnóstico inicial",
  "1º mês — Diagnóstico e planejamento",
  "2º mês — Implementação",
  "3º mês — Otimização e resultados",
  "Mensagem por curso",
  "Canais e ferramentas",
  "Jornada do candidato",
  "Clima organizacional e engajamento",
  "Indicadores e KPIs",
  "Resultados esperados",
  "Diferenciais",
  "Conclusão",
  "Encerramento",
] as const;

export const TOTAL_SLIDES = SLIDE_TITLES.length;
