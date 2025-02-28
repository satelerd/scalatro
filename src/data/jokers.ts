import { Joker, CardRarity } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Jokers para GPUs
export const gpuJokers: Joker[] = [
  {
    id: uuidv4(),
    name: 'NVIDIA RTX 3090',
    rarity: CardRarity.COMMON,
    cost: 100,
    chipBonus: 5,
    multiplierBonus: 1.2,
    description: 'GPU estándar para entrenamiento e inferencia.',
  },
  {
    id: uuidv4(),
    name: 'NVIDIA RTX 4090',
    rarity: CardRarity.UNCOMMON,
    cost: 200,
    chipBonus: 10,
    multiplierBonus: 1.5,
    description: 'GPU de alto rendimiento para modelos grandes.',
  },
  {
    id: uuidv4(),
    name: 'NVIDIA H100',
    rarity: CardRarity.RARE,
    cost: 500,
    chipBonus: 25,
    multiplierBonus: 2.0,
    description: 'GPU profesional para entrenamiento a gran escala.',
  },
  {
    id: uuidv4(),
    name: 'NVIDIA Blackwell B200',
    rarity: CardRarity.LEGENDARY,
    cost: 1000,
    chipBonus: 50,
    multiplierBonus: 3.0,
    description: 'La GPU más potente para IA jamás creada.',
  },
];

// Jokers para datos de entrenamiento
export const dataJokers: Joker[] = [
  {
    id: uuidv4(),
    name: 'Datos Públicos',
    rarity: CardRarity.COMMON,
    cost: 50,
    chipBonus: 3,
    multiplierBonus: 1.1,
    description: 'Datos disponibles públicamente para entrenar modelos básicos.',
  },
  {
    id: uuidv4(),
    name: 'Datos Premium',
    rarity: CardRarity.UNCOMMON,
    cost: 150,
    chipBonus: 7,
    multiplierBonus: 1.3,
    description: 'Datos curados de alta calidad para mejorar el rendimiento.',
  },
  {
    id: uuidv4(),
    name: 'Datos Sintéticos',
    rarity: CardRarity.RARE,
    cost: 300,
    chipBonus: 12,
    multiplierBonus: 1.6,
    description: 'Datos generados sintéticamente para dominios específicos.',
  },
];

// Jokers para técnicas de entrenamiento
export const trainingJokers: Joker[] = [
  {
    id: uuidv4(),
    name: 'RLHF',
    rarity: CardRarity.UNCOMMON,
    cost: 200,
    chipBonus: 5,
    multiplierBonus: 1.7,
    description: 'Aprendizaje por refuerzo con feedback humano.',
  },
  {
    id: uuidv4(),
    name: 'Mixtral MOE',
    rarity: CardRarity.RARE,
    cost: 400,
    chipBonus: 15,
    multiplierBonus: 1.9,
    description: 'Técnica de Mezcla de Expertos para mejorar la eficiencia.',
  },
  {
    id: uuidv4(),
    name: 'Quantización',
    rarity: CardRarity.UNCOMMON,
    cost: 150,
    chipBonus: 0,
    multiplierBonus: 1.4,
    description: 'Reduce la precisión para mejorar la velocidad de inferencia.',
  },
];

// Combinar todos los jokers
export const allJokers: Joker[] = [
  ...gpuJokers,
  ...dataJokers,
  ...trainingJokers,
];

// Función para obtener jokers para la tienda
export function getShopJokers(tier: number): Joker[] {
  // El nivel determina qué rarezas pueden aparecer en la tienda
  let availableJokers = [...allJokers];
  
  if (tier === 1) {
    // Tier 1: Solo comunes
    availableJokers = availableJokers.filter(joker => joker.rarity === CardRarity.COMMON);
  } else if (tier === 2) {
    // Tier 2: Comunes y poco comunes
    availableJokers = availableJokers.filter(joker => 
      joker.rarity === CardRarity.COMMON || joker.rarity === CardRarity.UNCOMMON
    );
  } else if (tier === 3) {
    // Tier 3: Todo excepto legendarios
    availableJokers = availableJokers.filter(joker => joker.rarity !== CardRarity.LEGENDARY);
  }
  // Tier 4+: Todos los jokers disponibles
  
  // Seleccionar aleatoriamente 3 jokers
  const shuffled = [...availableJokers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).map(joker => ({...joker, id: uuidv4()}));
} 