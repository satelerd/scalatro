import React from 'react';
import { motion } from 'framer-motion';
import { Joker as JokerType, CardRarity } from '@/types';

interface JokerProps {
  joker: JokerType;
  onClick?: (joker: JokerType) => void;
  disabled?: boolean;
  canAfford?: boolean;
}

// Function to get color based on rarity
const getRarityColor = (rarity: CardRarity) => {
  switch (rarity) {
    case CardRarity.COMMON:
      return 'bg-slate-200 border-slate-400';
    case CardRarity.UNCOMMON:
      return 'bg-emerald-200 border-emerald-500';
    case CardRarity.RARE:
      return 'bg-blue-200 border-blue-500';
    case CardRarity.LEGENDARY:
      return 'bg-purple-200 border-purple-600';
    default:
      return 'bg-slate-200 border-slate-400';
  }
};

// Function to determine if joker is a GPU type
const isGPU = (name: string): boolean => {
  return name.includes('NVIDIA') || name.includes('RTX') || name.includes('GPU');
};

// Function to determine if joker is a Data type
const isData = (name: string): boolean => {
  return name.includes('Data') || name.includes('Datos');
};

// Function to get an icon for the joker
const getJokerIcon = (joker: JokerType): string => {
  if (isGPU(joker.name)) return '🎮';
  if (isData(joker.name)) return '📊';
  return '🃏';
};

const Joker: React.FC<JokerProps> = ({ joker, onClick, disabled = false, canAfford = true }) => {
  // Handler for joker click
  const handleClick = () => {
    if (!disabled && canAfford && onClick) {
      onClick(joker);
    }
  };

  // Calculate style based on properties
  const isDisabled = disabled || !canAfford;

  return (
    <motion.div
      className={`relative w-48 h-64 rounded-lg shadow-lg border-2 cursor-pointer
        ${getRarityColor(joker.rarity)}
        ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
        ${!canAfford ? 'grayscale' : ''}`}
      onClick={handleClick}
      whileHover={{ 
        scale: isDisabled ? 1 : 1.05,
        y: isDisabled ? 0 : -5,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Joker header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-2 rounded-t-lg flex justify-between items-center">
        <span className="font-bold text-white">{joker.name}</span>
        <span className="text-xl">{getJokerIcon(joker)}</span>
      </div>
      
      {/* Joker body */}
      <div className="p-3 flex flex-col h-[calc(100%-40px)]">
        {/* Description */}
        <div className="text-xs italic mb-4 flex-grow">
          {joker.description}
        </div>
        
        {/* Price */}
        <div className="bg-amber-100 rounded-md p-1 mb-2 flex justify-center items-center">
          <span className="font-bold text-amber-800">${joker.cost}</span>
        </div>
        
        {/* Bonuses */}
        <div className="flex justify-between">
          {joker.chipBonus > 0 && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold">Chips</span>
              <span className="text-lg font-bold text-blue-600">+{joker.chipBonus}</span>
            </div>
          )}
          
          {joker.multiplierBonus > 1 && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold">Mult</span>
              <span className="text-lg font-bold text-red-600">×{joker.multiplierBonus.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Indicator that it cannot be purchased */}
      {!canAfford && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black bg-opacity-40 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Joker; 