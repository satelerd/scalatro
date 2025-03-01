import { Joker, CardRarity } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// GPU JOKERS - Mainly increase chips
const gpuJokers: Joker[] = [
  // Basic (Tier 1)
  {
    id: uuidv4(),
    name: 'NVIDIA T4',
    rarity: CardRarity.COMMON,
    cost: 50,
    chipBonus: 5,
    multiplierBonus: 1.1,
    description: 'Basic GPU for inference. Small increase in chips and multiplier.',
  },
  {
    id: uuidv4(),
    name: 'AMD Radeon Pro',
    rarity: CardRarity.COMMON,
    cost: 60,
    chipBonus: 7,
    multiplierBonus: 1.0,
    description: 'Medium performance GPU for training. Moderate chip increase.',
  },
  
  // Intermediate (Tier 2-3)
  {
    id: uuidv4(),
    name: 'NVIDIA RTX 3090',
    rarity: CardRarity.UNCOMMON,
    cost: 120,
    chipBonus: 12,
    multiplierBonus: 1.2,
    description: 'Powerful GPU for training and inference. Good balance between chips and multiplier.',
  },
  {
    id: uuidv4(),
    name: 'NVIDIA A100',
    rarity: CardRarity.RARE,
    cost: 200,
    chipBonus: 25,
    multiplierBonus: 1.3,
    description: 'Professional GPU for training large models. Strong increase in chips.',
  },
  
  // Advanced (Tier 4+)
  {
    id: uuidv4(),
    name: 'NVIDIA H100',
    rarity: CardRarity.LEGENDARY,
    cost: 350,
    chipBonus: 40,
    multiplierBonus: 1.5,
    description: 'The most advanced GPU for AI. Enormous increases in chips and multiplier.',
  },
  {
    id: uuidv4(),
    name: 'GPU Farm',
    rarity: CardRarity.LEGENDARY,
    cost: 500,
    chipBonus: 75,
    multiplierBonus: 1.2,
    description: 'Complete data center with multiple GPUs. Massive increase in chips.',
  },
];

// DATA JOKERS - Mainly increase multiplier
const dataJokers: Joker[] = [
  // Basic (Tier 1)
  {
    id: uuidv4(),
    name: 'Public Web Data',
    rarity: CardRarity.COMMON,
    cost: 40,
    chipBonus: 2,
    multiplierBonus: 1.3,
    description: 'Public data from the web. Small increase in multiplier.',
  },
  {
    id: uuidv4(),
    name: 'Curated Dataset',
    rarity: CardRarity.COMMON,
    cost: 65,
    chipBonus: 3,
    multiplierBonus: 1.4,
    description: 'Clean and labeled dataset. Moderate improvement in multiplier.',
  },
  
  // Intermediate (Tier 2-3)
  {
    id: uuidv4(),
    name: 'User Data',
    rarity: CardRarity.UNCOMMON,
    cost: 130,
    chipBonus: 5,
    multiplierBonus: 1.8,
    description: 'User behavior data. Good increase in multiplier.',
  },
  {
    id: uuidv4(),
    name: 'Enterprise Data',
    rarity: CardRarity.RARE,
    cost: 220,
    chipBonus: 8,
    multiplierBonus: 2.2,
    description: 'Valuable business data. Strong improvement in multiplier.',
  },
  
  // Advanced (Tier 4+)
  {
    id: uuidv4(),
    name: 'Complete Internet',
    rarity: CardRarity.LEGENDARY,
    cost: 380,
    chipBonus: 15,
    multiplierBonus: 3.0,
    description: 'Indexed copy of the entire internet. Extremely high multiplier.',
  },
];

// TRAINING JOKERS - Balance chips and multiplier
const trainingJokers: Joker[] = [
  // Basic (Tier 1)
  {
    id: uuidv4(),
    name: 'Basic Fine-tuning',
    rarity: CardRarity.COMMON,
    cost: 45,
    chipBonus: 4,
    multiplierBonus: 1.2,
    description: 'Basic fine-tuning of models. Small improvements in both metrics.',
  },
  {
    id: uuidv4(),
    name: 'LoRA Strategy',
    rarity: CardRarity.UNCOMMON,
    cost: 90,
    chipBonus: 8,
    multiplierBonus: 1.5,
    description: 'Low-Rank Adaptation for efficiency. Good balance between improvements.',
  },
  
  // Intermediate (Tier 2-3)
  {
    id: uuidv4(),
    name: 'Distributed Training',
    rarity: CardRarity.RARE,
    cost: 180,
    chipBonus: 15,
    multiplierBonus: 1.7,
    description: 'Training across multiple nodes. Large improvements in both metrics.',
  },
  
  // Advanced (Tier 4+)
  {
    id: uuidv4(),
    name: 'Advanced RLHF',
    rarity: CardRarity.LEGENDARY,
    cost: 400,
    chipBonus: 30,
    multiplierBonus: 2.5,
    description: 'Reinforcement Learning from Human Feedback. Massive improvements in both metrics.',
  },
];

// SPECIAL JOKERS - Unique effects
const specialJokers: Joker[] = [
  // Basic (Tier 1-2)
  {
    id: uuidv4(),
    name: 'Inference Optimization',
    rarity: CardRarity.UNCOMMON,
    cost: 100,
    chipBonus: 0,
    multiplierBonus: 2.0,
    description: 'Optimizes inference without affecting training. Doubles the multiplier.',
  },
  {
    id: uuidv4(),
    name: 'Quantum Computing',
    rarity: CardRarity.RARE,
    cost: 250,
    chipBonus: 10,
    multiplierBonus: 3.0,
    description: 'Experimental quantum computing technology. Triples the multiplier.',
  },
  
  // Intermediate (Tier 3)
  {
    id: uuidv4(),
    name: 'Neural Compression',
    rarity: CardRarity.RARE,
    cost: 200,
    chipBonus: -5,
    multiplierBonus: 4.0,
    description: 'Compresses the model sacrificing some raw power. Reduces chips but quadruples the multiplier.',
  },
  {
    id: uuidv4(),
    name: 'Neuromorphic Networks',
    rarity: CardRarity.RARE,
    cost: 230,
    chipBonus: 40,
    multiplierBonus: 0.8,
    description: 'Specialized hardware inspired by the brain. Enormous chips but reduces multiplier.',
  },
  
  // Advanced (Tier 4+)
  {
    id: uuidv4(),
    name: 'Aluminum Foil',
    rarity: CardRarity.LEGENDARY,
    cost: 150,
    chipBonus: -10,
    multiplierBonus: 7.0,
    description: 'Prevents alien signals from interfering? Reduces chips but absurd multiplier.',
  },
  {
    id: uuidv4(),
    name: 'Donation to OpenAI',
    rarity: CardRarity.LEGENDARY,
    cost: 777,
    chipBonus: 77,
    multiplierBonus: 7.7,
    description: 'Lucky number. Massive improvements in both metrics to finish the game.',
  },
];

// Combine all available jokers
const allJokers = [
  ...gpuJokers,
  ...dataJokers,
  ...trainingJokers,
  ...specialJokers,
];

// Function to get jokers based on current tier (related to round)
export const getShopJokers = (round: number): Joker[] => {
  // Determine current tier based on round
  const tier = Math.min(Math.ceil(round / 3), 5); // Maximum tier 5
  
  // Number of jokers to show (increases with tier)
  const jokersCount = 3 + Math.min(tier - 1, 3); // 3 to 6 jokers
  
  // Probabilities based on tier
  const legendaryChance = Math.min(0.05 * tier, 0.25); // 5% to 25%
  const rareChance = Math.min(0.1 * tier, 0.4); // 10% to 40%
  const uncommonChance = Math.min(0.2 * tier, 0.6); // 20% to 60%
  
  // Array to store selected jokers
  const selectedJokers: Joker[] = [];
  
  // Ensure at least one special joker starting from tier 3
  if (tier >= 3) {
    const specialJokersForTier = specialJokers.filter(joker => {
      if (tier < 4) return joker.rarity !== CardRarity.LEGENDARY;
      return true; // In tier 4+, all specials are available
    });
    
    if (specialJokersForTier.length > 0) {
      const randomSpecial = specialJokersForTier[Math.floor(Math.random() * specialJokersForTier.length)];
      selectedJokers.push({...randomSpecial, id: uuidv4()});
    }
  }
  
  // Function to select jokers based on rarity
  const selectJokersByRarity = () => {
    const roll = Math.random();
    
    if (roll < legendaryChance && tier >= 4) {
      // Legendary jokers (only available in tier 4+)
      const legendaryJokers = allJokers.filter(j => j.rarity === CardRarity.LEGENDARY);
      return legendaryJokers[Math.floor(Math.random() * legendaryJokers.length)];
    } else if (roll < legendaryChance + rareChance && tier >= 3) {
      // Rare jokers (available in tier 3+)
      const rareJokers = allJokers.filter(j => j.rarity === CardRarity.RARE);
      return rareJokers[Math.floor(Math.random() * rareJokers.length)];
    } else if (roll < legendaryChance + rareChance + uncommonChance && tier >= 2) {
      // Uncommon jokers (available in tier 2+)
      const uncommonJokers = allJokers.filter(j => j.rarity === CardRarity.UNCOMMON);
      return uncommonJokers[Math.floor(Math.random() * uncommonJokers.length)];
    } else {
      // Common jokers (always available)
      const commonJokers = allJokers.filter(j => j.rarity === CardRarity.COMMON);
      return commonJokers[Math.floor(Math.random() * commonJokers.length)];
    }
  };
  
  // Fill in remaining jokers based on probabilities
  while (selectedJokers.length < jokersCount) {
    const selectedJoker = selectJokersByRarity();
    
    // Avoid duplicates
    if (!selectedJokers.some(j => j.name === selectedJoker.name)) {
      selectedJokers.push({...selectedJoker, id: uuidv4()});
    }
  }
  
  // Scale costs based on tier
  const scaledJokers = selectedJokers.map(joker => {
    // Cost scaling formula (optional cost adjustments based on round/tier)
    const costMultiplier = 1 + (tier - 1) * 0.1; // 0% to 40% increase based on tier
    const scaledCost = Math.floor(joker.cost * costMultiplier);
    
    return {
      ...joker,
      cost: scaledCost
    };
  });
  
  return scaledJokers;
}; 