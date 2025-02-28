import { v4 as uuidv4 } from 'uuid';
import { Benchmark } from '@/types';

// Lista de benchmarks disponibles en el juego
// Cada benchmark tiene un objetivo de puntuación y una recompensa en cuota de mercado
const benchmarks: Benchmark[] = [
  // Etapa inicial - Metas fáciles
  {
    id: "bench-1",
    name: "Pequeño Chatbot Local",
    targetScore: 20,
    marketShareReward: 5,
    completed: false,
  },
  {
    id: "bench-2",
    name: "Asistente de Texto Básico",
    targetScore: 50,
    marketShareReward: 8,
    completed: false,
  },
  {
    id: "bench-3",
    name: "Traductor Multilingüe",
    targetScore: 100,
    marketShareReward: 10,
    completed: false,
  },
  
  // Etapa media - Retos más difíciles
  {
    id: "bench-4",
    name: "Generador de Código",
    targetScore: 180,
    marketShareReward: 12,
    completed: false,
  },
  {
    id: "bench-5",
    name: "ImaginIA - Gen. de Imágenes",
    targetScore: 250,
    marketShareReward: 15,
    completed: false,
  },
  {
    id: "bench-6",
    name: "Agente Copiloto",
    targetScore: 350,
    marketShareReward: 18,
    completed: false,
  },
  
  // Etapa avanzada - Grandes desafíos
  {
    id: "bench-7",
    name: "Asistente Multimodal",
    targetScore: 500,
    marketShareReward: 20,
    completed: false,
  },
  {
    id: "bench-8",
    name: "MMLU - Conocimiento Humano",
    targetScore: 750,
    marketShareReward: 25,
    completed: false,
  },
  {
    id: "bench-9",
    name: "Consciencia Artificial",
    targetScore: 1000,
    marketShareReward: 30,
    completed: false,
  },
  
  // Benchmark final
  {
    id: "bench-10",
    name: "AGI - Superinteligencia",
    targetScore: 1500,
    marketShareReward: 50, // Enorme recompensa final
    completed: false,
  },
];

// Función para obtener el benchmark inicial
export const getInitialBenchmark = (): Benchmark => {
  return { ...benchmarks[0], id: benchmarks[0].id };
};

// Función para obtener el siguiente benchmark
export const getNextBenchmark = (currentBenchmarkId: string): Benchmark | null => {
  const currentIndex = benchmarks.findIndex(b => b.id === currentBenchmarkId);
  
  // Si no se encuentra el benchmark actual o es el último, devolvemos null
  if (currentIndex === -1 || currentIndex === benchmarks.length - 1) {
    return null;
  }
  
  // Devolvemos el siguiente benchmark
  return { ...benchmarks[currentIndex + 1], id: benchmarks[currentIndex + 1].id };
};

// Función para obtener todos los benchmarks
export const getAllBenchmarks = (): Benchmark[] => {
  return benchmarks.map(benchmark => ({ ...benchmark }));
}; 