import { Card, CardRarity, CardType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Datos de muestra para cartas de productos
export const productCards: Card[] = [
  {
    id: uuidv4(),
    name: 'ChatGPT',
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 5,
    baseMultiplier: 1.2,
    description: 'El asistente de IA conversacional estándar.',
  },
  {
    id: uuidv4(),
    name: 'Claude',
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 7,
    baseMultiplier: 1.5,
    description: 'Asistente con mejor comprensión de contexto.',
  },
  {
    id: uuidv4(),
    name: 'Copilot',
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 8,
    baseMultiplier: 1.3,
    description: 'Asistente de código inteligente.',
  },
  {
    id: uuidv4(),
    name: 'Gemini',
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 10,
    baseMultiplier: 1.8,
    description: 'Modelo multimodal de última generación.',
  },
  {
    id: uuidv4(),
    name: 'DALL-E',
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 12,
    baseMultiplier: 1.6,
    description: 'Generador de imágenes avanzado.',
  },
  {
    id: uuidv4(),
    name: 'GPT-5',
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 20,
    baseMultiplier: 2.5,
    description: 'El modelo de lenguaje más potente jamás creado.',
  },
];

// Datos de muestra para cartas de API
export const apiCards: Card[] = [
  {
    id: uuidv4(),
    name: 'REST API',
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.1,
    description: 'API estándar para integración de servicios.',
  },
  {
    id: uuidv4(),
    name: 'GraphQL API',
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 4,
    baseMultiplier: 1.3,
    description: 'API flexible con consultas personalizadas.',
  },
  {
    id: uuidv4(),
    name: 'Streaming API',
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 5,
    baseMultiplier: 1.7,
    description: 'API en tiempo real para respuestas continuas.',
  },
];

// Datos de muestra para cartas de características
export const featureCards: Card[] = [
  {
    id: uuidv4(),
    name: 'Función de RAG',
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 2,
    baseMultiplier: 1.4,
    description: 'Recuperación y generación aumentada para mejorar respuestas.',
  },
  {
    id: uuidv4(),
    name: 'Agentes Autónomos',
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 6,
    baseMultiplier: 1.6,
    description: 'Agentes que pueden realizar tareas complejas sin supervisión.',
  },
  {
    id: uuidv4(),
    name: 'Multimodalidad',
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 8,
    baseMultiplier: 1.8,
    description: 'Capacidad para procesar texto, imágenes y audio simultáneamente.',
  },
  {
    id: uuidv4(),
    name: 'Razonamiento Avanzado',
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 15,
    baseMultiplier: 2.2,
    description: 'Capacidad de razonamiento complejo similar al humano.',
  },
];

// Combinar todas las cartas
export const allCards: Card[] = [
  ...productCards,
  ...apiCards,
  ...featureCards,
];

// Función para obtener un mazo inicial aleatorio
export function getInitialDeck(): Card[] {
  // Para el mazo inicial, vamos a seleccionar:
  // - 3 cartas de producto comunes
  // - 2 cartas de API comunes
  // - 1 carta de característica común
  const commonProducts = productCards.filter(card => card.rarity === CardRarity.COMMON);
  const commonApis = apiCards.filter(card => card.rarity === CardRarity.COMMON);
  const commonFeatures = featureCards.filter(card => card.rarity === CardRarity.COMMON);
  
  const initialDeck: Card[] = [
    ...commonProducts.slice(0, 3),
    ...commonApis.slice(0, 2),
    ...commonFeatures.slice(0, 1),
  ];
  
  return initialDeck.map(card => ({...card, id: uuidv4()}));
} 