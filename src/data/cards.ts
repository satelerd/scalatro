import { Card, CardRarity, CardType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// CARTAS DE PRODUCTOS - Generan más chips (poder computacional)
// Estas cartas añaden Story Points a tu sprint
const productCards: Card[] = [
  // Cartas comunes
  {
    id: uuidv4(),
    name: "Chatbot Básico",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.0,
    description: "Un sencillo modelo de chat con capacidades básicas."
  },
  {
    id: uuidv4(),
    name: "Asistente de Texto",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 4,
    baseMultiplier: 1.0,
    description: "Asistente que responde preguntas sencillas sobre textos."
  },
  {
    id: uuidv4(),
    name: "Clasificador Simple",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 5,
    baseMultiplier: 1.0,
    description: "Clasifica texto en categorías predefinidas."
  },
  
  // Cartas poco comunes
  {
    id: uuidv4(),
    name: "Generador de Texto",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 8,
    baseMultiplier: 1.1,
    description: "Genera textos creativos basados en prompts."
  },
  {
    id: uuidv4(),
    name: "Asistente Personal",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 10,
    baseMultiplier: 1.1,
    description: "Asistente virtual que ayuda con tareas diarias."
  },
  
  // Cartas raras
  {
    id: uuidv4(),
    name: "Copiloto de Código",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 15,
    baseMultiplier: 1.2,
    description: "Asistente de programación que sugiere código."
  },
  {
    id: uuidv4(),
    name: "Generador de Imágenes",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 20,
    baseMultiplier: 1.2,
    description: "Crea imágenes realistas a partir de descripciones."
  },
  
  // Cartas legendarias
  {
    id: uuidv4(),
    name: "Agente Autónomo",
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 30,
    baseMultiplier: 1.5,
    description: "IA que puede realizar tareas complejas sin supervisión."
  },
];

// CARTAS DE APIs - Aumentan el multiplicador
// Estas cartas mejoran la eficiencia de tu equipo
const apiCards: Card[] = [
  // Cartas comunes
  {
    id: uuidv4(),
    name: "API de Completado",
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 1,
    baseMultiplier: 1.3,
    description: "API básica para completar texto."
  },
  {
    id: uuidv4(),
    name: "API de Resumen",
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 1,
    baseMultiplier: 1.4,
    description: "Resume textos largos automáticamente."
  },
  
  // Cartas poco comunes
  {
    id: uuidv4(),
    name: "API de Embeddings",
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 2,
    baseMultiplier: 1.7,
    description: "Convierte texto en vectores para búsqueda semántica."
  },
  {
    id: uuidv4(),
    name: "API de Análisis",
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 2,
    baseMultiplier: 1.8,
    description: "Analiza sentimiento y extrae información clave."
  },
  
  // Cartas raras
  {
    id: uuidv4(),
    name: "API Multimodal",
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 3,
    baseMultiplier: 2.2,
    description: "Integra texto, imágenes y audio en una sola API."
  },
  
  // Cartas legendarias
  {
    id: uuidv4(),
    name: "API Universal",
    type: CardType.API,
    rarity: CardRarity.LEGENDARY,
    baseChips: 5,
    baseMultiplier: 3.0,
    description: "Una API para dominarlas a todas. Compatible con cualquier LLM."
  },
];

// CARTAS DE CARACTERÍSTICAS - Equilibran chips y multiplicador
// Estas cartas añaden funcionalidades a tus productos
const featureCards: Card[] = [
  // Cartas comunes
  {
    id: uuidv4(),
    name: "Moderación Básica",
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 2,
    baseMultiplier: 1.2,
    description: "Filtra contenido inapropiado básico."
  },
  {
    id: uuidv4(),
    name: "Instrucciones Simples",
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.1,
    description: "Permite dar instrucciones sencillas al modelo."
  },
  
  // Cartas poco comunes
  {
    id: uuidv4(),
    name: "Memoria de Conversación",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 5,
    baseMultiplier: 1.4,
    description: "El modelo recuerda la conversación anterior."
  },
  {
    id: uuidv4(),
    name: "Conexión a Internet",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 6,
    baseMultiplier: 1.5,
    description: "Permite al modelo acceder a información actualizada."
  },
  
  // Cartas raras
  {
    id: uuidv4(),
    name: "Personalidad Adaptable",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 10,
    baseMultiplier: 1.8,
    description: "El modelo ajusta su personalidad según el contexto."
  },
  {
    id: uuidv4(),
    name: "Seguridad Avanzada",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 8,
    baseMultiplier: 2.0,
    description: "Filtros avanzados para prevenir usos maliciosos."
  },
  
  // Cartas legendarias
  {
    id: uuidv4(),
    name: "Razonamiento Avanzado",
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 15,
    baseMultiplier: 2.5,
    description: "El modelo puede razonar paso a paso problemas complejos."
  },
];

// CARTAS DE RECURSOS HUMANOS - Aumentan tus Story Points y capacidad de Backlog
const teamCards: Card[] = [
  // Desarrolladores - Aumentan Story Points por turno
  {
    id: uuidv4(),
    name: "Dev Junior",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 6,
    baseMultiplier: 1.0,
    description: "STORY POINTS: Añade +1 Story Point por sprint. Un desarrollador con poca experiencia pero muchas ganas."
  },
  {
    id: uuidv4(),
    name: "Dev Senior",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 12,
    baseMultiplier: 1.2,
    description: "STORY POINTS: Añade +2 Story Points por sprint. Desarrollador con experiencia que produce código de calidad."
  },
  {
    id: uuidv4(),
    name: "Tech Lead",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 18,
    baseMultiplier: 1.5,
    description: "STORY POINTS: Añade +3 Story Points por sprint. Lidera el equipo técnico y resuelve problemas complejos."
  },
  {
    id: uuidv4(),
    name: "Full-stack Architect",
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 25,
    baseMultiplier: 2.0,
    description: "STORY POINTS: Añade +4 Story Points por sprint. Experto en todas las tecnologías necesarias para tu producto."
  },
  
  // Product Managers - Aumentan capacidad de Backlog
  {
    id: uuidv4(),
    name: "Product Owner",
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 4,
    baseMultiplier: 1.3,
    description: "BACKLOG: Aumenta en +1 tu capacidad de Backlog. Responsable de priorizar características del producto."
  },
  {
    id: uuidv4(),
    name: "Scrum Master",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 6,
    baseMultiplier: 1.6,
    description: "BACKLOG: Aumenta en +2 tu capacidad de Backlog. Facilita las reuniones y elimina impedimentos del equipo."
  },
  {
    id: uuidv4(),
    name: "Product Manager",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 10,
    baseMultiplier: 1.9,
    description: "BACKLOG: Aumenta en +3 tu capacidad de Backlog. Define la visión del producto y coordina con stakeholders."
  },
  {
    id: uuidv4(),
    name: "CPO (Chief Product Officer)",
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 15,
    baseMultiplier: 2.4,
    description: "BACKLOG: Aumenta en +4 tu capacidad de Backlog. Directivo que coordina todos los productos de la empresa."
  },
];

// CARTAS ESPECIALES - Con efectos únicos
const specialCards: Card[] = [
  // Combo 1: Conjunto de desarrollo - Otorga bonus si tienes un producto, API y feature
  {
    id: uuidv4(),
    name: "DevOps LLM",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 12,
    baseMultiplier: 2.2,
    description: "COMBO: +5 chips extra si tienes un Producto, API y otra Feature en juego."
  },
  
  // Combo 2: Stack completo - Bonus por tener múltiples productos
  {
    id: uuidv4(),
    name: "Suite Empresarial",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 18,
    baseMultiplier: 1.5,
    description: "COMBO: Duplica el multiplicador si tienes otros 2 Productos en juego."
  },
  
  // Combo 3: Integración API - Bonus por tener múltiples APIs
  {
    id: uuidv4(),
    name: "API Gateway",
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 4,
    baseMultiplier: 2.5,
    description: "COMBO: +50% a tu multiplicador si tienes otras 2 APIs en juego."
  },
  
  // Cartas súper poderosas (legendarias)
  {
    id: uuidv4(),
    name: "IA General",
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 50,
    baseMultiplier: 2.0,
    description: "Una IA que puede resolver cualquier problema intelectual."
  },
  {
    id: uuidv4(),
    name: "Inferencia Paralela",
    type: CardType.API,
    rarity: CardRarity.LEGENDARY,
    baseChips: 10,
    baseMultiplier: 4.0,
    description: "Procesamiento masivamente paralelo para inferencia ultrarrápida."
  },
  {
    id: uuidv4(),
    name: "Alucinación Zero",
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 25,
    baseMultiplier: 3.0,
    description: "Elimina completamente las alucinaciones. Respuestas 100% precisas."
  },
  
  // Combos de equipo
  {
    id: uuidv4(),
    name: "Equipo Ágil",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 15,
    baseMultiplier: 2.0,
    description: "COMBO: +2 Story Points y +2 Capacidad de Backlog si tienes al menos 1 Dev y 1 Product Owner en juego."
  },
  {
    id: uuidv4(),
    name: "Pair Programming",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 14,
    baseMultiplier: 1.5,
    description: "STORY POINTS: Añade +2 Story Points por sprint. Dos devs trabajando juntos producen código de mejor calidad."
  },
  {
    id: uuidv4(),
    name: "Planning Poker",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 8,
    baseMultiplier: 1.6,
    description: "BACKLOG: Aumenta en +2 tu capacidad de Backlog. Técnica para estimar el esfuerzo requerido para cada tarea."
  },
  
  // Easter eggs y cartas divertidas
  {
    id: uuidv4(),
    name: "Café para el Programador",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 7,
    baseMultiplier: 1.7,
    description: "¡Cafeína! +1 Story Point por sprint. Energía extra para el equipo que desarrolla los modelos."
  },
  {
    id: uuidv4(),
    name: "Prompt Engineering 101",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 5,
    baseMultiplier: 1.9,
    description: "Manual básico de ingeniería de prompts. Mejora las instrucciones."
  },
];

// Combinar todas las cartas
export const allCards: Card[] = [
  ...productCards,
  ...apiCards,
  ...featureCards,
  ...teamCards,
  ...specialCards,
];

// Función para obtener el mazo inicial con una distribución balanceada
export const getInitialDeck = (): Card[] => {
  // Combinamos todas las cartas según su tipo
  const allCards = [
    ...productCards.slice(0, 4),  // Solo algunas cartas de producto
    ...apiCards.slice(0, 3),      // Solo algunas cartas de API
    ...featureCards.slice(0, 3),  // Solo algunas cartas de feature
    ...teamCards.slice(0, 4),     // Añadimos algunas cartas de equipo
    ...specialCards.slice(-2),    // Un par de cartas especiales
  ];
  
  // Creamos un mazo aleatorio de 10 cartas
  const shuffledDeck = [...allCards]
    .sort(() => Math.random() - 0.5)
    .map(card => ({
      ...card,
      id: uuidv4(), // Aseguramos que cada carta tenga un ID único
    }));
  
  // Añadimos al menos dos cartas especiales poderosas para ayudar al jugador
  // Seleccionamos cartas legendarias aleatoriamente
  const legendaryCards = [
    ...productCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...apiCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...featureCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...teamCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...specialCards.filter(card => card.rarity === CardRarity.LEGENDARY),
  ];
  
  // Añadimos 2 cartas legendarias aleatorias
  const selectedLegendaryCards = legendaryCards
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map(card => ({
      ...card,
      id: uuidv4(),
    }));
  
  // Combinamos el mazo con las cartas legendarias
  return [...shuffledDeck, ...selectedLegendaryCards];
};

// Función para obtener un mazo mejorado en etapas avanzadas del juego
export const getAdvancedDeck = (round: number): Card[] => {
  // En rondas avanzadas, añadimos cartas más poderosas
  const powerLevel = Math.min(Math.floor(round / 2), 5); // Máximo nivel de poder 5
  
  // Combinamos todas las cartas disponibles
  const allCards = [
    ...productCards,
    ...apiCards,
    ...featureCards,
    ...teamCards,
    ...specialCards,
  ];
  
  // Filtramos las cartas según el nivel de poder (rareza)
  const availableCards = allCards.filter(card => {
    if (powerLevel >= 5) return true; // Todas las rarezas
    if (powerLevel >= 3) return card.rarity !== CardRarity.LEGENDARY; // Hasta raras
    if (powerLevel >= 2) return card.rarity !== CardRarity.LEGENDARY && card.rarity !== CardRarity.RARE; // Hasta poco comunes
    return card.rarity === CardRarity.COMMON; // Solo comunes
  });
  
  // Seleccionamos 3 cartas aleatorias según el nivel de poder
  const selectedCards = availableCards
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(card => {
      // En niveles de poder altos, potenciamos las cartas
      let bonusChips = 0;
      let bonusMultiplier = 1.0;
      
      if (powerLevel >= 4) {
        bonusChips = Math.floor(Math.random() * 10) + 5; // 5-15 chips extra
        bonusMultiplier = 1.0 + (Math.random() * 0.5); // 1.0-1.5x multiplicador extra
      } else if (powerLevel >= 2) {
        bonusChips = Math.floor(Math.random() * 5) + 3; // 3-8 chips extra
        bonusMultiplier = 1.0 + (Math.random() * 0.3); // 1.0-1.3x multiplicador extra
      }
      
      return {
        ...card,
        id: uuidv4(),
        baseChips: card.baseChips + bonusChips,
        baseMultiplier: card.baseMultiplier * bonusMultiplier,
        description: `${card.description} [Mejorada Ronda ${round}]`,
      };
    });
  
  return selectedCards;
};

// Exportamos todas las cartas en caso de que se quieran utilizar en otro lugar
export const getAllCards = () => {
  return [...productCards, ...apiCards, ...featureCards, ...teamCards, ...specialCards];
}; 