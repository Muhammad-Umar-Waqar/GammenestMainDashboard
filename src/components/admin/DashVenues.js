'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function DashVenues() {
  

  const [selectedGame, setSelectedGame] = useState(null); // Only one selected game
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGameSelection = (gameName) => {
    setSelectedGame(gameName); // Set the selected game
    setDropdownOpen(false); // Close the dropdown once a selection is made
  };

  const gameOptions = [
    {id:1, name:"Milky wyle"},
    {id:2, name:"Milky wyle"},
    {id:3, name:"Milky wyle"},
    {id:4, name:"Milky wyle"},
    {id:5, name:"Milky wyle"},
  ]

  return (
    <div className="grid grid-cols-1 items-center  w-[250px] sm:w-[450px] xl:w-[400px] ">
      {/* Label */}
     

      {/* Dropdown */}
      <div className="relative col-span-2">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={` rounded-lg border border-black relative p-2 cursor-pointer bg-custom-headblue`}
        >
          <span className="text-white text-sm ">
            {selectedGame || 'Select By Venue'}
          </span>
          <svg
            className="absolute top-[5px] right-1 w-7 h-7 text-custom-headblue bg-white rounded-md inline-block float-right"
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
          <div className="absolute z-10 mt-1 w-full bg-gray-200   border border-gray-300 rounded-md shadow-lg">
            {gameOptions.map((game) => (
              <label
                key={game.id}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-custom-headblue "
              >
                <input
                  type="radio"
                  name="game" // All radio buttons with the same name will work as a group (only one can be selected)
                  className="mr-2 absolute opacity-0 pointer-events-none  " 
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
