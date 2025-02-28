import { Benchmark } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Benchmarks iniciales del juego
export const benchmarks: Benchmark[] = [
  {
    id: uuidv4(),
    name: 'MMLU',
    targetScore: 50,
    marketShareReward: 5,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'HellaSwag',
    targetScore: 100,
    marketShareReward: 7,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'TruthfulQA',
    targetScore: 150,
    marketShareReward: 10,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'GSM8K',
    targetScore: 250,
    marketShareReward: 15,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'HumanEval',
    targetScore: 400,
    marketShareReward: 20,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'MATH',
    targetScore: 600,
    marketShareReward: 25,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Chatbot Arena',
    targetScore: 1000,
    marketShareReward: 30,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'LMSYS Benchmark',
    targetScore: 1500,
    marketShareReward: 40,
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'AI Alignment Benchmark',
    targetScore: 2500,
    marketShareReward: 50,
    completed: false,
  },
];

// Obtener el primer benchmark para empezar el juego
export function getInitialBenchmark(): Benchmark {
  return { ...benchmarks[0], id: uuidv4() };
}

// Obtener el siguiente benchmark después de completar uno
export function getNextBenchmark(currentBenchmarkId: string): Benchmark | null {
  const currentIndex = benchmarks.findIndex(b => b.id === currentBenchmarkId);
  if (currentIndex === -1 || currentIndex === benchmarks.length - 1) {
    return null; // No hay más benchmarks o el ID es inválido
  }
  
  return { ...benchmarks[currentIndex + 1], id: uuidv4() };
} 