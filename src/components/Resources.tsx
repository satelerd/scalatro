import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getAllBenchmarks } from '@/data/benchmarks';

const Resources: React.FC = () => {
  const { 
    chips, 
    multiplier, 
    score, 
    money,
    marketShare,
    currentBenchmark,
    round,
    difficulty,
  } = useGameStore();
  
  // Obtener todos los benchmarks para mostrar progreso
  const allBenchmarks = getAllBenchmarks();
  
  // Calcular el progreso actual hacia el siguiente benchmark
  const calculateBenchmarkProgress = () => {
    if (!currentBenchmark) return 100; // Si no hay benchmark, mostrar 100%
    
    // Calculamos qué porcentaje del objetivo hemos completado
    const progress = Math.min(Math.floor((score / currentBenchmark.targetScore) * 100), 100);
    return progress;
  };
  
  // Verificar si se ha completado el benchmark actual
  const isBenchmarkCompleted = () => {
    if (!currentBenchmark) return true;
    return score >= currentBenchmark.targetScore;
  };
  
  // Estado para la animación de puntuación
  const [displayScore, setDisplayScore] = useState(score);
  useEffect(() => {
    // Actualizar la puntuación con una pequeña animación
    const difference = score - displayScore;
    if (difference !== 0) {
      const step = difference > 0 ? 
        Math.max(1, Math.ceil(difference / 10)) : 
        Math.min(-1, Math.floor(difference / 10));
      
      const timer = setTimeout(() => {
        setDisplayScore(prev => prev + step);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [score, displayScore]);
  
  // Clases CSS condicionales para cuota de mercado
  const getMarketShareClass = () => {
    if (marketShare >= 75) return 'text-green-400';
    if (marketShare >= 50) return 'text-blue-400';
    if (marketShare >= 25) return 'text-amber-400';
    return 'text-red-400';
  };
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Recursos y Estadísticas</h2>
      
      {/* Puntuación y ronda actual */}
      <div className="mb-4 grid grid-cols-1 gap-3">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Sprint</div>
          <div className="text-2xl font-bold text-white">{round}</div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Puntuación</div>
          <div className="text-2xl font-bold text-white">{displayScore}</div>
        </div>
      </div>
      
      {/* Chips y multiplicador */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="bg-blue-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-blue-300 mb-1">Pre-training</div>
          <div className="text-xl font-bold text-white">{chips} chips</div>
        </div>
        
        <div className="bg-red-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-red-300 mb-1">Test-time</div>
          <div className="text-xl font-bold text-white">×{multiplier.toFixed(1)}</div>
        </div>
      </div>
      
      {/* Dinero y cuota de mercado */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="bg-green-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-green-300 mb-1">Fondos</div>
          <div className="text-xl font-bold text-white">${money}</div>
        </div>
        
        <div className="bg-purple-900/60 p-3 rounded-lg text-center">
          <div className="text-sm text-purple-300 mb-1">Market Share</div>
          <div className={`text-xl font-bold ${getMarketShareClass()}`}>{marketShare}%</div>
        </div>
      </div>
      
      {/* Benchmark actual y progreso */}
      <div className="bg-gray-800 p-3 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-purple-300">Actual Benchmark:</div>
          <div className="text-sm font-bold text-white">
            {currentBenchmark ? currentBenchmark.name : 'Completados todos'}
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
            initial={{ width: 0 }}
            animate={{ width: `${calculateBenchmarkProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="text-xs text-gray-400">
            {score} / {currentBenchmark ? currentBenchmark.targetScore : '-'}
          </div>
          <div className="text-xs text-gray-400">
            {isBenchmarkCompleted() ? '¡Completado!' : `${calculateBenchmarkProgress()}%`}
          </div>
        </div>
        
        {isBenchmarkCompleted() && currentBenchmark && (
          <div className="mt-2 text-xs text-green-400 flex items-center">
            <span className="mr-1">✓</span> 
            ¡Benchmark completado! +{currentBenchmark.marketShareReward}% cuota de mercado
          </div>
        )}
      </div>
      
      {/* Dificultad actual */}
      <div className="bg-gray-800 p-3 rounded-lg">
        <div className="text-sm text-gray-400 mb-1">Dificultad</div>
        <div className="text-md font-bold">
          {difficulty <= 0.7 && (
            <span className="text-green-400">Fácil (×{difficulty.toFixed(1)})</span>
          )}
          {difficulty > 0.7 && difficulty < 1.2 && (
            <span className="text-yellow-400">Normal (×{difficulty.toFixed(1)})</span>
          )}
          {difficulty >= 1.2 && (
            <span className="text-red-400">Difícil (×{difficulty.toFixed(1)})</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources; 