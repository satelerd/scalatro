import { Joker, CardRarity } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// JOKERS DE GPU - Aumentan principalmente los chips
const gpuJokers: Joker[] = [
  // Básicos (Tier 1)
  {
    id: uuidv4(),
    name: 'NVIDIA T4',
    rarity: CardRarity.COMMON,
    cost: 50,
    chipBonus: 5,
    multiplierBonus: 1.1,
    description: 'GPU básica para inferencia. Pequeño aumento en chips y multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'AMD Radeon Pro',
    rarity: CardRarity.COMMON,
    cost: 60,
    chipBonus: 7,
    multiplierBonus: 1.0,
    description: 'GPU de rendimiento medio para entrenamiento. Aumento moderado de chips.',
  },
  
  // Intermedios (Tier 2-3)
  {
    id: uuidv4(),
    name: 'NVIDIA RTX 3090',
    rarity: CardRarity.UNCOMMON,
    cost: 120,
    chipBonus: 12,
    multiplierBonus: 1.2,
    description: 'GPU potente para entrenamiento e inferencia. Buen equilibrio entre chips y multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'NVIDIA A100',
    rarity: CardRarity.RARE,
    cost: 200,
    chipBonus: 25,
    multiplierBonus: 1.3,
    description: 'GPU profesional para entrenamiento de modelos grandes. Fuerte aumento en chips.',
  },
  
  // Avanzados (Tier 4+)
  {
    id: uuidv4(),
    name: 'NVIDIA H100',
    rarity: CardRarity.LEGENDARY,
    cost: 350,
    chipBonus: 40,
    multiplierBonus: 1.5,
    description: 'La GPU más avanzada para IA. Enormes aumentos en chips y multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Granja de GPUs',
    rarity: CardRarity.LEGENDARY,
    cost: 500,
    chipBonus: 75,
    multiplierBonus: 1.2,
    description: 'Centro de datos completo con múltiples GPUs. Incremento masivo en chips.',
  },
];

// JOKERS DE DATOS - Aumentan principalmente el multiplicador
const dataJokers: Joker[] = [
  // Básicos (Tier 1)
  {
    id: uuidv4(),
    name: 'Datos Web Públicos',
    rarity: CardRarity.COMMON,
    cost: 40,
    chipBonus: 2,
    multiplierBonus: 1.3,
    description: 'Datos públicos de la web. Pequeño aumento en el multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Set de Datos Curado',
    rarity: CardRarity.COMMON,
    cost: 65,
    chipBonus: 3,
    multiplierBonus: 1.4,
    description: 'Conjunto de datos limpio y etiquetado. Mejora moderada del multiplicador.',
  },
  
  // Intermedios (Tier 2-3)
  {
    id: uuidv4(),
    name: 'Datos de Usuarios',
    rarity: CardRarity.UNCOMMON,
    cost: 130,
    chipBonus: 5,
    multiplierBonus: 1.8,
    description: 'Datos de comportamiento de usuarios. Buen aumento del multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Datos Enterprise',
    rarity: CardRarity.RARE,
    cost: 220,
    chipBonus: 8,
    multiplierBonus: 2.2,
    description: 'Datos valiosos de empresas. Fuerte mejora del multiplicador.',
  },
  
  // Avanzados (Tier 4+)
  {
    id: uuidv4(),
    name: 'Internet Completo',
    rarity: CardRarity.LEGENDARY,
    cost: 380,
    chipBonus: 15,
    multiplierBonus: 3.0,
    description: 'Copia del internet completo indexada. Multiplicador extremadamente alto.',
  },
];

// JOKERS DE ENTRENAMIENTO - Balancean chips y multiplicador
const trainingJokers: Joker[] = [
  // Básicos (Tier 1)
  {
    id: uuidv4(),
    name: 'Fine-tuning Básico',
    rarity: CardRarity.COMMON,
    cost: 45,
    chipBonus: 4,
    multiplierBonus: 1.2,
    description: 'Ajuste fino básico de modelos. Pequeñas mejoras en ambas métricas.',
  },
  {
    id: uuidv4(),
    name: 'Estrategia LoRA',
    rarity: CardRarity.UNCOMMON,
    cost: 90,
    chipBonus: 8,
    multiplierBonus: 1.5,
    description: 'Adaptación de bajo rango para eficiencia. Buen equilibrio entre mejoras.',
  },
  
  // Intermedios (Tier 2-3)
  {
    id: uuidv4(),
    name: 'Entrenamiento Distribuido',
    rarity: CardRarity.RARE,
    cost: 180,
    chipBonus: 15,
    multiplierBonus: 1.7,
    description: 'Entrenamiento en múltiples nodos. Grandes mejoras en ambas métricas.',
  },
  
  // Avanzados (Tier 4+)
  {
    id: uuidv4(),
    name: 'RLHF Avanzado',
    rarity: CardRarity.LEGENDARY,
    cost: 400,
    chipBonus: 30,
    multiplierBonus: 2.5,
    description: 'Aprendizaje por refuerzo con feedback humano. Mejoras masivas en ambas métricas.',
  },
];

// JOKERS ESPECIALES - Efectos únicos
const specialJokers: Joker[] = [
  // Básicos (Tier 1-2)
  {
    id: uuidv4(),
    name: 'Optimización de Inferencia',
    rarity: CardRarity.UNCOMMON,
    cost: 100,
    chipBonus: 0,
    multiplierBonus: 2.0,
    description: 'Optimiza la inferencia sin afectar al entrenamiento. Duplica el multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Computación Cuántica',
    rarity: CardRarity.RARE,
    cost: 250,
    chipBonus: 10,
    multiplierBonus: 3.0,
    description: 'Tecnología experimental de computación cuántica. Triplica el multiplicador.',
  },
  
  // Intermedios (Tier 3)
  {
    id: uuidv4(),
    name: 'Compresión Neural',
    rarity: CardRarity.RARE,
    cost: 200,
    chipBonus: -5,
    multiplierBonus: 4.0,
    description: 'Comprime el modelo sacrificando algo de poder bruto. Reduce chips pero cuadruplica el multiplicador.',
  },
  {
    id: uuidv4(),
    name: 'Redes Neurormórficas',
    rarity: CardRarity.RARE,
    cost: 230,
    chipBonus: 40,
    multiplierBonus: 0.8,
    description: 'Hardware especializado inspirado en el cerebro. Enormes chips pero reduce el multiplicador.',
  },
  
  // Avanzados (Tier 4+)
  {
    id: uuidv4(),
    name: 'Hoja de Aluminio',
    rarity: CardRarity.LEGENDARY,
    cost: 150,
    chipBonus: -10,
    multiplierBonus: 7.0,
    description: '¿Previene que las señales extraterrestres interfieran? Reduce chips pero multiplicador absurdo.',
  },
  {
    id: uuidv4(),
    name: 'Donación a OpenAI',
    rarity: CardRarity.LEGENDARY,
    cost: 777,
    chipBonus: 77,
    multiplierBonus: 7.7,
    description: 'Número de la suerte. Mejoras masivas en ambas métricas para terminar el juego.',
  },
];

// Combinamos todos los jokers disponibles
const allJokers = [
  ...gpuJokers,
  ...dataJokers,
  ...trainingJokers,
  ...specialJokers,
];

// Función para obtener jokers según el tier actual (relacionado con la ronda)
export const getShopJokers = (round: number): Joker[] => {
  // Determinamos el tier actual basado en la ronda
  const tier = Math.min(Math.ceil(round / 3), 5); // Máximo tier 5
  
  // Cantidad de jokers a mostrar (aumenta con el tier)
  const jokersCount = 3 + Math.min(tier - 1, 3); // 3 a 6 jokers
  
  // Probabilidades según el tier
  const legendaryChance = Math.min(0.05 * tier, 0.25); // 5% a 25%
  const rareChance = Math.min(0.1 * tier, 0.4); // 10% a 40%
  const uncommonChance = Math.min(0.2 * tier, 0.6); // 20% a 60%
  
  // Array para guardar los jokers seleccionados
  const selectedJokers: Joker[] = [];
  
  // Aseguramos que al menos un joker sea especial a partir del tier 3
  if (tier >= 3) {
    const specialJokersForTier = specialJokers.filter(joker => {
      if (tier < 4) return joker.rarity !== CardRarity.LEGENDARY;
      return true; // En tier 4+, todos los especiales están disponibles
    });
    
    if (specialJokersForTier.length > 0) {
      const randomSpecial = specialJokersForTier[Math.floor(Math.random() * specialJokersForTier.length)];
      selectedJokers.push({...randomSpecial, id: uuidv4()});
    }
  }
  
  // Función para seleccionar jokers según rareza
  const selectJokersByRarity = () => {
    const roll = Math.random();
    
    if (roll < legendaryChance && tier >= 4) {
      // Jokers legendarios (solo disponibles en tier 4+)
      const legendaryJokers = allJokers.filter(j => j.rarity === CardRarity.LEGENDARY);
      return legendaryJokers[Math.floor(Math.random() * legendaryJokers.length)];
    } else if (roll < legendaryChance + rareChance && tier >= 3) {
      // Jokers raros (disponibles en tier 3+)
      const rareJokers = allJokers.filter(j => j.rarity === CardRarity.RARE);
      return rareJokers[Math.floor(Math.random() * rareJokers.length)];
    } else if (roll < legendaryChance + rareChance + uncommonChance && tier >= 2) {
      // Jokers poco comunes (disponibles en tier 2+)
      const uncommonJokers = allJokers.filter(j => j.rarity === CardRarity.UNCOMMON);
      return uncommonJokers[Math.floor(Math.random() * uncommonJokers.length)];
    } else {
      // Jokers comunes (siempre disponibles)
      const commonJokers = allJokers.filter(j => j.rarity === CardRarity.COMMON);
      return commonJokers[Math.floor(Math.random() * commonJokers.length)];
    }
  };
  
  // Completamos los jokers restantes según las probabilidades
  while (selectedJokers.length < jokersCount) {
    const selectedJoker = selectJokersByRarity();
    
    // Evitamos duplicados
    if (!selectedJokers.some(j => j.name === selectedJoker.name)) {
      selectedJokers.push({...selectedJoker, id: uuidv4()});
    }
  }
  
  // Escalamos los costos según el tier
  const scaledJokers = selectedJokers.map(joker => {
    // En tiers avanzados, los jokers comunes son más baratos
    let costMultiplier = 1;
    if (tier > 3 && joker.rarity === CardRarity.COMMON) {
      costMultiplier = 0.8;
    } else if (tier > 2 && joker.rarity === CardRarity.UNCOMMON) {
      costMultiplier = 0.9;
    }
    
    return {
      ...joker,
      cost: Math.round(joker.cost * costMultiplier),
    };
  });
  
  console.log(`[LOG] Generados ${scaledJokers.length} jokers para la tienda (Tier ${tier})`);
  return scaledJokers;
}; 