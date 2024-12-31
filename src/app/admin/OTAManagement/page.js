'use client'
import { Option, Select } from '@material-tailwind/react';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


function Page() {
    const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
    const [arcadeList, setArcadeList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ["2.05.10", "2.05.11", "3.0.0"];
  
    const handleSelect = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  

    useEffect(() => {
        const fetchArcadeList = async () => {
            try {
                const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
                setArcadeList(response.data.data || []);
                console.log("RES", response.data.data);

            } catch (error) {
                console.error('Error fetching arcade list:', error.message);
            }
        };

        fetchArcadeList();
    }, [])


    return (
        <div className='flex items-center sm:flex-row flex-col h-[10] justify-center md:justify-around p-2'>
            {/* Add OTA */}
            <div>

            </div>
            {/* ARCADE LIST */}
            <div>
                <div className='flex flex-col justify-start items-start'>
                <div className="flex justify-start items-center bg-gray-100">
      <div className="relative min-w-[200px] my-2">
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none "
        >
        <span className="block truncate">
            {selectedOption ? (
                <div>
                    <h1 className='font-bold '>Version ID &nbsp; <span className='font-normal'> {selectedOption} </span></h1>
                </div>
            ) : (
               <h1 className='font-bold'>Version ID</h1>
                
                
            )}
        </span>

          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className={`h-5 w-5 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto border border-gray-200 transition-transform transform scale-95 origin-top opacity-100 animate-dropdown"
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="cursor-pointer select-none relative py-2 pl-10 pr-4 "
              >
                <span
                  className={`block truncate ${
                    selectedOption === option ? "font-medium" : "font-normal"
                  }`}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
                <div className='rounded-xl bg-white p-5'>
                    <div className="max-h-[62vh] bg-white min-h-[45vh] md:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto  rounded-xl ">
                        <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue">
                            Arcade List
                        </h2>
                        <ul className="">
                            {arcadeList.map((arcade) => (
                                <li
                                    key={arcade.arcade_id}
                                    className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
                                >
                                    <div className='break-words sm:whitespace-nowrap xs:text-auto text-sm xs:w-auto w-[130px] px-1'>{arcade.arcade_id}</div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleDeleteArcade(arcade.arcade_id)}
                                        >
                                            <Image src="/Delete.svg" height={32} width={32} alt="Delete Icon" />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleEditArcade(arcade)}
                                        >
                                            <Image src="/Setting.svg" height={32} width={32} alt="Edit Icon" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='bg-white grid grid-cols-2 gap-2'>
                        {/* DIV1 */}
                        <div className='flex flex-col items-start justify-start gap-2'>
                                <div className='bg-[#D9D9D9] rounded-xl '>
                                    No of Devices: <span className='text-xl font-bold'>09</span>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                        <div className='bg-[#6CCD87] p-5 rounded-xl'>
                                            <h1>Pass</h1>
                                            <h1>06</h1>
                                        </div>
                                        <div className='bg-[#FAB09A] p-5 rounded-xl'>
                                            <h1>Fail</h1>
                                            <h1>06</h1>
                                        </div>
                                </div>
                        </div>
                        {/* DIV2 */}
                            <div className='bg-[#2C509A] rounde-xl'>    
                                OTA
                            </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Page