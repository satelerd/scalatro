import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Card from '@/components/Card';
import { Card as CardType } from '@/types';
import { createPortal } from 'react-dom';

// Define drop zones
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
  
  // State for the card being dragged
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  // Cursor position for the portal
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // State to control if mouse button is pressed
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // References to drop zones
  const storyPointsZoneRef = useRef<HTMLDivElement>(null);
  const backlogZoneRef = useRef<HTMLDivElement>(null);
  
  // Reference to the main container for measurements
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Define drop zones
  const dropZones: DropZone[] = [
    {
      id: 'storyPoints',
      title: 'Sprint',
      description: 'Drag here to assign to Sprint',
      action: playCard,
      color: 'bg-blue-600',
      position: 'left',
      isEnabled: cardsPlayedThisTurn < maxCardsPerTurn
    },
    {
      id: 'backlog',
      title: 'Backlog',
      description: 'Drag here to move to Backlog',
      action: discardCard,
      color: 'bg-red-600',
      position: 'right',
      isEnabled: cardsDiscardedThisTurn < maxDiscardsPerTurn
    }
  ];
  
  console.log('[BOARD] Initial board state');
  console.log('[BOARD] Current hand:', hand);
  console.log('[BOARD] isInitialDraw:', isInitialDraw);
  
  // Effect to draw cards automatically only on first load
  useEffect(() => {
    if (isInitialDraw) {
      console.log('[BOARD] Performing initial hand fill');
      
      // Calculate how many cards we need
      const cardsNeeded = Math.max(0, 3 - hand.length);
      console.log(`[BOARD] Cards needed to fill hand: ${cardsNeeded}`);
      
      // Use a for loop instead of while to avoid infinite loops
      for (let i = 0; i < cardsNeeded; i++) {
        console.log(`[BOARD] Drawing card ${i+1} of ${cardsNeeded}`);
        drawCard();
      }
      
      // Mark that we've completed the initial fill
      setIsInitialDraw(false);
      console.log('[BOARD] Initial hand fill completed');
    }
  }, [isInitialDraw, drawCard, hand.length]); // Add hand.length to dependencies
  
  // New effect to check and maintain 3 cards in hand after each action
  useEffect(() => {
    // If not initial load and we have less than 3 cards, draw automatically
    if (!isInitialDraw && hand.length < 3) {
      console.log('[BOARD] Automatically refilling hand after action');
      
      // Calculate how many cards we need
      const cardsNeeded = Math.max(0, 3 - hand.length);
      console.log(`[BOARD] Cards needed to fill hand: ${cardsNeeded}`);
      
      // Use a for loop to draw the necessary cards
      for (let i = 0; i < cardsNeeded; i++) {
        console.log(`[BOARD] Drawing card ${i+1} of ${cardsNeeded}`);
        drawCard();
      }
      
      console.log('[BOARD] Automatic refill completed');
    }
  }, [hand.length, isInitialDraw, drawCard]); // Depend on hand length
  
  // Effect to draw cards after ending a turn
  useEffect(() => {
    if (shouldDrawAfterTurn) {
      console.log('[BOARD] Refilling hand after turn end');
      
      // Calculate how many cards we need
      const cardsNeeded = Math.max(0, 3 - hand.length);
      console.log(`[BOARD] Cards needed after turn: ${cardsNeeded}`);
      
      // Use a for loop to draw the necessary cards
      for (let i = 0; i < cardsNeeded; i++) {
        console.log(`[BOARD] Drawing post-turn card ${i+1} of ${cardsNeeded}`);
        drawCard();
      }
      
      // Reset the flag
      setShouldDrawAfterTurn(false);
      console.log('[BOARD] Post-turn refill completed');
    }
  }, [shouldDrawAfterTurn, hand.length, drawCard]);
  
  // Function to handle the end of card dragging
  const handleDragEnd = useCallback((cardId: string, info: { point: { x: number; y: number } }) => {
    console.log(`[BOARD] End of card drag: ${cardId}`);
    document.body.classList.remove('dragging-card');
    
    // Remove the global overlay
    const overlay = document.getElementById('global-drag-overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }
    
    // Get the coordinates of the drag end point
    const endPoint = { x: info.point.x, y: info.point.y };
    
    // Check if the card has been dropped in any target zone
    let cardPlayed = false;
    
    // Check the Story Points zone with a tolerance margin
    if (storyPointsZoneRef.current) {
      const rect = storyPointsZoneRef.current.getBoundingClientRect();
      const margin = 30; // Increase tolerance margin even more
      if (endPoint.x >= rect.left - margin && endPoint.x <= rect.right + margin &&
          endPoint.y >= rect.top - margin && endPoint.y <= rect.bottom + margin) {
        // The card has been dropped in the Story Points zone
        if (cardsPlayedThisTurn < maxCardsPerTurn) {
          console.log(`[BOARD] Card dropped in Story Points zone: ${cardId}`);
          
          // Play the card
          playCard(cardId);
          
          // Calculate current score
          const score = calculateScore();
          console.log(`[BOARD] Card played. New score: ${score}`);
          
          // Show the result
          const cardToPlay = hand.find(card => card.id === cardId);
          if (cardToPlay) {
            console.log(`[BOARD] Card played: ${cardToPlay.name}, Score: ${score}`);
          }
          
          cardPlayed = true;
        } else {
          console.log(`[BOARD] Cannot play more cards this turn (${cardsPlayedThisTurn}/${maxCardsPerTurn})`);
        }
      }
    }
    
    // Check the Backlog zone with a tolerance margin
    if (!cardPlayed && backlogZoneRef.current) {
      const rect = backlogZoneRef.current.getBoundingClientRect();
      const margin = 30; // Increase tolerance margin even more
      if (endPoint.x >= rect.left - margin && endPoint.x <= rect.right + margin &&
          endPoint.y >= rect.top - margin && endPoint.y <= rect.bottom + margin) {
        // The card has been dropped in the Backlog zone
        if (cardsDiscardedThisTurn < maxDiscardsPerTurn) {
          console.log(`[BOARD] Card dropped in Backlog zone: ${cardId}`);
          
          // Discard the card
          discardCard(cardId);
          console.log(`[BOARD] Card discarded.`);
          
          // Clear any previous result
          console.log('[BOARD] Card discarded successfully');
        } else {
          console.log(`[BOARD] Cannot discard more cards this turn (${cardsDiscardedThisTurn}/${maxDiscardsPerTurn})`);
        }
      }
    }
    
    // Finally, clear the drag state
    setDraggingCard(null);
  }, [cardsPlayedThisTurn, maxCardsPerTurn, cardsDiscardedThisTurn, maxDiscardsPerTurn, playCard, calculateScore, hand, discardCard]);

  // Add global event handler to track cursor position
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (draggingCard && isMouseDown) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleMouseUp = () => {
      if (draggingCard) {
        // If we have a card being dragged and mouse button is released anywhere,
        // end the drag
        handleDragEnd(draggingCard, { point: cursorPosition });
      }
      setIsMouseDown(false);
    };

    // Register the event only when dragging
    if (draggingCard) {
      window.addEventListener('mousemove', updateCursorPosition);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingCard, isMouseDown, cursorPosition, handleDragEnd]);
  
  // Function to handle the start of card dragging
  const handleDragStart = (cardId: string, e: React.MouseEvent) => {
    console.log(`[BOARD] Starting to drag card: ${cardId}`);
    setDraggingCard(cardId);
    setSelectedCard(null);
    setIsMouseDown(true);
    document.body.classList.add('dragging-card');
    
    // Capture initial cursor position
    setCursorPosition({ x: e.clientX, y: e.clientY });
    
    // Create a global overlay
    const overlay = document.createElement('div');
    overlay.id = 'global-drag-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = '999999998';  // Just below the drag portal
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);
  };
  

  
  // Handler to select a card (keep for compatibility)
  const handleSelectCard = (card: CardType) => {
    console.log(`[BOARD] Card selected: ${card.id} - ${card.name}`);
    
    // If the card is already selected, deselect it
    if (selectedCard === card.id) {
      setSelectedCard(null);
      return;
    }
    
    // Otherwise, select it
    setSelectedCard(card.id);
    console.log('[BOARD] Previous result cleared'); // Clear previous result
  };
  
  // Determine if there are cards to draw
  const canDrawCard = hand.length < 3; // Maximum 3 cards in hand
  
  // Handler to manually draw a card
  const handleDrawCard = () => {
    if (hand.length >= 3) {
      console.log('[BOARD] Cannot draw more cards. Hand is full.');
      return;
    }
    
    console.log('[BOARD] Drawing card');
    drawCard();
  };
  
  // Handler to end the turn
  const handleEndTurn = () => {
    console.log('[BOARD] Ending turn');
    console.log('[BOARD] Previous result cleared');
    endTurn();
    // Activate the flag to automatically draw cards after ending the turn
    setShouldDrawAfterTurn(true);
  };
  
  // Handler to open the shop
  const handleOpenShop = () => {
    console.log('[BOARD] Opening shop');
    openShop();
  };
  
  // Get shop state
  const { canVisitShop } = useGameStore();
  
  // Render the card currently being dragged in the body
  const renderDraggingCardPortal = () => {
    if (!draggingCard || !isMouseDown) return null;
    
    const draggedCard = hand.find(card => card.id === draggingCard);
    if (!draggedCard || typeof document === 'undefined') return null;
    
    // Calculate the position to center the card on the cursor
    const cardStyle = {
      position: 'fixed' as const,
      left: `${cursorPosition.x}px`,
      top: `${cursorPosition.y}px`,
      transform: 'translate(-50%, -50%)',
      zIndex: 9999999,
      pointerEvents: 'none' as const,
    };
    
    return createPortal(
      <div style={cardStyle}>
        <Card 
          card={draggedCard} 
          isDragging={true}
        />
      </div>,
      document.body
    );
  };
  
  return (
    <div ref={boardRef} className="bg-gray-900 p-4 rounded-lg shadow-lg overflow-hidden relative">
      <h2 className="text-xl font-bold text-white mb-4">Development Board</h2>
      
      {/* Drop zones for dragging cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-0">
        {dropZones.map(zone => {
          // Determine zone color based on its state
          let zoneColor = 'bg-gray-700/70'; // Default color (disabled)
          
          if (zone.isEnabled) {
            // If the zone is enabled, use a very soft color by default
            if (zone.id === 'storyPoints') {
              zoneColor = draggingCard ? 'bg-blue-600/80' : 'bg-blue-600/30'; // Very soft blue for story points, more intense when dragging
            } else {
              zoneColor = draggingCard ? 'bg-red-600/80' : 'bg-red-600/30'; // Very soft red for backlog, more intense when dragging
            }
          }
          
          // Si estamos arrastrando una carta, podemos mostrar su costo
          let costMessage = '';
          if (draggingCard) {
            const card = hand.find(c => c.id === draggingCard);
            if (card && zone.id === 'storyPoints') {
              if (cardsPlayedThisTurn + card.storyPointsCost <= maxCardsPerTurn) {
                costMessage = `Cost: ${card.storyPointsCost} Sprint Points`;
              } else {
                costMessage = `Not enough Sprint Points! Need: ${card.storyPointsCost}, Have: ${maxCardsPerTurn - cardsPlayedThisTurn}`;
              }
            }
          }
          
          return (
            <motion.div
              key={zone.id}
              ref={zone.id === 'storyPoints' ? storyPointsZoneRef : backlogZoneRef}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed transition-all drop-zone
                ${zoneColor} ${!zone.isEnabled ? 'opacity-60' : ''} ${zone.isEnabled ? 'border-white/30' : 'border-white/10'}`}
              whileHover={zone.isEnabled ? { scale: 1.02 } : {}}
              animate={{
                boxShadow: draggingCard && zone.isEnabled
                  ? zone.id === 'storyPoints' 
                    ? '0 0 20px rgba(59, 130, 246, 0.2)' // Blue for story points
                    : '0 0 20px rgba(239, 68, 68, 0.2)' // Red for backlog
                  : 'none',
                scale: draggingCard && zone.isEnabled ? 1.02 : 1
              }}
            >
              {/* Icon for zone */}
              <div className="text-2xl mb-1">
                {zone.id === 'storyPoints' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )}
              </div>
              
              <div className="text-lg font-semibold text-white mb-1">
                {zone.id === 'storyPoints' ? `Sprint ${useGameStore.getState().round}` : zone.title}
              </div>
              <div className="text-xs text-gray-300 text-center">{zone.description}</div>
              
              {/* Information about card being dragged */}
              {draggingCard && costMessage && (
                <div className={`text-xs mt-2 px-2 py-1 rounded text-center 
                  ${cardsPlayedThisTurn + (hand.find(c => c.id === draggingCard)?.storyPointsCost || 0) <= maxCardsPerTurn 
                    ? 'bg-green-800/70 text-green-200' 
                    : 'bg-red-800/70 text-red-200'}`}>
                  {costMessage.replace('Story Points', 'SP')}
                </div>
              )}
              
              {!zone.isEnabled && (
                <div className="text-xs text-red-300 mt-1 bg-red-950/60 px-3 py-1 rounded-full">
                  {zone.id === 'storyPoints'
                    ? `Sprint capacity reached (${cardsPlayedThisTurn}/${maxCardsPerTurn} used)`
                    : `Backlog full (${cardsDiscardedThisTurn}/${maxDiscardsPerTurn} used)`}
                </div>
              )}
              
              {/* Show available points/slots when enabled */}
              {zone.isEnabled && !draggingCard && (
                <div className="text-xs text-gray-300 mt-2 bg-white/10 px-3 py-1 rounded-full">
                  {zone.id === 'storyPoints'
                    ? `${maxCardsPerTurn - cardsPlayedThisTurn} Sprint Points available`
                    : `${maxDiscardsPerTurn - cardsDiscardedThisTurn} Backlog slots available`}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Player's hand */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-white mb-6">Your Hand</h3>
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
                  onMouseDown={(e) => handleDragStart(card.id, e)}
                  whileHover={{ y: -10 }}
                  className="card-container"
                >
                  {/* Only show the original card if it's not being dragged */}
                  {draggingCard !== card.id && (
                    <Card 
                      card={card} 
                      onClick={handleSelectCard}
                      isSelected={selectedCard === card.id}
                    />
                  )}
                  {/* If it's being dragged, show a translucent placeholder */}
                  {draggingCard === card.id && (
                    <div className="w-52 h-[280px] rounded-xl border-2 border-dashed border-white/30 bg-white/5"></div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Player actions */}
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
            Draw Card
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
            End Sprint
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
            Hire {canVisitShop ? '(Available!)' : '(Complete benchmark)'}
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
              Back to Menu
            </span>
          </button>
        )}
      </div>
      
      {/* Portal for draggable cards - Now directly in the body and only if isMouseDown is true */}
      {renderDraggingCardPortal()}
    </div>
  );
};

export default Board;