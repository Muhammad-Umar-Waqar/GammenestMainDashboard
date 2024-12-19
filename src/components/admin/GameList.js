'use client'

import Image from 'next/image'
import React from 'react'
import showDeleteConfirm from '../Modals/Delete'
import showEditModal from '../Modals/Edit'
import axios from 'axios'

function GameList({gameList, title}) {
  const handleEditModal = () => {
    console.log('Edit');
  }

  const handleDeleteModal = async (game_id) => {
    const response = await axios.post("http://localhost:3000/api/games/deletegame/", {
      game_id : game_id
    });

    const data = response.data;
  }

  return (
    <div>
      <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[70vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
        <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue ">{title}</h2>
        <ul>
          {gameList.map((game) => (
            <li
              key={game.game_id}
              className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
            >
              <span>{game.game_name}</span>
              <div className="flex space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => showDeleteConfirm(() => (handleDeleteModal(game.game_id)))}
                >
                  <Image src="/Delete.svg" height={32} width={32} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => showEditModal(handleEditModal, game.game_name)}
                >
                  <Image src="/Setting.svg" height={32} width={32} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GameList
