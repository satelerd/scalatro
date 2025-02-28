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
  maxCardsPerTurn: 2,
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
    
    // Verificamos si ya jugamos el máximo de cartas por turno
    if (cardsPlayedThisTurn >= maxCardsPerTurn) {
      console.log(`[LOG] Ya has jugado el máximo de ${maxCardsPerTurn} cartas este turno`);
      return;
    }
    
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
      cardsPlayedThisTurn: cardsPlayedThisTurn + 1,
    });
    
    console.log(`[LOG] Carta jugada: ${cardToPlay.name}`);
    console.log(`[LOG] Nuevos valores - Chips: ${newChips}, Multiplicador: ${newMultiplier}`);
    console.log(`[LOG] Cartas jugadas este turno: ${cardsPlayedThisTurn + 1}/${maxCardsPerTurn}`);
  },
  
  discardCard: (cardId: string) => {
    const { hand, cardsDiscardedThisTurn, maxDiscardsPerTurn } = get();
    
    // Verificamos si ya descartamos el máximo de cartas por turno
    if (cardsDiscardedThisTurn >= maxDiscardsPerTurn) {
      console.log(`[LOG] Ya has descartado el máximo de ${maxDiscardsPerTurn} cartas este turno`);
      return;
    }
    
    // Buscamos la carta en la mano
    const cardToDiscard = hand.find(card => card.id === cardId);
    if (!cardToDiscard) return;
    
    // Actualizamos el estado
    set({
      hand: hand.filter(card => card.id !== cardId),
      discardPile: [...get().discardPile, cardToDiscard],
      cardsDiscardedThisTurn: cardsDiscardedThisTurn + 1,
    });
    
    console.log(`[LOG] Carta descartada: ${cardToDiscard.name}`);
    console.log(`[LOG] Cartas descartadas este turno: ${cardsDiscardedThisTurn + 1}/${maxDiscardsPerTurn}`);
  },
  
  // Acciones de jokers
  buyJoker: (jokerId: string) => {
    const { activeJokers, money } = get();
    
    // Obtenemos los jokers disponibles en la tienda actual
    const shopJokers = getShopJokers(get().round);
    const jokerToBuy = shopJokers.find(joker => joker.id === jokerId);
    
    if (!jokerToBuy) {
      console.log(`[LOG] El joker no se encontró en la tienda`);
      return;
    }
    
    // Verificamos si tenemos suficiente dinero
    if (money < jokerToBuy.cost) {
      console.log(`[LOG] No hay suficiente dinero para comprar ${jokerToBuy.name}`);
      return;
    }
    
    // Creamos una copia del joker con un ID único para evitar problemas de duplicados
    const purchasedJoker = {
      ...jokerToBuy,
      id: `${jokerId}-${uuidv4().substring(0, 8)}` // Asignamos un ID único
    };
    
    // Determinamos si este joker tiene efectos especiales (slots adicionales)
    // Esta es una lógica temporal basada en el nombre; idealmente vendría de datos estructurados
    let specialEffect = purchasedJoker.specialEffect || [];
    
    if (!specialEffect.length) {
      // Si no tiene efectos especiales, los inferimos del nombre
      if (jokerToBuy.name.toLowerCase().includes('developer') || 
          jokerToBuy.name.toLowerCase().includes('ingeniero') ||
          jokerToBuy.name.toLowerCase().includes('programador')) {
        specialEffect.push('card_slot');
      }
      
      if (jokerToBuy.name.toLowerCase().includes('scrum') || 
          jokerToBuy.name.toLowerCase().includes('agile') ||
          jokerToBuy.name.toLowerCase().includes('product')) {
        specialEffect.push('discard_slot');
      }
      
      purchasedJoker.specialEffect = specialEffect;
    }
    
    // Aplicar efectos inmediatos si hay slots adicionales
    let newMaxCardsPerTurn = get().maxCardsPerTurn;
    let newMaxDiscardsPerTurn = get().maxDiscardsPerTurn;
    
    if (specialEffect.includes('card_slot')) {
      newMaxCardsPerTurn += 1;
      console.log(`[LOG] Joker añade +1 slot para jugar cartas (total: ${newMaxCardsPerTurn})`);
    }
    
    if (specialEffect.includes('discard_slot')) {
      newMaxDiscardsPerTurn += 1;
      console.log(`[LOG] Joker añade +1 slot para descartar cartas (total: ${newMaxDiscardsPerTurn})`);
    }
    
    // Aplicamos el efecto del joker (bonus de chips y multiplicador)
    const newChips = get().chips + purchasedJoker.chipBonus;
    const newMultiplier = get().multiplier + purchasedJoker.multiplierBonus;
    
    console.log(`[LOG] Antes de comprar - Jokers activos: ${activeJokers.length}, Chips: ${get().chips}, Multiplicador: ${get().multiplier}`);
    console.log(`[LOG] Dinero antes de compra: $${money}, Costo del joker: $${purchasedJoker.cost}`);
    
    // Actualizamos el estado
    set({
      activeJokers: [...activeJokers, purchasedJoker],
      money: money - purchasedJoker.cost,
      chips: newChips,
      multiplier: newMultiplier,
      maxCardsPerTurn: newMaxCardsPerTurn,
      maxDiscardsPerTurn: newMaxDiscardsPerTurn
    });
    
    console.log(`[LOG] Joker comprado: ${purchasedJoker.name} por $${purchasedJoker.cost}`);
    console.log(`[LOG] Nuevos valores - Chips: ${newChips}, Multiplicador: ${newMultiplier}, Dinero: ${money - purchasedJoker.cost}`);
    console.log(`[LOG] Total de jokers activos: ${activeJokers.length + 1}`);
    
    // Verificamos que el joker se haya añadido correctamente y el dinero se haya descontado
    setTimeout(() => {
      const currentJokers = get().activeJokers;
      const currentMoney = get().money;
      console.log(`[LOG] Verificación - Jokers activos después de compra: ${currentJokers.length}`);
      console.log(`[LOG] Verificación - Dinero después de compra: $${currentMoney}`);
      currentJokers.forEach((j, index) => {
        console.log(`[LOG] Joker activo #${index+1}: ${j.name}, ID: ${j.id}`);
      });
    }, 100);
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
    const { score, currentBenchmark, marketShare, round, activeJokers } = get();
    
    // Calculamos la puntuación final
    const finalScore = get().calculateScore();
    
    // Comprobamos si pasamos el benchmark actual
    let newMarketShare = marketShare;
    let nextBenchmark = currentBenchmark;
    let newMoney = get().money;
    let gameOver = false;
    let canVisitShop = false;
    
    if (finalScore >= currentBenchmark.targetScore) {
      // Superamos el benchmark
      console.log(`[LOG] ¡Benchmark superado! ${currentBenchmark.name}`);
      
      // Actualizamos la cuota de mercado
      newMarketShare += currentBenchmark.marketShareReward;
      
      // Añadimos dinero como recompensa
      newMoney += 50 * round;
      
      // Permitimos visitar la tienda
      canVisitShop = true;
      
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
    
    // Calculamos las bonificaciones de los jokers activos
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
    
    console.log(`[LOG] Bonificaciones de jokers - Chips: ${totalChipBonus}, Mult: ${totalMultiplierBonus}, Card slots: ${cardBonus}, Discard slots: ${discardBonus}`);
    
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
      maxCardsPerTurn: 2 + cardBonus,
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
    
    console.log(`[LOG] Fin del turno. Nueva ronda: ${round + 1}`);
    console.log(`[LOG] Jokers activos después de fin de turno: ${get().activeJokers.length}`);
  },
  
  // Acciones de tienda
  openShop: () => {
    // Solo permitimos abrir la tienda si canVisitShop es true
    if (!get().canVisitShop && !get().gameOver) {
      console.log(`[LOG] Tienda no disponible aún. Completa el benchmark actual primero.`);
      return;
    }
    
    set({ shopOpen: true });
    console.log(`[LOG] Tienda abierta`);
  },
  
  closeShop: () => {
    set({ 
      shopOpen: false,
      canVisitShop: false // Reseteamos la bandera al cerrar la tienda
    });
    console.log(`[LOG] Tienda cerrada`);
  },
  
  // Función para reiniciar el juego
  resetGame: () => {
    console.log(`[LOG] Reiniciando el juego...`);
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
    console.log(`[LOG] Dificultad ajustada: ${multiplier}x`);
  },
})); 