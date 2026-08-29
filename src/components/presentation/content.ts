/** Conteúdo da apresentação: Proposta de Atuação iCEV. */

export const DECK_META = {
  title: "Proposta de Atuação: Coordenador de Marketing",
  shortTitle: "Proposta de Atuação · iCEV",
  subtitle: "iCEV | Use ← → para navegar, G para a grade",
  institutionFooter: "Instituto de Ensino Superior | iCEV: Teresina/PI",
  deckFooter: "iCEV | Proposta de Atuação: Coordenador de Marketing",
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
  lines: ["Instituto de Ensino Superior | iCEV", "Antonio Fontes", "comfontes@gmail.com", "(86) 99997-4164"],
};

export const SLIDE_02 = {
  kicker: "VISÃO EXECUTIVA",
  title: "O que esta proposta entrega",
  items: [
    { number: "01", label: "Diagnóstico: entender funil, canais, dados, equipe e gargalos" },
    { number: "02", label: "Captação: gerar demanda qualificada e aumentar conversão" },
    { number: "03", label: "Jornada: reduzir atritos do primeiro contato à matrícula" },
    { number: "04", label: "Pessoas: fortalecer comunicação, colaboração e pertencimento" },
    { number: "05", label: "Gestão: acompanhar KPIs e decidir com base em evidências" },
    { number: "06", label: "90 dias: diagnosticar, implementar, medir e escalar" },
  ] satisfies SummaryItem[],
};

export const SLIDE_03 = {
  kicker: "LEITURA DO DESAFIO",
  title: "Dois objetivos, uma mesma lógica de gestão",
  left: {
    heading: "01 · Captação e matrícula",
    items: [
      "Construir um funil por oferta: atração → lead → oportunidade → inscrição → matrícula.",
      "Combinar mídia paga, conteúdo, redes sociais, eventos, landing pages e WhatsApp.",
      "Segmentar mensagens por público e estágio de decisão do candidato.",
      "Transformar diferenciais acadêmicos em argumentos de escolha e prova social.",
      "Integrar Marketing e Comercial para responder rápido e recuperar oportunidades.",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "02 · Clima e colaboração",
    items: [
      "Criar rituais de alinhamento, prioridades claras e responsabilidades visíveis.",
      "Promover brainstorms, troca de aprendizados e construção conjunta de campanhas.",
      "Reconhecer entregas, evolução e iniciativas que gerem impacto.",
      "Conectar Marketing, Comercial, Coordenações e demais áreas à jornada do aluno.",
      "Dar espaço para experimentação, testes e inovação com acompanhamento de resultado.",
    ],
  } satisfies ColumnContent,
};

export const SLIDE_04 = {
  kicker: "1º MÊS · DIAGNÓSTICO",
  title: "Antes de acelerar, descobrir onde está o ganho",
  left: {
    heading: "Dados que eu buscaria",
    items: [
      "Leads, inscrições e matrículas por curso, período e origem.",
      "Conversão entre etapas e tempo médio até atendimento e matrícula.",
      "CPL, CAC, investimento, retorno e qualidade dos leads por canal.",
      "Desempenho de campanhas, landing pages, redes sociais e conteúdos.",
      "Taxas de abandono, motivos de perda e oportunidades de recuperação.",
    ],
  } satisfies ColumnContent,
  right: {
    heading: "Perguntas que eu responderia",
    items: [
      "Quais ofertas têm maior potencial e quais gargalos precisam de atenção primeiro?",
      "Que argumentos realmente diferenciam o iCEV para cada público?",
      "Onde o candidato abandona e por quê?",
      "Marketing entrega lead qualificado? Comercial responde no tempo certo?",
      "Quais ações já funcionam e merecem mais investimento?",
    ],
  } satisfies ColumnContent,
};

export const MONTH_TABS = ["1º mês", "2º mês", "3º mês"] as const;

export const SLIDE_05: MonthContent = {
  kicker: "PLANO DOS 3 PRIMEIROS MESES", title: "1º mês: Diagnóstico e planejamento", activeTab: 0,
  pillars: ["Diagnosticar", "Alinhar", "Priorizar"],
  leftItems: ["Auditar funil, canais, campanhas, conteúdo, CRM e jornada do candidato.", "Entrevistar Marketing, Comercial, Coordenações e lideranças.", "Mapear gargalos, quick wins e oportunidades por oferta."],
  rightItems: ["Definir baseline e painel inicial de KPIs.", "Escolher 3 a 5 prioridades para o trimestre, evitando dispersão.", "Criar calendário de campanhas e rotina de alinhamento entre áreas."],
  deliverableLabel: "ENTREGA DO MÊS", deliverable: "Diagnóstico 360º + prioridades + plano tático de 90 dias",
};

export const SLIDE_06: MonthContent = {
  kicker: "PLANO DOS 3 PRIMEIROS MESES", title: "2º mês: Implementação", activeTab: 1,
  pillars: ["Executar", "Testar", "Acompanhar"],
  leftItems: ["Lançar campanhas prioritárias por oferta, público e etapa do funil.", "Criar conteúdos de prova social, carreira, rotina acadêmica e diferenciais.", "Ativar landing pages, remarketing, WhatsApp e fluxos de nutrição."],
  rightItems: ["Definir responsáveis, prazos e critérios de aprovação.", "Implantar reunião semanal Marketing + Comercial baseada no funil.", "Testar criativos, ofertas, públicos, CTAs e abordagens de atendimento."],
  deliverableLabel: "ENTREGA DO MÊS", deliverable: "Campanhas no ar + rotina comercial + primeiros testes comparativos",
};

export const SLIDE_07: MonthContent = {
  kicker: "PLANO DOS 3 PRIMEIROS MESES", title: "3º mês: Otimização e resultados", activeTab: 2,
  pillars: ["Medir", "Otimizar", "Escalar"],
  leftItems: ["Comparar resultados com o baseline e localizar os maiores ganhos e gargalos.", "Analisar performance por escola ou curso, canal, campanha e etapa do funil.", "Cortar desperdícios e reforçar ações com melhor conversão e qualidade de lead."],
  rightItems: ["Realocar verba e esforço para canais e mensagens vencedores.", "Consolidar processos, aprendizados e responsabilidades do time.", "Apresentar roadmap do próximo trimestre com metas, testes e prioridades."],
  deliverableLabel: "ENTREGA DO MÊS", deliverable: "Relatório executivo + otimizações + roadmap do próximo trimestre",
};

export const SLIDE_08 = {
  kicker: "CAPTAÇÃO · ATRATIVIDADE",
  title: "Como tornar os cursos mais desejáveis e vendáveis",
  cards: [
    { badge: "01 · ENTENDER O CANDIDATO", body: "Descobrir o que pesa na escolha: carreira, mercado, experiência prática, reconhecimento, investimento e segurança na decisão.", meta: "Ouvir candidatos, alunos e equipe antes de definir a promessa." },
    { badge: "02 · VENDER TRANSFORMAÇÃO", body: "Trocar a comunicação de atributos por benefícios concretos: o que o aluno aprende fazendo, que experiências terá e como isso o aproxima do mercado.", meta: "Pergunta central: por que este curso vale a escolha?" },
    { badge: "03 · PROVAR E CONVERTER", body: "Mostrar a experiência por meio de alunos, professores, projetos, eventos e histórias reais. Depois, levar o interesse para uma jornada simples até a matrícula.", meta: "Descobrir → Desejar → Considerar → Decidir" },
  ] satisfies BadgeCard[],
  note: "Princípio: não vender apenas uma graduação. Vender uma perspectiva de futuro que o candidato consiga enxergar.",
};

export const SLIDE_09 = {
  kicker: "CAPTAÇÃO · MIX DE CANAIS", title: "Cada canal cumpre um papel no funil",
  cards: [
    { badge: "Instagram", body: "Construir desejo, identificação e prova social", meta: "Reels • stories • alunos • professores • rotina e experiências" },
    { badge: "TikTok", body: "Ganhar relevância junto ao público jovem", meta: "Conteúdo nativo • carreira • bastidores • linguagem da plataforma" },
    { badge: "Google Ads", body: "Capturar intenção de quem já procura uma graduação", meta: "Busca por curso • região • termos de alta intenção" },
    { badge: "Meta Ads", body: "Escalar descoberta e recuperar interesse", meta: "Prospecção • remarketing • testes de criativos e públicos" },
    { badge: "Landing pages", body: "Transformar interesse em ação", meta: "Oferta clara • prova • CTA • formulário curto • rastreamento" },
    { badge: "WhatsApp + CRM", body: "Transformar lead em oportunidade e matrícula", meta: "SLA • follow-up • nutrição • recuperação de abandono" },
  ] satisfies BadgeCard[],
  note: "Eventos, experiências no campus e parcerias entram como canais de confiança e consideração, com rastreamento da origem sempre que possível.",
};

export const SLIDE_10 = {
  kicker: "JORNADA DO CANDIDATO", title: "Menos atrito. Mais velocidade. Mais conversão.", sectionLabel: "O que muda em cada etapa",
  steps: [
    { number: "01", title: "Descoberta", body: "Conteúdo e mídia levam o público certo para uma proposta de valor clara." },
    { number: "02", title: "Lead", body: "Página ou formulário simples, origem registrada e próximo passo explícito." },
    { number: "03", title: "Atendimento", body: "Lead quente recebe contato rápido, consultivo e contextualizado ao interesse." },
    { number: "04", title: "Decisão", body: "Objeções são tratadas com prova social, diferenciais, conteúdo e follow-up." },
    { number: "05", title: "Matrícula", body: "Processo simples, recuperação de abandono e comunicação clara até a conclusão." },
  ] satisfies JourneyStep[],
};

export const SLIDE_11 = {
  kicker: "PESSOAS · CLIMA E ENGAJAMENTO", title: "Um time alinhado entrega melhor e mais rápido",
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
  kicker: "GESTÃO POR DADOS", title: "KPIs que mostram onde agir, não apenas o que aconteceu",
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
  note: "As metas são referências iniciais. O baseline real será definido no diagnóstico do 1º mês.",
};

export const SLIDE_13 = {
  kicker: "RESULTADOS ESPERADOS", title: "Ao final de 90 dias, o que deve estar diferente",
  items: ["Funil de captação visível, com origem, qualidade e conversão por etapa.", "Campanhas e mensagens prioritárias estruturadas por público e oferta.", "Mais previsibilidade de geração e tratamento de leads qualificados.", "Jornada com menos atritos, SLA de atendimento e recuperação de abandonos.", "Marketing e Comercial acompanhando os mesmos números e prioridades.", "Equipe com rituais de comunicação, colaboração, reconhecimento e aprendizado."],
};

export const SLIDE_14 = {
  kicker: "DIFERENCIAIS DA PROPOSTA", title: "Como eu atuaria como Coordenador",
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
  badge: "FECHAMENTO", title: "Estratégia que vira execução", subtitle: "Diagnosticar. Priorizar. Executar. Medir. Melhorar.",
  lines: ["Nos primeiros 90 dias, meu objetivo é criar clareza sobre o funil, colocar as prioridades em movimento e construir uma rotina de gestão que permaneça depois do trimestre.", "Captação e clima caminham juntos: resultados sustentáveis dependem de processos, dados e pessoas trabalhando na mesma direção."],
};

export const SLIDE_16: CoverContent = {
  badge: "ENCERRAMENTO", title: "OBRIGADO!", subtitle: "Proposta de atuação", lines: ["Coordenador de Marketing iCEV", "Antonio Fontes", "comfontes@gmail.com", "(86) 99997-4164"],
};

export const SLIDE_TITLES = ["Capa", "Visão Executiva", "Leitura do Desafio", "Diagnóstico Inicial", "Mês 1: Diagnóstico e Planejamento", "Mês 2: Implementação", "Mês 3: Otimização e Resultados", "Atratividade dos Cursos", "Mix de Canais", "Jornada do Candidato", "Clima e Engajamento", "Indicadores e KPIs", "Resultados Esperados", "Diferenciais da Proposta", "Fechamento", "Encerramento"] as const;
export const TOTAL_SLIDES = SLIDE_TITLES.length;
