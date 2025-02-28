import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType, CardRarity, CardType as CardTypeEnum } from '@/types';

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  disabled?: boolean;
  isSelected?: boolean;
}

// Función para obtener el color según la rareza
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

// Función para obtener el color según el tipo de carta
const getTypeColor = (type: CardTypeEnum) => {
  switch (type) {
    case CardTypeEnum.PRODUCT:
      return 'bg-sky-100';
    case CardTypeEnum.API:
      return 'bg-amber-100';
    case CardTypeEnum.FEATURE:
      return 'bg-rose-100';
    default:
      return 'bg-gray-100';
  }
};

// Función para obtener el icono según el tipo de carta
const getTypeIcon = (type: CardTypeEnum) => {
  switch (type) {
    case CardTypeEnum.PRODUCT:
      return '🤖';
    case CardTypeEnum.API:
      return '🔌';
    case CardTypeEnum.FEATURE:
      return '✨';
    default:
      return '❓';
  }
};

const Card: React.FC<CardProps> = ({ card, onClick, disabled = false, isSelected = false }) => {
  // Handler para click en la carta
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(card);
    }
  };

  return (
    <motion.div
      className={`relative w-48 h-64 rounded-lg shadow-md border-2 cursor-pointer transition-all
        ${getRarityColor(card.rarity)}
        ${isSelected ? 'scale-105 ring-2 ring-yellow-400' : ''}
        ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
      onClick={handleClick}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -5,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cabecera de la carta */}
      <div className={`w-full p-2 rounded-t-lg flex justify-between items-center ${getTypeColor(card.type)}`}>
        <span className="font-bold">{card.name}</span>
        <span className="text-xl">{getTypeIcon(card.type)}</span>
      </div>
      
      {/* Cuerpo de la carta */}
      <div className="p-3 flex flex-col h-[calc(100%-40px)]">
        {/* Descripción */}
        <div className="text-xs italic mb-2 flex-grow">
          {card.description}
        </div>
        
        {/* Estadísticas */}
        <div className="flex justify-between mt-auto">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Chips</span>
            <span className="text-lg font-bold text-blue-600">{card.baseChips}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Mult</span>
            <span className="text-lg font-bold text-red-600">×{card.baseMultiplier.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Tipo y rareza */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>{card.type}</span>
          <span>{card.rarity}</span>
        </div>
      </div>
      
      {/* Efecto de selección */}
      {isSelected && (
        <motion.div 
          className="absolute inset-0 rounded-lg border-4 border-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default Card; 