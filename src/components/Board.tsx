import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Card from '@/components/Card';
import { Card as CardType } from '@/types';

const Board: React.FC = () => {
  const { 
    hand, 
    drawCard, 
    playCard, 
    discardCard,
    calculateScore, 
    endTurn, 
    openShop,
    maxCardsPerTurn,
    cardsPlayedThisTurn,
    maxDiscardsPerTurn,
    cardsDiscardedThisTurn
  } = useGameStore();
  
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  // Efecto para robar cartas automáticamente hasta tener 3 en mano
  useEffect(() => {
    const fillHand = () => {
      const maxHandSize = 3;
      while (hand.length < maxHandSize) {
        drawCard();
      }
    };
    
    fillHand();
  }, [hand.length, drawCard]);
  
  // Manejador para seleccionar una carta
  const handleSelectCard = (card: CardType) => {
    setSelectedCard(card.id);
    console.log(`[LOG] Carta seleccionada: ${card.name}`);
  };
  
  // Manejador para jugar la carta seleccionada
  const handlePlayCard = () => {
    if (selectedCard) {
      // Guardamos la carta para mostrar el resultado
      const cardToPlay = hand.find(c => c.id === selectedCard)!;
      
      // Jugamos la carta
      playCard(selectedCard);
      setSelectedCard(null);
      
      // Calculamos la puntuación después de jugar la carta
      const newScore = calculateScore();
      
      // Mostramos un mensaje de resultados
      showPlayResult(cardToPlay, newScore);
      
      // Automáticamente robamos una carta después de jugar
      setTimeout(() => {
        drawCard();
      }, 300);
    }
  };

  // Estado para mostrar resultados de jugar una carta
  const [playResult, setPlayResult] = useState<{card: CardType, score: number} | null>(null);
  
  // Función para mostrar el resultado de jugar una carta
  const showPlayResult = (card: CardType, score: number) => {
    setPlayResult({card, score});
    setTimeout(() => setPlayResult(null), 3000);
  };

  // Manejador para descartar la carta seleccionada
  const handleDiscardCard = () => {
    if (selectedCard) {
      discardCard(selectedCard);
      setSelectedCard(null);
      
      // Automáticamente robamos una carta después de descartar
      setTimeout(() => {
        drawCard();
      }, 300);
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
  
  // Obtener estado de la tienda
  const { canVisitShop } = useGameStore();
  
  // Determinar si hay cartas para robar
  const canDrawCard = hand.length < 3; // Máximo 3 cartas en mano
  
  // Determinar si podemos jugar más cartas
  const canPlayMoreCards = cardsPlayedThisTurn < maxCardsPerTurn;
  
  // Determinar si podemos descartar más cartas
  const canDiscardMoreCards = cardsDiscardedThisTurn < maxDiscardsPerTurn;
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-xl font-bold text-white mb-4">Tablero de Desarrollo</h2>
      
      {/* Estadísticas de acciones por turno */}
      <div className="flex justify-between mb-4 bg-gray-800 p-3 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-blue-400">Story Points disponibles</div>
          <div className="font-bold text-white">{cardsPlayedThisTurn}/{maxCardsPerTurn}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-red-400">Espacio en Backlog</div>
          <div className="font-bold text-white">{cardsDiscardedThisTurn}/{maxDiscardsPerTurn}</div>
        </div>
      </div>
      
      {/* Área para las cartas jugadas */}
      <div className="min-h-[300px] bg-gray-800 rounded-lg p-6 mb-4 flex flex-col items-center justify-center overflow-visible">
        {selectedCard ? (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Card 
                card={hand.find(c => c.id === selectedCard)!} 
                isSelected={true}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePlayCard}
                disabled={!canPlayMoreCards}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors
                  ${canPlayMoreCards 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-600 cursor-not-allowed text-gray-300'}`}
              >
                Asignar Story Points
              </button>
              <button
                onClick={handleDiscardCard}
                disabled={!canDiscardMoreCards}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors
                  ${canDiscardMoreCards 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-600 cursor-not-allowed text-gray-300'}`}
              >
                Mover al Backlog
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : playResult ? (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-lg font-bold text-green-400 mb-2">¡Story Points asignados!</div>
            <div className="flex items-center gap-4">
              <Card card={playResult.card} disabled />
              <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                <div className="text-center text-gray-300 mb-1">Puntuación actual</div>
                <div className="text-3xl font-bold text-white">{playResult.score}</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-gray-400 text-center">
            <p>Selecciona una carta de tu mano para asignar Story Points o mover al Backlog</p>
            {hand.length === 0 && (
              <p className="mt-2">No tienes cartas en tu mano.</p>
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
          Finalizar Sprint
        </button>
        
        <button
          onClick={handleOpenShop}
          disabled={!canVisitShop}
          className={`relative px-4 py-2 rounded-lg font-semibold transition-colors
            ${canVisitShop 
              ? 'bg-amber-600 hover:bg-amber-700 text-white' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          {canVisitShop && (
            <motion.span 
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
          Contratar {canVisitShop ? '(¡Disponible!)' : '(Completa benchmark)'}
        </button>
      </div>
    </div>
  );
};

export default Board; 