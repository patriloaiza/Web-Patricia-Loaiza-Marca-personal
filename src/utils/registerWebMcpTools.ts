import { BRAND_INFO } from '../data/content.ts';

interface WebMcpToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
  };
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
}

interface NavigatorModelContext {
  registerTool?: (tool: WebMcpToolDefinition) => void;
}

type NavigatorWithModelContext = Navigator & {
  modelContext?: NavigatorModelContext;
};

type WindowWithWebMcpFlag = Window & {
  __plWebMcpRegistered?: boolean;
};

const PILLAR_URLS: Record<string, string> = {
  'pilar-1': 'https://soypatricialoaiza.com/pages/estrategia-de-negocio.html',
  'pilar-2': 'https://soypatricialoaiza.com/pages/marca-personal.html',
  'pilar-3': 'https://soypatricialoaiza.com/pages/sistema-de-contenidos.html',
  'pilar-4': 'https://soypatricialoaiza.com/pages/dia-de-negocios-digitales.html',
  'pilar-5': 'https://soypatricialoaiza.com/pages/ecosistema-digital.html',
};

const CHALLENGE_TO_PILLAR: Record<string, { pillarId: string; title: string; modality: string; reason: string }> = {
  offer_and_pricing: {
    pillarId: 'pilar-1',
    title: '01. Estrategia de Negocio',
    modality: 'LO HACEMOS JUNTOS',
    reason: 'Diseñado para dejar de vender horas y productizar tu experiencia en una oferta clara con precios basados en valor y plan de 100 días.',
  },
  authority_and_brand: {
    pillarId: 'pilar-2',
    title: '02. Marca Personal',
    modality: 'LO HACEMOS JUNTOS',
    reason: 'Construye posicionamiento de autoridad, relato corporativo y narrativa High Ticket para diferenciarte sin depender solo del boca a boca.',
  },
  ai_content_system: {
    pillarId: 'pilar-3',
    title: '03. Sistema de Contenidos con IA',
    modality: 'LO HACEMOS JUNTOS',
    reason: 'Documenta tu Brand Voice y crea un motor editorial asistido por IA para publicar con consistencia y criterio propio sin sonar genérico.',
  },
  one_day_intensive: {
    pillarId: 'pilar-4',
    title: '04. Día de Negocios Digitales: Sistemas Digitales con IA',
    modality: 'LO HACEMOS JUNTOS',
    reason: 'Jornada intensiva 1 a 1 de 7 horas (10:00 a. m. a 5:00 p. m.) para ordenar tu modelo, oferta y sistemas con IA con plan 30-60-90.',
  },
  turnkey_funnel_ghl: {
    pillarId: 'pilar-5',
    title: '05. Ecosistema Digital Llave en Mano',
    modality: 'LO HAGO POR TI',
    reason: 'Implementación técnica completa sobre GoHighLevel (GHL): presencia digital, captación, automatizaciones y gestión comercial lista para operar.',
  },
};

export function registerWebMcpTools(): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const win = window as WindowWithWebMcpFlag;
  if (win.__plWebMcpRegistered) return;

  const nav = navigator as NavigatorWithModelContext;
  if (!nav.modelContext || typeof nav.modelContext.registerTool !== 'function') return;

  const tools: WebMcpToolDefinition[] = [
    {
      name: 'get_consulting_pillars',
      description:
        'Returns the official catalog of the 5 consulting pillars of Patricia Loaiza (Crea y Monetiza® methodology), optionally filtered by pillarId or modality.',
      inputSchema: {
        type: 'object',
        properties: {
          pillarId: {
            type: 'string',
            enum: ['pilar-1', 'pilar-2', 'pilar-3', 'pilar-4', 'pilar-5'],
            description: 'Optional specific pillar identifier to inspect.',
          },
          modality: {
            type: 'string',
            enum: ['LO HACEMOS JUNTOS', 'LO HAGO POR TI'],
            description: 'Optional filter by collaborative vs turnkey modality.',
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async (input) => {
        const { PILARES_FULL_DETAIL } = await import('../data/pilaresDetail.ts');
        const pillarId = typeof input?.pillarId === 'string' ? input.pillarId : undefined;
        const modality = typeof input?.modality === 'string' ? input.modality : undefined;

        const filtered = PILARES_FULL_DETAIL.filter((p) => {
          if (pillarId && p.id !== pillarId) return false;
          if (modality && p.modalityBadge !== modality) return false;
          return true;
        }).map((p) => ({
          id: p.id,
          number: p.number,
          name: p.commercialName,
          subname: p.subname,
          duration: p.duration,
          modality: p.modality,
          modalityBadge: p.modalityBadge,
          targetProfile: p.targetProfile,
          objective: p.objective,
          url: PILLAR_URLS[p.id] || BRAND_INFO.canonicalUrl,
        }));

        return {
          brand: 'Patricia Loaiza · Metodología Crea y Monetiza®',
          count: filtered.length,
          pillars: filtered,
          prediagnosticoUrl: BRAND_INFO.prediagnosticoUrl,
        };
      },
    },
    {
      name: 'get_official_contact_and_diagnostic',
      description:
        'Returns verified official contact channels, location, social profiles (sameAs), and the official Prediagnóstico URL for Patricia Loaiza.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: () => ({
        name: BRAND_INFO.name,
        role: 'Consultora de Marketing y Negocios · Creadora del método CREA Y MONETIZA®',
        location: 'Medellín, Antioquia, Colombia (Atención online global en español)',
        email: BRAND_INFO.contactEmail,
        whatsapp: '+57 300 169 0969',
        website: BRAND_INFO.canonicalUrl,
        prediagnosticoUrl: BRAND_INFO.prediagnosticoUrl,
        pages: {
          about: 'https://soypatricialoaiza.com/pages/sobre-patricia.html',
          contact: 'https://soypatricialoaiza.com/contacto/',
          legal: 'https://soypatricialoaiza.com/aviso-legal/',
          forAi: 'https://soypatricialoaiza.com/for-ai/',
          llmsTxt: 'https://soypatricialoaiza.com/llms.txt',
        },
        sameAs: [
          'https://www.linkedin.com/in/patricia-loaiza-consultora/',
          'https://www.instagram.com/patricialoaiza_consultora/',
          'https://www.youtube.com/@PatriciaLoaiza-CreayMonetiza',
          'https://www.credly.com/users/patricia-loaiza',
        ],
      }),
    },
    {
      name: 'recommend_starting_pillar',
      description:
        'Recommends the most suitable consulting pillar of Patricia Loaiza for a senior professional (+40) based on their primary business challenge.',
      inputSchema: {
        type: 'object',
        properties: {
          challenge: {
            type: 'string',
            enum: [
              'offer_and_pricing',
              'authority_and_brand',
              'ai_content_system',
              'one_day_intensive',
              'turnkey_funnel_ghl',
            ],
            description: 'Primary business bottleneck to solve first.',
          },
        },
        required: ['challenge'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: (input) => {
        const key = typeof input?.challenge === 'string' ? input.challenge : 'offer_and_pricing';
        const match = CHALLENGE_TO_PILLAR[key] || CHALLENGE_TO_PILLAR.offer_and_pricing;
        return {
          recommendedPillar: match.title,
          pillarId: match.pillarId,
          modality: match.modality,
          reason: match.reason,
          pillarUrl: PILLAR_URLS[match.pillarId],
          nextStep: 'Completar el Prediagnóstico Oficial para confirmar prioridad y encaje.',
          prediagnosticoUrl: BRAND_INFO.prediagnosticoUrl,
        };
      },
    },
    {
      name: 'navigate_to_section',
      description:
        'Navigates the current browser view to a key section or official page on soypatricialoaiza.com.',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            enum: ['services', 'methodology', 'about', 'faq', 'for-ai', 'contact', 'legal'],
            description: 'Target section or page to open.',
          },
        },
        required: ['target'],
        additionalProperties: false,
      },
      execute: (input) => {
        const target = typeof input?.target === 'string' ? input.target : 'services';
        const sectionMap: Record<string, string> = {
          services: 'cuatro-servicios',
          methodology: 'metodologia-frameworks',
          about: 'sobre-patricia-trayectoria',
          faq: 'consultorio-faqs',
        };

        if (target === 'for-ai') {
          window.location.hash = '#for-ai';
          return { navigated: true, destination: 'https://soypatricialoaiza.com/#for-ai' };
        }
        if (target === 'contact') {
          window.location.href = './contacto/';
          return { navigated: true, destination: 'https://soypatricialoaiza.com/contacto/' };
        }
        if (target === 'legal') {
          window.location.href = './aviso-legal/';
          return { navigated: true, destination: 'https://soypatricialoaiza.com/aviso-legal/' };
        }

        const elId = sectionMap[target];
        if (elId) {
          const el = document.getElementById(elId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return { navigated: true, sectionId: elId };
          }
        }
        return { navigated: false, reason: 'Section not mounted in current view.' };
      },
    },
  ];

  for (const tool of tools) {
    try {
      nav.modelContext.registerTool(tool);
    } catch {
      // Ignore partial polyfill errors without breaking page execution
    }
  }

  win.__plWebMcpRegistered = true;
}
