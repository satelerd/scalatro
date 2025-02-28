import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Card from '@/components/Card';
import { Card as CardType } from '@/types';

// Definimos las zonas de destino
interface DropZone {
  id: string;
  title: string;
  description: string;
  action: (cardId: string) => void;
  color: string;
  position: 'left' | 'right';
  isEnabled: boolean; 
}

interface BoardProps {
  onRestartGame?: () => void;
}

const Board: React.FC<BoardProps> = ({ onRestartGame }) => {
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
  const [isInitialDraw, setIsInitialDraw] = useState(true);
  const [shouldDrawAfterTurn, setShouldDrawAfterTurn] = useState(false);
  
  // Estado para la carta que se está arrastrando
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  
  // Referencias a las zonas de drop
  const storyPointsZoneRef = useRef<HTMLDivElement>(null);
  const backlogZoneRef = useRef<HTMLDivElement>(null);
  
  // Definimos las zonas de destino
  const dropZones: DropZone[] = [
    {
      id: 'storyPoints',
      title: 'Story Points',
      description: 'Arrastra aquí para asignar Story Points',
      action: playCard,
      color: 'bg-blue-600',
      position: 'left',
      isEnabled: cardsPlayedThisTurn < maxCardsPerTurn
    },
    {
      id: 'backlog',
      title: 'Backlog',
      description: 'Arrastra aquí para mover al Backlog',
      action: discardCard,
      color: 'bg-red-600',
      position: 'right',
      isEnabled: cardsDiscardedThisTurn < maxDiscardsPerTurn
    }
  ];
  
  console.log('[BOARD] Estado inicial del tablero');
  console.log('[BOARD] Mano actual:', hand);
  console.log('[BOARD] isInitialDraw:', isInitialDraw);
  
  // Efecto para robar cartas automáticamente solo la primera vez
  useEffect(() => {
    if (isInitialDraw) {
      console.log('[BOARD] Realizando relleno inicial de cartas');
      
      // Calculamos cuántas cartas necesitamos
      const cardsNeeded = Math.max(0, 3 - hand.length);
      console.log(`[BOARD] Cartas necesarias para llenar la mano: ${cardsNeeded}`);
      
      // Usamos un bucle for en lugar de while para evitar bucles infinitos
      for (let i = 0; i < cardsNeeded; i++) {
        console.log(`[BOARD] Robando carta ${i+1} de ${cardsNeeded}`);
        drawCard();
      }
      
      // Marcamos que ya hemos realizado el llenado inicial
      setIsInitialDraw(false);
      console.log('[BOARD] Llenado inicial de cartas completado');
    }
  }, [isInitialDraw, drawCard]); // Añadimos drawCard a las dependencias
  
  // Nuevo efecto para comprobar y mantener 3 cartas en mano después de cada acción
  useEffect(() => {
    // Si no es la carga inicial y tenemos menos de 3 cartas, robamos automáticamente
    if (!isInitialDraw && hand.length < 3) {
      console.log('[BOARD] Rellenando mano automáticamente después de acción');
      
      // Calculamos cuántas cartas necesitamos
      const cardsNeeded = Math.max(0, 3 - hand.length);
      console.log(`[BOARD] Cartas necesarias para llenar la mano: ${cardsNeeded}`);
      
      // Usamos un bucle for para robar las cartas necesarias
      for (let i = 0; i < cardsNeeded; i++) {
        console.log(`[BOARD] Robando carta ${i+1} de ${cardsNeeded}`);
        drawCard();
      }
      
      console.log('[BOARD] Relleno automático completado');
    }
  }, [hand.length, isInitialDraw, drawCard]); // Dependemos de la longitud de la mano
  
  // Efecto para robar cartas después de finalizar un turno
  useEffect(() => {
    if (shouldDrawAfterTurn) {
      console.log('[BOARD] Rellenando mano después de finalizar turno');
      
      // Calculamos cuántas cartas necesitamos
      const cardsNeeded = Math.max(0, 3 - hand.length);
      console.log(`[BOARD] Cartas necesarias después de turno: ${cardsNeeded}`);
      
      // Usamos un bucle for para robar las cartas necesarias
      for (let i = 0; i < cardsNeeded; i++) {
        console.log(`[BOARD] Robando carta post-turno ${i+1} de ${cardsNeeded}`);
        drawCard();
      }
      
      // Reseteamos el flag
      setShouldDrawAfterTurn(false);
      console.log('[BOARD] Relleno post-turno completado');
    }
  }, [shouldDrawAfterTurn, hand.length, drawCard]);
  
  // Función para manejar el inicio del arrastre de una carta
  const handleDragStart = (cardId: string) => {
    console.log(`[BOARD] Comenzando a arrastrar carta: ${cardId}`);
    setDraggingCard(cardId);
    // Al arrastrar, deseleccionamos cualquier carta seleccionada
    setSelectedCard(null);
  };
  
  // Función para manejar el fin del arrastre de una carta
  const handleDragEnd = (cardId: string, info: any) => {
    console.log(`[BOARD] Fin de arrastre de carta: ${cardId}`);
    setDraggingCard(null);
    
    // Obtenemos las coordenadas del punto final del arrastre
    const endPoint = { x: info.point.x, y: info.point.y };
    
    // Comprobamos si la carta ha sido soltada en alguna zona de destino
    let cardPlayed = false;
    
    // Verificamos la zona de Story Points
    if (storyPointsZoneRef.current) {
      const rect = storyPointsZoneRef.current.getBoundingClientRect();
      if (endPoint.x >= rect.left && endPoint.x <= rect.right &&
          endPoint.y >= rect.top && endPoint.y <= rect.bottom) {
        // La carta se ha soltado en la zona de Story Points
        if (cardsPlayedThisTurn < maxCardsPerTurn) {
          console.log(`[BOARD] Carta soltada en zona de Story Points: ${cardId}`);
          
          // Buscamos la carta en la mano
          const cardToPlay = hand.find(card => card.id === cardId);
          if (cardToPlay) {
            // Jugamos la carta
            playCard(cardId);
            
            // Calculamos la puntuación actual
            const score = calculateScore();
            console.log(`[BOARD] Carta jugada. Nueva puntuación: ${score}`);
            
            // Mostramos el resultado
            setPlayResult({ card: cardToPlay, score });
            
            cardPlayed = true;
          }
        } else {
          console.log(`[BOARD] No se puede jugar más cartas este turno (${cardsPlayedThisTurn}/${maxCardsPerTurn})`);
        }
      }
    }
    
    // Verificamos la zona de Backlog
    if (!cardPlayed && backlogZoneRef.current) {
      const rect = backlogZoneRef.current.getBoundingClientRect();
      if (endPoint.x >= rect.left && endPoint.x <= rect.right &&
          endPoint.y >= rect.top && endPoint.y <= rect.bottom) {
        // La carta se ha soltado en la zona de Backlog
        if (cardsDiscardedThisTurn < maxDiscardsPerTurn) {
          console.log(`[BOARD] Carta soltada en zona de Backlog: ${cardId}`);
          
          // Descartamos la carta
          discardCard(cardId);
          console.log(`[BOARD] Carta descartada.`);
          
          // Limpiamos cualquier resultado anterior
          setPlayResult(null);
        } else {
          console.log(`[BOARD] No se puede descartar más cartas este turno (${cardsDiscardedThisTurn}/${maxDiscardsPerTurn})`);
        }
      }
    }
  };
  
  // Manejador para seleccionar una carta (mantener para compatibilidad)
  const handleSelectCard = (card: CardType) => {
    console.log(`[BOARD] Carta seleccionada: ${card.id} - ${card.name}`);
    
    // Si la carta ya está seleccionada, la deseleccionamos
    if (selectedCard === card.id) {
      setSelectedCard(null);
      return;
    }
    
    // Si no, la seleccionamos
    setSelectedCard(card.id);
    setPlayResult(null); // Limpiamos el resultado anterior
  };
  
  // Manejador para jugar la carta seleccionada (mantener para compatibilidad)
  const handlePlayCard = () => {
    if (!selectedCard) return;
    
    console.log(`[BOARD] Intentando jugar carta: ${selectedCard}`);
    
    // Solo permitimos jugar si no hemos alcanzado el límite
    if (cardsPlayedThisTurn >= maxCardsPerTurn) {
      console.log(`[BOARD] No se puede jugar más cartas este turno (${cardsPlayedThisTurn}/${maxCardsPerTurn})`);
      return;
    }
    
    // Buscamos la carta seleccionada en la mano
    const cardToPlay = hand.find(card => card.id === selectedCard);
    if (!cardToPlay) {
      console.log(`[BOARD] Error: Carta no encontrada en la mano`);
      return;
    }
    
    // Jugamos la carta (pasamos el ID)
    playCard(selectedCard);
    
    // Calculamos la puntuación actual
    const score = calculateScore();
    console.log(`[BOARD] Carta jugada. Nueva puntuación: ${score}`);
    
    // Mostramos el resultado
    setPlayResult({ card: cardToPlay, score });
    
    // Limpiamos la selección
    setSelectedCard(null);
  };

  // Estado para mostrar resultados de jugar una carta
  const [playResult, setPlayResult] = useState<{card: CardType, score: number} | null>(null);
  
  // Función para mostrar el resultado de jugar una carta
  const showPlayResult = (card: CardType, score: number) => {
    setPlayResult({card, score});
    setTimeout(() => setPlayResult(null), 3000);
  };

  // Manejador para descartar la carta seleccionada (mantener para compatibilidad)
  const handleDiscardCard = () => {
    if (!selectedCard) return;
    
    console.log(`[BOARD] Intentando descartar carta: ${selectedCard}`);
    
    // Solo permitimos descartar si no hemos alcanzado el límite
    if (cardsDiscardedThisTurn >= maxDiscardsPerTurn) {
      console.log(`[BOARD] No se puede descartar más cartas este turno (${cardsDiscardedThisTurn}/${maxDiscardsPerTurn})`);
      return;
    }
    
    // Buscamos la carta seleccionada en la mano
    const cardToDiscard = hand.find(card => card.id === selectedCard);
    if (!cardToDiscard) {
      console.log(`[BOARD] Error: Carta no encontrada en la mano`);
      return;
    }
    
    // Descartamos la carta (pasamos el ID)
    discardCard(selectedCard);
    console.log(`[BOARD] Carta descartada.`);
    
    // Limpiamos la selección
    setSelectedCard(null);
    setPlayResult(null);
  };
  
  // Manejador para robar una carta manualmente
  const handleDrawCard = () => {
    if (hand.length >= 3) {
      console.log('[BOARD] No se pueden robar más cartas. Mano llena.');
      return;
    }
    
    console.log('[BOARD] Robando carta');
    drawCard();
  };
  
  // Manejador para terminar el turno
  const handleEndTurn = () => {
    console.log('[BOARD] Finalizando turno');
    setPlayResult(null);
    endTurn();
    // Activamos el flag para robar cartas automáticamente después de terminar el turno
    setShouldDrawAfterTurn(true);
  };
  
  // Manejador para abrir la tienda
  const handleOpenShop = () => {
    console.log('[BOARD] Abriendo tienda');
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
      
      {/* Zonas de destino para arrastrar cartas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {dropZones.map(zone => (
          <motion.div
            key={zone.id}
            ref={zone.id === 'storyPoints' ? storyPointsZoneRef : backlogZoneRef}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed transition-colors
              ${zone.isEnabled 
                ? `${zone.color} border-white/30 hover:border-white/60` 
                : 'bg-gray-700 border-gray-600 opacity-60'}`}
            whileHover={zone.isEnabled ? { scale: 1.02 } : {}}
            animate={{
              boxShadow: draggingCard 
                ? (zone.isEnabled ? '0 0 15px rgba(255,255,255,0.3)' : 'none') 
                : 'none'
            }}
          >
            <div className="text-lg font-semibold text-white">{zone.title}</div>
            <div className="text-xs text-gray-300 text-center">{zone.description}</div>
            {!zone.isEnabled && (
              <div className="text-xs text-gray-400 mt-1">
                (Límite alcanzado: {zone.id === 'storyPoints' 
                  ? `${cardsPlayedThisTurn}/${maxCardsPerTurn}` 
                  : `${cardsDiscardedThisTurn}/${maxDiscardsPerTurn}`})
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Área para mostrar el resultado de jugar una carta */}
      <div className="min-h-[150px] flex items-center justify-center bg-gray-800/50 rounded-lg p-4 mb-6">
        <AnimatePresence mode="wait">
          {selectedCard ? (
            <motion.div 
              key="selected"
              className="flex flex-row items-center justify-center w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Nueva ubicación de las acciones disponibles - a la izquierda */}
              <div className="flex flex-col space-y-3 w-1/2 pr-4">
                <h3 className="text-lg font-semibold text-white mb-1">Acciones disponibles:</h3>
                <button
                  onClick={handlePlayCard}
                  disabled={!canPlayMoreCards}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors w-full text-left
                    ${canPlayMoreCards 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                >
                  Asignar Story Points {!canPlayMoreCards && '(Límite alcanzado)'}
                </button>
                
                <button
                  onClick={handleDiscardCard}
                  disabled={!canDiscardMoreCards}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors w-full text-left
                    ${canDiscardMoreCards 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                >
                  Mover a Backlog {!canDiscardMoreCards && '(Límite alcanzado)'}
                </button>
              </div>
              
              {/* Carta seleccionada - a la derecha */}
              <div className="flex flex-col items-center w-1/2">
                <div className="text-lg font-bold text-white mb-2">Carta seleccionada</div>
                {hand.map(card => card.id === selectedCard ? (
                  <Card key={card.id} card={card} disabled />
                ) : null)}
              </div>
            </motion.div>
          ) : 
          playResult ? (
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
              <p>Arrastra las cartas hacia las zonas de destino o selecciona una carta para más opciones.</p>
              {hand.length === 0 && (
                <p className="mt-2">No tienes cartas en tu mano.</p>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mano del jugador */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Tu Mano</h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4 min-h-[280px]">
            <AnimatePresence>
              {hand.map(card => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.5}
                  onDragStart={() => handleDragStart(card.id)}
                  onDragEnd={(e, info) => handleDragEnd(card.id, info)}
                  whileDrag={{ scale: 1.05, zIndex: 10 }}
                  whileHover={{ y: -10 }}
                >
                  <Card 
                    card={card} 
                    onClick={handleSelectCard}
                    isSelected={selectedCard === card.id}
                    isDragging={draggingCard === card.id}
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
        
        {onRestartGame && (
          <button
            onClick={onRestartGame}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Volver al Menú
          </button>
        )}
      </div>
    </div>
  );
};

export default Board; 