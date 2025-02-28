'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import Board from '@/components/Board';
import Resources from '@/components/Resources';
import Shop from '@/components/Shop';
import ActiveJokers from '@/components/ActiveJokers';
import GameOver from '@/components/GameOver';
import { motion } from 'framer-motion';

export default function Home() {
  const { shopOpen, closeShop, gameOver } = useGameStore();
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Efecto para los logs del juego
  useEffect(() => {
    console.log('[LOG] Juego inicializado');
    return () => {
      console.log('[LOG] Componente desmontado');
    };
  }, []);
  
  // Handler para reiniciar el juego
  const handleRestart = () => {
    window.location.reload();
  };
  
  // No mostrar la pantalla de bienvenida
  const handleStartGame = () => {
    setShowWelcome(false);
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 py-4 border-b border-amber-800/30">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-transparent bg-clip-text">
            Scalatro
          </h1>
          <div className="text-sm md:text-base text-amber-400/80">
            Construye tu imperio de IA
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto mb-16">
        {showWelcome ? (
          <WelcomeScreen onStart={handleStartGame} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Panel izquierdo */}
            <div className="lg:col-span-8 space-y-6">
              <Resources />
              <Board />
            </div>
            
            {/* Panel derecho */}
            <div className="lg:col-span-4 space-y-6">
              <ActiveJokers />
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="max-w-7xl mx-auto text-center text-gray-500 text-sm px-4 py-6 border-t border-gray-800">
        <p>
          Scalatro - Inspirado en <span className="text-amber-400">Balatro</span> • Adaptado al mundo de la IA • 
          <button 
            onClick={() => setShowWelcome(true)}
            className="ml-2 text-blue-400 hover:underline"
          >
            Ver instrucciones
          </button>
        </p>
      </footer>
      
      {/* Modales */}
      {shopOpen && <Shop isOpen={shopOpen} onClose={closeShop} />}
      {gameOver && <GameOver onRestart={handleRestart} />}
    </main>
  );
}

// Componente de pantalla de bienvenida
const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { setDifficulty } = useGameStore();
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
    
    setDifficulty(multiplier);
  };
  
  const handleStartGame = () => {
    onStart();
  };
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-amber-700/30"
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
          <li>Roba <strong>hasta 3 cartas</strong> en tu mano</li>
          <li>Puedes <strong>jugar hasta 2 cartas</strong> por turno</li>
          <li>Si no te gustan tus cartas, puedes <strong>descartar hasta 2</strong> por turno</li>
          <li>Usa tus chips y multiplicador para <strong>superar benchmarks</strong></li>
          <li>Compra jokers en la tienda para <strong>mejorar tu empresa</strong></li>
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
