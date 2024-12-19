'use client'

import { useState } from "react";

// Array of games with their required coins
const gameOptions = [
  { name: "Volvo", coins: 5 },
  { name: "Saab", coins: 8 },
  { name: "Opel", coins: 12 },
  { name: "Audi", coins: 15 }
];

export default function CustomDropdown() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Select a game and set the game details
  const selectOption = (game) => {
    setSelectedGame(game);
    setIsOpen(false);
  };

  // Calculate dollar amount based on selected game's coins
  const getDollarAmount = (coins) => {
    return (coins / 4).toFixed(2); // 4 coins = 1 dollar
  };

  return (
    <div className="relative mt-[50px] h-[102px] ">
      <button
        onClick={toggleDropdown}
        className="p-2 bg-transparent shadow-lg border w-[287px] border-black rounded-xl text-left flex justify-between items-center transition-transform duration-300 ease-in-out"
      >
        <span className="font-light">
          {selectedGame ? selectedGame.name : "Select Game"}
        </span>
        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-black">
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {/* Smooth transition for dropdown */}
      <ul
        className={`absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ overflow: 'hidden' }}
      >
        {/* Default placeholder */}
        {!selectedGame && (
          <li
            className="p-2 cursor-not-allowed text-gray-400"
            onClick={(e) => e.preventDefault()}
          >
            Game Name
          </li>
        )}

        {/* Render game options dynamically from the array */}
        {gameOptions.map((game) => (
          <li
            key={game.name}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => selectOption(game)}
          >
            {game.name}
          </li>
        ))}
      </ul>

      {/* Display selected game details */}
      {selectedGame && (
        <div className="flex w-[278px] my-2 gap-1 justify-start flex-col">
          <p className="font-light text-left text-xs leading-5">
            Coins Required: {selectedGame.coins}
          </p>
          <p className="font-light text-left text-xs leading-5">
            {selectedGame.coins} Coins = ${getDollarAmount(selectedGame.coins)}
          </p>
        </div>
      )}
    </div>
  );
}
