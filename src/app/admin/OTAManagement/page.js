'use client'

import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


function Page() {
    const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
    // const OTA_ROUTE_API_BASE_URL = process.env.NEXT_OTA_ROUTE_API_BASE_URL;
    const [arcadeList, setArcadeList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedArcades, setSelectedArcades] = useState([]);
    const [versionId, setVersionId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [options, setOptions] = useState([]); // Dynamically fetched options

   

    const handleSelect = (option) => {
        setSelectedOption(option);
        setVersionId(option); // Update versionId based on selection
        setIsOpen(false);
    };

    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
  
 const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };
  
    const handleDragLeave = () => {
      setIsDragging(false);
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        setFileName(file.name);
      }
    };

    const handleCheckboxChange = (arcadeId) => {
      setSelectedArcades((prevSelected) =>
        prevSelected.includes(arcadeId)
          ? prevSelected.filter((id) => id !== arcadeId) // Remove if already selected
          : [...prevSelected, arcadeId] // Add if not selected
      );
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

        const fetchVersionList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v2/otaRoutes/getVersion');
                const versionData = response.data.data[0].map((item) => item.version_id); // Extract version_id
                setOptions(versionData); // Update options dynamically
            } catch (error) {
                console.error('Error fetching version list:', error.message);
            }
        };


        fetchArcadeList();
        fetchVersionList();
    }, [])



    const handleVersionChange = (event) => {
        setVersionId(event.target.value);
    };
    

    const handleSubmit = async () => {
        if (!versionId) {
            alert('Please provide a Version ID.');
            return;
        }
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('otaFile', selectedFile);
        formData.append('version_id', versionId);

      
        

        try {
            const response = await axios.post(`http://localhost:3001/api/v2/otaRoutes/uploadFile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
                console.log("response>>", response)
            if (response.status === 201) {
                alert('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };




    return (
        <div className='flex items-center lg:flex-row flex-col h-[10] justify-center md:justify-around p-2'>
            {/* Add OTA */}
            <div>
                <div className='bg-white p-5 xs:min-w-[60vw] sm:min-w-[500px] rounded-xl'>

                  <h1 className='text-md font-semibold  text-custom-blue'>Add OTA:</h1>
                  <div className='flex items-center justify-between gap-2'>
                  <label htmlFor="arcade1" className="text-left font-medium text-gray-700">
                  OTA Version ID
                </label>
                <div className='relative'>
                <input
                  type="text"
                  id="arcade1"
                  name="arcade1"
                  className="sm:p-2  p-1 border border-black focus:outline-none rounded-full w-[170px] sm:w-[250px] md:w-[300px]"
                  placeholder="Enter Text"
                  value={versionId}
                  onChange={handleVersionChange}
                  />
                <p className='absolute top-[-10] right-3 '>Eg. 3-05-12</p>
                </div>
                  </div>

                  <div
      className={`bg-[#70CECA] border p-5 border-[#49908D] mt-10 rounded-xl flex items-center justify-center flex-col gap-y-2 ${
        isDragging ? 'border-dashed border-white' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Image src="/Cloud.svg" height={100} width={70} alt="Upload Icon" />
      <h1 className="text-sm text-white">Drag And Drop To Upload File</h1>
      <h2 className="text-sm text-white">OR</h2>
      <div className="relative">
        <label
          htmlFor="fileUpload"
          className="bg-white text-[#70CECA] py-1 px-2 rounded-lg w-[200px] sm:w-auto cursor-pointer text-center block"
        >
          {fileName ? 'Change File' : 'Browse Files'}
        </label>
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          name="Browse File"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="mt-2 text-sm text-gray-500">
            Selected File: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </div>
    </div>

                <div className="flex justify-end w-full space-x-4 mt-5 mb-2">
                <button
                   type="button"
                   onClick={handleSubmit}
                  className="bg-custom-headblue text-white py-1 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-500 py-1 px-6 rounded-xl border border-black hover:border-red-600 hover:text-black"
                >
                  Cancel
                </button>
              </div>
           

                </div>
            </div>
            {/* ARCADE LIST */}
            <div>
                <div className='flex flex-col justify-start items-start'>
                <div className="flex justify-start items-center bg-gray-100">
                <div className="relative min-w-[200px] my-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none"
                >
                    <span className="block truncate">
                        {selectedOption ? (
                            <div>
                                <h1 className="font-bold">
                                    Version ID &nbsp;{' '}
                                    <span className="font-normal">{selectedOption}</span>
                                </h1>
                            </div>
                        ) : (
                            <h1 className="font-bold">Version ID</h1>
                        )}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                            className={`h-5 w-5 transform transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 0 01-1.414 0l-4-4a1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto border border-gray-200 transition-transform transform scale-95 origin-top opacity-100 animate-dropdown">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="cursor-pointer select-none relative py-2 pl-10 pr-4"
                            >
                                <span
                                    className={`block truncate ${
                                        selectedOption === option ? 'font-medium' : 'font-normal'
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
               <div className="rounded-xl bg-white p-5">
      <div className="max-h-[53vh] bg-white min-h-[45vh] md:min-w-[60vw] xs:min-w-[60vw] lg:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto rounded-xl">
        <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue">
          Arcade List
        </h2>
        <ul>
          {arcadeList.map((arcade) => (
            <li
              key={arcade.arcade_id}
              className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`arcade-${arcade.arcade_id}`}
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedArcades.includes(arcade.arcade_id)}
                  onChange={() => handleCheckboxChange(arcade.arcade_id)}
                />
                <label
                  htmlFor={`arcade-${arcade.arcade_id}`}
                  className="break-words sm:whitespace-nowrap xs:text-auto text-sm xs:w-auto w-[130px] px-1 cursor-pointer"
                >
                  {arcade.arcade_id}
                </label>
              </div>
              <div className="flex space-x-2">2.1.23</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
                <div className='bg-white grid grid-cols-2 gap-2 p-2 my-2  md:min-w-[60vw] lg:min-w-[30vw]  xs:min-w-[70vw]  min-w-[90vw] max-w-[40vw] rounded-xl'>
                        {/* DIV1 */}
                        <div className='flex flex-col items-start justify-start gap-2'>
                                <div className='bg-[#D9D9D9] rounded-xl sm:px-8 px-2 py-3 text-md flex items-center justify-center '>
                                    No of Devices: <span className=' font-bold text-[#818181] px-2 text-2xl'>09</span>
                                </div>
                                <div className='grid  grid-cols-2 gap-2'>
                                        <div className='bg-[#6CCD87] p-5 px-[29px] rounded-xl flex items-center justify-center flex-col '>
                                            <h1 className='text-xl '>Pass</h1>
                                            <h1 className='font-bold text-2xl text-white '>06</h1>
                                        </div>
                                        <div className='bg-[#FAB09A] p-5  px-[29px] rounded-xl flex items-center justify-center flex-col '>
                                            <h1 className='text-xl '>Fail</h1>
                                            <h1 className='font-bold text-2xl text-white '>06</h1>
                                        </div>
                                </div>
                        </div>
                        {/* DIV2 */}
                            <button className='bg-[#2C509A] rounded-xl flex items-center justify-center p-2 text-xl text-white'>    
                                OTA
                            </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Page






















