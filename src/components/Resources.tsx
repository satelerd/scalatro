import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const Resources: React.FC = () => {
  const { 
    chips, 
    multiplier, 
    score, 
    marketShare, 
    money, 
    round,
    currentBenchmark
  } = useGameStore();
  
  // Calculamos el score actual (chips * multiplier)
  const currentScore = Math.floor(chips * multiplier);
  
  // Verificamos si hemos alcanzado el benchmark
  const benchmarkMet = currentScore >= currentBenchmark.targetScore;
  
  // Calcular porcentaje de progreso hacia el benchmark
  const progressPercent = Math.min(100, Math.floor((currentScore / currentBenchmark.targetScore) * 100));
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Recursos y Estadísticas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Panel izquierdo - Estadísticas principales */}
        <div className="bg-gray-800 rounded-lg p-3 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-400 text-sm">Ronda</div>
            <div className="bg-yellow-900/50 px-2 py-1 rounded text-yellow-300 text-sm font-bold">
              #{round}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-blue-900/50 rounded-lg p-3 text-center">
              <div className="text-xs text-blue-300 mb-1">Pre-training</div>
              <div className="text-2xl font-bold text-blue-400">{chips}</div>
              <div className="text-xs text-blue-300 mt-1">Chips</div>
            </div>
            
            <div className="bg-red-900/50 rounded-lg p-3 text-center">
              <div className="text-xs text-red-300 mb-1">Test-time</div>
              <div className="text-2xl font-bold text-red-400">×{multiplier.toFixed(1)}</div>
              <div className="text-xs text-red-300 mt-1">Multiplicador</div>
            </div>
          </div>
          
          <div className="bg-purple-900/50 rounded-lg p-3 text-center">
            <div className="text-xs text-purple-300 mb-1">Puntuación</div>
            <div className="text-3xl font-bold text-purple-300">
              {currentScore}
              <span className="text-sm ml-1">puntos</span>
            </div>
          </div>
        </div>
        
        {/* Panel central - Benchmark actual */}
        <div className="bg-gray-800 rounded-lg p-3 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-300 text-sm font-semibold">Benchmark Actual</div>
            <div className="bg-amber-900/50 px-2 py-1 rounded text-amber-300 text-sm font-bold">
              {benchmarkMet ? '✓ Superado' : 'Pendiente'}
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <div className="font-semibold text-purple-300">{currentBenchmark.name}</div>
              <div className="text-sm text-gray-400">Meta: {currentBenchmark.targetScore}</div>
            </div>
            
            {/* Barra de progreso */}
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${benchmarkMet ? 'bg-green-500' : 'bg-amber-500'}`}
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-right text-xs text-gray-400 mt-1">{progressPercent}% completado</div>
          </div>
          
          <div className="bg-green-900/50 rounded-lg p-2 text-center">
            <div className="text-xs text-green-300 mb-1">Recompensa</div>
            <div className="flex justify-center items-center">
              <svg className="w-5 h-5 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-green-300">+{currentBenchmark.marketShareReward}% cuota mercado</span>
            </div>
          </div>
        </div>
        
        {/* Panel derecho - Recursos del jugador */}
        <div className="bg-gray-800 rounded-lg p-3 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <div className="text-gray-300 text-sm font-semibold">Recursos Disponibles</div>
            <div className="bg-blue-900/50 px-2 py-1 rounded text-blue-300 text-sm font-bold">
              {marketShare}% mercado
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-3">
            <div className="bg-amber-900/40 rounded-full p-4 inline-block">
              <div className="text-3xl font-bold text-yellow-400">
                ${money}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-2">
            <div className="text-center text-gray-400 text-sm mb-1">Posición en el mercado</div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500"
                style={{ width: `${marketShare}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <div>Start-up</div>
              <div>Dominante</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 