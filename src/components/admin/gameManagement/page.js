'use client'
import ArcadeList from '@/components/admin/ArcadeList'
import React, { useState } from 'react'

function Page() {
    const gameOptions = [
        { id: 1, name: 'Pac-Man' },
        { id: 2, name: 'Space Invaders' },
        { id: 3, name: 'Donkey Kong' },
        { id: 4, name: 'Tetris' },
        { id: 5, name: 'Super Mario Bros' },
        { id: 6, name: 'Pac-Man' },
        { id: 7, name: 'Space Invaders' },
        { id: 8, name: 'Donkey Kong' },
        { id: 9, name: 'Tetris' },
        { id: 10, name: 'Super Mario Bros' },
      ];
      const title = "Game's List"


      const [game, setGame] = useState("");

     function HandleGameSubmit(e){
             e.preventDefault(); // Prevent page refresh
            console.log("GAME", game)
     }
  return (
    <div>
        <h1 className='text-xl font-bold my-3'>Game Management</h1>
       
        <div className='flex md:flex-row gap-2 flex-col items-center justify-around'>
        <ArcadeList arcadeList={gameOptions} title={title}/>  
        
        <form className="sm:ml-[20px]  flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6"
         onSubmit={HandleGameSubmit}
        >
            {/* Form Title */}
    <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
        Add Game
    </h1>

    {/* First Field */}
    <div className="grid grid-cols-3 items-center gap-4 w-full">
        <label htmlFor="arcade1" className="text-left font-medium text-gray-700">
            Game Name
        </label>
        <input
            type="text"
            id="arcade1"
            name="arcade1"
            className="p-2 border border-black  focus:outline-none  rounded-full col-span-2"
            onChange={(e)=>setGame(e.target.value)}
            placeholder='Enter Text' />
    </div>

    <div className="flex justify-end w-full space-x-4">

<button
    type="submit"
    className="bg-custom-headblue text-white py-1 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
    Submit
</button>
<button
    type="button"
    className="text-red-500  py-1 px-6 rounded-xl border border-black hover:border-red-600 hover:text-black "
>
    Cancel
</button>
</div>
        </form>
        </div>
    </div>
  )
}

export default Page