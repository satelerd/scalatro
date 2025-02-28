import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { CardRarity } from '@/types';

const ActiveJokers: React.FC = () => {
  const { activeJokers } = useGameStore();
  
  // Si no hay jokers activos, no mostramos nada
  if (activeJokers.length === 0) {
    return null;
  }
  
  // Función para obtener el color según la rareza
  const getRarityColor = (rarity: CardRarity) => {
    switch (rarity) {
      case CardRarity.COMMON:
        return 'border-slate-400 bg-slate-800';
      case CardRarity.UNCOMMON:
        return 'border-emerald-500 bg-emerald-900';
      case CardRarity.RARE:
        return 'border-blue-500 bg-blue-900';
      case CardRarity.LEGENDARY:
        return 'border-purple-600 bg-purple-900';
      default:
        return 'border-slate-400 bg-slate-800';
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

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-amber-400 mb-4">Mejoras Activas</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatePresence>
          {activeJokers.map(joker => (
            <motion.div
              key={joker.id}
              className={`border rounded-lg p-3 ${getRarityColor(joker.rarity)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{getJokerIcon(joker.name)}</span>
                <span className="font-semibold text-white">{joker.name}</span>
              </div>
              
              <p className="text-xs text-gray-300 mb-2">{joker.description}</p>
              
              <div className="flex justify-between text-xs">
                {joker.chipBonus > 0 && (
                  <span className="text-blue-400">+{joker.chipBonus} chips</span>
                )}
                
                {joker.multiplierBonus > 1 && (
                  <span className="text-red-400">×{joker.multiplierBonus.toFixed(1)} mult</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActiveJokers; 