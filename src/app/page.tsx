'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Resources from '@/components/Resources';
import Board from '@/components/Board';
import Shop from '@/components/Shop';
import GameOver from '@/components/GameOver';
import ActiveJokers from '@/components/ActiveJokers';

// Componente de pantalla de bienvenida
const WelcomeScreen: React.FC<{ onStartGame: (difficulty: number) => void }> = ({ onStartGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  
  const handleDifficultyChange = (difficulty: 'easy' | 'normal' | 'hard') => {
    setSelectedDifficulty(difficulty);
    
    // Ajustamos el multiplicador según la dificultad
    let multiplier = 1; // Normal
    
    if (difficulty === 'easy') {
      multiplier = 0.7; // 30% más fácil
    } else if (difficulty === 'hard') {
      multiplier = 1.5; // 50% más difícil
    }
  };
  
  const handleStartGame = () => {
    let multiplier = 1; // Normal
    
    if (selectedDifficulty === 'easy') {
      multiplier = 0.7; // 30% más fácil
    } else if (selectedDifficulty === 'hard') {
      multiplier = 1.5; // 50% más difícil
    }
    
    onStartGame(multiplier);
  };
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-amber-700/30 m-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
        Bienvenido a Scalatro
      </h2>
      
      <p className="text-gray-300 mb-8 text-lg">
        En Scalatro, dirigirás tu propia empresa de IA en una carrera por dominar el mercado. 
        Acumula pre-training compute (chips) y test-time compute (multiplicadores) para superar benchmarks
        y aumentar tu cuota de mercado.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-blue-400 mb-2">Pre-training Compute (Chips)</h3>
          <p className="text-sm">Los chips representan la potencia computacional que utilizas para entrenar tus modelos. 
            Más chips = modelos más potentes.</p>
        </div>
        
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-red-400 mb-2">Test-time Compute (Multiplicador)</h3>
          <p className="text-sm">El multiplicador representa la eficiencia de tus modelos durante la inferencia.
            Maximiza tu multiplicador para obtener mayor puntuación.</p>
        </div>
        
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-amber-400 mb-2">Jokers (GPUs, Datos, etc.)</h3>
          <p className="text-sm">Compra mejoras en la tienda para potenciar tus chips y multiplicador.
            Combina diferentes jokers para crear estrategias ganadoras.</p>
        </div>
        
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-purple-400 mb-2">Benchmarks</h3>
          <p className="text-sm">Supera benchmarks de la industria para ganar cuota de mercado.
            Cuanto más avanzas, más difíciles se vuelven los benchmarks.</p>
        </div>
      </div>
      
      <div className="bg-gray-700/50 p-4 rounded-lg mb-10 border border-amber-700/20">
        <h3 className="font-bold text-green-400 mb-2">Cómo jugar:</h3>
        <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
          <li><strong>Story Points disponibles</strong>: Puedes asignar hasta 2 por sprint</li>
          <li><strong>Backlog</strong>: Puedes mover hasta 2 tareas por sprint</li>
          <li>Usa tus chips y multiplicador para <strong>superar benchmarks</strong></li>
          <li>Contrata recursos en la tienda para <strong>mejorar tu empresa</strong></li>
          <li>Gana <strong>cuota de mercado</strong> superando benchmarks</li>
          <li>Pierde si tu <strong>cuota de mercado llega a 0</strong></li>
        </ul>
      </div>
      
      {/* Selector de dificultad */}
      <div className="mb-8">
        <h3 className="font-bold text-center text-white mb-3">Selecciona la dificultad:</h3>
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'easy' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => handleDifficultyChange('easy')}
          >
            Fácil
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'normal' 
                ? 'bg-amber-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => handleDifficultyChange('normal')}
          >
            Normal
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'hard' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => handleDifficultyChange('hard')}
          >
            Difícil
          </button>
        </div>
        <div className="text-center mt-2 text-sm text-gray-400">
          {selectedDifficulty === 'easy' && "Para principiantes. Objetivos de benchmarks reducidos un 30%."}
          {selectedDifficulty === 'normal' && "Experiencia equilibrada. Dificultad estándar."}
          {selectedDifficulty === 'hard' && "Para expertos. Objetivos de benchmarks aumentados un 50%."}
        </div>
      </div>
      
      <div className="text-center">
        <motion.button
          className="bg-gradient-to-r from-amber-500 to-yellow-600 px-8 py-3 rounded-lg text-white font-bold text-xl hover:from-amber-600 hover:to-yellow-700 transition-colors shadow-lg"
          onClick={handleStartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Comenzar Partida
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { 
    shopOpen, 
    closeShop, 
    gameOver,
    setDifficulty,
  } = useGameStore();
  
  // Estado para mostrar la pantalla de bienvenida
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Manejador para iniciar el juego
  const handleStartGame = (selectedDifficulty: number) => {
    setShowWelcome(false);
    setDifficulty(selectedDifficulty);
  };
  
  // Manejador para reiniciar el juego
  const handleRestartGame = () => {
    setShowWelcome(true);
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {showWelcome ? (
        <WelcomeScreen onStartGame={handleStartGame} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6">Scalatro: Build Your AI Empire</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Columna izquierda: Recursos y Mejoras Activas */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              {/* Recursos y estadísticas en formato vertical */}
              <div className="h-auto">
                <Resources />
              </div>
              
              {/* Mejoras activas (Jokers) */}
              <div className="h-auto">
                <ActiveJokers />
              </div>
            </div>
            
            {/* Columna derecha: Tablero de desarrollo */}
            <div className="lg:w-2/3">
              <Board />
            </div>
          </div>
          
          {/* Modales */}
          <AnimatePresence>
            {shopOpen && (
              <motion.div 
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Shop isOpen={shopOpen} onClose={closeShop} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {gameOver && (
              <motion.div 
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GameOver onRestart={handleRestartGame} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
