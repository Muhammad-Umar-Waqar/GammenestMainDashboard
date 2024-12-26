'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import showEditModal from '@/components/Modals/ArcadeEdit';
import showDeleteConfirm from '@/components/Modals/Delete';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import BlockSection from '@/components/MainDashboard/BlockSection';
import DownloadSec from '@/components/MainDashboard/DownloadSec';
import LoadingComponent from '@/components/LoadingComponent';

function Page() {
  const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
  const GAME_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_GAME_ROUTE_API_BASE_URL;
  const VENUE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_VENUE_ROUTE_API_BASE_URL;

  const [selectedGames, setSelectedGames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [api, setApi] = useState('');
  const [arcadeId, setArcadeId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [arcadeList, setArcadeList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);


  const caesarCipherEncrypt = (text, shift) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (/[a-zA-Z]/.test(c)) {
        const code = text.charCodeAt(i);
        const base = c === c.toLowerCase() ? 97 : 65;
        result += String.fromCharCode(((code - base + shift) % 26) + base);
      } else {
        result += c;
      }
    }
    return result;
  };

  const base64Encode = (input) => btoa(input);

  // Converts a Data URL to a Blob
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const generateApi = async (arcadeId) => {
    try {
      const plainText = `localhost:3001:${arcadeId}`;
      const base64Encoded = base64Encode(plainText);
      const encryptedData = caesarCipherEncrypt(base64Encoded, 5);

      setApi(encryptedData);
      setArcadeId(arcadeId);

      // Generate QR code for the API key
      const qrCodeDataUrl = await QRCode.toDataURL(encryptedData);
      setQrCodeUrl(qrCodeDataUrl);

      await axios.post(ARCADE_ROUTE_API_BASE_URL + 'arcadeapi', {
        arcade_id: arcadeId,
        api_key: encryptedData,
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to generate API key: ' + error.message, 'error');
    }
  };

  // After generating API and QR, create and download the zip file
  const createAndDownloadZip = async () => {
    if (!arcadeId || !api || !qrCodeUrl) {
      return;
    }

    try {
      const zip = new JSZip();

      // Convert QR code data URL to Blob
      const qrBlob = dataURLToBlob(qrCodeUrl);
      // Add the QR code as arcade_id.png
      zip.file(`${arcadeId}.png`, qrBlob);

      // Add API key as a text file
      const apiText = api; 
      zip.file(`${arcadeId}.txt`, apiText);

      // Generate the zip
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${arcadeId}api${api}.zip`);
    } catch (error) {
      Swal.fire('Error', 'Failed to create zip: ' + error.message, 'error');
    }
  };

  useEffect(() => {
    const fetchArcadeList = async () => {
      try {
        const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
        setArcadeList(response.data.data || []);
      } catch (error) {
        console.error('Error fetching arcade list:', error.message);
      }
    };

    const fetchGameList = async () => {
      try {
        const response = await axios.get(GAME_ROUTE_API_BASE_URL + 'getgames');
        setGameList(response.data.data || []);
      } catch (error) {
        console.error('Error fetching games list:', error.message);
      }
    };

    const fetchVenueList = async () => {
      try {
        const response = await axios.get(VENUE_ROUTE_API_BASE_URL + 'getvenues');
        setVenueList(response.data.data || []);
      } catch (error) {
        console.error('Error fetching venues list:', error.message);
      }
    };


    

    setisLoading(true);

    // Fetch data in parallel
    Promise.all([fetchArcadeList(), fetchGameList(), fetchVenueList()])
      .finally(() => {
        setisLoading(false); // Set loading to false after all requests are completed
      });
  

    // fetchArcadeList();
    // fetchGameList();
    // fetchVenueList();
  }, []);

  const fetchArcadeGames = async (arcade_id) => {
    try {
      const response = await axios.get(GAME_ROUTE_API_BASE_URL + `getgamesbyarcade/${arcade_id}`);
      return response.data.games || [];
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch arcade games: ' + error.message, 'error');
      return [];
    }
  };

  
  const fetchArcadeVenue = async (arcade_id) => {
    try {
      const response = await axios.get(VENUE_ROUTE_API_BASE_URL + `getvenuebyarcade/${arcade_id}`);
      return response.data.venue_id[0]?.venue_id || null;
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch arcade venue: ' + error.message, 'error');
      return null;
    }
  };

  const handleEditArcade = async (arcade) => {
    try {
      const arcadeGames = await fetchArcadeGames(arcade.arcade_id);
      const venueId = await fetchArcadeVenue(arcade.arcade_id);
      const plainText = `localhost:3001:${arcade.arcade_id}`;
      const base64Encoded = base64Encode(plainText);
      const encryptedData = caesarCipherEncrypt(base64Encoded, 5);

      const qrCodeDataUrl = await QRCode.toDataURL(encryptedData);

      const arcadeWithQrCode = {
        ...arcade,
        qrCode: qrCodeDataUrl,
        venue_id: venueId,
      };

      showEditModal(
        async (updatedData) => {
          try {
            await axios.post(ARCADE_ROUTE_API_BASE_URL + 'updatearcade', updatedData);
            const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
            setArcadeList(response.data.data);
          } catch (error) {
            Swal.fire('Error', 'Failed to update arcade: ' + error.message, 'error');
          }
        },
        arcadeWithQrCode,
        gameList,
        arcadeGames,
        venueList
      );
    } catch (error) {
      Swal.fire('Error', 'Failed to prepare arcade data: ' + error.message, 'error');
    }
  };

  const toggleGameSelection = (gameName) => {
    setSelectedGames((prev) =>
      prev.includes(gameName)
        ? prev.filter((name) => name !== gameName)
        : [...prev, gameName]
    );
  };

  const handleVenueSelection = (venueId) => {
    setSelectedVenue(venueId);
    setVenueDropdownOpen(false);
  };

  const handleDeleteArcade = async (arcade_id) => {
    showDeleteConfirm(async () => {
      try {
        await axios.post(ARCADE_ROUTE_API_BASE_URL + 'deletearcade', { arcade_id });
        setArcadeList((prevList) => prevList.filter((arcade) => arcade.arcade_id !== arcade_id));
      } catch (error) {
        Swal.fire('Error', 'Failed to delete arcade: ' + error.message, 'error');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arcadeID = e.target.tokenid.value.trim();
    const coinsRequired = parseInt(e.target.arcade2.value.trim(), 10);

    if (!arcadeID || !coinsRequired || selectedGames.length === 0 || !selectedVenue) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    try {
      await axios.post(ARCADE_ROUTE_API_BASE_URL + 'addarcade', {
        arcade_id: arcadeID,
        coins_required: coinsRequired,
        games: selectedGames.map((game) => gameList.find((g) => g.game_name === game)?.game_id),
        venue_id: selectedVenue,
      });

      const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
      setArcadeList(response.data.data);

      await generateApi(arcadeID);

      Swal.fire('Success', 'Arcade added successfully!', 'success');

      // After generating API and QR, create and download zip
      await createAndDownloadZip();

    } catch (error) {
      Swal.fire('Error', 'Failed to add arcade: ' + error.message, 'error');
    }
  };




  if(isLoading){
    return(
      <LoadingComponent/>
    )
  }

  
  return (
    <div className="">
      <h1 className="text-xl font-bold my-3 xs:ml-0 ml-2">Arcade Management</h1>
  
      <div className="xl:max-w-[70vw] mx-auto">
        <div className="grid place-items-center md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
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
                        <Image src="/Delete.svg" height={32} width={32} alt="Delete Icon"/>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleEditArcade(arcade)}
                      >
                        <Image src="/Setting.svg" height={32} width={32} alt="Edit Icon"/>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6"
            >
              <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
                Add Arcade
              </h1>
  
              <div className="grid grid-cols-3 items-center gap-4 w-full">
                <label htmlFor="tokenid" className="text-left font-medium text-gray-700">
                  E-Machine Token ID 
                </label>
                <input
                  type="text"
                  id="tokenid"
                  name="tokenid"
                  className="p-2 border border-black focus:outline-none rounded-full col-span-2"
                  placeholder="Enter Text"
                />
              </div>
  
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
                  pattern="^\d+$"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
              </div>
  
              <div className="grid grid-cols-3 items-center gap-4 w-full">
                <label htmlFor="arcade3" className="text-left font-medium text-gray-700">
                  Game Name
                </label>
                <div className="relative col-span-2">
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`${
                      selectedGames.length > 3 ? 'rounded-xl' : 'rounded-full'
                    } border border-black relative p-2 cursor-pointer bg-white`}
                  >
                    <span className="text-gray-600 text-sm ">
                      {selectedGames.length > 0 ? selectedGames.join(', ') : 'Select Games'}
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
  
                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                      {gameList.map((game) => (
                        <label
                          key={game.game_id}
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedGames.includes(game.game_name)}
                            onChange={() => toggleGameSelection(game.game_name)}
                          />
                          {game.game_name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 w-full">
                <label htmlFor="venue" className="text-left font-medium text-gray-700">
                  Select Venue
                </label>
                <div className="relative col-span-2">
                  <div
                    onClick={() => setVenueDropdownOpen(!venueDropdownOpen)}
                    className="rounded-full border border-black relative p-2 cursor-pointer bg-white"
                  >
                    <span className="text-gray-600 text-sm">
                      {selectedVenue
                        ? venueList.find((v) => v.venue_id === selectedVenue)?.venue_name
                        : 'Select Venue'}
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
                  {venueDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg  max-h-[250px] overflow-y-auto">
                      <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="venue"
                          className="mr-2"
                          checked={!selectedVenue}
                          onChange={() => handleVenueSelection(null)}
                        />
                        None
                      </label>
                      {venueList.map((venue) => (
                        <label
                          key={venue.venue_id}
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            name="venue"
                            className="mr-2"
                            checked={selectedVenue === venue.venue_id}
                            onChange={() => handleVenueSelection(venue.venue_id)}
                          />
                          {venue.venue_name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
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
                  className="text-red-500 py-1 px-6 rounded-xl border border-black hover:border-red-600 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className='bg-white border border-black rounded-xl p-5 mt-7 sm:w-[400px] w-[230px] mb-5'>
              <h1 className='text-custom-headblue font-bold'>API Key:</h1>
              <div className="flex items-center justify-between gap-x-2 sm:gap-x-5 lg:gap-x-10">
                <p className='text-start sm:text-md text-xs sm:w-auto w-[50%] break-words overflow-y-auto'>
                  {api}
                </p>
                {qrCodeUrl && (
                  <Image
                    src={`${qrCodeUrl}`}
                    height={80}
                    width={80}
                    alt="QR Code"
                    className='sm:w-[80px] sm:h-[80px] h-[80px] w-[80px]'
                  />
                )}
              </div>

              <DownloadSec  
              api={api} 
            qrCodeUrl={qrCodeUrl} 
              arcadeId={arcadeId}
  />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );  
}

export default Page;


















































// 'use client';

// import Image from 'next/image';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import showEditModal from '@/components/Modals/ArcadeEdit';
// import showDeleteConfirm from '@/components/Modals/Delete';
// import Swal from 'sweetalert2';
// import QRCode from 'qrcode';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';
// import BlockSection from '@/components/MainDashboard/BlockSection';
// import DownloadSec from '@/components/MainDashboard/DownloadSec';
// import LoadingComponent from '@/components/LoadingComponent';

// function Page() {
//   const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
//   const GAME_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_GAME_ROUTE_API_BASE_URL;
//   const VENUE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_VENUE_ROUTE_API_BASE_URL;

//   const [selectedGames, setSelectedGames] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [api, setApi] = useState('');
//   const [arcadeId, setArcadeId] = useState('');
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [arcadeList, setArcadeList] = useState([]);
//   const [gameList, setGameList] = useState([]);
//   const [venueList, setVenueList] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState(null);
//   const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
//   const [isLoading, setisLoading] = useState(false);


//   const caesarCipherEncrypt = (text, shift) => {
//     let result = '';
//     for (let i = 0; i < text.length; i++) {
//       const c = text[i];
//       if (/[a-zA-Z]/.test(c)) {
//         const code = text.charCodeAt(i);
//         const base = c === c.toLowerCase() ? 97 : 65;
//         result += String.fromCharCode(((code - base + shift) % 26) + base);
//       } else {
//         result += c;
//       }
//     }
//     return result;
//   };

//   const base64Encode = (input) => btoa(input);

//   // Converts a Data URL to a Blob
//   const dataURLToBlob = (dataURL) => {
//     const arr = dataURL.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
//   };

//   const generateApi = async (arcadeId) => {
//     try {
//       const plainText = `localhost:3001:${arcadeId}`;
//       const base64Encoded = base64Encode(plainText);
//       const encryptedData = caesarCipherEncrypt(base64Encoded, 5);

//       setApi(encryptedData);
//       setArcadeId(arcadeId);

//       // Generate QR code for the API key
//       const qrCodeDataUrl = await QRCode.toDataURL(encryptedData);
//       setQrCodeUrl(qrCodeDataUrl);

//       await axios.post(ARCADE_ROUTE_API_BASE_URL + 'arcadeapi', {
//         arcade_id: arcadeId,
//         api_key: encryptedData,
//       });
//     } catch (error) {
//       Swal.fire('Error', 'Failed to generate API key: ' + error.message, 'error');
//     }
//   };

//   // After generating API and QR, create and download the zip file
//   const createAndDownloadZip = async () => {
//     if (!arcadeId || !api || !qrCodeUrl) {
//       return;
//     }

//     try {
//       const zip = new JSZip();

//       // Convert QR code data URL to Blob
//       const qrBlob = dataURLToBlob(qrCodeUrl);
//       // Add the QR code as arcade_id.png
//       zip.file(`${arcadeId}.png`, qrBlob);

//       // Add API key as a text file
//       const apiText = api; 
//       zip.file(`${arcadeId}.txt`, `Arcade ID: ${arcadeId} \nAPI:  ${api}`);

//       // Generate the zip
//       const content = await zip.generateAsync({ type: "blob" });
//       saveAs(content, `${arcadeId}api${api}.zip`);
//     } catch (error) {
//       Swal.fire('Error', 'Failed to create zip: ' + error.message, 'error');
//     }
//   };

//   useEffect(() => {
//     const fetchArcadeList = async () => {
//       try {
//         const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
//         setArcadeList(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching arcade list:', error.message);
//       }
//     };

//     const fetchGameList = async () => {
//       try {
//         const response = await axios.get(GAME_ROUTE_API_BASE_URL + 'getgames');
//         setGameList(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching games list:', error.message);
//       }
//     };

//     const fetchVenueList = async () => {
//       try {
//         const response = await axios.get(VENUE_ROUTE_API_BASE_URL + 'getvenues');
//         setVenueList(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching venues list:', error.message);
//       }
//     };


    

//     setisLoading(true);

//     // Fetch data in parallel
//     Promise.all([fetchArcadeList(), fetchGameList(), fetchVenueList()])
//       .finally(() => {
//         setisLoading(false); // Set loading to false after all requests are completed
//       });
  

//     // fetchArcadeList();
//     // fetchGameList();
//     // fetchVenueList();
//   }, []);

//   const fetchArcadeGames = async (arcade_id) => {
//     try {
//       const response = await axios.get(GAME_ROUTE_API_BASE_URL + `getgamesbyarcade/${arcade_id}`);
//       return response.data.games || [];
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch arcade games: ' + error.message, 'error');
//       return [];
//     }
//   };

  
//   const fetchArcadeVenue = async (arcade_id) => {
//     try {
//       const response = await axios.get(VENUE_ROUTE_API_BASE_URL + `getvenuebyarcade/${arcade_id}`);
//       return response.data.venue_id[0]?.venue_id || null;
//     } catch (error) {
//       Swal.fire('Error', 'Failed to fetch arcade venue: ' + error.message, 'error');
//       return null;
//     }
//   };

//   const handleEditArcade = async (arcade) => {
//     try {
//       const arcadeGames = await fetchArcadeGames(arcade.arcade_id);
//       const venueId = await fetchArcadeVenue(arcade.arcade_id);
//       const plainText = `localhost:3001:${arcade.arcade_id}`;
//       const base64Encoded = base64Encode(plainText);
//       const encryptedData = caesarCipherEncrypt(base64Encoded, 5);

//       const qrCodeDataUrl = await QRCode.toDataURL(encryptedData);

//       const arcadeWithQrCode = {
//         ...arcade,
//         qrCode: qrCodeDataUrl,
//         venue_id: venueId,
//       };

//       showEditModal(
//         async (updatedData) => {
//           try {
//             await axios.post(ARCADE_ROUTE_API_BASE_URL + 'updatearcade', updatedData);
//             const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
//             setArcadeList(response.data.data);
//           } catch (error) {
//             Swal.fire('Error', 'Failed to update arcade: ' + error.message, 'error');
//           }
//         },
//         arcadeWithQrCode,
//         gameList,
//         arcadeGames,
//         venueList
//       );
//     } catch (error) {
//       Swal.fire('Error', 'Failed to prepare arcade data: ' + error.message, 'error');
//     }
//   };

//   const toggleGameSelection = (gameName) => {
//     setSelectedGames((prev) =>
//       prev.includes(gameName)
//         ? prev.filter((name) => name !== gameName)
//         : [...prev, gameName]
//     );
//   };

//   const handleVenueSelection = (venueId) => {
//     setSelectedVenue(venueId);
//     setVenueDropdownOpen(false);
//   };

//   const handleDeleteArcade = async (arcade_id) => {
//     showDeleteConfirm(async () => {
//       try {
//         await axios.post(ARCADE_ROUTE_API_BASE_URL + 'deletearcade', { arcade_id });
//         setArcadeList((prevList) => prevList.filter((arcade) => arcade.arcade_id !== arcade_id));
//       } catch (error) {
//         Swal.fire('Error', 'Failed to delete arcade: ' + error.message, 'error');
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const arcadeID = e.target.tokenid.value.trim();
//     const MinimumVal = parseInt(e.target.min.value.trim(), 10);
//     const MaximumVal = parseInt(e.target.max.value.trim(), 10);

//     if (!arcadeID || !MinimumVal || selectedGames.length === 0 || !selectedVenue || !MaximumVal) {
//       Swal.fire('Error', 'All fields are required!', 'error');
//       return;
//     }

//     try {
//       await axios.post(ARCADE_ROUTE_API_BASE_URL + 'addarcade', {
//         arcade_id: arcadeID,
//         minimum_val: MinimumVal,
//         maximum_val: MaximumVal,
//         games: selectedGames.map((game) => gameList.find((g) => g.game_name === game)?.game_id),
//         venue_id: selectedVenue,
//       });

//       const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcades');
//       setArcadeList(response.data.data);

//       await generateApi(arcadeID);

//       Swal.fire('Success', 'Arcade added successfully!', 'success');

//       // After generating API and QR, create and download zip
//       await createAndDownloadZip();

//     } catch (error) {
//       Swal.fire('Error', 'Failed to add arcade: ' + error.message, 'error');
//     }
//   };




//   if(isLoading){
//     return(
//       <LoadingComponent/>
//     )
//   }

  
//   return (
//     <div className="">
//       <h1 className="text-xl font-bold my-3 xs:ml-0 ml-2">Arcade Management</h1>
  
//       <div className="xl:max-w-[70vw] mx-auto">
//         <div className="grid place-items-center md:grid-cols-2 grid-cols-1 gap-5">
//           <div>
//             <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
//               <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue">
//                 Arcade List
//               </h2>
//               <ul className="">
//                 {arcadeList.map((arcade) => (
//                   <li
//                     key={arcade.arcade_id}
//                     className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
//                   >
//                     <div className='break-words sm:whitespace-nowrap xs:text-auto text-sm xs:w-auto w-[130px] px-1'>{arcade.arcade_id}</div>
//                     <div className="flex space-x-2">
//                       <button
//                         className="text-blue-500 hover:text-blue-700"
//                         onClick={() => handleDeleteArcade(arcade.arcade_id)}
//                       >
//                         <Image src="/Delete.svg" height={32} width={32} alt="Delete Icon"/>
//                       </button>
//                       <button
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() => handleEditArcade(arcade)}
//                       >
//                         <Image src="/Setting.svg" height={32} width={32} alt="Edit Icon"/>
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
  
//           <div className="flex flex-col items-center justify-center">
//             <form
//               onSubmit={handleSubmit}
//               className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6"
//             >
//               <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
//                 Add Arcade
//               </h1>
  
//               <div className="grid grid-cols-3 items-center gap-4 w-full">
//                 <label htmlFor="tokenid" className="text-left font-medium text-gray-700">
//                   E-Machine Token ID 
//                 </label>
//                 <input
//                   type="text"
//                   id="tokenid"
//                   name="tokenid"
//                   className="p-2 border border-black focus:outline-none rounded-full col-span-2"
//                   placeholder="Enter Text"
//                 />
//               </div>
  
//               <div className="grid grid-cols-3 items-center gap-4 w-full">
//                 <label htmlFor="max" className="text-left font-medium text-gray-700">
//                   Maximum Value
//                 </label>
//                 <input
//                   type="number"
//                   id="max"
//                   name="max"
//                   className="p-2 border border-black focus:outline-none rounded-full col-span-2"
//                   placeholder="Enter Numbers"
//                   pattern="^\d+$"
//                   inputMode="numeric"
//                   onInput={(e) => {
//                     e.target.value = e.target.value.replace(/[^0-9]/g, '');
//                   }}
//                 />
//               </div>

//               <div className="grid grid-cols-3 items-center gap-4 w-full">
//                 <label htmlFor="min" className="text-left font-medium text-gray-700">
//                   Minimum Value
//                 </label>
//                 <input
//                   type="number"
//                   id="min"
//                   name="min"
//                   className="p-2 border border-black focus:outline-none rounded-full col-span-2"
//                   placeholder="Enter Numbers"
//                   pattern="^\d+$"
//                   inputMode="numeric"
//                   onInput={(e) => {
//                     e.target.value = e.target.value.replace(/[^0-9]/g, '');
//                   }}
//                 />
//               </div>
  
//               <div className="grid grid-cols-3 items-center gap-4 w-full">
//                 <label htmlFor="arcade3" className="text-left font-medium text-gray-700">
//                   Game Name
//                 </label>
//                 <div className="relative col-span-2">
//                   <div
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className={`${
//                       selectedGames.length > 3 ? 'rounded-xl' : 'rounded-full'
//                     } border border-black relative p-2 cursor-pointer bg-white`}
//                   >
//                     <span className="text-gray-600 text-sm ">
//                       {selectedGames.length > 0 ? selectedGames.join(', ') : 'Select Games'}
//                     </span>
//                     <svg
//                       className="absolute top-3 right-1 w-4 h-4 text-gray-500 inline-block float-right"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       ></path>
//                     </svg>
//                   </div>
  
//                   {dropdownOpen && (
//                     <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[250px] overflow-y-auto">
//                       {gameList.map((game) => (
//                         <label
//                           key={game.game_id}
//                           className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                         >
//                           <input
//                             type="checkbox"
//                             className="mr-2"
//                             checked={selectedGames.includes(game.game_name)}
//                             onChange={() => toggleGameSelection(game.game_name)}
//                           />
//                           {game.game_name}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4 w-full">
//                 <label htmlFor="venue" className="text-left font-medium text-gray-700">
//                   Select Venue
//                 </label>
//                 <div className="relative col-span-2">
//                   <div
//                     onClick={() => setVenueDropdownOpen(!venueDropdownOpen)}
//                     className="rounded-full border border-black relative p-2 cursor-pointer bg-white"
//                   >
//                     <span className="text-gray-600 text-sm">
//                       {selectedVenue
//                         ? venueList.find((v) => v.venue_id === selectedVenue)?.venue_name
//                         : 'Select Venue'}
//                     </span>
//                     <svg
//                       className="absolute top-3 right-1 w-4 h-4 text-gray-500 inline-block float-right"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       ></path>
//                     </svg>
//                   </div>
//                   {venueDropdownOpen && (
//                     <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg  max-h-[250px] overflow-y-auto">
//                       <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
//                         <input
//                           type="radio"
//                           name="venue"
//                           className="mr-2"
//                           checked={!selectedVenue}
//                           onChange={() => handleVenueSelection(null)}
//                         />
//                         None
//                       </label>
//                       {venueList.map((venue) => (
//                         <label
//                           key={venue.venue_id}
//                           className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                         >
//                           <input
//                             type="radio"
//                             name="venue"
//                             className="mr-2"
//                             checked={selectedVenue === venue.venue_id}
//                             onChange={() => handleVenueSelection(venue.venue_id)}
//                           />
//                           {venue.venue_name}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
  
//               <div className="flex justify-end w-full space-x-4">
//                 <button
//                   type="submit"
//                   className="bg-custom-headblue text-white py-1 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   className="text-red-500 py-1 px-6 rounded-xl border border-black hover:border-red-600 hover:text-black"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//             <div className='bg-white border border-black rounded-xl p-5 mt-7 sm:w-[400px] w-[230px] mb-5'>
//               <h1 className='text-custom-headblue font-bold'>API Key:</h1>
//               <div className="flex items-center justify-between gap-x-2 sm:gap-x-5 lg:gap-x-10">
//                 <p className='text-start sm:text-md text-xs sm:w-auto w-[50%] break-words overflow-y-auto'>
//                   {api}
//                 </p>
//                 {qrCodeUrl && (
//                   <Image
//                     src={`${qrCodeUrl}`}
//                     height={80}
//                     width={80}
//                     alt="QR Code"
//                     className='sm:w-[80px] sm:h-[80px] h-[80px] w-[80px]'
//                   />
//                 )}
//               </div>

//               <DownloadSec  
//               api={api} 
//             qrCodeUrl={qrCodeUrl} 
//               arcadeId={arcadeId}
//   />
//             </div>

            
//           </div>
//         </div>
//       </div>
//     </div>
//   );  
// }

// export default Page;
