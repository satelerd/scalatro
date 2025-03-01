import { Card, CardRarity, CardType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// PRODUCT CARDS - Generate more chips (computational power)
// These cards add Story Points to your sprint
const productCards: Card[] = [
  // Common cards
  {
    id: uuidv4(),
    name: "Basic Chatbot",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.0,
    description: "A simple chat model with basic capabilities."
  },
  {
    id: uuidv4(),
    name: "Text Assistant",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 4,
    baseMultiplier: 1.0,
    description: "Assistant that answers simple questions about texts."
  },
  {
    id: uuidv4(),
    name: "Simple Classifier",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 5,
    baseMultiplier: 1.0,
    description: "Classifies text into predefined categories."
  },
  
  // Uncommon cards
  {
    id: uuidv4(),
    name: "Text Generator",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 8,
    baseMultiplier: 1.1,
    description: "Generates creative texts based on prompts."
  },
  {
    id: uuidv4(),
    name: "Personal Assistant",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 10,
    baseMultiplier: 1.1,
    description: "Virtual assistant that helps with daily tasks."
  },
  
  // Rare cards
  {
    id: uuidv4(),
    name: "Code Copilot",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 15,
    baseMultiplier: 1.2,
    description: "Programming assistant that suggests code."
  },
  {
    id: uuidv4(),
    name: "Image Generator",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 20,
    baseMultiplier: 1.2,
    description: "Creates realistic images from descriptions."
  },
  
  // Legendary cards
  {
    id: uuidv4(),
    name: "Autonomous Agent",
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 30,
    baseMultiplier: 1.5,
    description: "AI that can perform complex tasks without supervision."
  },
];

// API CARDS - Increase the multiplier
// These cards improve your team's efficiency
const apiCards: Card[] = [
  // Common cards
  {
    id: uuidv4(),
    name: "Completion API",
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 1,
    baseMultiplier: 1.3,
    description: "Basic API for text completion."
  },
  {
    id: uuidv4(),
    name: "Summary API",
    type: CardType.API,
    rarity: CardRarity.COMMON,
    baseChips: 1,
    baseMultiplier: 1.4,
    description: "Automatically summarizes long texts."
  },
  
  // Uncommon cards
  {
    id: uuidv4(),
    name: "Embeddings API",
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 2,
    baseMultiplier: 1.7,
    description: "Converts text into vectors for semantic search."
  },
  {
    id: uuidv4(),
    name: "Analysis API",
    type: CardType.API,
    rarity: CardRarity.UNCOMMON,
    baseChips: 2,
    baseMultiplier: 1.8,
    description: "Analyzes sentiment and extracts key information."
  },
  
  // Rare cards
  {
    id: uuidv4(),
    name: "Multimodal API",
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 3,
    baseMultiplier: 2.2,
    description: "Integrates text, images, and audio into a single API."
  },
  
  // Legendary cards
  {
    id: uuidv4(),
    name: "Universal API",
    type: CardType.API,
    rarity: CardRarity.LEGENDARY,
    baseChips: 5,
    baseMultiplier: 3.0,
    description: "A API for all of them. Compatible with any LLM."
  },
];

// FEATURE CARDS - Balance chips and multiplier
// These cards add functionalities to your products
const featureCards: Card[] = [
  // Common cards
  {
    id: uuidv4(),
    name: "Basic Moderation",
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 2,
    baseMultiplier: 1.2,
    description: "Filters out basic inappropriate content."
  },
  {
    id: uuidv4(),
    name: "Simple Instructions",
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 3,
    baseMultiplier: 1.1,
    description: "Allows giving simple instructions to the model."
  },
  
  // Uncommon cards
  {
    id: uuidv4(),
    name: "Conversation Memory",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 5,
    baseMultiplier: 1.4,
    description: "The model remembers the previous conversation."
  },
  {
    id: uuidv4(),
    name: "Internet Connection",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 6,
    baseMultiplier: 1.5,
    description: "Allows the model to access up-to-date information."
  },
  
  // Rare cards
  {
    id: uuidv4(),
    name: "Adaptable Personality",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 10,
    baseMultiplier: 1.8,
    description: "The model adjusts its personality according to the context."
  },
  {
    id: uuidv4(),
    name: "Advanced Security",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 8,
    baseMultiplier: 2.0,
    description: "Advanced filters to prevent malicious use."
  },
  
  // Legendary cards
  {
    id: uuidv4(),
    name: "Advanced Reasoning",
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 15,
    baseMultiplier: 2.5,
    description: "The model can reason step-by-step through complex problems."
  },
];

// HUMAN RESOURCES CARDS - Increase your Story Points and Backlog capacity
const teamCards: Card[] = [
  // Developers - Increase Story Points per turn
  {
    id: uuidv4(),
    name: "Junior Developer",
    type: CardType.PRODUCT,
    rarity: CardRarity.COMMON,
    baseChips: 6,
    baseMultiplier: 1.0,
    description: "STORY POINTS: Adds +1 Story Point per sprint. A developer with little experience but a lot of enthusiasm."
  },
  {
    id: uuidv4(),
    name: "Senior Developer",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 12,
    baseMultiplier: 1.2,
    description: "STORY POINTS: Adds +2 Story Points per sprint. Developer with experience that produces high-quality code."
  },
  {
    id: uuidv4(),
    name: "Tech Lead",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 18,
    baseMultiplier: 1.5,
    description: "STORY POINTS: Adds +3 Story Points per sprint. Leads the technical team and solves complex problems."
  },
  {
    id: uuidv4(),
    name: "Full-stack Architect",
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 25,
    baseMultiplier: 2.0,
    description: "STORY POINTS: Adds +4 Story Points per sprint. Expert in all necessary technologies for your product."
  },
  
  // Product Managers - Increase Backlog capacity
  {
    id: uuidv4(),
    name: "Product Owner",
    type: CardType.FEATURE,
    rarity: CardRarity.COMMON,
    baseChips: 4,
    baseMultiplier: 1.3,
    description: "BACKLOG: Adds +1 to your Backlog capacity. Responsible for prioritizing product features."
  },
  {
    id: uuidv4(),
    name: "Scrum Master",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 6,
    baseMultiplier: 1.6,
    description: "BACKLOG: Adds +2 to your Backlog capacity. Facilitates meetings and eliminates team impediments."
  },
  {
    id: uuidv4(),
    name: "Product Manager",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 10,
    baseMultiplier: 1.9,
    description: "BACKLOG: Adds +3 to your Backlog capacity. Defines the product vision and coordinates with stakeholders."
  },
  {
    id: uuidv4(),
    name: "CPO (Chief Product Officer)",
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 15,
    baseMultiplier: 2.4,
    description: "BACKLOG: Adds +4 to your Backlog capacity. Executive who coordinates all company products."
  },
];

// SPECIAL CARDS - With unique effects
const specialCards: Card[] = [
  // Combo 1: Development set - Gives bonus if you have a product, API and feature
  {
    id: uuidv4(),
    name: "DevOps LLM",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 12,
    baseMultiplier: 2.2,
    description: "COMBO: +5 chips extra if you have a Product, API and another Feature in game."
  },
  
  // Combo 2: Complete stack - Bonus for having multiple products
  {
    id: uuidv4(),
    name: "Enterprise Suite",
    type: CardType.PRODUCT,
    rarity: CardRarity.RARE,
    baseChips: 18,
    baseMultiplier: 1.5,
    description: "COMBO: Doubles the multiplier if you have other 2 Products in game."
  },
  
  // Combo 3: API integration - Bonus for having multiple APIs
  {
    id: uuidv4(),
    name: "API Gateway",
    type: CardType.API,
    rarity: CardRarity.RARE,
    baseChips: 4,
    baseMultiplier: 2.5,
    description: "COMBO: +50% to your multiplier if you have other 2 APIs in game."
  },
  
  // Super powerful cards (legendary)
  {
    id: uuidv4(),
    name: "General AI",
    type: CardType.PRODUCT,
    rarity: CardRarity.LEGENDARY,
    baseChips: 50,
    baseMultiplier: 2.0,
    description: "An AI that can solve any intellectual problem."
  },
  {
    id: uuidv4(),
    name: "Parallel Inference",
    type: CardType.API,
    rarity: CardRarity.LEGENDARY,
    baseChips: 10,
    baseMultiplier: 4.0,
    description: "Massively parallel processing for ultra-fast inference."
  },
  {
    id: uuidv4(),
    name: "Zero Hallucination",
    type: CardType.FEATURE,
    rarity: CardRarity.LEGENDARY,
    baseChips: 25,
    baseMultiplier: 3.0,
    description: "Completely eliminates hallucinations. 100% accurate answers."
  },
  
  // Team combo cards
  {
    id: uuidv4(),
    name: "Agile Team",
    type: CardType.FEATURE,
    rarity: CardRarity.RARE,
    baseChips: 15,
    baseMultiplier: 2.0,
    description: "COMBO: +2 Story Points and +2 Backlog capacity if you have at least 1 Dev and 1 Product Owner in game."
  },
  {
    id: uuidv4(),
    name: "Pair Programming",
    type: CardType.PRODUCT,
    rarity: CardRarity.UNCOMMON,
    baseChips: 14,
    baseMultiplier: 1.5,
    description: "STORY POINTS: Adds +2 Story Points per sprint. Two devs working together produce higher-quality code."
  },
  {
    id: uuidv4(),
    name: "Planning Poker",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 8,
    baseMultiplier: 1.6,
    description: "BACKLOG: Adds +2 to your Backlog capacity. Technique for estimating the effort required for each task."
  },
  
  // Easter eggs and funny cards
  {
    id: uuidv4(),
    name: "Developer Coffee",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 7,
    baseMultiplier: 1.7,
    description: "Caffeine! +1 Story Point per sprint. Extra energy for the team developing the models."
  },
  {
    id: uuidv4(),
    name: "Prompt Engineering 101",
    type: CardType.FEATURE,
    rarity: CardRarity.UNCOMMON,
    baseChips: 5,
    baseMultiplier: 1.9,
    description: "Basic manual of prompt engineering. Improves instructions."
  },
];

// Combine all cards
export const allCards: Card[] = [
  ...productCards,
  ...apiCards,
  ...featureCards,
  ...teamCards,
  ...specialCards,
];

// Function to get initial deck with balanced distribution
export const getInitialDeck = (): Card[] => {
  // Combine all cards by type
  const allCards = [
    ...productCards.slice(0, 4),  // Only some product cards
    ...apiCards.slice(0, 3),      // Only some API cards
    ...featureCards.slice(0, 3),  // Only some feature cards
    ...teamCards.slice(0, 4),     // Add some team cards
    ...specialCards.slice(-2),    // Two special powerful cards
  ];
  
  // Create random deck of 10 cards
  const shuffledDeck = [...allCards]
    .sort(() => Math.random() - 0.5)
    .map(card => ({
      ...card,
      id: uuidv4(), // Ensure each card has a unique ID
    }));
  
  // Add at least two powerful special cards to help the player
  // Select random legendary cards
  const legendaryCards = [
    ...productCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...apiCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...featureCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...teamCards.filter(card => card.rarity === CardRarity.LEGENDARY),
    ...specialCards.filter(card => card.rarity === CardRarity.LEGENDARY),
  ];
  
  // Add 2 random legendary cards
  const selectedLegendaryCards = legendaryCards
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map(card => ({
      ...card,
      id: uuidv4(),
    }));
  
  // Combine deck with legendary cards
  return [...shuffledDeck, ...selectedLegendaryCards];
};

// Function to get improved deck in advanced stages of the game
export const getAdvancedDeck = (round: number): Card[] => {
  // In advanced rounds, add more powerful cards
  const powerLevel = Math.min(Math.floor(round / 2), 5); // Maximum power level 5
  
  // Combine all available cards
  const allCards = [
    ...productCards,
    ...apiCards,
    ...featureCards,
    ...teamCards,
    ...specialCards,
  ];
  
  // Filter cards according to power level (rarity)
  const availableCards = allCards.filter(card => {
    if (powerLevel >= 5) return true; // All rarities
    if (powerLevel >= 3) return card.rarity !== CardRarity.LEGENDARY; // Up to rares
    if (powerLevel >= 2) return card.rarity !== CardRarity.LEGENDARY && card.rarity !== CardRarity.RARE; // Up to uncommons
    return card.rarity === CardRarity.COMMON; // Only commons
  });
  
  // Select 3 random cards according to power level
  const selectedCards = availableCards
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(card => {
      // In high power levels, enhance cards
      let bonusChips = 0;
      let bonusMultiplier = 1.0;
      
      if (powerLevel >= 4) {
        bonusChips = Math.floor(Math.random() * 10) + 5; // 5-15 chips extra
        bonusMultiplier = 1.0 + (Math.random() * 0.5); // 1.0-1.5x multiplier extra
      } else if (powerLevel >= 2) {
        bonusChips = Math.floor(Math.random() * 5) + 3; // 3-8 chips extra
        bonusMultiplier = 1.0 + (Math.random() * 0.3); // 1.0-1.3x multiplier extra
      }
      
      return {
        ...card,
        id: uuidv4(),
        baseChips: card.baseChips + bonusChips,
        baseMultiplier: card.baseMultiplier * bonusMultiplier,
        description: `${card.description} [Advanced Round ${round}]`,
      };
    });
  
  return selectedCards;
};

// Export all cards in case they are needed elsewhere
export const getAllCards = () => {
  return [...productCards, ...apiCards, ...featureCards, ...teamCards, ...specialCards];
}; 