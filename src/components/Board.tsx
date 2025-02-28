import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Card from '@/components/Card';
import { Card as CardType } from '@/types';

const Board: React.FC = () => {
  const { hand, drawCard, playCard, calculateScore, endTurn, openShop } = useGameStore();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  // Manejador para seleccionar una carta
  const handleSelectCard = (card: CardType) => {
    setSelectedCard(card.id);
    console.log(`[LOG] Carta seleccionada: ${card.name}`);
  };
  
  // Manejador para jugar la carta seleccionada
  const handlePlayCard = () => {
    if (selectedCard) {
      playCard(selectedCard);
      setSelectedCard(null);
      
      // Calculamos la puntuación después de jugar la carta
      calculateScore();
    }
  };
  
  // Manejador para robar una carta
  const handleDrawCard = () => {
    drawCard();
  };
  
  // Manejador para terminar el turno
  const handleEndTurn = () => {
    endTurn();
  };
  
  // Manejador para abrir la tienda
  const handleOpenShop = () => {
    openShop();
  };
  
  // Determinar si hay cartas para jugar
  const canDrawCard = hand.length < 5; // Máximo 5 cartas en mano
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Tablero de Desarrollo</h2>
      
      {/* Área para las cartas jugadas */}
      <div className="min-h-[200px] bg-gray-800 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
        {selectedCard ? (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Card 
                card={hand.find(c => c.id === selectedCard)!} 
                isSelected={true}
              />
            </div>
            <button
              onClick={handlePlayCard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Jugar Carta
            </button>
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            <p>Selecciona una carta de tu mano para jugarla</p>
            {hand.length === 0 && (
              <p className="mt-2">No tienes cartas en tu mano. Roba cartas para comenzar.</p>
            )}
          </div>
        )}
      </div>
      
      {/* Mano del jugador */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Tu Mano</h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            <AnimatePresence>
              {hand.map(card => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    card={card} 
                    onClick={handleSelectCard}
                    isSelected={selectedCard === card.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Acciones del jugador */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDrawCard}
          disabled={!canDrawCard}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors
            ${canDrawCard 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          Robar Carta
        </button>
        
        <button
          onClick={handleEndTurn}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Finalizar Turno
        </button>
        
        <button
          onClick={handleOpenShop}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Abrir Tienda
        </button>
      </div>
    </div>
  );
};

export default Board; 