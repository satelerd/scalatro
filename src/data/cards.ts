import { Card, CardRarity, CardType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// CARTAS DE PRODUCTOS - Generan más chips (poder computacional)
const productCards: Card[] = [
  // Cartas comunes
  {
    id: uuidv4(),
    name: 'MicroLLM',
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 4,
    baseMultiplier: 1.0,
    description: 'Un modelo pequeño de lenguaje para tareas básicas de texto.',
  },
  {
    id: uuidv4(),
    name: 'ImageSynth Basic',
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 5,
    baseMultiplier: 1.0,
    description: 'Genera imágenes sencillas a partir de descripciones textuales.',
  },
  {
    id: uuidv4(),
    name: 'AudioTranscribe',
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.1,
    description: 'Transcribe audio a texto con precisión básica.',
  },
  
  // Cartas poco comunes
  {
    id: uuidv4(),
    name: 'CodeAssistant',
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 7,
    baseMultiplier: 1.1,
    description: 'Asistente de programación que sugiere completaciones de código.',
  },
  {
    id: uuidv4(),
    name: 'ContextLLM',
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 8,
    baseMultiplier: 1.0,
    description: 'Modelo con mayor contexto que retiene información por más tiempo.',
  },
  
  // Cartas raras
  {
    id: uuidv4(),
    name: 'MultiModal-X',
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 12,
    baseMultiplier: 1.2,
    description: 'Procesamiento combinado de texto, imágenes y audio en un solo modelo.',
  },
  {
    id: uuidv4(),
    name: 'QuantumPredictor',
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 15,
    baseMultiplier: 1.0,
    description: 'Utiliza algoritmos cuánticos para mejorar las predicciones de modelos clásicos.',
  },
  
  // Cartas legendarias
  {
    id: uuidv4(),
    name: 'SkyNet-GPT',
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 25,
    baseMultiplier: 1.3,
    description: 'El modelo más avanzado con capacidades de razonamiento casi humanas.',
  },
];

// CARTAS DE APIs - Aumentan el multiplicador
const apiCards: Card[] = [
  // Cartas comunes
  {
    id: uuidv4(),
    name: 'REST Endpoints',
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 1,
    baseMultiplier: 1.3,
    description: 'Conjunto de endpoints REST para acceder a funciones básicas de IA.',
  },
  {
    id: uuidv4(),
    name: 'WebSockets API',
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 2,
    baseMultiplier: 1.4,
    description: 'Conexiones en tiempo real para respuestas más rápidas.',
  },
  
  // Cartas poco comunes
  {
    id: uuidv4(),
    name: 'GraphQL Interface',
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 3,
    baseMultiplier: 1.7,
    description: 'API flexible que permite a los clientes solicitar exactamente lo que necesitan.',
  },
  {
    id: uuidv4(),
    name: 'Batch Processing',
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 2,
    baseMultiplier: 1.8,
    description: 'Procesa grandes volúmenes de solicitudes en lotes para mayor eficiencia.',
  },
  
  // Cartas raras
  {
    id: uuidv4(),
    name: 'Stream Processing',
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 4,
    baseMultiplier: 2.2,
    description: 'Procesamiento continuo de datos en tiempo real para resultados inmediatos.',
  },
  {
    id: uuidv4(),
    name: 'Serverless Functions',
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 3,
    baseMultiplier: 2.5,
    description: 'Arquitectura que escala automáticamente según la demanda sin servidores dedicados.',
  },
  
  // Cartas legendarias
  {
    id: uuidv4(),
    name: 'NeuroAPI',
    type: CardType.API,
    rarity: CardRarity.LEGENDARY,
    baseChips: 5,
    baseMultiplier: 3.5,
    description: 'API neuroadaptativa que evoluciona y se optimiza según los patrones de uso.',
  },
];

// CARTAS DE CARACTERÍSTICAS - Equilibran chips y multiplicador
const featureCards: Card[] = [
  // Cartas comunes
  {
    id: uuidv4(),
    name: 'Chat Básico',
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.2,
    description: 'Interfaz de chat simple para interactuar con los modelos de IA.',
  },
  {
    id: uuidv4(),
    name: 'Filtro Contenido',
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 2,
    baseMultiplier: 1.3,
    description: 'Sistema básico para detectar y filtrar contenido inapropiado.',
  },
  
  // Cartas poco comunes
  {
    id: uuidv4(),
    name: 'Integración Email',
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 5,
    baseMultiplier: 1.4,
    description: 'Permite a la IA leer y responder emails automáticamente.',
  },
  {
    id: uuidv4(),
    name: 'Asistente Voz',
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 6,
    baseMultiplier: 1.5,
    description: 'Interfaz de voz natural para interactuar con los modelos.',
  },
  
  // Cartas raras
  {
    id: uuidv4(),
    name: 'Análisis Avanzado',
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 9,
    baseMultiplier: 1.8,
    description: 'Herramientas de análisis profundo de datos con visualizaciones interactivas.',
  },
  {
    id: uuidv4(),
    name: 'Agentes Autónomos',
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 8,
    baseMultiplier: 2.0,
    description: 'Agentes que realizan tareas complejas sin intervención humana.',
  },
  
  // Cartas legendarias
  {
    id: uuidv4(),
    name: 'Consciencia Digital',
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 15,
    baseMultiplier: 2.5,
    description: 'Sistema avanzado de self-awareness que permite adaptación autónoma a nuevos dominios.',
  },
];

// CARTAS ESPECIALES - Con efectos únicos
const specialCards: Card[] = [
  {
    id: uuidv4(),
    name: 'Bug Crítico',
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: -5,
    baseMultiplier: 3.0,
    description: '¡Un error en tu sistema! Reduce tus chips pero aumenta significativamente el multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Overfitting',
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 20,
    baseMultiplier: 0.5,
    description: 'Tu modelo se ajusta demasiado a los datos de entrenamiento. Muchos chips pero bajo multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Open Source',
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 7,
    baseMultiplier: 1.7,
    description: 'Liberas tu código. Balance equilibrado entre chips y multiplicador con potencial viral.',
  },
  {
    id: uuidv4(),
    name: 'Prompt Engineering',
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 4,
    baseMultiplier: 2.0,
    description: 'Optimizas los prompts para obtener mejores respuestas con los mismos recursos.',
  },
  {
    id: uuidv4(),
    name: 'Hallucination',
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 0,
    baseMultiplier: 4.0,
    description: 'Tu modelo inventa información. No genera chips pero tiene un multiplicador enorme.',
  },
  {
    id: uuidv4(),
    name: 'Fuga Datos',
    type: CardType.API,
    rarity: CardRarity.LEGENDARY,
    baseChips: -10,
    baseMultiplier: 0.5,
    description: 'Problemas de seguridad en tu API. Efecto negativo fuerte, pero ¿qué pasará después?',
  }
];

// Combinar todas las cartas
export const allCards: Card[] = [
  ...productCards,
  ...apiCards,
  ...featureCards,
  ...specialCards,
];

// Función para obtener el mazo inicial con una distribución balanceada
export const getInitialDeck = (): Card[] => {
  // Creamos un mazo inicial con una mezcla de cartas
  const initialDeck: Card[] = [];
  
  // Añadimos cartas comunes y poco comunes
  const commonCards = [
    ...productCards.filter(card => card.rarity === CardRarity.COMMON),
    ...apiCards.filter(card => card.rarity === CardRarity.COMMON),
    ...featureCards.filter(card => card.rarity === CardRarity.COMMON),
  ];
  
  const uncommonCards = [
    ...productCards.filter(card => card.rarity === CardRarity.UNCOMMON),
    ...apiCards.filter(card => card.rarity === CardRarity.UNCOMMON),
    ...featureCards.filter(card => card.rarity === CardRarity.UNCOMMON),
  ];
  
  // Elegimos aleatoriamente cartas para el mazo inicial
  for (let i = 0; i < 10; i++) {
    // 70% de probabilidad de cartas comunes, 30% de poco comunes
    if (Math.random() < 0.7) {
      const randomCard = commonCards[Math.floor(Math.random() * commonCards.length)];
      initialDeck.push({...randomCard, id: uuidv4()}); // Clonamos la carta con un nuevo ID
    } else {
      const randomCard = uncommonCards[Math.floor(Math.random() * uncommonCards.length)];
      initialDeck.push({...randomCard, id: uuidv4()}); // Clonamos la carta con un nuevo ID
    }
  }
  
  // Añadimos una carta especial al mazo inicial
  const randomSpecialCard = specialCards[Math.floor(Math.random() * specialCards.length)];
  initialDeck.push({...randomSpecialCard, id: uuidv4()});
  
  // Barajamos el mazo
  return initialDeck.sort(() => Math.random() - 0.5);
};

// Función para obtener un mazo mejorado en etapas avanzadas del juego
export const getAdvancedDeck = (round: number): Card[] => {
  const advancedDeck: Card[] = [];
  
  // Mayor probabilidad de cartas raras y legendarias según la ronda
  const rareProbability = Math.min(0.3 + (round * 0.05), 0.6); // Máximo 60% para cartas raras
  const legendaryProbability = Math.min(0.05 + (round * 0.02), 0.2); // Máximo 20% para legendarias
  
  const allCards = [
    ...productCards,
    ...apiCards,
    ...featureCards,
    ...specialCards
  ];
  
  // Creamos un mazo con 12 cartas (más cartas que el inicial)
  for (let i = 0; i < 12; i++) {
    let selectedCard;
    const roll = Math.random();
    
    if (roll < legendaryProbability) {
      // Seleccionamos una carta legendaria
      const legendaryCards = allCards.filter(card => card.rarity === CardRarity.LEGENDARY);
      selectedCard = legendaryCards[Math.floor(Math.random() * legendaryCards.length)];
    } else if (roll < rareProbability) {
      // Seleccionamos una carta rara
      const rareCards = allCards.filter(card => card.rarity === CardRarity.RARE);
      selectedCard = rareCards[Math.floor(Math.random() * rareCards.length)];
    } else if (roll < rareProbability + 0.4) {
      // Seleccionamos una carta poco común
      const uncommonCards = allCards.filter(card => card.rarity === CardRarity.UNCOMMON);
      selectedCard = uncommonCards[Math.floor(Math.random() * uncommonCards.length)];
    } else {
      // Seleccionamos una carta común
      const commonCards = allCards.filter(card => card.rarity === CardRarity.COMMON);
      selectedCard = commonCards[Math.floor(Math.random() * commonCards.length)];
    }
    
    // Añadimos la carta al mazo con un nuevo ID
    advancedDeck.push({...selectedCard, id: uuidv4()});
  }
  
  // Barajamos el mazo
  return advancedDeck.sort(() => Math.random() - 0.5);
}; 