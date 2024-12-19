'use client'

import { useState } from 'react';

export default function CustomDropdownVenue({gameOptions}) {


  const [selectedGame, setSelectedGame] = useState(null); // Only one selected game
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGameSelection = (gameName) => {
    setSelectedGame(gameName); // Set the selected game
    setDropdownOpen(false); // Close the dropdown once a selection is made
  };

  return (
    <div className="grid grid-cols-3 items-center gap-4 w-full">
      {/* Label */}
      <label htmlFor="arcade3" className="text-left font-medium text-gray-700">
        Select Venue
      </label>

      {/* Dropdown */}
      <div className="relative col-span-2">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`sm:rounded-full rounded-full border border-black relative p-2 cursor-pointer bg-white`}
        >
          <span className="text-gray-600 text-sm ">
            {selectedGame || 'Select Venue'}
          </span>
          <svg
            className="absolute top-3 right-1 w-4 h-4 text-gray-500 inline-block float-right"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {gameOptions.map((game) => (
              <label
                key={game.id}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="game" // All radio buttons with the same name will work as a group (only one can be selected)
                  className="mr-2 absolute opacity-0 pointer-events-none" 
                  checked={selectedGame === game.name}
                  onChange={() => handleGameSelection(game.name)} // Handle game selection
                />
                {game.name}
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
























