import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Joker, CardRarity } from '@/types';

const ActiveJokers: React.FC = () => {
  const { activeJokers } = useGameStore();
  
  useEffect(() => {
    console.log(`[LOG] ActiveJokers component - Active jokers: ${activeJokers.length}`);
    
    if (activeJokers.length > 0) {
      console.log('[LOG] List of active jokers:');
      activeJokers.forEach((joker, index) => {
        console.log(`[LOG] Joker #${index + 1}: ${joker.name} (ID: ${joker.id})`);
      });
    }
  }, [activeJokers]);
  
  // If there are no active jokers, we don't show anything
  if (activeJokers.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2">Hired Resources</h2>
        <div className="text-gray-400 text-center py-3">
          No active resources. Visit the shop when available to hire new resources.
        </div>
      </div>
    );
  }
  
  // Function to get color based on rarity
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
  
  // Function to check if a joker is a Hardware or Data type
  const isHardwareJoker = (name: string): boolean => {
    return name.includes('GPU') || name.includes('Data') || 
           name.includes('RTX') || name.includes('NVIDIA');
  };

  // Function to get an icon based on joker name
  const getJokerIcon = (name: string): string => {
    if (name.includes('GPU') || name.includes('RTX') || name.includes('NVIDIA')) {
      return '🖥️';
    }
    if (name.includes('Data') || name.includes('Datos')) {
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
  
  // Get special effects if any
  const getSpecialEffects = (joker: Joker): React.ReactNode => {
    if (!joker.specialEffect || joker.specialEffect.length === 0) {
      return null;
    }
    
    return (
      <>
        {joker.specialEffect.includes('card_slot') && (
          <span className="bg-green-900/60 rounded px-1.5 py-0.5 text-green-300">
            +1 play slot
          </span>
        )}
        {joker.specialEffect.includes('discard_slot') && (
          <span className="bg-yellow-900/60 rounded px-1.5 py-0.5 text-yellow-300">
            +1 discard slot
          </span>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-3">Hired Resources ({activeJokers.length})</h2>
      
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
                {/* Icon and name */}
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center text-xl bg-gray-800 rounded-full">
                    {getJokerIcon(joker.name)}
                  </div>
                </div>
                
                {/* Content */}
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
                  
                  {/* Bonuses */}
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
                        {joker.name.includes('GPU') ? 'Hardware' : 'Data'}
                      </span>
                    )}
                    {getSpecialEffects(joker)}
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