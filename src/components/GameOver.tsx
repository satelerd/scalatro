import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  const { marketShare, round, score } = useGameStore();
  
  // Determina si el jugador ha ganado o perdido
  const isVictory = marketShare > 0;
  
  // Texto y estilo según si ha ganado o perdido
  const titleText = isVictory 
    ? '¡Has dominado el mercado de IA!' 
    : 'Tu empresa de IA ha fracasado';
    
  const titleColor = isVictory ? 'text-green-400' : 'text-red-400';
  
  const messageText = isVictory
    ? `Has conseguido un ${marketShare}% de cuota de mercado en ${round} rondas.`
    : 'Has perdido toda tu cuota de mercado y los inversores han retirado su financiación.';
    
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-2xl w-full"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className={`text-4xl font-bold mb-6 text-center ${titleColor}`}>
          {titleText}
        </h2>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <p className="text-gray-200 text-lg mb-4 text-center">
            {messageText}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-900 p-3 rounded text-center">
              <div className="text-blue-300 text-sm mb-1">Puntuación final</div>
              <div className="text-3xl font-bold text-white">{score}</div>
            </div>
            
            <div className="bg-green-900 p-3 rounded text-center">
              <div className="text-green-300 text-sm mb-1">Cuota de mercado</div>
              <div className="text-3xl font-bold text-white">{marketShare}%</div>
            </div>
            
            <div className="bg-purple-900 p-3 rounded text-center">
              <div className="text-purple-300 text-sm mb-1">Rondas jugadas</div>
              <div className="text-3xl font-bold text-white">{round}</div>
            </div>
          </div>
          
          {isVictory ? (
            <p className="text-amber-400 text-center font-semibold">
              ¡Felicidades! Has superado todos los benchmarks y te has convertido en líder del mercado.
            </p>
          ) : (
            <p className="text-gray-400 text-center">
              El mundo de la IA es implacable. ¡Quizás la próxima vez tengas más suerte!
            </p>
          )}
        </div>
        
        <div className="flex justify-center">
          <motion.button
            className="bg-gradient-to-r from-amber-500 to-amber-700 px-8 py-3 rounded-lg text-white font-bold text-lg hover:from-amber-600 hover:to-amber-800 transition-all"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver a jugar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver; 