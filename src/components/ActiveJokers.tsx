import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Joker, CardRarity } from '@/types';

const ActiveJokers: React.FC = () => {
  const { activeJokers } = useGameStore();
  
  // Si no hay jokers activos, no mostramos nada
  if (activeJokers.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2">Recursos Contratados</h2>
        <div className="text-gray-400 text-center py-3">
          Sin recursos activos. Visita la tienda cuando esté disponible para contratar nuevos recursos.
        </div>
      </div>
    );
  }
  
  // Función para obtener el color según la rareza
  const getRarityColor = (rarity: CardRarity) => {
    switch (rarity) {
      case CardRarity.COMMON:
        return 'border-gray-400 from-gray-800 to-gray-700';
      case CardRarity.UNCOMMON:
        return 'border-green-500 from-green-900 to-green-800';
      case CardRarity.RARE:
        return 'border-blue-500 from-blue-900 to-blue-800';
      case CardRarity.LEGENDARY:
        return 'border-purple-500 from-purple-900 to-purple-800';
      default:
        return 'border-gray-400 from-gray-800 to-gray-700';
    }
  };
  
  // Función para verificar si un joker es de tipo GPU o Datos
  const isHardwareJoker = (name: string): boolean => {
    return name.includes('GPU') || name.includes('Datos') || 
           name.includes('RTX') || name.includes('NVIDIA');
  };

  // Función para obtener icono según el nombre del joker
  const getJokerIcon = (name: string): string => {
    if (name.includes('GPU') || name.includes('RTX') || name.includes('NVIDIA')) {
      return '🖥️';
    }
    if (name.includes('Datos') || name.includes('Data')) {
      return '📊';
    }
    if (name.includes('Talent') || name.includes('Engineer') || name.includes('Dev')) {
      return '👩‍💻';
    }
    if (name.includes('Money') || name.includes('Investor')) {
      return '💰';
    }
    return '🃏';
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-3">Recursos Contratados</h2>
      
      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence>
          {activeJokers.map((joker) => (
            <motion.div
              key={joker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`border rounded-lg overflow-hidden bg-gradient-to-b shadow-md ${getRarityColor(joker.rarity)}`}
            >
              <div className="flex items-start p-2">
                {/* Icono y nombre */}
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center text-xl bg-gray-800 rounded-full">
                    {getJokerIcon(joker.name)}
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-sm">
                      {joker.name}
                    </h3>
                    <div className="text-xs font-semibold rounded px-1.5 bg-black bg-opacity-40 text-gray-300">
                      {joker.rarity}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-300 mt-1 mb-2 line-clamp-2">
                    {joker.description}
                  </p>
                  
                  {/* Bonificaciones */}
                  <div className="flex flex-wrap gap-1 text-xs">
                    {joker.chipBonus > 0 && (
                      <span className="bg-blue-900/60 rounded px-1.5 py-0.5 text-blue-300">
                        +{joker.chipBonus} chips
                      </span>
                    )}
                    {joker.multiplierBonus > 0 && (
                      <span className="bg-red-900/60 rounded px-1.5 py-0.5 text-red-300">
                        +{joker.multiplierBonus.toFixed(1)}× mult
                      </span>
                    )}
                    {isHardwareJoker(joker.name) && (
                      <span className="bg-purple-900/60 rounded px-1.5 py-0.5 text-purple-300">
                        {joker.name.includes('GPU') ? 'Hardware' : 'Datos'}
                      </span>
                    )}
                  </div>
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