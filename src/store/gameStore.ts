import { create } from 'zustand';
import { GameState, GameActions, Card, Joker } from '@/types';
import { getInitialDeck } from '@/data/cards';
import { getShopJokers } from '@/data/jokers';
import { getInitialBenchmark, getNextBenchmark } from '@/data/benchmarks';
import { v4 as uuidv4 } from 'uuid';

// Define el estado inicial del juego
const initialState: GameState = {
  // Recursos
  chips: 0,
  multiplier: 1,
  score: 0,
  marketShare: 0,
  money: 100,
  
  // Cartas y jokers
  hand: [],
  deck: getInitialDeck(),
  discardPile: [],
  activeJokers: [],
  
  // Limitaciones de acciones por turno
  maxCardsPerTurn: 5,
  cardsPlayedThisTurn: 0,
  maxDiscardsPerTurn: 2,
  cardsDiscardedThisTurn: 0,
  
  // Estado del juego
  currentBenchmark: getInitialBenchmark(),
  benchmarks: [],
  round: 1,
  shopOpen: false,
  gameOver: false,
  canVisitShop: false,
};

// Store global del juego con Zustand
export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,
  
  // Acciones para cartas
  drawCard: () => {
    const { deck, hand, discardPile } = get();
    
    // Si no hay cartas en el mazo, barajamos el descarte
    if (deck.length === 0) {
      if (discardPile.length === 0) {
        console.log(`[LOG] No hay cartas disponibles para robar`);
        return;
      }
      
      // Barajar el descarte y convertirlo en el nuevo mazo
      const shuffledDeck = [...discardPile].sort(() => Math.random() - 0.5);
      console.log(`[LOG] Se barajó el descarte (${shuffledDeck.length} cartas) para formar un nuevo mazo`);
      
      set({
        deck: shuffledDeck,
        discardPile: []
      });
      
      // Intentamos robar de nuevo (ahora con el mazo relleno)
      setTimeout(() => get().drawCard(), 100);
      return;
    }
    
    // Limitamos a 3 cartas iniciales
    if (hand.length >= 3) {
      console.log(`[LOG] Ya tienes el máximo de 3 cartas en mano`);
      return;
    }
    
    // Tomamos la primera carta del mazo y la añadimos a la mano
    const [cardToDraw, ...restDeck] = deck;
    
    set({
      deck: restDeck,
      hand: [...hand, cardToDraw],
    });
    
    console.log(`[LOG] Carta robada: ${cardToDraw.name}`);
  },
  
  playCard: (cardId: string) => {
    const { hand, chips, multiplier, cardsPlayedThisTurn, maxCardsPerTurn } = get();
    
    // Buscamos la carta en la mano
    const cardToPlay = hand.find(card => card.id === cardId);
    if (!cardToPlay) return;
    
    // Verificamos si hay suficientes Story Points disponibles para esta carta
    const storyPointsCost = cardToPlay.storyPointsCost || 1; // Por defecto, 1 Story Point si no está definido
    
    if (cardsPlayedThisTurn + storyPointsCost > maxCardsPerTurn) {
      console.log(`[LOG] No hay suficientes Story Points disponibles. Necesitas ${storyPointsCost}, quedan ${maxCardsPerTurn - cardsPlayedThisTurn}`);
      return;
    }
    
    // Calculamos nuevos chips y multiplicador
    const newChips = chips + cardToPlay.baseChips;
    const newMultiplier = multiplier + (cardToPlay.baseMultiplier - 1);
    
    // Actualizamos el estado
    set({
      hand: hand.filter(card => card.id !== cardId),
      discardPile: [...get().discardPile, cardToPlay],
      chips: newChips,
      multiplier: newMultiplier,
      cardsPlayedThisTurn: cardsPlayedThisTurn + storyPointsCost,
    });
    
    console.log(`[LOG] Carta jugada: ${cardToPlay.name} (Coste: ${storyPointsCost} Story Points)`);
    console.log(`[LOG] Nuevos valores - Chips: ${newChips}, Multiplicador: ${newMultiplier}`);
    console.log(`[LOG] Story Points usados este turno: ${cardsPlayedThisTurn + storyPointsCost}/${maxCardsPerTurn}`);
  },
  
  discardCard: (cardId: string) => {
    const { 
      hand, 
      discardPile, 
      cardsDiscardedThisTurn, 
      maxDiscardsPerTurn 
    } = get();
    
    // Check if we can discard another card this turn
    if (cardsDiscardedThisTurn >= maxDiscardsPerTurn) {
      console.log(`[LOG] Cannot discard more cards this turn`);
      return;
    }
    
    // Find the card in the hand
    const cardIndex = hand.findIndex(card => card.id === cardId);
    if (cardIndex === -1) {
      console.log(`[LOG] Card not found in hand: ${cardId}`);
      return;
    }
    
    // Remove card from hand and add to discard pile
    const newHand = [...hand];
    const [removedCard] = newHand.splice(cardIndex, 1);
    
    // Update the game state
    set({
      hand: newHand,
      discardPile: [...discardPile, removedCard],
      cardsDiscardedThisTurn: cardsDiscardedThisTurn + 1
    });
    
    console.log(`[LOG] Card discarded: ${removedCard.name}`);
    console.log(`[LOG] Cards discarded this turn: ${cardsDiscardedThisTurn + 1}/${maxDiscardsPerTurn}`);
  },
  
  // Acciones de jokers
  buyJoker: (jokerId: string) => {
    const { 
      round, 
      money, 
      activeJokers,
      chips,
      multiplier,
      maxCardsPerTurn,
      maxDiscardsPerTurn
    } = get();
    
    // Get available jokers from the shop
    const availableJokers = getShopJokers(round);
    
    // Find the joker to buy
    const jokerToBuy = availableJokers.find(joker => joker.id === jokerId);
    
    if (!jokerToBuy) {
      console.log(`[LOG] Joker not found in shop: ${jokerId}`);
      return;
    }
    
    // Check if we have enough money
    if (money < jokerToBuy.cost) {
      console.log(`[LOG] Not enough money to buy joker. Have: ${money}, Need: ${jokerToBuy.cost}`);
      return;
    }
    
    // Variables to track special effects
    let newMaxCards = maxCardsPerTurn;
    let newMaxDiscards = maxDiscardsPerTurn;
    
    // Apply special effects if any
    if (jokerToBuy.specialEffect) {
      // Add card slot if the joker has that effect
      if (jokerToBuy.specialEffect.includes('card_slot')) {
        newMaxCards += 1;
        console.log(`[LOG] Increased max cards per turn to ${newMaxCards}`);
      }
      
      // Add discard slot if the joker has that effect
      if (jokerToBuy.specialEffect.includes('discard_slot')) {
        newMaxDiscards += 1;
        console.log(`[LOG] Increased max discards per turn to ${newMaxDiscards}`);
      }
    }
    
    // Add joker to active jokers, decrease money, apply bonuses
    set({
      activeJokers: [...activeJokers, jokerToBuy],
      money: money - jokerToBuy.cost,
      chips: chips + (jokerToBuy.chipBonus || 0),
      multiplier: multiplier + (jokerToBuy.multiplierBonus || 0),
      maxCardsPerTurn: newMaxCards,
      maxDiscardsPerTurn: newMaxDiscards
    });
    
    console.log(`[LOG] Joker purchased: ${jokerToBuy.name} for ${jokerToBuy.cost} coins`);
    console.log(`[LOG] Money after purchase: ${money - jokerToBuy.cost}`);
    console.log(`[LOG] Active jokers: ${activeJokers.length + 1}`);
  },
  
  // Calculate current score
  calculateScore: () => {
    const { chips, multiplier } = get();
    const score = chips * multiplier;
    set({ score });
    console.log(`[LOG] Score calculated: ${score} (${chips} × ${multiplier})`);
    return score;
  },
  
  // End the current turn and prepare the next one
  endTurn: () => {
    const { 
      round, 
      chips, 
      multiplier, 
      marketShare,
      money,
      currentBenchmark,
      activeJokers
    } = get();
    
    // Calculate current score
    const score = get().calculateScore();
    
    // Check if we've beaten the benchmark
    const benchmarkBeaten = score >= currentBenchmark.targetScore;
    
    // Determine if we can visit the shop this turn
    const canVisitShop = benchmarkBeaten;
    
    // Calculate benchmark percentage
    const benchmarkPercentage = benchmarkBeaten ? 1 : score / currentBenchmark.targetScore;
    
    // Calculate market share change
    let marketShareChange = 0;
    let newMarketShare = marketShare;
    
    if (benchmarkBeaten) {
      // Increase market share if benchmark is beaten
      marketShareChange = 5; // 5% increase when beating benchmark
      newMarketShare = marketShare + marketShareChange;
      console.log(`[LOG] Market share increased by ${marketShareChange.toFixed(2)}% to ${newMarketShare.toFixed(2)}%`);
    } else {
      // Decrease market share if benchmark is not beaten
      // The lower the benchmark percentage, the higher the decrease
      marketShareChange = -Math.round((1 - benchmarkPercentage) * 3); // Max 3% decrease
      newMarketShare = Math.max(0, marketShare + marketShareChange); // Ensure market share doesn't go below 0
      console.log(`[LOG] Market share decreased by ${Math.abs(marketShareChange).toFixed(2)}% to ${newMarketShare.toFixed(2)}%`);
    }
    
    // Calculate new money based on market share change (only positive change gives money)
    const moneyEarned = marketShareChange > 0 ? Math.floor(marketShareChange * 2) : 0;
    const newMoney = money + moneyEarned + (benchmarkBeaten ? currentBenchmark.marketShareReward : 0);
    
    if (marketShareChange > 0) {
      console.log(`[LOG] Earned ${moneyEarned} coins from market share increase`);
    }
    
    if (benchmarkBeaten) {
      console.log(`[LOG] Benchmark beaten! Earned ${currentBenchmark.marketShareReward} bonus coins`);
    } else {
      console.log(`[LOG] Benchmark progress: ${(benchmarkPercentage * 100).toFixed(2)}%`);
      console.log(`[LOG] Market share decreased due to not meeting the benchmark`);
    }
    
    // Determine next benchmark
    const nextBenchmark = benchmarkBeaten ? {
      id: uuidv4(),
      name: `Series ${String.fromCharCode(65 + Math.min(round / 3, 25))}`, // A, B, C, etc.
      targetScore: Math.floor(currentBenchmark.targetScore * 1.5),
      marketShareReward: Math.floor(currentBenchmark.marketShareReward * 1.5),
      completed: false
    } : currentBenchmark;
    
    // Check if game is over (90% market share or more)
    const gameOver = newMarketShare >= 90;
    
    if (gameOver) {
      console.log(`[LOG] Game over! Final market share: ${newMarketShare.toFixed(2)}%`);
    }
    
    // Calculate joker bonuses
    let totalChipBonus = 0;
    let totalMultiplierBonus = 0;
    let cardBonus = 0;
    let discardBonus = 0;
    
    // Sumamos los bonificadores de todos los jokers
    activeJokers.forEach(joker => {
      totalChipBonus += joker.chipBonus || 0;
      totalMultiplierBonus += joker.multiplierBonus || 0;
      
      // Aplicar bonos a maxCardsPerTurn y maxDiscardsPerTurn si existen
      if (joker.specialEffect) {
        if (joker.specialEffect.includes('card_slot')) {
          cardBonus += 1;
        }
        if (joker.specialEffect.includes('discard_slot')) {
          discardBonus += 1;
        }
      }
    });
    
    console.log(`[LOG] Joker bonuses - Chips: ${totalChipBonus}, Mult: ${totalMultiplierBonus}, Card slots: ${cardBonus}, Discard slots: ${discardBonus}`);
    
    // Preparamos el siguiente turno
    set({
      // Reiniciamos chips y multiplicador base, preservando bonificaciones de jokers
      chips: totalChipBonus,
      multiplier: 1 + totalMultiplierBonus,
      
      // Actualizamos benchmark y cuota de mercado
      currentBenchmark: nextBenchmark,
      marketShare: newMarketShare,
      money: newMoney,
      
      // Incrementamos la ronda
      round: round + 1,
      
      // Reiniciamos contadores de acciones por turno
      cardsPlayedThisTurn: 0,
      cardsDiscardedThisTurn: 0,
      
      // Actualizamos límites de acciones basados en jokers
      maxCardsPerTurn: 5 + cardBonus,
      maxDiscardsPerTurn: 2 + discardBonus,
      
      // Movemos cartas de la mano al descarte
      discardPile: [...get().discardPile, ...get().hand],
      hand: [],
      
      // Si el mazo tiene menos de 3 cartas, añadimos cartas nuevas
      deck: get().deck.length < 3 ? [...get().deck, ...getInitialDeck()] : get().deck,
      
      // Actualizamos el estado del juego
      gameOver,
      canVisitShop,
      
      // IMPORTANTE: Mantenemos los activeJokers como están
      // activeJokers se mantiene igual
    });
    
    // Si superamos el benchmark y podemos visitar la tienda, abrimos la tienda
    if (canVisitShop) {
      setTimeout(() => {
        get().openShop();
      }, 500);
    }
    
    console.log(`[LOG] End of turn. New round: ${round + 1}`);
    console.log(`[LOG] Active jokers after end of turn: ${get().activeJokers.length}`);
  },
  
  // Acciones de tienda
  openShop: () => {
    // Solo permitimos abrir la tienda si canVisitShop es true
    if (!get().canVisitShop && !get().gameOver) {
      console.log(`[LOG] Shop not available yet. Complete the current benchmark first.`);
      return;
    }
    
    set({ shopOpen: true });
    console.log(`[LOG] Shop opened`);
  },
  
  closeShop: () => {
    set({ 
      shopOpen: false,
      canVisitShop: false // Reseteamos la bandera al cerrar la tienda
    });
    console.log(`[LOG] Shop closed`);
  },
  
  // Función para reiniciar el juego
  resetGame: () => {
    console.log(`[LOG] Restarting the game...`);
    set({ ...initialState });
  },
  
  // Función para cambiar la dificultad (multiplica los objetivos de los benchmarks)
  setDifficulty: (multiplier: number) => {
    const { currentBenchmark } = get();
    
    // Ajustamos la dificultad actual
    const adjustedBenchmark = {
      ...currentBenchmark,
      targetScore: Math.round(currentBenchmark.targetScore * multiplier),
    };
    
    set({ currentBenchmark: adjustedBenchmark });
    console.log(`[LOG] Difficulty adjusted: ${multiplier}x`);
  },
})); 