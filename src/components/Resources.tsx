import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const Resources: React.FC = () => {
  // Obtenemos los recursos del store global
  const { 
    chips, 
    multiplier, 
    score, 
    marketShare, 
    money, 
    round, 
    currentBenchmark 
  } = useGameStore();

  // Calculamos el score actual (para mostrar en tiempo real)
  const currentScore = Math.floor(chips * multiplier);
  
  // Determinamos si el objetivo actual está superado
  const benchmarkMet = currentScore >= (currentBenchmark?.targetScore || 0);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold mb-3 text-center">Recursos de la IA</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Chips (Pre-training compute) */}
        <div className="bg-blue-900 p-3 rounded-md">
          <div className="text-sm text-blue-300 mb-1">Pre-training Compute</div>
          <div className="flex items-end">
            <motion.div 
              className="text-3xl font-bold text-blue-400" 
              key={chips}
              initial={{ scale: 1.3, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {chips}
            </motion.div>
            <div className="ml-1 text-sm opacity-70">chips</div>
          </div>
        </div>
        
        {/* Multiplicador (Test-time compute) */}
        <div className="bg-red-900 p-3 rounded-md">
          <div className="text-sm text-red-300 mb-1">Test-time Compute</div>
          <div className="flex items-end">
            <motion.div 
              className="text-3xl font-bold text-red-400"
              key={multiplier}
              initial={{ scale: 1.3, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ×{multiplier.toFixed(1)}
            </motion.div>
            <div className="ml-1 text-sm opacity-70">mult</div>
          </div>
        </div>
        
        {/* Puntuación (Score) */}
        <div className="bg-purple-900 p-3 rounded-md">
          <div className="text-sm text-purple-300 mb-1">Puntuación</div>
          <div className="flex items-end">
            <motion.div 
              className="text-3xl font-bold text-purple-400"
              key={currentScore}
              initial={{ scale: 1.3, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentScore}
            </motion.div>
          </div>
        </div>
        
        {/* Benchmark actual */}
        <div className="bg-amber-900 p-3 rounded-md">
          <div className="text-sm text-amber-300 mb-1">Benchmark Actual</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-amber-400">
              {currentBenchmark?.name || 'N/A'}
            </div>
            <div className={`text-sm font-semibold px-2 py-1 rounded-full ${benchmarkMet ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}`}>
              {benchmarkMet ? 'Superado' : 'Pendiente'}
            </div>
          </div>
          <div className="mt-1 text-sm">
            Objetivo: <span className="font-semibold">{currentBenchmark?.targetScore || 0}</span>
          </div>
        </div>
        
        {/* Cuota de Mercado */}
        <div className="bg-green-900 p-3 rounded-md">
          <div className="text-sm text-green-300 mb-1">Cuota de Mercado</div>
          <div className="flex items-end">
            <motion.div 
              className="text-3xl font-bold text-green-400"
              key={marketShare}
              initial={{ scale: 1.3, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {marketShare}%
            </motion.div>
          </div>
        </div>
        
        {/* Dinero */}
        <div className="bg-yellow-900 p-3 rounded-md">
          <div className="text-sm text-yellow-300 mb-1">Financiación</div>
          <div className="flex items-end">
            <motion.div 
              className="text-3xl font-bold text-yellow-400"
              key={money}
              initial={{ scale: 1.3, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ${money}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Indicador de ronda */}
      <div className="mt-4 text-center">
        <div className="inline-block px-4 py-1 bg-gray-700 rounded-full">
          <span className="text-gray-400 mr-2">Ronda:</span>
          <span className="font-bold">{round}</span>
        </div>
      </div>
    </div>
  );
};

export default Resources; 