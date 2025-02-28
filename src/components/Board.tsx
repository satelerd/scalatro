import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    setSelectedCard(null);
    document.body.classList.add('dragging-card');
  };
  
  // Función para manejar el fin del arrastre de una carta
  const handleDragEnd = (cardId: string, info: any) => {
    console.log(`[BOARD] Fin de arrastre de carta: ${cardId}`);
    document.body.classList.remove('dragging-card');
    
    // Obtenemos las coordenadas del punto final del arrastre
    const endPoint = { x: info.point.x, y: info.point.y };
    
    // Comprobamos si la carta ha sido soltada en alguna zona de destino
    let cardPlayed = false;
    
    // Verificamos la zona de Story Points con un margen de tolerancia
    if (storyPointsZoneRef.current) {
      const rect = storyPointsZoneRef.current.getBoundingClientRect();
      const margin = 20; // Aumentamos el margen de tolerancia
      if (endPoint.x >= rect.left - margin && endPoint.x <= rect.right + margin &&
          endPoint.y >= rect.top - margin && endPoint.y <= rect.bottom + margin) {
        // La carta se ha soltado en la zona de Story Points
        if (cardsPlayedThisTurn < maxCardsPerTurn) {
          console.log(`[BOARD] Carta soltada en zona de Story Points: ${cardId}`);
          
          // Jugamos la carta
          playCard(cardId);
          
          // Calculamos la puntuación actual
          const score = calculateScore();
          console.log(`[BOARD] Carta jugada. Nueva puntuación: ${score}`);
          
          // Mostramos el resultado
          const cardToPlay = hand.find(card => card.id === cardId);
          if (cardToPlay) {
            setPlayResult({ card: cardToPlay, score });
          }
          
          cardPlayed = true;
        } else {
          console.log(`[BOARD] No se puede jugar más cartas este turno (${cardsPlayedThisTurn}/${maxCardsPerTurn})`);
        }
      }
    }
    
    // Verificamos la zona de Backlog con un margen de tolerancia
    if (!cardPlayed && backlogZoneRef.current) {
      const rect = backlogZoneRef.current.getBoundingClientRect();
      const margin = 20; // Aumentamos el margen de tolerancia
      if (endPoint.x >= rect.left - margin && endPoint.x <= rect.right + margin &&
          endPoint.y >= rect.top - margin && endPoint.y <= rect.bottom + margin) {
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
    
    // Al final, limpiamos el estado de arrastre
    setDraggingCard(null);
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
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg overflow-hidden relative">
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
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-0">
        {dropZones.map(zone => {
          // Determinar el color de la zona basado en su estado
          let zoneColor = 'bg-gray-700'; // Color por defecto (deshabilitado)
          
          if (zone.isEnabled) {
            if (draggingCard) {
              // Si hay una carta en arrastre y la zona está habilitada, usar color brillante
              zoneColor = zone.color; // Color brillante original
            } else {
              // Si no hay arrastre, usar color apagado
              zoneColor = zone.color.replace('bg-', 'bg-') + '/40'; // Versión más apagada
            }
          }
          
          return (
            <motion.div
              key={zone.id}
              ref={zone.id === 'storyPoints' ? storyPointsZoneRef : backlogZoneRef}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed transition-all
                ${zoneColor} ${!zone.isEnabled ? 'opacity-60' : ''} border-white/20`}
              whileHover={zone.isEnabled ? { scale: 1.02 } : {}}
              animate={{
                boxShadow: draggingCard && zone.isEnabled
                  ? '0 0 15px rgba(255,255,255,0.2)'
                  : 'none',
                scale: draggingCard && zone.isEnabled ? 1.02 : 1
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
          );
        })}
      </div>
      
      {/* Mano del jugador */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-white mb-6">Tu Mano</h3>
        <div className="overflow-x-auto">
          <div className="flex justify-center space-x-6 p-10 min-h-[300px] relative">
            <AnimatePresence>
              {hand.map(card => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  drag={true}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.9}
                  dragMomentum={false}
                  onDragStart={() => handleDragStart(card.id)}
                  onDragEnd={(e, info) => handleDragEnd(card.id, info)}
                  whileDrag={{ 
                    scale: 1.05, 
                    zIndex: 999999
                  }}
                  whileHover={{ y: -10 }}
                  className="card-container"
                  style={{ 
                    zIndex: draggingCard === card.id ? 999999 : 1,
                  }}
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
      <div className="flex flex-wrap gap-5 justify-center mt-8 pb-2">
        <button
          onClick={handleDrawCard}
          disabled={!canDrawCard}
          className={`px-5 py-3 rounded-lg font-semibold transition-all
            ${canDrawCard 
              ? 'bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white' 
              : 'bg-gradient-to-br from-gray-600 to-gray-800 text-gray-300 cursor-not-allowed opacity-70'}`}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Robar Carta
          </span>
        </button>
        
        <button
          onClick={handleEndTurn}
          className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-5 py-3 rounded-lg font-semibold transition-all"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Finalizar Sprint
          </span>
        </button>
        
        <button
          onClick={handleOpenShop}
          disabled={!canVisitShop}
          className={`relative px-5 py-3 rounded-lg font-semibold transition-all
            ${canVisitShop 
              ? 'bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white' 
              : 'bg-gradient-to-br from-gray-600 to-gray-800 text-gray-300 cursor-not-allowed opacity-70'}`}
        >
          {canVisitShop && (
            <motion.span 
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              !
            </motion.span>
          )}
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Contratar {canVisitShop ? '(¡Disponible!)' : '(Completa benchmark)'}
          </span>
        </button>
        
        {onRestartGame && (
          <button
            onClick={onRestartGame}
            className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white px-5 py-3 rounded-lg font-semibold transition-all"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al Menú
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Board; 