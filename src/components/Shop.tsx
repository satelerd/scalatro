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
  const { round, money, buyJoker } = useGameStore();
  const [shopJokers, setShopJokers] = useState<JokerType[]>([]);
  
  // Efecto para cargar los jokers cuando se abre la tienda
  useEffect(() => {
    if (isOpen) {
      // Obtenemos los jokers disponibles según la ronda actual
      const jokers = getShopJokers(round);
      setShopJokers(jokers);
      console.log(`[LOG] Tienda abierta con ${jokers.length} jokers disponibles`);
    }
  }, [isOpen, round]);
  
  // Manejador para comprar un joker
  const handleBuyJoker = (joker: JokerType) => {
    buyJoker(joker.id);
    
    // Actualizamos la lista para eliminar el joker comprado
    setShopJokers(prev => prev.filter(j => j.id !== joker.id));
  };
  
  // Verificar si el jugador puede comprar un joker específico
  const canAffordJoker = (joker: JokerType): boolean => {
    return money >= joker.cost;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-gray-900 rounded-lg p-4 w-full max-w-4xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Encabezado de la tienda */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-amber-400">Tienda de Mejoras</h2>
              <div className="flex items-center">
                <span className="text-yellow-400 font-bold mr-4">
                  Financiación disponible: ${money}
                </span>
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
            <p className="text-gray-300 mb-4">
              Compra GPUs, datos de entrenamiento y técnicas avanzadas para mejorar tu empresa de IA.
            </p>
            
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
                <div className="col-span-3 text-center text-gray-400 py-8">
                  No hay mejoras disponibles en la tienda actualmente.
                </div>
              )}
            </div>
            
            {/* Botón para cerrar */}
            <div className="mt-6 text-center">
              <button
                onClick={onClose}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
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