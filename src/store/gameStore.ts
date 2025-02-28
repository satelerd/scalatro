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
  
  // Estado del juego
  currentBenchmark: getInitialBenchmark(),
  benchmarks: [],
  round: 1,
  shopOpen: false,
  gameOver: false,
};

// Store global del juego con Zustand
export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,
  
  // Acciones para cartas
  drawCard: () => {
    const { deck, hand } = get();
    
    // Si no hay cartas en el mazo, no hacemos nada
    if (deck.length === 0) return;
    
    // Tomamos la primera carta del mazo y la añadimos a la mano
    const [cardToDraw, ...restDeck] = deck;
    
    set({
      deck: restDeck,
      hand: [...hand, cardToDraw],
    });
    
    console.log(`[LOG] Carta robada: ${cardToDraw.name}`);
  },
  
  playCard: (cardId: string) => {
    const { hand, chips, multiplier } = get();
    
    // Buscamos la carta en la mano
    const cardToPlay = hand.find(card => card.id === cardId);
    if (!cardToPlay) return;
    
    // Calculamos nuevos chips y multiplicador
    const newChips = chips + cardToPlay.baseChips;
    const newMultiplier = multiplier + (cardToPlay.baseMultiplier - 1);
    
    // Actualizamos el estado
    set({
      hand: hand.filter(card => card.id !== cardId),
      discardPile: [...get().discardPile, cardToPlay],
      chips: newChips,
      multiplier: newMultiplier,
    });
    
    console.log(`[LOG] Carta jugada: ${cardToPlay.name}`);
    console.log(`[LOG] Nuevos valores - Chips: ${newChips}, Multiplicador: ${newMultiplier}`);
  },
  
  discardCard: (cardId: string) => {
    const { hand } = get();
    
    // Buscamos la carta en la mano
    const cardToDiscard = hand.find(card => card.id === cardId);
    if (!cardToDiscard) return;
    
    // Actualizamos el estado
    set({
      hand: hand.filter(card => card.id !== cardId),
      discardPile: [...get().discardPile, cardToDiscard],
    });
    
    console.log(`[LOG] Carta descartada: ${cardToDiscard.name}`);
  },
  
  // Acciones de jokers
  buyJoker: (jokerId: string) => {
    const { activeJokers, money } = get();
    
    // Obtenemos los jokers disponibles en la tienda actual
    const shopJokers = getShopJokers(get().round);
    const jokerToBuy = shopJokers.find(joker => joker.id === jokerId);
    
    if (!jokerToBuy) return;
    
    // Verificamos si tenemos suficiente dinero
    if (money < jokerToBuy.cost) {
      console.log(`[LOG] No hay suficiente dinero para comprar ${jokerToBuy.name}`);
      return;
    }
    
    // Aplicamos el efecto del joker (bonus de chips y multiplicador)
    const newChips = get().chips + jokerToBuy.chipBonus;
    const newMultiplier = get().multiplier + jokerToBuy.multiplierBonus - 1;
    
    // Actualizamos el estado
    set({
      activeJokers: [...activeJokers, jokerToBuy],
      money: money - jokerToBuy.cost,
      chips: newChips,
      multiplier: newMultiplier,
    });
    
    console.log(`[LOG] Joker comprado: ${jokerToBuy.name}`);
    console.log(`[LOG] Nuevos valores - Chips: ${newChips}, Multiplicador: ${newMultiplier}, Dinero: ${money - jokerToBuy.cost}`);
  },
  
  // Acciones de turno
  calculateScore: () => {
    const { chips, multiplier } = get();
    const score = Math.floor(chips * multiplier);
    
    set({ score });
    
    console.log(`[LOG] Puntuación calculada: ${score} (${chips} chips × ${multiplier} multiplicador)`);
    return score;
  },
  
  endTurn: () => {
    const { score, currentBenchmark, marketShare, round } = get();
    
    // Calculamos la puntuación final
    const finalScore = get().calculateScore();
    
    // Comprobamos si pasamos el benchmark actual
    let newMarketShare = marketShare;
    let nextBenchmark = currentBenchmark;
    let newMoney = get().money;
    let gameOver = false;
    
    if (finalScore >= currentBenchmark.targetScore) {
      // Superamos el benchmark
      console.log(`[LOG] ¡Benchmark superado! ${currentBenchmark.name}`);
      
      // Actualizamos la cuota de mercado
      newMarketShare += currentBenchmark.marketShareReward;
      
      // Añadimos dinero como recompensa
      newMoney += 50 * round;
      
      // Obtenemos el siguiente benchmark
      const next = getNextBenchmark(currentBenchmark.id);
      if (next) {
        nextBenchmark = next;
      } else {
        // Si no hay más benchmarks, has ganado el juego
        console.log(`[LOG] ¡Has superado todos los benchmarks! Eres el líder del mercado.`);
        gameOver = true;
      }
    } else {
      // No superamos el benchmark
      console.log(`[LOG] Benchmark fallido. Puntuación: ${finalScore}, Objetivo: ${currentBenchmark.targetScore}`);
      
      // Perdemos cuota de mercado
      newMarketShare = Math.max(0, newMarketShare - 2);
      
      // Si la cuota de mercado llega a 0, game over
      if (newMarketShare <= 0) {
        console.log(`[LOG] ¡Has perdido toda tu cuota de mercado! Fin del juego.`);
        gameOver = true;
      }
    }
    
    // Preparamos el siguiente turno
    set({
      // Reiniciamos chips y multiplicador
      chips: 0,
      multiplier: 1,
      
      // Actualizamos benchmark y cuota de mercado
      currentBenchmark: nextBenchmark,
      marketShare: newMarketShare,
      money: newMoney,
      
      // Incrementamos la ronda
      round: round + 1,
      
      // Movemos cartas de la mano al descarte
      discardPile: [...get().discardPile, ...get().hand],
      hand: [],
      
      // Robamos nuevas cartas para el siguiente turno
      deck: getInitialDeck(),
      
      // Actualizamos el estado del juego
      gameOver,
    });
    
    console.log(`[LOG] Fin del turno. Nueva ronda: ${round + 1}`);
  },
  
  // Acciones de tienda
  openShop: () => {
    set({ shopOpen: true });
    console.log(`[LOG] Tienda abierta`);
  },
  
  closeShop: () => {
    set({ shopOpen: false });
    console.log(`[LOG] Tienda cerrada`);
  },
})); 