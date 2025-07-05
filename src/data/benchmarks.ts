import { Benchmark } from '@/types';

// List of benchmarks available in the game
// Each benchmark has a score target and a market share reward
const benchmarks: Benchmark[] = [
  // Initial stage - Easy goals
  {
    id: "bench-1",
    name: "Small Local Chatbot",
    targetScore: 20,
    marketShareReward: 5,
    completed: false,
  },
  {
    id: "bench-2",
    name: "Basic Text Assistant",
    targetScore: 50,
    marketShareReward: 8,
    completed: false,
  },
  {
    id: "bench-3",
    name: "Multilingual Translator",
    targetScore: 100,
    marketShareReward: 10,
    completed: false,
  },
  
  // Medium stage - More difficult challenges
  {
    id: "bench-4",
    name: "Code Generator",
    targetScore: 180,
    marketShareReward: 12,
    completed: false,
  },
  {
    id: "bench-5",
    name: "ImaginAI - Image Generator",
    targetScore: 250,
    marketShareReward: 15,
    completed: false,
  },
  {
    id: "bench-6",
    name: "Copilot Agent",
    targetScore: 350,
    marketShareReward: 18,
    completed: false,
  },
  
  // Advanced stage - Major challenges
  {
    id: "bench-7",
    name: "Multimodal Assistant",
    targetScore: 500,
    marketShareReward: 20,
    completed: false,
  },
  {
    id: "bench-8",
    name: "MMLU - Human Knowledge",
    targetScore: 750,
    marketShareReward: 25,
    completed: false,
  },
  {
    id: "bench-9",
    name: "Artificial Consciousness",
    targetScore: 1000,
    marketShareReward: 30,
    completed: false,
  },
  
  // Final benchmark
  {
    id: "bench-10",
    name: "AGI - Superintelligence",
    targetScore: 1500,
    marketShareReward: 50, // Huge final reward
    completed: false,
  },
];

// Function to get the initial benchmark
export const getInitialBenchmark = (): Benchmark => {
  return { ...benchmarks[0], id: benchmarks[0].id };
};

// Function to get the next benchmark
export const getNextBenchmark = (currentBenchmarkId: string): Benchmark | null => {
  const currentIndex = benchmarks.findIndex(b => b.id === currentBenchmarkId);
  
  // If the current benchmark is not found or is the last one, return null
  if (currentIndex === -1 || currentIndex === benchmarks.length - 1) {
    return null;
  }
  
  // Return the next benchmark
  return { ...benchmarks[currentIndex + 1], id: benchmarks[currentIndex + 1].id };
};

// Function to get all benchmarks
export const getAllBenchmarks = (): Benchmark[] => {
  return benchmarks.map(benchmark => ({ ...benchmark }));
}; 