// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import "./Chart.css";
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from "next/navigation";
// import axios from "axios";

// function Page() {
//   const USER_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_USER_ROUTE_API_BASE_URL;
//   const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
//   const VENUE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_VENUE_ROUTE_API_BASE_URL;
//   const { authState } = useAuth();
//   const [arcades, setArcades] = useState([]);
//   const [noOfVenues, setNoOfVenues] = useState('-');
//   const [noOfArcades, setNoOfArcades] = useState('-');
//   const [noOfManagers, setNoOfManagers] = useState('-');
//   const router = useRouter();  
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [selectedVenue, setSelectedVenue] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [venues, setVenues] = useState([]);

//   const [selectedArcadeDetails, setSelectedArcadeDetails] = useState(null);

//   const handleVenueSelection = (selection) => {
//     console.log(selection)
//     if (selection === 'All') {
//       setSelectedVenue('All'); 
//       fetchArcades();
//       setDropdownOpen(false);
//     } else {
//       // Handle specific venue selection
//       setSelectedVenue(selection);
//       console.log(selection);
//       fetchArcadesByVenue(selection.venue_id)
//       setDropdownOpen(false);
//     }
//   };

//   const handleArcadeClick = (arcade_id) => {
//     const arcade = arcades.find(a => a.arcade_id === arcade_id);
//     if (arcade) {
//       setSelectedArcadeDetails(arcade);
//       // Use router from next/navigation for navigation
//       router.push(`/admin/mainDashboard?arcade_id=${arcade.arcade_id}&coins=${arcade.coins}&hardPlay=${arcade.hardPlay}`);
//     }
//   };

//   // Function to send data every 30 seconds
// const sendData = async (arcade_id) => {

//   const payload = { arcadeId: arcade_id, coins: 1, hardPlay: 1 };

//   console.log(
//     `[${new Date().toLocaleTimeString()}] Sending Payload: ${JSON.stringify(
//       payload
//     )}`
//   );

//   try {
//     const response = await fetch('http://localhost:3000/api/ArcadeData', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.text(); // Capture response error details
//       console.error(
//         `[${new Date().toLocaleTimeString()}] Error: ${
//           response.status
//         } - ${errorResponse}`
//       );
//       return;
//     }

//     const result = await response.json();
//     console.log(
//       `[${new Date().toLocaleTimeString()}] Success Response: ${JSON.stringify(
//         result
//       )}`
//     );
//   } catch (error) {
//     console.error(
//       `[${new Date().toLocaleTimeString()}] Network Error: ${
//         error.stack || error.message
//       }`
//     );
//   }
// };

//   const fetchArcadesByVenue = async (venue_id) => {
//     try {
//       const arcadesResponse = await axios.get(`${ARCADE_ROUTE_API_BASE_URL}arcadesbyvenue/${venue_id}`);
//       const arcadesData = arcadesResponse.data.data || [];

//       const influxResponse = await axios.get(`http://localhost:3000/api/ArcadeData?timeRange=-96h`);
//       const influxData = influxResponse.data.data || [];

//       const measurementData = influxData.reduce((acc, entry) => {
//         if (!acc[entry.measurement]) {
//           acc[entry.measurement] = { coins: 0, hardPlay: 0 };
//         }
//         acc[entry.measurement].coins += entry.coins || 0;
//         acc[entry.measurement].hardPlay += entry.hardPlay || 0;
//         return acc;
//       }, {});

//       const updatedArcades = arcadesData.map((arcade) => {
//         const measurement = measurementData[arcade.arcade_id] || { coins: 0, hardPlay: 0 };
//         return {
//           ...arcade,
//           coins: measurement.coins,
//           hardPlay: measurement.hardPlay,
//         };
//       });

//       const totalRevenue = updatedArcades.reduce((sum, arcade) => sum + arcade.coins, 0);

//       setArcades(updatedArcades);
//       setTotalRevenue(totalRevenue);
//     } catch (error) {
//       console.error("Error fetching arcades:", error);
//     }
//   };

//   const fetchArcades = async () => {
//     try {
//       const arcadesResponse = await axios.get(`${ARCADE_ROUTE_API_BASE_URL}getarcades`);
//       const arcadesData = arcadesResponse.data.data || [];

//       const influxResponse = await axios.get(`http://localhost:3000/api/ArcadeData?timeRange=-48h`);
//       const influxData = influxResponse.data.data || [];

//       const measurementData = influxData.reduce((acc, entry) => {
//         if (!acc[entry.measurement]) {
//           acc[entry.measurement] = { coins: 0, hardPlay: 0 };
//         }
//         acc[entry.measurement].coins += entry.coins || 0;
//         acc[entry.measurement].hardPlay += entry.hardPlay || 0;
//         return acc;
//       }, {});

//       const updatedArcades = arcadesData.map((arcade) => {
//         const measurement = measurementData[arcade.arcade_id] || { coins: 0, hardPlay: 0 };
//         return {
//           ...arcade,
//           coins: measurement.coins,
//           hardPlay: measurement.hardPlay,
//         };
//       });

//       const totalRevenue = updatedArcades.reduce((sum, arcade) => sum + arcade.coins, 0);

//       setArcades(updatedArcades);
//       setTotalRevenue(totalRevenue);
//       setNoOfArcades(updatedArcades.length);

//     } catch (error) {
//       console.error("Error fetching arcades:", error);
//     }
//   };

//   useEffect(() => {
//     // if (!authState.loginStatus) {
//     //   Swal.fire("Not signed in. Please sign in first")
//     //   router.replace('/signin');
//     // }

//     const fetchVenues = async () => {
//       try {
//         const response = await fetch(VENUE_ROUTE_API_BASE_URL + `getvenues`);
//         const data = await response.json();
//         setVenues(data.data || []);
//       } catch (error) {
//         console.error("Error fetching venues:", error);
//       }
//     };

//     const fetchNoOfArcades = async () => {
//       try {
//         const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcadecount');
//         const data = response.data;
//         setNoOfArcades(data.count);
//       } catch (error) {
//         console.error("Error fetching arcades count:", error);
//       }
//     };

//     const fetchNoOfManagers = async () => {
//       try {
//         const response = await axios.get(USER_ROUTE_API_BASE_URL + `getmanagercount`);
//         const data = response.data;
//         setNoOfManagers(data.count || 0);
//       } catch (error) {
//         console.error("Error fetching managers count:", error);
//       }
//     };

//     const fetchNoOfVenues = async () => {
//       try {
//         const response = await axios.get(VENUE_ROUTE_API_BASE_URL + 'getvenuecount');
//         const data = response.data;
//         setNoOfVenues(data.count || 0);
//       } catch (error) {
//         console.error("Error fetching venue count:", error);
//       }
//     };

//     fetchArcades();
//     fetchVenues();
//     fetchNoOfArcades();
//     fetchNoOfManagers();
//     fetchNoOfVenues();
//     loadScript();
//   }, []);

//   const loadScript = () => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
//     script.async = true;
//     script.onload = () => fetchDataAndRenderChart();
//     document.body.appendChild(script);
//   };

//   const fetchDataAndRenderChart = async () => {
//     try {
//       // If no arcades are available for the current selection, display a message
//       if (!arcades || arcades.length === 0) {
//         console.warn("No arcades available for the selected venue.");
        
//         // Optionally, you can update the DOM to show a user-friendly message:
//         const chartContainer = document.querySelector("#bar-chart");
//         if (chartContainer) {
//           chartContainer.innerHTML = "<p class='no-data-message'>No arcade data available for the selected venue.</p>";
//         }
//         return; // Stop execution here
//       }
  
//       const primaryArcade = arcades[0];
  
//       const response = await fetch(
//         `http://localhost:3000/api/ArcadeData?measurement=${primaryArcade.arcade_id}&timeRange=-48h`
//       );
  
//       if (!response.ok) {
//         throw new Error(`API responded with status ${response.status}`);
//       }
  
//       const result = await response.json();
//       if (!result.data || result.data.length === 0) {
//         console.error("No valid data received from the API.");
//         // Display a message in the chart area
//         const chartContainer = document.querySelector("#bar-chart");
//         if (chartContainer) {
//           chartContainer.innerHTML = "<p class='no-data-message'>No data received from the server.</p>";
//         }
//         return;
//       }
  
//       const seriesData = result.data.map((item) => ({
//         x: new Date(item.time).toLocaleString(undefined, {
//           weekday: "short",
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         y: parseFloat(item.coins).toFixed(2),
//       }));
  
//       const chartConfig = {
//         series: [
//           {
//             name: `${primaryArcade.arcade_id} Data`,
//             data: seriesData.slice(0, 6),
//           },
//         ],
//         chart: {
//           type: "bar",
//           height: 300,
//           toolbar: { show: true },
//         },
//         plotOptions: {
//           bar: {
//             columnWidth: "80%",
//             borderRadius: window.innerWidth < 640 ? 10 : 20,
//           },
//         },
//         xaxis: {
//           type: "category",
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "8px",
//               fontFamily: "inherit",
//               fontWeight: 400,
//             },
//           },
//         },
//         yaxis: {
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "8px",
//               fontFamily: "inherit",
//               fontWeight: 400,
//             },
//           },
//         },
//         grid: {
//           yaxis: { lines: { show: true } },
//           xaxis: { lines: { show: false } },
//         },
//         fill: { opacity: 0.7 },
//         tooltip: { theme: "dark" },
//       };
  
//       const chartElement = document.querySelector("#bar-chart");
//       if (chartElement) {
//         // Clear any previous message
//         chartElement.innerHTML = "";
//         const chart = new ApexCharts(chartElement, chartConfig);
//         chart.render();
//       } else {
//         console.error("Chart container not found!");
//       }
  
//     } catch (error) {
//       console.error("Error fetching or rendering chart data:", error);
//       const chartContainer = document.querySelector("#bar-chart");
//       if (chartContainer) {
//         chartContainer.innerHTML = "<p class='no-data-message'>An error occurred while fetching data.</p>";
//       }
//     }
//   };
  
//   return (
//     <div className="flex flex-col mt-5 justify-around items-center bg-cover bg-center z-0">
//       {/* Existing UI unchanged */}
//       <div className="flex flex-col justify-center items-center">
//         <div className="bg-custom-headpurple flex rounded-full items-center justify-between p-2 xl:w-[800px] sm:w-full xs:w-[320px] w-[250px] relative">
//           <h1 className="ml-3 font-bold text-2xl md:block hidden">Dashboard</h1>
//           <div className="p-10 flex items-center">
//             <div className="absolute xs:right-[2px] right-[2px] sm:right-2 z-20 border-[7px] border-custom-headpurple rounded-full bg-purple-300 xs:pr-[10px] xs:px-5 xs:py-1 sm:px-5 p-3">
//               <div className="text-sm text-start sm:flex items-center justify-left sm:space-x-1">
//                 <div>No. Of</div>
//                 <h1>Managers</h1>
//               </div>
//               <div className="flex items-center sm:justify-around justify-start">
//                 <Image
//                   src="/ManagDash.svg"
//                   height={40}
//                   width={40}
//                   className="sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]"
//                   alt="Manager Icon"
//                 />
//                 <h1 className="text-2xl ml-2 font-bold text-gray-700">{noOfManagers}</h1>
//               </div>
//             </div>
//             <div className="absolute xs:right-[105px] right-[80px] sm:right-[130px] z-10 border-[7px] border-custom-headpurple rounded-full bg-purple-300 sm:pr-[60px] xs:pr-[10px] xs:px-5 xs:py-1 sm:px-5 p-3">
//               <div className="text-sm text-start sm:flex items-center justify-left sm:space-x-1">
//                 <div>No. Of</div>
//                 <h1>Arcades</h1>
//               </div>
//               <div className="flex items-center sm:justify-around justify-start">
//                 <Image
//                   src="/ManagDash.svg"
//                   height={40}
//                   width={40}
//                   className="sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]"
//                   alt="Arcade Icon"
//                 />
//                 <h1 className="text-2xl ml-2 font-bold text-gray-700">{noOfArcades}</h1>
//               </div>
//             </div>
//             <div className="absolute xs:right-[210px] sm:right-[250px] right-[160px] z-8 border-[7px] border-custom-headpurple rounded-full bg-purple-300 sm:pr-[110px] xs:pr-[10px] xs:px-5 xs:py-1 sm:px-5 px-4 p-3">
//               <div className="text-sm text-start sm:flex items-center justify-left sm:space-x-1">
//                 <div>No. Of</div>
//                 <h1>Venues</h1>
//               </div>
//               <div className="flex items-center sm:justify-around justify-start">
//                 <Image
//                   src="/ManagDash.svg"
//                   height={40}
//                   width={40}
//                   className="sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]"
//                   alt="Venue Icon"
//                 />
//                 <h1 className="text-2xl ml-2 font-bold text-gray-700">{noOfVenues}</h1>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Arcade Cards */}
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-10 pt-10 sm:ml-[5px] gap-y-20 xl:max-w-[850px] xl:max-h-[500px] overflow-y-auto">
//   {arcades.map((arcade) => (
//     <div
//       key={arcade.arcade_id}
//       className="bg-white border border-black shadow-md rounded-xl w-[230px] mx-5 relative p-5 flex flex-col items-center justify-center gap-y-3"
//       onClick={() => handleArcadeClick(arcade.arcade_id)} // Parent click handler
//     >
//       <div className="z-[-1] bg-custom-headpurple px-3 flex items-center justify-around absolute top-[-35px] left-0 rounded-t-xl py-3">
//         <h1 className="font-mono text-sm text-white">{arcade.arcade_id}</h1>
//         <div className="text-sm ml-3 text-white font-mono">ARCADE ID</div>
//       </div>
//       <div className="flex items-center justify-center">
//         <h1 className="text-2xl">
//           Coins: <span className="font-bold">{arcade.coins}</span>
//         </h1>
//         <Image src="/coins.svg" className="m-2" height={43} width={33} alt="Coins Icon" />
//       </div>
//       <div>
//         <h1 className="text-2xl font-bold">
//           Revenue: <span className="font-bold">{(arcade.coins * 0.25).toFixed(2)}</span>
//         </h1>
//       </div>
//       <div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             sendData(arcade.arcade_id);
//           }}
//           className="bg-custom-headpurple px-7 text-white border border-black py-1 rounded-xl"
//         >
//           Play
//         </button>
//       </div>
//       <div className="absolute bottom-2 right-2">
//         <Image src="/coinsBag.svg" height={59} width={59} alt="Bag of Coins" />
//       </div>
//     </div>
//   ))}
// </div>

//       </div>

//       <div className="flex flex-col items-center w-full">
//   <div className="relative w-[250px] sm:w-[450px] xl:w-[400px] mb-5">
//     <div
//       onClick={() => setDropdownOpen(!dropdownOpen)}
//       className={`rounded-lg border border-black relative p-2 cursor-pointer bg-custom-headblue`}
//     >
//       <span className="text-white text-sm">
//         {selectedVenue ? selectedVenue.venue_name || 'All' : 'All'}
//       </span>
//       <svg
//         className="absolute top-[5px] right-1 w-7 h-7 text-custom-headblue bg-white rounded-md inline-block float-right"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M19 9l-7 7-7-7"
//         ></path>
//       </svg>
//     </div>

//         {dropdownOpen && (
//   <div className="absolute z-10 mt-1 w-full bg-gray-200 border border-gray-300 rounded-md shadow-lg">
//     {/* 'All' Option */}
//     <label
//       className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-custom-headblue"
//     >
//       <input
//         type="radio"
//         name="venue"
//         className="mr-2 absolute opacity-0 pointer-events-none"
//         checked={!selectedVenue || selectedVenue === 'All'}
//         onChange={() => handleVenueSelection('All')} // Pass 'All' for the All option
//       />
//       All
//     </label>

//     {/* Venue Options */}
//     {venues.map((venue) => (
//       <label
//         key={venue.venue_id}
//         className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-custom-headblue"
//       >
//         <input
//           type="radio"
//           name="venue"
//           className="mr-2 absolute opacity-0 pointer-events-none"
//           checked={selectedVenue?.venue_id === venue.venue_id}
//           onChange={() => handleVenueSelection(venue)}
//         />
//         {venue.venue_name}
//       </label>
//     ))}
//   </div>
// )}

      
//   </div>

//         <div className="bg-white border border-black rounded-xl p-3 max-w-[400px] w-full">
//           <div className="grid grid-cols-3 p-2 gap-x-2">
//             {/* Hard Play Widget */}
//             <div className="border bg-custom-cardpeach border-gray-300 rounded-xl shadow-md flex flex-col items-center justify-center sm:py-4 py-2 sm:gap-y-3">
//               <h1 className="text-xl">Hard Play</h1>
//               <div className="flex items-center">
//                 <h1 className="text-md font-bold text-2xl">
//                   {arcades.reduce((sum, arcade) => sum + (arcade.hardPlay || 0), 0)}
//                 </h1>
//                 <Image src="/USD.svg" height={50} width={50} alt="Play Icon"/>
//               </div>
//               <h1 className="text-lg">Plays</h1>
//             </div>

//             {/* Revenue Widget */}
//             <div className="border bg-custom-cardpeach border-gray-300 rounded-xl shadow-md flex flex-col items-center justify-center sm:py-4 py-2 sm:gap-y-3">
//               <h1 className="text-xl">Revenue</h1>
//               <div className="flex items-center">
//                 <h1 className="text-md font-bold text-2xl">{(totalRevenue * 0.25).toFixed(2)}</h1>
//                 <Image src="/USD.svg" height={50} width={50} alt="Revenue Icon"/>
//               </div>
//               <h1 className="text-lg">Dollar</h1>
//             </div>

//             {/* Token Widget */}
//             <div className="border bg-custom-cardpeach border-gray-300 rounded-xl shadow-md flex flex-col items-center justify-center sm:py-4 py-2 sm:gap-y-3">
//               <h1 className="text-xl">Token</h1>
//               <div className="flex items-center">
//                 <h1 className="text-md font-bold text-2xl">{arcades.reduce((sum, arcade) => sum + (arcade.coins || 0), 0)}</h1>
//                 <Image src="/USD.svg" height={50} width={50} alt="Token Icon"/>
//               </div>
//               <h1 className="text-lg">Coin</h1>
//             </div>
//           </div>

//           <div className="dashboard-graph max-w-[400px] max-h-[350px] overflow-y-hidden">
//             <div className="pt-6 px-2 pb-0">
//               <div id="bar-chart"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;





































"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./Chart.css";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import axios from "axios";
import "./Chart.css"
import LoadingComponent from "@/components/LoadingComponent";
function Page() {




  const USER_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_USER_ROUTE_API_BASE_URL;
  const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
  const VENUE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_VENUE_ROUTE_API_BASE_URL;
  const { authState } = useAuth();
  const [arcades, setArcades] = useState([]);
  const [noOfVenues, setNoOfVenues] = useState('-');
  const [noOfArcades, setNoOfArcades] = useState('-');
  const [noOfManagers, setNoOfManagers] = useState('-');
  const router = useRouter();  
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [venues, setVenues] = useState([]);

  const [selectedArcadeDetails, setSelectedArcadeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state


  const handleVenueSelection = (selection) => {
    console.log(selection)
    if (selection === 'All') {
      setSelectedVenue('All'); 
      fetchArcades();
      setDropdownOpen(false);
    } else {
      // Handle specific venue selection
      setSelectedVenue(selection);
      console.log(selection);
      fetchArcadesByVenue(selection.venue_id)
      setDropdownOpen(false);
    }
  };

  const handleArcadeClick = (arcade_id) => {
    const arcade = arcades.find(a => a.arcade_id === arcade_id);
    if (arcade) {
      setSelectedArcadeDetails(arcade);
      // Use router from next/navigation for navigation
      router.push(`/admin/mainDashboard?arcade_id=${arcade.arcade_id}&coins=${arcade.coins}&hardPlay=${arcade.hardPlay}`);
    }
  };

  // Function to send data every 30 seconds
const sendData = async (arcade_id) => {

  const payload = { arcadeId: arcade_id, coins: 1, hardPlay: 1 };

  console.log(
    `[${new Date().toLocaleTimeString()}] Sending Payload: ${JSON.stringify(
      payload
    )}`
  );

  try {
    const response = await fetch('http://localhost:3000/api/ArcadeData', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.text(); // Capture response error details
      console.error(
        `[${new Date().toLocaleTimeString()}] Error: ${
          response.status
        } - ${errorResponse}`
      );
      return;
    }

    const result = await response.json();
    console.log(
      `[${new Date().toLocaleTimeString()}] Success Response: ${JSON.stringify(
        result
      )}`
    );
  } catch (error) {
    console.error(
      `[${new Date().toLocaleTimeString()}] Network Error: ${
        error.stack || error.message
      }`
    );
  }
};

  const fetchArcadesByVenue = async (venue_id) => {
    try {
      setIsLoading(true);
      const arcadesResponse = await axios.get(`${ARCADE_ROUTE_API_BASE_URL}arcadesbyvenue/${venue_id}`);
      const arcadesData = arcadesResponse.data.data || [];

      const influxResponse = await axios.get(`http://localhost:3000/api/ArcadeData?timeRange=-96h`);
      const influxData = influxResponse.data.data || [];

      const measurementData = influxData.reduce((acc, entry) => {
        if (!acc[entry.measurement]) {
          acc[entry.measurement] = { coins: 0, hardPlay: 0 };
        }
        acc[entry.measurement].coins += entry.coins || 0;
        acc[entry.measurement].hardPlay += entry.hardPlay || 0;
        return acc;
      }, {});

      const updatedArcades = arcadesData.map((arcade) => {
        const measurement = measurementData[arcade.arcade_id] || { coins: 0, hardPlay: 0 };
        return {
          ...arcade,
          coins: measurement.coins,
          hardPlay: measurement.hardPlay,
        };
      });

      const totalRevenue = updatedArcades.reduce((sum, arcade) => sum + arcade.coins, 0);

      setArcades(updatedArcades);
      setTotalRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching arcades:", error);
    } finally{
      setIsLoading(false);
    }
  };

  const fetchArcades = async () => {
    try {
      setIsLoading(true);
      const arcadesResponse = await axios.get(`${ARCADE_ROUTE_API_BASE_URL}getarcades`);
      const arcadesData = arcadesResponse.data.data || [];

      const influxResponse = await axios.get(`http://localhost:3000/api/ArcadeData?timeRange=-48h`);
      const influxData = influxResponse.data.data || [];

      const measurementData = influxData.reduce((acc, entry) => {
        if (!acc[entry.measurement]) {
          acc[entry.measurement] = { coins: 0, hardPlay: 0 };
        }
        acc[entry.measurement].coins += entry.coins || 0;
        acc[entry.measurement].hardPlay += entry.hardPlay || 0;
        return acc;
      }, {});

      const updatedArcades = arcadesData.map((arcade) => {
        const measurement = measurementData[arcade.arcade_id] || { coins: 0, hardPlay: 0 };
        return {
          ...arcade,
          coins: measurement.coins,
          hardPlay: measurement.hardPlay,
        };
      });

      const totalRevenue = updatedArcades.reduce((sum, arcade) => sum + arcade.coins, 0);

      setArcades(updatedArcades);
    
      setTotalRevenue(totalRevenue);
      setNoOfArcades(updatedArcades.length);

    } catch (error) {
      console.error("Error fetching arcades:", error);
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (!authState.loginStatus) {
    //   Swal.fire("Not signed in. Please sign in first")
    //   router.replace('/signin');
    // }

    const fetchVenues = async () => {
      try {
        const response = await fetch(VENUE_ROUTE_API_BASE_URL + `getvenues`);
        const data = await response.json();
        setVenues(data.data || []);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    const fetchNoOfArcades = async () => {
      try {
        const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + 'getarcadecount');
        const data = response.data;
        
        // setNoOfArcades(data.count);
       const  noOfArcades = data.count;
       noOfArcades.toString().length < 2 ? setNoOfArcades(`0${noOfArcades}`) : setNoOfArcades(noOfArcades);
        console.log("No of Arcades", noOfArcades);
      } catch (error) {
        console.error("Error fetching arcades count:", error);
      }
    };

    const fetchNoOfManagers = async () => {
      try {
        const response = await axios.get(USER_ROUTE_API_BASE_URL + `getmanagercount`);
        const data = response.data;
        const noOfManagers = data.count;
        noOfManagers.toString().length < 2 ? setNoOfManagers(`0${noOfManagers}`) : setNoOfManagers(noOfManagers);
        // setNoOfManagers(data.count || 0);
        
    console.log("No of Managers", noOfManagers);
      } catch (error) {
        console.error("Error fetching managers count:", error);
      }
    };

    const fetchNoOfVenues = async () => {
      try {
        const response = await axios.get(VENUE_ROUTE_API_BASE_URL + 'getvenuecount');
        const data = response.data;
        const noOfVenues = data.count;
        noOfVenues.toString().length < 2 ? setNoOfVenues(`0${noOfVenues}`) : setNoOfVenues(noOfVenues);
        // setNoOfVenues(data.count || 0);
        
    console.log("No of Venues", noOfVenues);
      } catch (error) {
        console.error("Error fetching venue count:", error);
      }
    };


    
    fetchArcades();
    fetchVenues();
    fetchNoOfArcades();
    fetchNoOfManagers();
    fetchNoOfVenues();
    loadScript();

    
  }, []);

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
    script.async = true;
    script.onload = () => fetchDataAndRenderChart();
    document.body.appendChild(script);
  };

  const fetchDataAndRenderChart = async () => {
    try {
      // If no arcades are available for the current selection, display a message
      if (!arcades || arcades.length === 0) {
        console.warn("No arcades available for the selected venue.");
        
        // Optionally, you can update the DOM to show a user-friendly message:
        const chartContainer = document.querySelector("#bar-chart");
        if (chartContainer) {
          chartContainer.innerHTML = "<p class='no-data-message'>No arcade data available for the selected venue.</p>";
        }
        return; // Stop execution here
      }
  
      const primaryArcade = arcades[0];
  
      const response = await fetch(
        `http://localhost:3000/api/ArcadeData?measurement=${primaryArcade.arcade_id}&timeRange=-48h`
      );
  
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
  
      const result = await response.json();
      if (!result.data || result.data.length === 0) {
        console.error("No valid data received from the API.");
        // Display a message in the chart area
        const chartContainer = document.querySelector("#bar-chart");
        if (chartContainer) {
          chartContainer.innerHTML = "<p class='no-data-message'>No data received from the server.</p>";
        }
        return;
      }
  
      const seriesData = result.data.map((item) => ({
        x: new Date(item.time).toLocaleString(undefined, {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        y: parseFloat(item.coins).toFixed(2),
      }));
  
      const chartConfig = {
        series: [
          {
            name: `${primaryArcade.arcade_id} Data`,
            data: seriesData.slice(0, 6),
          },
        ],
        chart: {
          type: "bar",
          height: 300,
          toolbar: { show: true },
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            borderRadius: window.innerWidth < 640 ? 10 : 20,
          },
        },
        xaxis: {
          type: "category",
          labels: {
            style: {
              colors: "#616161",
              fontSize: "8px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "8px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          yaxis: { lines: { show: true } },
          xaxis: { lines: { show: false } },
        },
        fill: { opacity: 0.7 },
        tooltip: { theme: "dark" },
      };
  
      const chartElement = document.querySelector("#bar-chart");
      if (chartElement) {
        // Clear any previous message
        chartElement.innerHTML = "";
        const chart = new ApexCharts(chartElement, chartConfig);
        chart.render();
      } else {
        console.error("Chart container not found!");
      }
  
    } catch (error) {
      console.error("Error fetching or rendering chart data:", error);
      const chartContainer = document.querySelector("#bar-chart");
      if (chartContainer) {
        chartContainer.innerHTML = "<p class='no-data-message'>An error occurred while fetching data.</p>";
      }
    }
  };


    
    
    
    

  return (
    <>
    
    <Image src="/signinbgImage.png" height={1000} width={1000} className='absolute  z-[-5] opacity-30 sm:block hidden' />
    <div className='flex xl:flex-row flex-col mt-5 justify-around items-center bg-cover bg-center z-0  ' >
        {/* <div className='flex flex-col min-w-[850px] justify-center items-center'> */}
        <div className='flex flex-col  justify-center items-center'>
          <div className='bg-custom-headpurple flex rounded-full items-center justify-between p-2 xl:w-[800px] sm:w-full  xs:w-[320px] w-[250px] relative'>
            <h1 className='ml-3 font-bold text-2xl md:block hidden '>Dashboard</h1>
            {/* <div className='flex'> */}
            
              {/* <Image src="/dash1.svg" height={100} width={100} />
              <Image src="/dash2.svg" height={100} width={100} />
              <Image src="/dash3.svg" height={100} width={100} /> */}
              {/* <div className='rounded-full bg-white px-5 py-2'>
                ok
              </div>
    
            </div> */}
            


          <div className=" p-10 flex items-center ">
            <div className="absolute xs:right-[2px] right-[2px] sm:right-2 z-20   border-[7px]  border-custom-headpurple rounded-full bg-purple-300 xs:pr-[10px] xs:px-5  xs:py-1 sm:px-5   p-3">
            <div className='text-sm text-start sm:flex items-center justify-left sm:space-x-1'> 
            <div className='' >No. Of  </div>
            <h1> Manager</h1>
            </div>
              <div className='flex  items-center sm:justify-around justify-start'>
                  <Image src="/ManagDash.svg" height={40} width={40} className='sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]'/>
                  <h1 className='text-2xl ml-2 font-bold text-gray-700'>{noOfManagers}</h1>
              </div>
            </div>
            <div className="absolute xs:right-[105px] right-[80px] sm:right-[110px]   z-10  border-[7px] border-custom-headpurple rounded-full bg-purple-300   sm:pr-[60px] xs:pr-[10px] xs:px-5 xs:py-1 sm:px-5 p-3">
            <div className='text-sm text-start sm:flex items-center justify-left sm:space-x-1'> 
            <div className='' >No. Of  </div>
            <h1> Arcade</h1>
            </div>
              <div className='flex items-center sm:justify-around justify-start'>
                  <Image src="/GameStick.svg" height={40} width={40} className='sm:w-[40px] sm:h-[40px] w-[20px] h-[20px]'/>
                  <h1 className='text-2xl ml-2 font-bold text-gray-700'>{noOfArcades}</h1>
              </div>
            </div>
            <div className="absolute xs:right-[210px]  sm:right-[200px]   right-[160px]  z-8  border-[7px] border-custom-headpurple rounded-full bg-purple-300  sm:pr-[110px] xs:pr-[10px] xs:px-5 xs:py-[6px] sm:px-5 px-4 p-3">
            <div className='text-sm text-start sm:flex items-center justify-left sm:space-x-1'> 
            <div className='' >No. Of  </div>
            <h1> Venues</h1>
            </div>
              <div className='flex  items-center sm:justify-around justify-start'>
                  <Image src="/Location.svg" height={40} width={40} className='sm:w-[30px] sm:h-[30px] w-[20px] h-[20px]'/>
                  <h1 className='text-2xl ml-2 font-bold text-gray-700'>{noOfVenues}</h1>
              </div>
            </div>
          </div>
          </div>

<div
  className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-10 pt-10 sm:ml-[5px] gap-y-20 xl:max-w-[850px] xl:max-h-[500px] overflow-y-auto custom-scrollbar"
>
  {
    isLoading ? <>
    <div className="flex items-center  justify-center h-[400px] w-full">
      <div className="animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    </> : <>
      {arcades.map((arcade) => (
    <div
    onClick={() => handleArcadeClick(arcade.arcade_id)} 
      key={arcade.id}
      className="bg-white border border-black shadow-md rounded-xl w-[230px] mx-5 relative p-5 flex flex-col items-center justify-center gap-y-3"
    >
      <div className="z-[-1] bg-custom-headpurple px-3 flex flex-wrap items-center justify-around absolute top-[-35px] left-0 rounded-t-xl py-3">
        <div
          className={`h-[10px] w-[10px] ${
            arcade.currentVoltage > 1 ? 'bg-[#82FFAC]' : 'bg-gray-300'
          } rounded-full mr-2`}
        />
        <h1 className="font-mono text-xs text-white">{arcade.arcade_id}</h1>
        <div className="text-sm ml-3 text-white font-mono">ARCADE ID</div>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl">
          Coins: <span className="font-bold">{arcade.coins}</span>
        </h1>
        <Image src="/coins.svg" className="m-2" height={43} width={33} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">
          Revenue: <span className="font-bold">{(arcade.coins * 0.25).toFixed(2)}</span>
        </h1>
      </div>
      <button 
 onClick={(e) => {
            e.stopPropagation();
            sendData(arcade.arcade_id);
          }}
           className="bg-custom-headpurple px-7 text-white border border-black py-1 rounded-xl">
        Play
      </button>
      <div className="absolute bottom-2 right-2">
        <Image src="/coinsBag.svg" height={59} width={59} className="" />
      </div>
    </div>
  ))}
    </>
  }



</div>




      </div>


        <div className='w-[260px] sm:w-[450px] xl:w-[500px] xl:ml-3'>
          <div>
            <div >
            <div className="relative w-[250px] sm:w-[450px] xl:w-[400px] mb-5">
    <div
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className={`rounded-lg border border-black relative p-2 cursor-pointer bg-custom-headblue`}
    >
      <span className="text-white text-sm">
        {selectedVenue ? selectedVenue.venue_name || 'All' : 'All'}
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

        {dropdownOpen && (
  <div className="absolute z-10 mt-1 w-full bg-gray-200 border border-gray-300 rounded-md shadow-lg">
    {/* 'All' Option */}
    <label
      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-custom-headblue"
    >
      <input
        type="radio"
        name="venue"
        className="mr-2 absolute opacity-0 pointer-events-none"
        checked={!selectedVenue || selectedVenue === 'All'}
        onChange={() => handleVenueSelection('All')} // Pass 'All' for the All option
      />
      All
    </label>

    {/* Venue Options */}
    {venues.map((venue) => (
      <label
        key={venue.venue_id}
        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-custom-headblue"
      >
        <input
          type="radio"
          name="venue"
          className="mr-2 absolute opacity-0 pointer-events-none"
          checked={selectedVenue?.venue_id === venue.venue_id}
          onChange={() => handleVenueSelection(venue)}
        />
        {venue.venue_name}
      </label>
    ))}
  </div>
)}

      
  </div>
            </div>

            <div className=' bg-white  border my-2 border-black rounded-2xl  mt-2 w-[250px] sm:w-[450px] xl:w-[450px] '>
              <div className='grid sm:grid-cols-3 grid-cols-1 sm:gap-y-auto gap-y-2    p-2 gap-x-2 '>
                <div className='border bg-custom-cardpeach border-gray-300 rounded-xl shadow-md   flex flex-col items-center justify-center sm:py-4 py-2 sm:gap-y-3'>
                  <h1 className="text-xl">Hard Play</h1>
                  <div className='flex items-center '>
                    <h1 className="text-md font-bold  text-2xl" >{arcades.reduce((sum, arcade) => sum + (arcade.hardPlay || 0), 0)}</h1><Image src="/USD.svg" height={50} width={50} />
                  </div>
                  <h1 className="text-lg" >Plays</h1>
                </div>

                <div className='border border-gray-300 bg-custom-cardgreen rounded-xl shadow-md   flex flex-col items-center justify-center sm:py-4 py-2 sm:gap-y-3'>
                  <h1 className="text-xl">Revenue</h1>
                  <div className='flex items-center '>
                    <h1 className="text-md font-bold  text-2xl" >{(totalRevenue * 0.25).toFixed(2)}</h1><Image src="/USD.svg" height={50} width={50} />
                  </div>
                  <h1 className="text-lg" >Dollar</h1>
                </div>


                <div className='border bg-custom-cardblue border-gray-300 rounded-xl shadow-md flex flex-col items-center justify-center sm:py-4 py-2 sm:gap-y-3'>
                  <h1 className="text-xl">Token</h1>
                  <div className='flex items-center '>
                    <h1 className="text-md font-bold  text-2xl" >{arcades.reduce((sum, arcade) => sum + (arcade.coins || 0), 0)}</h1><Image src="/USD.svg" height={50} width={50} />
                  </div>
                  <h1 className="text-lg" >Coin</h1>
                </div>
              </div>

              

              {/* Chart */}
              <div className="   xl:mx-auto  dashboard-graph  max-w-[400px] max-h-[350px] overflow-y-hidden">
                <div className="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md">

                  <div className="pt-6 px-2 pb-0">
                  {/* <CustomGraphDropDown className="" onTimeIntervalChange={handleTimeIntervalChange} /> */}
                    <div id="bar-chart"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  

  )
}

export default Page