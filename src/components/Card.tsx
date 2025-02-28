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
      return 'border-purple-600 from-purple-900 to-purple-800';
    default:
      return 'border-gray-400 from-gray-800 to-gray-700';
  }
};

// Función para obtener el color según el tipo de carta
const getTypeColor = (type: CardTypeEnum) => {
  switch (type) {
    case CardTypeEnum.PRODUCT:
      return 'bg-red-700';
    case CardTypeEnum.API:
      return 'bg-blue-700';
    case CardTypeEnum.FEATURE:
      return 'bg-green-700';
    default:
      return 'bg-gray-700';
  }
};

// Función para obtener el icono según el tipo de carta
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

const Card: React.FC<CardProps> = ({
  card,
  onClick,
  disabled = false,
  isSelected = false,
  isDragging = false,
}) => {
  // Verificar que card no sea undefined
  if (!card) {
    console.error('[ERROR] Card component recibió un objeto card undefined');
    return <div className="text-red-500 p-4 border border-red-700 rounded-lg">Error: Carta no disponible</div>;
  }

  // Obtenemos el efecto de brillo según la rareza
  const getGlowEffect = (rarity: CardRarity) => {
    switch (rarity) {
      case CardRarity.COMMON:
        return '';
      case CardRarity.UNCOMMON:
        return 'shadow-[0_0_7px_rgba(34,197,94,0.5)]';
      case CardRarity.RARE:
        return 'shadow-[0_0_10px_rgba(59,130,246,0.6)]';
      case CardRarity.LEGENDARY:
        return 'shadow-[0_0_15px_rgba(147,51,234,0.7)]';
      default:
        return '';
    }
  };
  
  // Obtener descripción del efecto según el tipo de carta
  const getEffectDescription = (type: CardTypeEnum) => {
    switch (type) {
      case CardTypeEnum.PRODUCT:
        return 'Genera chips base';
      case CardTypeEnum.API:
        return 'Aumenta multiplicador';
      case CardTypeEnum.FEATURE:
        return 'Equilibra chips y mult.';
      default:
        return 'Efecto desconocido';
    }
  };
  
  // Determinar si la carta es especial
  const isSpecialCard = card.baseChips > 10 || card.baseMultiplier > 2;
  
  // Manejar el clic en la carta
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(card);
    }
  };

  return (
    <motion.div
      className={`relative w-52 min-w-[208px] h-[280px] rounded-lg overflow-visible border-2 transition-all 
        ${getRarityColor(card.rarity)} 
        ${getGlowEffect(card.rarity)}
        ${isSelected ? 'scale-105 shadow-2xl' : ''}
        ${isDragging ? 'shadow-2xl z-50' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:shadow-lg'}`}
      whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={handleClick}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Fondo de la carta con gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getRarityColor(card.rarity)} z-0`}></div>
      
      {/* Efecto de partículas para cartas legendarias */}
      {card.rarity === CardRarity.LEGENDARY && (
        <div className="absolute inset-0 overflow-hidden z-0">
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
      
      {/* Insignia de rareza */}
      <div className="absolute top-0 right-0 m-1 px-2 py-0.5 text-xs font-bold text-white rounded-full bg-black bg-opacity-50">
        {card.rarity}
      </div>
      
      {/* Contenido de la carta */}
      <div className="relative h-full flex flex-col z-10 p-4">
        {/* Cabecera con nombre e icono */}
        <div className="mb-2">
          <div className={`${getTypeColor(card.type)} w-full rounded px-2 py-1.5 flex items-center`}>
            <span className="text-xl mr-1">{getTypeIcon(card.type)}</span>
            <h3 className="text-sm font-bold text-white flex-1 line-clamp-2">
              {card.name}
            </h3>
          </div>
        </div>
        
        {/* Cuerpo con descripción */}
        <div className="flex-1 mb-2">
          <p className="text-xs text-gray-300 bg-black bg-opacity-20 p-2 rounded min-h-[80px] max-h-[80px] overflow-y-auto">
            {card.description}
          </p>
        </div>
        
        {/* Efecto */}
        <div className="text-xs text-center bg-black bg-opacity-30 rounded py-1 mb-2">
          {getEffectDescription(card.type)}
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-2">
          <div className={`flex flex-col items-center p-1.5 rounded ${isSpecialCard && card.baseChips > 10 ? 'bg-blue-900 animate-pulse' : 'bg-blue-800'}`}>
            <span className="text-xs text-blue-300">Chips</span>
            <span className="font-bold text-white text-lg">{card.baseChips}</span>
          </div>
          <div className={`flex flex-col items-center p-1.5 rounded ${isSpecialCard && card.baseMultiplier > 2 ? 'bg-red-900 animate-pulse' : 'bg-red-800'}`}>
            <span className="text-xs text-red-300">Mult</span>
            <span className="font-bold text-white text-lg">×{card.baseMultiplier.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Overlay de selección */}
      {isSelected && (
        <div className="absolute inset-0 border-4 border-white border-opacity-60 rounded z-20 pointer-events-none"></div>
      )}
      
      {/* Overlay de arrastre */}
      {isDragging && (
        <div className="absolute inset-0 border-4 border-yellow-400 border-opacity-80 rounded-lg z-30 pointer-events-none shadow-lg"></div>
      )}
    </motion.div>
  );
};

export default Card; 