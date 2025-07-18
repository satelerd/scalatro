import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType, CardRarity, CardType as CardTypeEnum } from '@/types';

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  disabled?: boolean;
  isSelected?: boolean;
  isDragging?: boolean;
}

// Function to get color based on rarity
const getRarityColor = (rarity: CardRarity) => {
  switch (rarity) {
    case CardRarity.COMMON:
      return 'border-gray-400 from-gray-700 to-gray-900';
    case CardRarity.UNCOMMON:
      return 'border-green-500 from-green-700 to-green-900';
    case CardRarity.RARE:
      return 'border-blue-500 from-blue-700 to-blue-900';
    case CardRarity.LEGENDARY:
      return 'border-purple-500 from-purple-700 to-purple-900';
    default:
      return 'border-gray-400 from-gray-700 to-gray-900';
  }
};



// Function to get icon based on card type
const getTypeIcon = (type: CardTypeEnum) => {
  switch (type) {
    case CardTypeEnum.PRODUCT:
      return '🧠';
    case CardTypeEnum.API:
      return '🔌';
    case CardTypeEnum.FEATURE:
      return '✨';
    default:
      return '❓';
  }
};

// Get effect description based on card type
const getEffectDescription = (type: CardTypeEnum) => {
  switch (type) {
    case CardTypeEnum.PRODUCT:
      return 'Generates base chips';
    case CardTypeEnum.API:
      return 'Increases multiplier';
    case CardTypeEnum.FEATURE:
      return 'Balances chips and mult.';
    default:
      return 'Unknown effect';
  }
};

const Card: React.FC<CardProps> = ({
  card,
  onClick,
  disabled = false,
  isSelected = false,
  isDragging = false,
}) => {
  // Check that card is not undefined
  if (!card) {
    console.error('[ERROR] Card component received undefined card object');
    return <div className="text-red-500 p-4 border border-red-700 rounded-lg">Error: Card not available</div>;
  }

  // Get glow effect based on rarity
  const getGlowEffect = (rarity: CardRarity) => {
    switch (rarity) {
      case CardRarity.COMMON:
        return '';
      case CardRarity.UNCOMMON:
        return 'shadow-[0_0_10px_rgba(34,197,94,0.5)]';
      case CardRarity.RARE:
        return 'shadow-[0_0_12px_rgba(59,130,246,0.6)]';
      case CardRarity.LEGENDARY:
        return 'shadow-[0_0_15px_rgba(147,51,234,0.7)]';
      default:
        return '';
    }
  };
  
  // Determine if the card is special
  const isSpecialCard = card.baseChips > 10 || card.baseMultiplier > 2;
  
  // Handle card click
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(card);
    }
  };

  return (
    <div
      className={`relative w-52 min-w-[208px] h-[280px] rounded-xl overflow-visible border-2 transition-all 
        ${getRarityColor(card.rarity)} 
        ${getGlowEffect(card.rarity)}
        ${isSelected ? 'scale-105 shadow-2xl' : ''}
        ${isDragging ? 'shadow-[0_0_40px_rgba(255,255,255,0.7)]' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing hover:scale-105 hover:shadow-lg'}`}
      onClick={handleClick}
      style={{ 
        zIndex: isDragging ? 999999999 : 'auto',
        transform: isDragging ? 'scale(1.1)' : 'none',
        boxShadow: isDragging ? '0 0 40px rgba(255, 255, 255, 0.7)' : undefined,
        position: isDragging ? 'relative' : 'relative',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    >
      {/* Card background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getRarityColor(card.rarity)} z-0 rounded-xl`}></div>
      
      {/* Top glow effect */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent z-0 rounded-t-xl"></div>
      
      {/* Particle effect for legendary cards */}
      {card.rarity === CardRarity.LEGENDARY && (
        <div className="absolute inset-0 overflow-hidden z-0 rounded-xl">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-300 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -20],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Card content */}
      <div className="relative h-full flex flex-col z-10 p-4">
        {/* Sprint Points cost indicator */}
        <div className="absolute top-0 right-0 m-2 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg border border-indigo-400">
          {card.storyPointsCost}
        </div>
        
        {/* Header with icon and type */}
        <div className="flex justify-center items-center mb-1">
          <span className="text-2xl">{getTypeIcon(card.type)}</span>
        </div>
        
        {/* Card title */}
        <div className="text-center mb-3">
          <h3 className="text-base font-bold text-white px-2 py-1 bg-black/30 rounded-lg shadow-inner">
            {card.name}
          </h3>
        </div>
        
        {/* Main effect - Highlighted */}
        <div className="text-sm font-medium text-center py-2 px-1 bg-black/40 rounded-lg mb-3 text-white shadow-inner">
          {getEffectDescription(card.type)}
        </div>
        
        {/* Card description */}
        <div className="flex-1 mb-3">
          <p className="text-[10px] leading-tight text-gray-300 bg-black/20 p-2 rounded-lg min-h-[70px] overflow-y-auto">
            {card.description}
          </p>
        </div>
        
        {/* Stats in improved design */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`flex flex-col items-center p-2 rounded-lg ${isSpecialCard && card.baseChips > 10 ? 'bg-gradient-to-b from-blue-800 to-blue-950 animate-pulse' : 'bg-gradient-to-b from-blue-800 to-blue-950'} border border-blue-500/50 shadow-lg`}>
            <span className="text-xs font-bold text-blue-300">Chips</span>
            <span className="font-bold text-white text-xl">{card.baseChips}</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg ${isSpecialCard && card.baseMultiplier > 2 ? 'bg-gradient-to-b from-red-800 to-red-950 animate-pulse' : 'bg-gradient-to-b from-red-800 to-red-950'} border border-red-500/50 shadow-lg`}>
            <span className="text-xs font-bold text-red-300">Mult</span>
            <span className="font-bold text-white text-xl">×{card.baseMultiplier.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Selection overlay */}
      {isSelected && (
        <div className="absolute inset-0 border-4 border-white border-opacity-60 rounded-xl z-20 pointer-events-none"></div>
      )}
      
      {/* Drag state overlay */}
      {isDragging && (
        <div className="absolute inset-0 border-4 border-yellow-400 border-opacity-80 rounded-xl z-30 pointer-events-none">
          {/* Additional glow effect to highlight during drag */}
          <div className="absolute inset-0 rounded-xl bg-white/10"></div>
        </div>
      )}
    </div>
  );
};

export default Card; 