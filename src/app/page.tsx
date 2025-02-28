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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-transparent bg-clip-text">
          Scalatro
        </h1>
        <div className="text-gray-400">
          Balatro but you&apos;re an AI company
        </div>
      </header>
      
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto">
        {showWelcome ? (
          <WelcomeScreen onStart={handleStartGame} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel izquierdo */}
            <div className="lg:col-span-2 space-y-6">
              <Resources />
              <Board />
            </div>
            
            {/* Panel derecho */}
            <div className="space-y-6">
              <ActiveJokers />
            </div>
          </div>
        )}
      </div>
      
      {/* Modales */}
      {shopOpen && <Shop isOpen={shopOpen} onClose={closeShop} />}
      {gameOver && <GameOver onRestart={handleRestart} />}
    </main>
  );
}

// Componente de pantalla de bienvenida
const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-amber-400">
        Bienvenido a Scalatro
      </h2>
      
      <p className="text-gray-300 mb-6 text-lg">
        En Scalatro, dirigirás tu propia empresa de IA en una carrera por dominar el mercado. 
        Acumula pre-training compute (chips) y test-time compute (multiplicadores) para superar benchmarks
        y aumentar tu cuota de mercado.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-blue-400 mb-2">Pre-training Compute (Chips)</h3>
          <p className="text-sm">Los chips representan la potencia computacional que utilizas para entrenar tus modelos. 
            Más chips = modelos más potentes.</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-red-400 mb-2">Test-time Compute (Multiplicador)</h3>
          <p className="text-sm">El multiplicador representa la eficiencia de tus modelos durante la inferencia.
            Maximiza tu multiplicador para obtener mayor puntuación.</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-amber-400 mb-2">Jokers (GPUs, Datos, etc.)</h3>
          <p className="text-sm">Compra mejoras en la tienda para potenciar tus chips y multiplicador.
            Combina diferentes jokers para crear estrategias ganadores.</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-purple-400 mb-2">Benchmarks</h3>
          <p className="text-sm">Supera benchmarks de la industria para ganar cuota de mercado.
            Cuanto más avanzas, más difíciles se vuelven los benchmarks.</p>
        </div>
      </div>
      
      <div className="text-center">
        <motion.button
          className="bg-gradient-to-r from-amber-500 to-yellow-600 px-8 py-3 rounded-lg text-white font-bold text-xl hover:from-amber-600 hover:to-yellow-700 transition-colors"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Comenzar Partida
        </motion.button>
      </div>
    </motion.div>
  );
};
