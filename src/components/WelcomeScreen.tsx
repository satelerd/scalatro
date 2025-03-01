import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStartGame: () => void;
  onChangeDifficulty: (value: number) => void;
  selectedDifficulty: number;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStartGame, 
  onChangeDifficulty, 
  selectedDifficulty 
}) => {
  // Function to get the difficulty description
  const getDifficultyDescription = () => {
    if (selectedDifficulty === 0.7) return "For beginners. Benchmark targets reduced by 30%.";
    if (selectedDifficulty === 1.5) return "For experts. Benchmark targets increased by 50%.";
    return "Balanced experience. Standard difficulty.";
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-amber-700/30 m-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
        Welcome to Scalatro
      </h2>
      
      <p className="text-gray-300 mb-8 text-lg">
        In Scalatro, you'll lead your own development team in a race to complete projects and accumulate Story Points.
        Assign Story Points and manage your backlog to beat benchmarks and increase your productivity.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-blue-400 mb-2">Story Points</h3>
          <p className="text-sm">Represent your team's capacity to develop features. 
            More Story Points = greater potential for your product.</p>
        </div>
        
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-red-400 mb-2">Efficiency Multiplier</h3>
          <p className="text-sm">Represents your team's efficiency during development.
            Maximize your multiplier to get a higher score.</p>
        </div>
        
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-amber-400 mb-2">Resources (Developers, PM, etc.)</h3>
          <p className="text-sm">Hire resources in the shop to boost your Story Points and multiplier.
            Combine different roles to create winning strategies.</p>
        </div>
        
        <div className="bg-gray-700/70 p-4 rounded-lg border border-amber-700/20">
          <h3 className="font-bold text-purple-400 mb-2">Projects and Benchmarks</h3>
          <p className="text-sm">Beat industry benchmarks to gain market share.
            As you progress, projects become more challenging.</p>
        </div>
      </div>
      
      <div className="bg-gray-700/50 p-4 rounded-lg mb-10 border border-amber-700/20">
        <h3 className="font-bold text-green-400 mb-2">How to play:</h3>
        <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
          <li><strong>Available Story Points</strong>: You can assign up to 2 per sprint</li>
          <li><strong>Backlog</strong>: You can move up to 2 tasks per sprint</li>
          <li>Use your Story Points and multiplier to <strong>complete projects</strong></li>
          <li>Hire resources in the shop to <strong>improve your team</strong></li>
          <li>Gain <strong>market share</strong> by beating benchmarks</li>
          <li>Lose if your <strong>market share reaches 0</strong></li>
        </ul>
      </div>
      
      {/* Difficulty selector */}
      <div className="mb-8">
        <h3 className="font-bold text-center text-white mb-3">Select difficulty:</h3>
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 0.7 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => onChangeDifficulty(0.7)}
          >
            Easy
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 1 
                ? 'bg-amber-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => onChangeDifficulty(1)}
          >
            Normal
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 1.5 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => onChangeDifficulty(1.5)}
          >
            Hard
          </button>
        </div>
        <div className="text-center mt-2 text-sm text-gray-400">
          {getDifficultyDescription()}
        </div>
      </div>
      
      <div className="text-center">
        <motion.button
          className="bg-gradient-to-r from-amber-500 to-yellow-600 px-8 py-3 rounded-lg text-white font-bold text-xl hover:from-amber-600 hover:to-yellow-700 transition-colors shadow-lg"
          onClick={onStartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen; 