/**
 * Conteúdo padrão da apresentação.
 *
 * Todos os textos renderizados pelos slides usam ids estáveis nos componentes
 * EditableText. Assim, o conteúdo pode ser alterado no modo Editar sem perder
 * a estrutura visual. Os defaults abaixo são restaurados quando o usuário
 * escolhe "Restaurar".
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
    "iCEV — Instituto de Ensino Superior | Teresina/PI",
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
    { number: "03", label: "Plano dos 3 primeiros meses" },
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
    heading: "1. Captação de novos alunos",
    items: [
      "Aumentar o número de interessados e matriculados",
      "Estruturar estratégias específicas para cada curso",
      "Integrar redes sociais, tráfego pago, conteúdo e relacionamento",
      "Aproximar o iCEV do público jovem",
      "Melhorar a jornada do primeiro contato até a matrícula",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "2. Fortalecimento do clima organizacional",
    items: [
      "Melhorar a comunicação interna da equipe de Marketing",
      "Estimular colaboração e troca de ideias",
      "Aumentar engajamento e sentimento de pertencimento",
      "Reconhecer resultados e boas iniciativas",
      "Integrar Marketing, Comercial, Coordenações e demais áreas",
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
    heading: "O que eu avaliaria ao chegar",
    items: [
      "Histórico de leads, inscrições e matrículas",
      "Conversão por etapa, curso e canal",
      "Origem e qualidade dos leads",
      "CPL, CAC e eficiência dos investimentos",
      "Redes sociais, conteúdo, campanhas e concorrência",
      "Processos entre Marketing, Comercial e Coordenações",
      "Pontos de atrito e abandono na jornada do candidato",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "Oportunidades a validar",
    items: [
      "Explorar melhor os diferenciais de cada curso",
      "Fortalecer prova social com alunos e egressos",
      "Ampliar a conexão com o público jovem",
      "Integrar aquisição, atendimento e conversão",
      "Criar metas compartilhadas entre Marketing e Comercial",
      "Estabelecer rotina de decisões baseada em dados",
    ],
  } satisfies ColumnContent,
};

/* ---------------------------------------------------------------- *
 * 05 / 06 / 07 — Plano de 90 dias
 * ---------------------------------------------------------------- */

export const MONTH_TABS = ["1º mês", "2º mês", "3º mês"] as const;

export const SLIDE_05: MonthContent = {
  kicker: "Plano dos 3 primeiros meses",
  title: "1º mês — Diagnóstico e planejamento",
  activeTab: 0,
  pillars: ["Conhecer", "Alinhar", "Priorizar"],
  leftItems: [
    "Levantar histórico de leads, inscrições, matrículas e conversões",
    "Avaliar desempenho por curso, canal e campanha",
    "Mapear jornada e principais pontos de abandono",
  ],
  rightItems: [
    "Ouvir Marketing, Comercial, Coordenações e lideranças",
    "Definir baseline, KPIs e prioridades",
    "Estruturar plano tático e rotina de comunicação interna",
  ],
  deliverableLabel: "Entregável",
  deliverable: "Diagnóstico 360º + prioridades + plano tático de 90 dias",
};

export const SLIDE_06: MonthContent = {
  kicker: "Plano dos 3 primeiros meses",
  title: "2º mês — Implementação",
  activeTab: 1,
  pillars: ["Executar", "Acompanhar", "Ajustar"],
  leftItems: [
    "Ativar campanhas prioritárias por curso e público",
    "Colocar em prática redes sociais, conteúdo e mídia paga",
    "Estruturar relacionamento, follow-up e recuperação de leads",
  ],
  rightItems: [
    "Organizar responsáveis, prazos e prioridades da equipe",
    "Criar rotina semanal de acompanhamento com Comercial",
    "Testar mensagens, criativos, públicos e abordagens",
  ],
  deliverableLabel: "Entregável",
  deliverable: "Campanhas prioritárias ativas + rotina de acompanhamento",
};

export const SLIDE_07: MonthContent = {
  kicker: "Plano dos 3 primeiros meses",
  title: "3º mês — Otimização e resultados",
  activeTab: 2,
  pillars: ["Analisar", "Otimizar", "Consolidar"],
  leftItems: [
    "Comparar resultados com o baseline definido no 1º mês",
    "Avaliar desempenho por curso, canal e etapa do funil",
    "Identificar o que deve ser mantido, ajustado ou interrompido",
  ],
  rightItems: [
    "Realocar esforços para ações mais eficientes",
    "Consolidar processos e aprendizados da equipe",
    "Definir próximos passos e roadmap para o trimestre seguinte",
  ],
  deliverableLabel: "Entregável",
  deliverable: "Relatório executivo + aprendizados + roadmap de continuidade",
};

/* ---------------------------------------------------------------- *
 * 08 — Mensagem por curso
 * ---------------------------------------------------------------- */

export const SLIDE_08 = {
  kicker: "Estratégias de captação",
  title: "Estratégia por curso",
  cards: [
    {
      badge: "Direito",
      body: "Atrair quem busca formação jurídica sólida, prática e conectada à carreira.",
      meta: "Mensagem: formação + experiência + carreira | Canais: Instagram, Google Ads, conteúdo e eventos",
    },
    {
      badge: "Administração Tech",
      body: "Conectar negócios, tecnologia e inovação às oportunidades do mercado.",
      meta: "Mensagem: gestão + tecnologia + empregabilidade | Canais: Instagram, TikTok, Meta Ads e Google Ads",
    },
    {
      badge: "Engenharia de Software",
      body: "Mostrar tecnologia na prática e as possibilidades de carreira em produtos digitais.",
      meta: "Mensagem: prática + projetos + mercado | Canais: TikTok, Instagram, Google Ads e conteúdo",
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
    { badge: "Instagram", body: "Marca, prova social e relacionamento", meta: "Rotina acadêmica • alunos • professores • campanhas" },
    { badge: "TikTok", body: "Conexão e alcance com o público jovem", meta: "Conteúdo nativo • tendências • carreira • bastidores" },
    { badge: "Google Ads", body: "Captura de demanda e intenção", meta: "Campanhas por curso • palavras-chave • conversão" },
    { badge: "Meta Ads", body: "Aquisição e remarketing", meta: "Segmentação • campanhas por curso • recuperação" },
    { badge: "Conteúdo", body: "Autoridade, consideração e diferenciação", meta: "Carreira • cursos • professores • prova social" },
    { badge: "WhatsApp / E-mail", body: "Relacionamento e conversão", meta: "Nutrição • atendimento • follow-up • recuperação" },
  ] satisfies BadgeCard[],
  note: "Eventos presenciais: experiência, relacionamento e conversão",
};

/* ---------------------------------------------------------------- *
 * 10 — Jornada do candidato
 * ---------------------------------------------------------------- */

export const SLIDE_10 = {
  kicker: "Experiência",
  title: "Jornada do candidato",
  sectionLabel: "Melhoria e SLA por etapa",
  steps: [
    { number: "01", title: "1º contato", body: "Conteúdo, mídia e landing page com CTA claro" },
    { number: "02", title: "Nutrição", body: "Conteúdo segmentado e resposta inicial em até 24h" },
    { number: "03", title: "Interesse", body: "Atendimento consultivo e ágil em até 15 min" },
    { number: "04", title: "Conversão", body: "Inscrição simples + follow-up + recuperação de abandono" },
    { number: "05", title: "Matrícula", body: "Redução de atritos + confirmação + onboarding" },
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
      body: "Rituais claros, alinhamentos objetivos e canais definidos",
      meta: "Resultado esperado: menos ruído e mais foco",
    },
    {
      badge: "Colaboração e troca de ideias",
      body: "Momentos de brainstorm, construção conjunta e compartilhamento de aprendizados",
      meta: "Resultado esperado: mais colaboração e soluções melhores",
    },
    {
      badge: "Engajamento e pertencimento",
      body: "Conectar o time ao propósito, aos resultados e ao impacto do trabalho",
      meta: "Resultado esperado: mais participação e senso de pertencimento",
    },
    {
      badge: "Reconhecimento",
      body: "Celebrar resultados, evolução e boas iniciativas",
      meta: "Resultado esperado: motivação e valorização do time",
    },
    {
      badge: "Criatividade e inovação",
      body: "Criar espaço para ideias, testes e experimentação com responsabilidade",
      meta: "Resultado esperado: campanhas mais relevantes e inovadoras",
    },
    {
      badge: "Integração entre áreas",
      body: "Rotina conjunta entre Marketing, Comercial, Coordenações e demais áreas",
      meta: "Resultado esperado: decisões mais rápidas e jornada mais integrada",
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
    target: "Referência em 3 meses",
    frequency: "Frequência",
  },
  rows: [
    { indicator: "Leads gerados", target: "Crescimento vs. baseline", frequency: "Semanal" },
    { indicator: "Inscrições", target: "+20%", frequency: "Semanal" },
    { indicator: "Matrículas", target: "Crescimento vs. baseline", frequency: "Semanal" },
    { indicator: "Taxa de conversão", target: "+10% sobre baseline", frequency: "Semanal" },
    { indicator: "CPL (custo por lead)", target: "-15%", frequency: "Semanal" },
    { indicator: "Taxa de abandono", target: "-10%", frequency: "Quinzenal" },
    { indicator: "Tempo de resposta", target: "Até 15 min", frequency: "Diário" },
    { indicator: "Engajamento nas redes", target: "+25%", frequency: "Semanal" },
    { indicator: "Satisfação interna", target: "≥ 85%", frequency: "Mensal" },
  ] satisfies KpiRow[],
  note: "Metas quantitativas são referências iniciais e devem ser calibradas após o diagnóstico e definição do baseline.",
};

/* ---------------------------------------------------------------- *
 * 13 — Resultados esperados
 * ---------------------------------------------------------------- */

export const SLIDE_13 = {
  kicker: "Entrega",
  title: "Resultados esperados em 3 meses",
  items: [
    "Funil de captação mensurável: leads → inscrições → matrículas",
    "Estratégias e campanhas específicas por curso em execução",
    "Maior volume e qualidade de interessados",
    "Jornada do candidato mais rápida, clara e integrada",
    "Marketing, Comercial e Coordenações trabalhando com objetivos comuns",
    "Time mais alinhado, colaborativo, reconhecido e engajado",
    "Rotina consolidada de indicadores, testes e melhoria contínua",
  ],
};

/* ---------------------------------------------------------------- *
 * 14 — Diferenciais
 * ---------------------------------------------------------------- */

export const SLIDE_14 = {
  kicker: "Por que esta proposta",
  title: "Diferenciais da proposta",
  cards: [
    { number: "01", title: "Gestão orientada por dados" },
    { number: "02", title: "Estratégia específica por curso e público" },
    { number: "03", title: "Jornada centrada no candidato" },
    { number: "04", title: "Mídia, conteúdo e relacionamento integrados" },
    { number: "05", title: "Liderança próxima e colaborativa" },
    { number: "06", title: "Melhoria contínua: testar, medir e otimizar" },
  ] satisfies NumberedCard[],
  note: "Uma atuação que une captação, experiência do candidato, integração entre áreas e desenvolvimento de pessoas.",
};

/* ---------------------------------------------------------------- *
 * 15 — Conclusão
 * ---------------------------------------------------------------- */

export const SLIDE_15: CoverContent = {
  badge: "Fechamento",
  title: "Conclusão",
  subtitle: "Estratégia, pessoas e dados para transformar interesse em matrícula",
  lines: [
    "Nos primeiros 90 dias, a proposta começa pelo diagnóstico, prioriza ações de impacto e cria uma rotina de acompanhamento.",
    "O foco é gerar resultados de captação sem perder de vista pessoas, colaboração e a experiência do candidato.",
  ],
};

/* ---------------------------------------------------------------- *
 * 16 — Encerramento
 * ---------------------------------------------------------------- */

export const SLIDE_16: CoverContent = {
  badge: "Obrigado(a)",
  title: "Vamos construir os próximos 90 dias",
  subtitle: "iCEV — Instituto de Ensino Superior | Teresina/PI",
  lines: [
    "Proposta de Atuação — Coordenador(a) de Marketing",
    "[Seu nome completo] | [seu@email.com] | [(00) 00000-0000]",
  ],
};
