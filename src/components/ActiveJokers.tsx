import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { CardRarity } from '@/types';

const ActiveJokers: React.FC = () => {
  const { activeJokers } = useGameStore();
  
  // Si no hay jokers activos, mostramos un mensaje de incentivo
  if (activeJokers.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-amber-400 mb-4">Mejoras Activas</h2>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🃏</div>
          <p className="text-gray-400">
            Aún no tienes jokers activos. Visita la tienda para comprar mejoras y potenciar tu empresa de IA.
          </p>
          <button
            onClick={() => useGameStore.getState().openShop()}
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Ir a la Tienda
          </button>
        </div>
      </div>
    );
  }
  
  // Función para obtener el color según la rareza
  const getRarityColor = (rarity: CardRarity) => {
    switch (rarity) {
      case CardRarity.COMMON:
        return 'border-slate-400 from-slate-900 to-slate-800';
      case CardRarity.UNCOMMON:
        return 'border-emerald-500 from-emerald-900 to-emerald-800';
      case CardRarity.RARE:
        return 'border-blue-500 from-blue-900 to-blue-800';
      case CardRarity.LEGENDARY:
        return 'border-purple-600 from-purple-900 to-purple-800';
      default:
        return 'border-slate-400 from-slate-900 to-slate-800';
    }
  };
  
  // Función para determinar si el joker es de tipo GPU
  const isGPU = (name: string): boolean => {
    return name.includes('NVIDIA') || name.includes('RTX') || name.includes('GPU');
  };

  // Función para determinar si el joker es de tipo Data
  const isData = (name: string): boolean => {
    return name.includes('Datos') || name.includes('Data');
  };

  // Función para obtener un icono para el joker
  const getJokerIcon = (jokerName: string): string => {
    if (isGPU(jokerName)) return '🎮';
    if (isData(jokerName)) return '📊';
    return '🃏';
  };

  // Función para obtener un borde brillante según la rareza
  const getGlowEffect = (rarity: CardRarity) => {
    switch (rarity) {
      case CardRarity.COMMON:
        return '';
      case CardRarity.UNCOMMON:
        return 'shadow-[0_0_10px_rgba(16,185,129,0.3)]';
      case CardRarity.RARE:
        return 'shadow-[0_0_15px_rgba(59,130,246,0.4)]';
      case CardRarity.LEGENDARY:
        return 'shadow-[0_0_20px_rgba(147,51,234,0.5)]';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-400">Mejoras Activas</h2>
        <div className="bg-amber-800 text-white px-2 py-1 rounded-lg">
          <span className="text-sm font-semibold">{activeJokers.length} activo{activeJokers.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {activeJokers.map((joker, index) => (
            <motion.div
              key={joker.id}
              className={`border-2 rounded-lg overflow-hidden ${getRarityColor(joker.rarity)} ${getGlowEffect(joker.rarity)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-2 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{getJokerIcon(joker.name)}</span>
                  <span className="font-semibold text-white">{joker.name}</span>
                </div>
                <div className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-xs font-semibold uppercase">
                  {joker.rarity}
                </div>
              </div>
              
              <div className="bg-gradient-to-r p-3">
                <p className="text-sm text-gray-300 mb-3">{joker.description}</p>
                
                <div className="flex justify-between gap-2">
                  {joker.chipBonus > 0 && (
                    <div className="flex-1 bg-blue-900 bg-opacity-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-blue-300 mb-1">Bonus Chips</div>
                      <div className="text-lg font-bold text-blue-400">+{joker.chipBonus}</div>
                    </div>
                  )}
                  
                  {joker.multiplierBonus > 1 && (
                    <div className="flex-1 bg-red-900 bg-opacity-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-red-300 mb-1">Bonus Mult</div>
                      <div className="text-lg font-bold text-red-400">×{joker.multiplierBonus.toFixed(1)}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActiveJokers; 