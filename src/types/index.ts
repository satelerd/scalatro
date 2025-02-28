// Tipos básicos para el juego Scalatro

// Enumeración para los diferentes tipos de cartas
export enum CardType {
  PRODUCT = 'product',
  API = 'api',
  FEATURE = 'feature',
}

// Enumeración para las diferentes rarezas de cartas
export enum CardRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  LEGENDARY = 'legendary',
}

// Interfaz para una carta básica
export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;
  baseChips: number;
  baseMultiplier: number;
  description: string;
  image?: string;
}

// Interfaz para un joker (GPU, datos, etc.)
export interface Joker {
  id: string;
  name: string;
  rarity: CardRarity;
  cost: number;
  chipBonus: number;
  multiplierBonus: number;
  description: string;
  image?: string;
  effect?: (state: GameState) => GameState;
}

// Interfaz para un benchmark
export interface Benchmark {
  id: string;
  name: string;
  targetScore: number;
  marketShareReward: number;
  completed: boolean;
}

// Interfaz para el estado del juego
export interface GameState {
  // Recursos
  chips: number;
  multiplier: number;
  score: number;
  marketShare: number;
  money: number;
  
  // Cartas y jokers
  hand: Card[];
  deck: Card[];
  discardPile: Card[];
  activeJokers: Joker[];
  
  // Estado del juego
  currentBenchmark: Benchmark;
  benchmarks: Benchmark[];
  round: number;
  shopOpen: boolean;
  gameOver: boolean;
}

// Interfaz para las acciones del juego
export interface GameActions {
  // Acciones de cartas
  drawCard: () => void;
  playCard: (cardId: string) => void;
  discardCard: (cardId: string) => void;
  
  // Acciones de jokers
  buyJoker: (jokerId: string) => void;
  
  // Acciones de turno
  calculateScore: () => number;
  endTurn: () => void;
  
  // Acciones de tienda
  openShop: () => void;
  closeShop: () => void;
} 