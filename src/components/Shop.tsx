import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getShopJokers } from '@/data/jokers';
import Joker from '@/components/Joker';
import { Joker as JokerType } from '@/types';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
}

const Shop: React.FC<ShopProps> = ({ isOpen, onClose }) => {
  const { round, money, buyJoker, activeJokers } = useGameStore();
  const [shopJokers, setShopJokers] = useState<JokerType[]>([]);
  const [currentMoney, setCurrentMoney] = useState(money);
  
  // Efecto para actualizar el dinero cuando cambia en el store
  useEffect(() => {
    setCurrentMoney(money);
  }, [money]);
  
  // Efecto para cargar los jokers cuando se abre la tienda
  useEffect(() => {
    if (isOpen) {
      // Obtenemos los jokers disponibles según la ronda actual
      const jokers = getShopJokers(round);
      setShopJokers(jokers);
      setCurrentMoney(money); // Aseguramos que el dinero esté actualizado
      console.log(`[LOG] Tienda abierta con ${jokers.length} jokers disponibles`);
      console.log(`[LOG] Dinero disponible: $${money}`);
      console.log(`[LOG] Jokers activos: ${activeJokers.length}`);
    }
  }, [isOpen, round, money, activeJokers.length]);
  
  // Manejador para comprar un joker
  const handleBuyJoker = (joker: JokerType) => {
    console.log(`[LOG] Intentando comprar joker: ${joker.name} (ID: ${joker.id})`);
    console.log(`[LOG] Costo: $${joker.cost}, Dinero disponible: $${money}`);
    
    // Verificar que tenemos suficiente dinero
    if (money < joker.cost) {
      console.log(`[LOG] No hay suficiente dinero para comprar ${joker.name}`);
      return;
    }
    
    // Comprar el joker
    buyJoker(joker.id);
    
    // Actualizamos la lista para eliminar el joker comprado
    setShopJokers(prev => prev.filter(j => j.id !== joker.id));
    
    // Mostramos un mensaje de confirmación
    showBuyConfirmation(joker.name);
    
    // Verificamos que la compra se realizó correctamente
    setTimeout(() => {
      const currentStore = useGameStore.getState();
      console.log(`[LOG] Verificación post-compra - Dinero: $${currentStore.money}, Jokers activos: ${currentStore.activeJokers.length}`);
    }, 200);
  };
  
  // Función para mostrar una animación de confirmación
  const [buyConfirmation, setBuyConfirmation] = useState('');
  const showBuyConfirmation = (jokerName: string) => {
    setBuyConfirmation(jokerName);
    setTimeout(() => setBuyConfirmation(''), 2000);
  };
  
  // Verificar si el jugador puede comprar un joker específico
  const canAffordJoker = (joker: JokerType): boolean => {
    return currentMoney >= joker.cost;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto border border-amber-700/30"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Encabezado de la tienda */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-transparent bg-clip-text">
                  Tienda de Mejoras
                </h2>
                <p className="text-sm text-gray-400">Ronda {round} - Nivel {Math.min(round, 4)}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-900/70 px-3 py-1 rounded-lg mr-4">
                  <span className="text-yellow-400 font-bold">${currentMoney}</span>
                </div>
                <button 
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Texto informativo */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-300">
                Compra GPUs, datos de entrenamiento y técnicas avanzadas para mejorar tu empresa de IA.
              </p>
              <div className="bg-gray-800 px-3 py-1 rounded-lg">
                <span className="text-amber-400 text-sm">
                  Mejoras activas: <strong>{activeJokers.length}</strong>
                </span>
              </div>
            </div>
            
            {/* Notificación de compra */}
            <AnimatePresence>
              {buyConfirmation && (
                <motion.div 
                  className="bg-green-900/80 text-green-300 p-3 rounded-lg mb-4 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>¡<span className="font-bold">{buyConfirmation}</span> añadido a tus mejoras activas!</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Lista de jokers disponibles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {shopJokers.length > 0 ? (
                shopJokers.map(joker => (
                  <Joker
                    key={joker.id}
                    joker={joker}
                    onClick={handleBuyJoker}
                    canAfford={canAffordJoker(joker)}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center bg-gray-800 rounded-lg py-12 px-4">
                  <div className="text-6xl mb-4">🏪</div>
                  <p className="text-gray-400 mb-2">
                    No hay más mejoras disponibles en la tienda actualmente.
                  </p>
                  <p className="text-amber-400 text-sm">
                    Finaliza el turno para ver nuevas opciones en la siguiente ronda.
                  </p>
                </div>
              )}
            </div>
            
            {/* Botón para cerrar */}
            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:from-amber-700 hover:to-amber-900"
              >
                Cerrar Tienda
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Shop; 