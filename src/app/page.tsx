'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Resources from '@/components/Resources';
import Board from '@/components/Board';
import Shop from '@/components/Shop';
import GameOver from '@/components/GameOver';
import ActiveJokers from '@/components/ActiveJokers';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function Home() {
  const { 
    shopOpen, 
    closeShop, 
    gameOver,
    resetGame,
    setDifficulty
  } = useGameStore();
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  
  // Manejo de errores global
  useEffect(() => {
    const handleGlobalError = (error: ErrorEvent) => {
      console.error('[CRITICAL ERROR]', error.message, error.error);
    };
    
    window.addEventListener('error', handleGlobalError);
    console.log('[LOG] Configuración de manejo de errores global establecida');
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  const handleDifficultyChange = (value: number) => {
    console.log(`[LOG] Dificultad seleccionada: ${value}`);
    setSelectedDifficulty(value);
  };

  const handleStartGame = () => {
    console.log('[LOG] Iniciando juego...');
    
    try {
      console.log('[LOG] Reiniciando estado del juego');
      resetGame();
      
      console.log(`[LOG] Estableciendo dificultad: ${selectedDifficulty}`);
      setDifficulty(selectedDifficulty);
      
      console.log('[LOG] Cambiando a la vista del tablero');
      setShowWelcome(false);
    } catch (error) {
      console.error('[ERROR] Error al iniciar el juego:', error);
    }
  };

  const handleRestartGame = () => {
    console.log('[LOG] Reiniciando juego...');
    setShowWelcome(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {showWelcome ? (
        <WelcomeScreen 
          onStartGame={handleStartGame} 
          onChangeDifficulty={handleDifficultyChange}
          selectedDifficulty={selectedDifficulty}
        />
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
              <Board onRestartGame={handleRestartGame} />
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
