'use client'

import GameSelection from '@/components/admin/ArcadeDropDown';
import ArcadeList from '@/components/admin/ArcadeList';
import CustomDropdownVenue from '@/components/admin/VenuesDropDown';
import Image from 'next/image';
import React, { useState } from 'react'

function Page() {

  const arcadeList = [
    { id: 1, name: 'Arcade 345-554' },
    { id: 2, name: 'Arcade 345-554' },
    { id: 3, name: 'Arcade 345-554' },
    { id: 4, name: 'Arcade 345-554' },
    { id: 5, name: 'Arcade 345-554' },
    { id: 6, name: 'Arcade 345-554' },
    { id: 7, name: 'Arcade 345-554' },
    { id: 8, name: 'Arcade 345-554' },
    { id: 9, name: 'Arcade 345-554' },
    { id: 10, name: 'Arcade 345-554' },
];

const gameOptions = [
    { id: 1, name: 'Mille Wyle' },
    { id: 2, name: 'PlayGround' },
    { id: 3, name: 'Hot Spot' },
    { id: 4, name: 'Tetris' },
    { id: 5, name: 'Suro Bros' },
  ];


  const title="Arcade List";

  return (
    <div className="">
            <h1 className='text-xl font-bold my-3'>App Management</h1>

            {/* ARCADE LIST */}
<div className='xl:max-w-[70vw] mx-auto'>
          <div className='grid place-items-center  md:grid-cols-2 grid-cols-1 gap-5 '>
           <ArcadeList arcadeList={arcadeList} title={title} />
        {/* FORM */}
          

<div className='flex flex-col items-center justify-center '>
        <form className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6">
    {/* Form Title */}
    <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
        Add Arcade
    </h1>

    {/* First Field */}
    <div className="grid grid-cols-3 items-center gap-4 w-full">
        <label htmlFor="arcade1" className="text-left font-medium text-gray-700">
            Arcade ID
        </label>
        <input
            type="text"
            id="arcade1"
            name="arcade1"
            className="p-2 border border-black  focus:outline-none  rounded-full col-span-2"
       placeholder='Enter Text' />
    </div>

    {/* Second Field */} 
    <div className="grid grid-cols-3 items-center gap-4 w-full">
        <label htmlFor="arcade2" className="text-left font-medium text-gray-700">
            Coins Required
        </label>
        <input
  type="number"
  id="arcade2"
  name="arcade2"
  className="p-2 border border-black focus:outline-none rounded-full col-span-2"
  placeholder="Enter Numbers"
  pattern="^\d+$" // Regex to only allow digits
  inputMode="numeric" // Suggests numeric keyboard on mobile
  onInput={(e) => {
    // Remove any non-digit characters
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }}
/>

    </div>

    {/* Third Field */}
   <GameSelection gameOptions = {gameOptions}/>

   {/* Fourth */}
{/* Fourth */}
<CustomDropdownVenue gameOptions = {gameOptions}/>

  
    {/* Buttons */}
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

<div className='bg-white border border-black rounded-xl p-5  mt-7 sm:w-[400px] w-[250px] '>
  <h1 className='text-custom-headblue font-bold '>API Key:</h1>
  <div className="flex items-center justify-between gap-x-2 sm:gap-x-5 lg:gap-x-10  ">
  <p className='text-start sm:text-md text-sm'>38943748fds32498h2348</p>
  <Image src="/QrCode.svg" height={80} width={80} className='sm:w-[80px] sm:h-[80px] h-[40px] w-[40px]'/>
  </div>

</div>

</div>


    </div>
    </div>
    </div>
  )
}

export default Page