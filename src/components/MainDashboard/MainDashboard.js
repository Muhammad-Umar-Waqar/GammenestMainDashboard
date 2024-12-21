// "use client";
// import { useEffect, useState } from 'react';
// import "./MainDashboard.css";
// import { useAuth } from '@/context/AuthContext';
// import BlockSection from './BlockSection';
// import axios from 'axios';

// const MainDashboard = (props) => {
//   const { authState } = useAuth();
//   console.log(props.items);
//   console.log(props.api);
//   console.log("Venues: ", props.venue);
//   console.log("PROPS", props);
  
//   const [timeRange, setTimeRange] = useState("1d");
//   const [chartData, setChartData] = useState([
//     { x: "Apr", y: 132, fillColor: "#6a0dad" },
//     { x: "May", y: 534, fillColor: "#8a2be2" },
//     { x: "Jun", y: 233, fillColor: "#7b68ee" },
//     { x: "Apr", y: 131, fillColor: "#6a0dad" },
//     { x: "May", y: 534, fillColor: "#8a2be2" },
//     { x: "Jun", y: 232, fillColor: "#7b68ee" },
//     { x: "Jun", y: 223, fillColor: "#7b68ee" },
//   ]);


  
//   const handlePlayClick = () => {
//     console.log('Play button clicked');
//   };


//   // useEffect(() => {
//   //   const getChartData = async () => {
//   //     // console.log(arcade_id)
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:3001/api/v2/chartData/data?measurement=ARCADE_001&timeRange=${timeRange}`);
//   //       console.log("Fetched Data", response)
//   //       setChartData(response);
//   //     } catch (error) {
//   //       console.error("Error fetching arcade api details:", error);
//   //       setChartData([]);
//   //     }
//   //   }
//   //   getChartData();
//   // },[timeRange])



//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range); // Update the state with the new time range
//   };
 

// useEffect(()=>{
//   const getChartData = async (timeRange) => {
//     // console.log(arcade_id)
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/v2/chartData/data?measurement=ARCADE_001&timeRange=1h`);
//         const data = response.data.data;
//       console.log("Fetched Data", data)
//       setChartData(data);
//     } catch (error) {
//       console.error("Error fetching arcade Chart Data:", error);
//       setChartData([]);
//     }
//   }

//   getChartData();

// },[timeRange])
  
  

//   useEffect(() => {
//     console.log(authState)

//     const loadScript = () => {
//       const script = document.createElement("script");
//       script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
//       script.async = true;
//       script.onload = () => renderChart();
//       document.body.appendChild(script);
//     };

//     const renderChart = () => {
//       const chartConfig = {
//         series: [
//           {
//             name: "Sales",
//             data: chartData,
//           },
//         ],
//         chart: {
//           type: "bar",
//           height: 400,
//           toolbar: { show: false },
//           borderRadius: 10,
//           stroke: {
//             show: true,
//             width: 10,
//             colors: ['#2c509a'],
//           },
//         },
//         dataLabels: { enabled: false },
//         plotOptions: {
//           bar: {
//             columnWidth: "90%",
//             borderRadius: 39,
//           },
//         },
//         xaxis: {
//           axisTicks: { show: false },
//           axisBorder: { show: false },
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "12px",
//               fontFamily: "inherit",
//               fontWeight: 400,
//             },
//           },
//           categories: chartData.map((item) => item.x),
//         },
//         yaxis: {
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "12px",
//               fontFamily: "inherit",
//               fontWeight: 400,
//             },
//           },
//         },
//         grid: {
//           show: true,
//           borderColor: "#c0c0c0",
//           xaxis: { lines: { show: false } },
//           yaxis: { lines: { show: true } },
//           padding: { top: 6, right: 0 },
//         },
//         fill: { opacity: 1 },
//         tooltip: { theme: "dark" },
//       };

//       const chartEl = document.querySelector("#bar-chart-md");
//       if (chartEl) {
//         const chart = new ApexCharts(chartEl, chartConfig);
//         chart.render();
//       }
//     };

//     loadScript();
//   }, [props.chartData]);

//   return (
//     <div className="dashboard-main">
//       <div className="dashboard-middle">
//         <div className="text-section">
//           <h3>ARCADE ID</h3>
//           <p>{props.middleText}</p>
//         </div>

//         <div className="dashboard-graph">
//           <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md" style={{ borderRadius: "54px", height: "441px" }}>
//             <div className="pt-6 px-2 pb-0">
//               <div id="bar-chart-md"></div>
//             </div>
//           </div>
//         </div>

//         <div className="graph-info-section">
//           <div className="graph-values">
//             {/* <button className="value-button" data-value="Live"  onClick={() => handleTimeRangeChange("1m")} >Live</button> */}
//             <button className="value-button" data-value="1h"  onClick={() => handleTimeRangeChange("1h")}>1h</button>
//             <button className="value-button" data-value="6h"  onClick={() => handleTimeRangeChange("6h")} >6h</button>
//             <button className="value-button" data-value="12h"  onClick={() => handleTimeRangeChange("12h")} >12h</button>
//             <button className="value-button" data-value="1d"  onClick={() => handleTimeRangeChange("1d")} >1d</button>
//             <button className="value-button" data-value="7d"  onClick={() => handleTimeRangeChange("7d")} >7d</button>
//             <button className="value-button" data-value="1m"  onClick={() => handleTimeRangeChange("1w")} >1w</button>
//           </div>
//         </div>
//         { authState.role === "superadmin" ? 
//           (
//             <div>
//               <button onClick={handlePlayClick} className="play-button">Play</button>
//               <button onClick={handlePlayClick} className="stop-button">Stop</button>
//               <button onClick={handlePlayClick} className="power-off-button">Power Off</button>
//             </div>          
//           ) : 
//             <div>
//               <button onClick={handlePlayClick} className="play-button">Play</button>
//             </div>
//         }
//       </div>

//       <div className="dashboard-right">
//       <div className="text-section">
//   {props.venue ? (
//     <>
//       <p><strong>Venue Name:</strong> {props.venue.venue_name}</p>
//       <p><strong>&nbsp; | Venue ID:</strong> {props.venue.venue_id} </p>
//       <p><strong>&nbsp; | Venue City:</strong> {props.venue.venue_city}</p>
//     </>
//   ) : (
//     <p>No venue details available</p>
//   )}
// </div>


//         <div className="data-sections-container">
//           <div className="data-section data_s1">
//             <h3>Coins</h3>
//             <p className='first_input'>{props.dataS1Text} <img src="/Star_Coin.png" alt="Icon" className="icon" /></p>
//             <p>coins/day</p>
//           </div>
//           <div className="data-section data_s2">
//             <h3>Revenue</h3>
//             <p className='first_input'>{props.dataS2Text} <img src="/dollar_coin.png" alt="Icon" className="icon" /></p>
//             <p>dollars/day</p>
//           </div>
//           <div className="data-section data_s3">
//             <h3>Hard Play</h3>
//             <p className='first_input'>{props.dataS3Text} <img src="/Play.png" alt="Icon" className="icon play_icon" /></p>
//             <p>plays</p>
//           </div>
//         </div>

//         <div className="middle-section">
//           <h3>Managers Detail:</h3>
//           <div className="scrollable-content">
//             {Array.isArray(props.items) && props.items.length > 0 ? (
//               props.items.map((item, index) => (
//                 <p key={index}>
//                   <span className="left-text">{item.username}</span>
//                 </p>
//               ))
//             ) : (
//               <p>No managers found</p>
//             )}
//           </div>
//         </div>

//         {/* <div className="block-section">
//           <div className="text_container">
//             <div className="text">
//               <h3>API Key:</h3>
//               <p>{props.api ? props.api.data : "No API details available"}</p>
//             </div>
//             <a href={props.blockImageSrc} download>
//               <button className="qr_button">Download QR</button>
//             </a>
//           </div>
//           <div className="image">
//             <img src={props.blockImageSrc} alt="Image description" />
//           </div>
//         </div> */}

//         <BlockSection api={props.api} blockImageSrc={props.blockImageSrc}/>
     

//       </div>
//     </div>


//   );
// };

// export default MainDashboard;














































// "use client";
// import { useEffect, useState } from "react";
// import "./MainDashboard.css";
// import { useAuth } from "@/context/AuthContext";
// import BlockSection from "./BlockSection";
// import axios from "axios";
// import ApexCharts from "apexcharts";
// // import { format } from "date-fns";



// const MainDashboard = (props) => {
//   const { authState } = useAuth();

//   const [timeRange, setTimeRange] = useState("1d");
//   const [chartData, setChartData] = useState([]);

//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range); // Update the state with the new time range
//   };


// useEffect(() => {
//     const getChartData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/v2/chartData/data?measurement=ARCADE_001&timeRange=${timeRange}`
//         );
//         const data = response.data.data.map((item) => ({
//           x: item.timeRange,
//           y: item.coins,
//         }));
//         setChartData(data);
//       } catch (error) {
//         console.error("Error fetching arcade Chart Data:", error);
//         setChartData([]); // Clear chart data on error
//       }
//     };
  
//     getChartData();
//   }, [timeRange]); // Re-fetch data when timeRange changes

  

// useEffect(() => {
//     const renderChart = () => {
//       const chartConfig = {
//         series: [
//           {
//             name: "Coins",
//             data: chartData,
//           },
//         ],
//         chart: {
//           type: "bar",
//           height: 400,
//           id: "arcade-bar-chart", // Unique ID for the chart
//           toolbar: { show: false },
//         },
//         dataLabels: { enabled: false },
//         plotOptions: {
//           bar: {
//             columnWidth: "90%",
//             borderRadius: 30,
//           },
//         },
//         xaxis: {
//           categories: chartData.map((item) => item.x),
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "12px",
//               fontFamily: "inherit",
//             },
//           },
//         },
//         yaxis: {
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "12px",
//               fontFamily: "inherit",
//             },
//           },
//         },
//         grid: {
//           borderColor: "#c0c0c0",
//         },
//         tooltip: { theme: "dark" },
//       };
  
//       const chartEl = document.querySelector("#bar-chart-md");
//       if (chartEl) {
//         // Destroy the previous chart if it exists
//         ApexCharts.exec("arcade-bar-chart", "destroy");
        
//         const chart = new ApexCharts(chartEl, chartConfig);
//         chart.render();
//       }
//     };
  
//     renderChart();
//   }, [chartData]); // Dependency array includes only chartData

  

//   return (
//     <div className="dashboard-main">
//       <div className="dashboard-middle">
//         <div className="text-section">
//           <h3>ARCADE ID</h3>
//           <p>{props.middleText}</p>
//         </div>

//         <div className="dashboard-graph">
//           <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md" style={{ borderRadius: "54px", height: "441px" }}>
//             <div className="pt-6 px-2 pb-0">
//               <div id="bar-chart-md"></div>
//             </div>
//           </div>
//         </div>

//         <div className="graph-info-section">
//           <div className="graph-values">
//             <button className="value-button" data-value="1h" onClick={() => handleTimeRangeChange("1h")}>
//               1h
//             </button>
//             <button className="value-button" data-value="6h" onClick={() => handleTimeRangeChange("6h")}>
//               6h
//             </button>
//             <button className="value-button" data-value="12h" onClick={() => handleTimeRangeChange("12h")}>
//               12h
//             </button>
//             <button className="value-button" data-value="1d" onClick={() => handleTimeRangeChange("1d")}>
//               1d
//             </button>
//             <button className="value-button" data-value="7d" onClick={() => handleTimeRangeChange("7d")}>
//               7d
//             </button>
//             <button className="value-button" data-value="1m" onClick={() => handleTimeRangeChange("1w")}>
//               1w
//             </button>
//           </div>
//         </div>

//         {authState.role === "superadmin" ? (
//           <div>
//             <button className="play-button">Play</button>
//             <button className="stop-button">Stop</button>
//             <button className="power-off-button">Power Off</button>
//           </div>
//         ) : (
//           <div>
//             <button className="play-button">Play</button>
//           </div>
//         )}
//       </div>

//       <div className="dashboard-right">
//         <div className="text-section">
//           {props.venue ? (
//             <>
//               <p>
//                 <strong>Venue Name:</strong> {props.venue.venue_name}
//               </p>
//               <p>
//                 <strong>&nbsp; | Venue ID:</strong> {props.venue.venue_id}
//               </p>
//               <p>
//                 <strong>&nbsp; | Venue City:</strong> {props.venue.venue_city}
//               </p>
//             </>
//           ) : (
//             <p>No venue details available</p>
//           )}
//         </div>

//         <div className="data-sections-container">
//           <div className="data-section data_s1">
//             <h3>Coins</h3>
//             <p className="first_input">
//               {props.dataS1Text} <img src="/Star_Coin.png" alt="Icon" className="icon" />
//             </p>
//             <p>coins/day</p>
//           </div>
//           <div className="data-section data_s2">
//             <h3>Revenue</h3>
//             <p className="first_input">
//               {props.dataS2Text} <img src="/dollar_coin.png" alt="Icon" className="icon" />
//             </p>
//             <p>dollars/day</p>
//           </div>
//           <div className="data-section data_s3">
//             <h3>Hard Play</h3>
//             <p className="first_input">
//               {props.dataS3Text} <img src="/Play.png" alt="Icon" className="icon play_icon" />
//             </p>
//             <p>plays</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainDashboard;







"use client";
import { useEffect, useState } from "react";
import "./MainDashboard.css";
import { useAuth } from "@/context/AuthContext";
import BlockSection from "./BlockSection";
import axios from "axios";
import ApexCharts from "apexcharts";
import { format} from "date-fns";

const MainDashboard = (props) => {
  const { authState } = useAuth();

  const [timeRange, setTimeRange] = useState("1d");
  const [chartData, setChartData] = useState([]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range); // Update the state with the new time range
  };

//   const formatTimeRange = (startTime, endTime) => {
//     // Parse dates to ensure they are valid
//     const start = new Date(startTime);
//     const end = new Date(endTime);
  
//     if (isNaN(start) || isNaN(end)) {
//       return "Invalid date"; // Handle invalid date formats gracefully
//     }
  
//     const diffMinutes = differenceInMinutes(end, start);
//     if (diffMinutes <= 60) {
//       return `${diffMinutes} mins`;
//     }
  
//     const diffHours = differenceInHours(end, start);
//     if (diffHours <= 24) {
//       return `${diffHours} hrs`;
//     }
  
//     const diffDays = differenceInDays(end, start);
//     if (diffDays <= 7) {
//       return `${diffDays} days`;
//     }
  
//     const diffWeeks = Math.ceil(diffDays / 7);
//     return `${diffWeeks} weeks`;
//   };
  

  useEffect(() => {
    const getChartData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/v2/chartData/data?measurement=${props.middleText}&timeRange=${timeRange}`
          );
          
          console.log("RESO>>>>", response.data.data);
          
          const data = response.data.data.map((item) => {
            const [startTime] = item.timeRange.split(" to ").map((time) => new Date(time)); // Extract and parse start time
            let formattedTime;
      
            // Format based on the time range
            switch (timeRange) {
              case "1h":
                formattedTime = format(startTime, "mm:ss"); // Minutes and seconds
                break;
              case "6h":
              case "12h":
                formattedTime = format(startTime, "hh:mm a"); // Hours and minutes
                break;
              case "1d":
                formattedTime = format(startTime, "hh:mm a"); // Hours and minutes
                break;
              case "7d":
                // formattedTime = format(startTime, "MM-dd"); // Month and day
                formattedTime = format(startTime, "MM-dd")+'\n'+format(startTime, "ccc");
                break;
              case "1w":
              case "1m":
                // formattedTime = format(startTime, "MMM dd"); // Month name and day
                formattedTime = format(startTime, "MMM dd")+'\n'+format(startTime, "ccc");
                break;
              default:
                formattedTime = format(startTime, "yyyy-MM-dd"); // Default fallback
            }
      
            return {
              x: formattedTime, // Use the formatted time for the x-axis
              y: item.coins, // Use coins for the y-axis
            };
          });
      
          setChartData(data);
        } catch (error) {
          console.error("Error fetching arcade Chart Data:", error);
          setChartData([]); // Clear chart data on error
        }
      };

    getChartData();
  }, [timeRange]); // Re-fetch data when timeRange changes

  useEffect(() => {
    const renderChart = () => {
      const chartConfig = {
        series: [
          {
            name: "Coins",
            data: chartData,
          },
        ],
        chart: {
          type: "bar",
          height: 400,
          id: "arcade-bar-chart", // Unique ID for the chart
          toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        plotOptions: {
          bar: {
            columnWidth: "90%",
            borderRadius: 30,
          },
          responsive: [
            {
              breakpoint: 640, // Target devices below 'sm'
              options: {
                plotOptions: {
                  bar: {
                    borderRadius: 0, // Reduced border radius for smaller screens
                  },
                },
              },
            },
          ],
        },
        xaxis: {
          categories: chartData.map((item) => item.x),
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
            },
            formatter: function (value) {
              if (Array.isArray(value)) {
                // If the value is an array, join the elements with a <br> for two lines
                return value.join("<br>");
              }
              return value; // For non-array values, return as is
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
            },
          },
        },
        grid: {
          borderColor: "#c0c0c0",
        },
        tooltip: { theme: "dark" },
      };

      const chartEl = document.querySelector("#bar-chart-md");
      if (chartEl) {
        // Destroy the previous chart if it exists
        ApexCharts.exec("arcade-bar-chart", "destroy");
        
        const chart = new ApexCharts(chartEl, chartConfig);
        chart.render();
      }
    };

    renderChart();
  }, [chartData]); // Dependency array includes only chartData

  return (
    <div className="dashboard-main">
      <div className="dashboard-middle">
        <div className="text-section">
          <h3>ARCADE ID</h3>
          <p>{props.middleText}</p>
        </div>

        <div className="dashboard-graph">
          
          <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md" style={{ borderRadius: "54px", height: "441px" }}>
              {/* Show dropdown for smaller devices */}
    <select
      className="value-dropdown"
      onChange={(e) => handleTimeRangeChange(e.target.value)}
    >
      <option value="1h">1h</option>
      <option value="6h">6h</option>
      <option value="12h">12h</option>
      <option value="1d">1d</option>
      <option value="7d">7d</option>
      <option value="1w">1w</option>
    </select>
            <div className="pt-6 px-2 pb-0">
              <div id="bar-chart-md"></div>
            </div>
          </div>
        </div>

        {/* <div className="graph-info-section">
          <div className="graph-values">
            <button className="value-button " data-value="1h" onClick={() => handleTimeRangeChange("1h")}>
              1h
            </button>
            <button className="value-button " data-value="6h" onClick={() => handleTimeRangeChange("6h")}>
              6h
            </button>
            <button className="value-button " data-value="12h" onClick={() => handleTimeRangeChange("12h")}>
              12h
            </button>
            <button className="value-button " data-value="1d" onClick={() => handleTimeRangeChange("1d")}>
              1d
            </button>
            <button className="value-button " data-value="7d" onClick={() => handleTimeRangeChange("7d")}>
              7d
            </button>
            <button className="value-button " data-value="1m" onClick={() => handleTimeRangeChange("1w")}>
              1w
            </button>
          </div>
        </div> */}


<div className="graph-info-section">
  <div className="graph-values">

    {/* Show buttons for larger devices */}
    <div className="button-group">
      <button className="value-button" data-value="1h" onClick={() => handleTimeRangeChange("1h")}>
        1h
      </button>
      <button className="value-button" data-value="6h" onClick={() => handleTimeRangeChange("6h")}>
        6h
      </button>
      <button className="value-button" data-value="12h" onClick={() => handleTimeRangeChange("12h")}>
        12h
      </button>
      <button className="value-button" data-value="1d" onClick={() => handleTimeRangeChange("1d")}>
        1d
      </button>
      <button className="value-button" data-value="7d" onClick={() => handleTimeRangeChange("7d")}>
        7d
      </button>
      <button className="value-button" data-value="1w" onClick={() => handleTimeRangeChange("1w")}>
        1w
      </button>
    </div>

  
  </div>
</div>





        {authState.role === "superadmin" ? (
          <div className="flex items-center justify-center">
            <button className="play-button">Play</button>
            <button className="stop-button">Stop</button>
            <button className="power-off-button">Power Off</button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button className="play-button">Play</button>
          </div>
        )}
      </div>

      <div className="dashboard-right">
          <div className="bg-[#daccff] flex items-center justify-center  sm:w-full  w-[300px]  sm:ml-auto ml-1  p-2 my-1 rounded-xl shadow-md">
            {props.venue ? (
              <div className="flex flex-row items-center sm:justify-start justify-center ">
                <p className="text-center">
                  <strong>&nbsp; <span className="hidden ">|</span>Venue Name:</strong> {props.venue.venue_name}
                </p>
                <p className="text-center">
                  <strong>&nbsp; <span className="hidden sm:inline">|</span> Venue ID:</strong> {props.venue.venue_id}
                </p>
                <p className="text-center">
                  <strong>&nbsp; <span className="hidden sm:inline">|</span> Venue City:</strong> {props.venue.venue_city}
                </p>

              </div>
            ) : (
              <p>No venue details available</p>
            )}
          </div>
        
        <div className="data-sections-container">
          <div className="data-section data_s1">
            <h3>Coins</h3>
            <p className="first_input">
              {props.dataS1Text} <img src="/coins.svg" alt="Icon" className="w-[40px] h-[30px] ml-2" />
            </p>
            <p>coins/day</p>
          </div>
          <div className="data-section data_s2">
            <h3>Revenue</h3>
            <p className="first_input">
              {props.dataS2Text} <img src="/USD.svg" alt="Icon" className="w-[40px] h-[40px] ml-2" />
            </p>
            <p>dollars/day</p>
          </div>
          <div className="data-section data_s3">
            <h3>Hard Play</h3>
            <p className="first_input">
              {props.dataS3Text} <img src="/Play.svg"  alt="Icon" className="w-[40px] h-[40px] ml-2" />
            </p>
            <p>plays</p>
          </div>
        </div>

        
       <div className="middle-section">
         <h3>Managers Detail:</h3>
         <div className="scrollable-content">
           {Array.isArray(props.items) && props.items.length > 0 ? (
             props.items.map((item, index) => (
               <p key={index}>
                 <span className="text-left sm:text-auto text-sm ml-[17px] inline-block sm:w-auto max-w-[180px] whitespace-normal break-words overflow-wrap-anywhere  text-wrap ">{item.username}</span>
               </p>
             ))
           ) : (
             <p>No managers found</p>
           )}
         </div>
       </div>

        {/* <div className="block-section">
          <div className="text_container">
            <div className="text">
              <h3>API Key:</h3>
              <p>{props.api ? props.api.data : "No API details available"}</p>
            </div>
            <a href={props.blockImageSrc} download>
              <button className="qr_button">Download QR</button>
            </a>
          </div>
          <div className="image">
            <img src={props.blockImageSrc} alt="Image description" />
          </div>
        </div> */}

       <BlockSection api={props.api} blockImageSrc={props.blockImageSrc}/>
     


      </div>

      <style jsx>
{
  `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');

/* General container styles */
/*.dashboard-container*/
/* body {
  display: flex;
  height: 100%;
  background-color: #e6e4ff;
} */

/* Left side vertical navigation bar */
/* .dashboard-left {
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
}

.vertical-nav ul {
  list-style-type: none;
  padding: 0;
}

.vertical-nav ul li {
  margin: 10px 0;
}

.vertical-nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
} */

/* Main dashboard area (use grid layout here) */
.dashboard-main {
  display: grid;
  
  grid-template-rows: auto 1fr; /* First row for the image, second row for content */
  grid-template-columns: 50% 50%; /* Two columns: 1st column for the graph (flex-grow), 2nd column for the data sections */
  gap: 20px; /* Space between the grid items */
  padding-top: 20px;
  width: 93%;
}

/* Image button above both dashboard-middle and dashboard-right */
.image-button-container {
  grid-row: 1 / 2; /* First row of the grid */
  grid-column: 1 / -1; /* Span across both columns */
  display: flex;
  justify-content: flex-end; /* Center the image horizontally */
  margin-bottom: 10px; /* Space between the image and the content */
}

.image-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.image-button-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-button-img:hover {
  transform: scale(1.05);
}

/* Dashboard middle (includes the graph and text section) */
.dashboard-middle {
  grid-row: 1 / 3; /* Second row */
  grid-column: 1 / 2; /* First column */
  display: flex;
  flex-direction: column;
  /* margin-right: 20px;   Space between graph and data panel */
  padding: 20px;
}

.dashboard-middle > .text-section {
  margin-bottom: 15px;
  margin-left: 33px;
}

.dashboard-middle > .text-section > h3 {
  font-family: 'Fredoka', sans-serif;
  font-weight: 500; /* Medium weight */
  font-size: 24px;
  letter-spacing: 0.1em;
}

.dashboard-middle > .text-section > p {
  padding-left: 47px;
}

/* Graph section */
.dashboard-graph {
  margin-bottom: 20px;
  padding: 5px;

  /* background-color: #f0f0f0; */
  /* border-radius: 54px; */
  /* border: solid 3px #2c509a; */
  overflow: hidden;
  
  /* height: 500px; */
  /*flex-grow: 1; Allow it to take up remaining space */
}


.graph-info-section {
  padding: 0 34px;
  border-radius: 10px; /* Rounded corners */
  text-align: center;
  margin-bottom: 14px;
}

/* Button group styles for larger devices */
.button-group {
  display: flex; /* Align items horizontally */
  justify-content: space-between; /* Spread values evenly */
  gap: 10px; /* Space between buttons */
}

.value-button {
  background: none; /* Transparent background */
  border: 1px solid #ddd; /* Subtle border */
  border-radius: 8px; /* Rounded corners */
  padding: 5px 10px; /* Spacing around the text */
  color: #333; /* Default text color */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effects */
}

.value-button:hover {
  background-color: #948af8; /* Highlight color on hover */
  color: white; /* Text color on hover */
  border-color: #948af8; /* Match border color to background on hover */
}

/* Dropdown styles */
.value-dropdown {
  display: none; /* Hidden by default for larger devices */
  width: 30%;

  padding: 5px 10px;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  color: #333;
  cursor: pointer;
}

/* Responsive styles for smaller devices */
@media (max-width: 640px) {
  .button-group {
    display: none; /* Hide buttons for smaller devices */
  }

  .value-dropdown {
    display: block; /* Show dropdown for smaller devices */
  }
}


/* Right side panel (now on the right of the graph) */
.dashboard-right {
  grid-row: 2 / 3; /* Second row */
  grid-column: 2 / 3; /* Second column */
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

/* Data sections container (arranging the data sections in a row) */
.data-sections-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; /* Align items horizontally */
  gap: 20px; /* Space between data sections */
  margin: 8px 5px;
}

/* Individual data sections */
.data-section {
  flex: 1; /* Each data section takes up equal width */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 19px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: 149px;
  /* font-family: sans-serif; */
  /* font-family: 'Poppins', sans-serif; */
}

.data-section h3 {
  margin: 0;
  font-size: 24px;
  color: #000;
}

.data-section p {
  font-size: 24px;
  color: #000;
  margin: 0;
}

.first_input{
  font-weight: 600;
  display: flex; /* Use flexbox to align the text and icon */
  align-items: center; /* Vertically align text and icon */
}

.first_input > .icon {
  margin-left: 8px; /* Add space between the text and the icon */
  width: 33.33px;
  height: 28.94px;
  object-fit: contain; /* Ensure the icon fits properly */
}

.first_input > .play_icon{
  height: 19px;
}

/* New middle section between data-section and block-section */
.middle-section {
  padding: 20px;
  background-color: #f9f9f900;
  height: auto;
  overflow-y: hidden;
}

.middle-section h3 {
  font-size: 18px;
  color: #000;
  font-weight: 600;
}

.middle-section p {
  font-size: 16px;
  color: #666;
  border: 1px solid #ddd; /* Light gray border */
  padding: 13px; /* Add padding inside the border */
  margin-bottom: 10px; /* Space between paragraphs */
  border-radius: 5px; /* Optional: rounded corners */
}

/* Scrollable content within middle-section */
.middle-section .scrollable-content {
  max-height: 200px; /* Set the maximum height for the scrollable block */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 10px;
  background-color: #f9f9f900;
  margin-top: 10px; /* Optional, adds space between heading and scrollable content */

}

.middle-section .scrollable-content::-webkit-scrollbar {
  width: 20px;
  height: 10px;
  border-radius: 83px;
  padding: 0 5px;
}

/* Style the track (background of the scrollbar) */
.middle-section .scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1; /* Light grey background for the track */
  border-radius: 83px; /* Rounded corners for the track */
  border: solid 1px rgba(0, 0, 0, 0.42);
  background-color: #e7fee7;
}

/* Style the thumb (the draggable part of the scrollbar) */
.middle-section .scrollable-content::-webkit-scrollbar-thumb {
  background: #888; /* Grey color for the thumb */
  border-radius: 83px; /* Rounded corners for the thumb */
  border: solid 1px rgba(0, 0, 0, 0.42);
  background-color: #c3d7ff;
  margin: 0 5px;
}


.middle-section .scrollable-content p {
  display: flex; /* Enable flexbox for the container */
  justify-content: space-between; /* Place text at each end of the container */
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid black;
  border-radius: 50px;
  width: 100%;
}

.middle-section .scrollable-content p span {
  font-size: 20px;
  color: #333;
}

.middle-section .scrollable-content  {
  text-align: left; /* Ensure the left text is aligned to the left */
  margin-left: 17px;
}



.middle-section .scrollable-content .right-text {
  text-align: right; /* Ensure the right text is aligned to the right */
  margin-right: 33px;

}
*/

.dashboard-right > .block-section {
  margin: 7px 15px 0 221px;
  padding: 19px 19px 19px 44px;
  border-radius: 25px;
  border: solid 1px #000;
}

.dashboard-right > .block-section > .text {
  padding-top: 39px;
}

.tex_container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}




/* Play button (now under the graph) */
.play-button {
  background-color: #948af8;
  color: white;
  padding: 10px 20px;
  border: solid 1px #000;
  /* border-radius: 30px; */
  border-radius: 19px;
  cursor: pointer;
  font-size: 16px;
  width: 30%;
  align-self: center;
  /* margin: 10px auto; */
}




.stop-button {
  background-color: #e61010;
  color: white;
  padding: 10px 20px;
  border: solid 1px #000;
  /* border-radius: 30px; */
  border-radius: 19px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  width: 19%;
  align-self: center;
}

.power-off-button {
  background-color: #fb3306;
  color: white;
  padding: 10px 20px;
  border: solid 1px #000;
  /* border-radius: 30px; */
  border-radius: 19px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  width: 19%;
  align-self: center;
}

.play-button:hover {
  background-color: #0056b3;
}

/* Graph styling (for the chart) */
.relative {
  position: relative;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.rounded-xl {
  border-radius: 1rem;
}

.bg-white {
  background-color: white;
}

.bg-gray-900 {
  background-color: #1f2937;
}

.text-white {
  color: white;
}

.text-gray-700 {
  color: #4b5563;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.w-max {
  width: max-content;
}

.md\:flex-row {
  flex-direction: row;
}

.md\:items-center {
  align-items: center;
}

.pt-6 {
  padding-top: 1.5rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.pb-0 {
  padding-bottom: 0;
}

h6 {
  font-size: 1rem;
  font-weight: 600;
}

p {
  font-size: 0.875rem;
  color: #4b5563;
}

.dashboard-right > .text-section {
  background-color: #daccff;
  display: flex; /* Use flexbox to arrange the heading and content side by side */
  align-items: center; /* Vertically align the content and heading */
  margin-bottom: 10px;
  /* padding: 10px 20px; */
  padding: 6px 20px;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-right > .text-section h3 {
  margin-right: 20px; /* Space between heading and content */
  font-size: 24px;
  color: #000;
  font-weight: 600;
  font-stretch: normal;
}

.dashboard-right > .text-section p {
  font-size: 16px;
  color: #666;
}


.data_s1{
  background-color: #c4d7ff;
}

.data_s2{
  background-color: #e7fee7;
}

.data_s3{
  background-color: #fafee7;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .dashboard-main {
    grid-template-columns: 1fr; /* Single column */
    grid-template-rows: auto auto auto; /* Adjust rows */
    gap: 15px; /* Reduce spacing */
    padding: 10px;
    position: relative;
  }

  .dashboard-middle {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .dashboard-right {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
  }
}

/* Adjust for tablets */
@media (max-width: 768px) {
  .image-button-container {
    justify-content: center; /* Center the button */
  }

  .data-sections-container {
    flex-direction: row; /* Stack data sections vertically */
    gap: 10px; 
  }

  .data-section {
    height: auto; /* Allow flexible height */
    padding: 10px; /* Reduce padding */
    font-size: 14px; /* Adjust font size */
  }

  .dashboard-graph {
    height: 450px; /* Reduce graph height */
    border-radius: 30px; /* Adjust border radius */

  }

}



/* Adjust for small devices */
@media (max-width: 480px) {

  .dashboard-graph {
    height: 450px; /* Reduce graph height */
    border-radius: 30px; /* Adjust border radius */
    max-width: 280px;
    border-radius: 65px;
  }


  body {
    font-size: 14px; /* Reduce overall font size */
  }

  .image-button-container {
    display: none; /* Hide the image button if needed */
  }

  .dashboard-main {
    padding: 5px;
    gap: 10px;
 
  }

  .data-sections-container {
    gap: 5px;
    width: 300px;
  }

  .data-section h3,
  .data-section p {
    font-size: 12px; /* Adjust text size */
  }

  .middle-section {
    padding: 10px;
    height: auto; /* Flexible height for small devices */
    overflow-y: auto; /* Ensure scrollability */
    width: 310px;
  }

  .block-section {
    flex-direction: column; /* Stack text and image */
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
  }

  .block-section .image {
    width: 60px; /* Smaller image */
    height: 60px;
  }
}`
}
</style >
    </div>
  );
};


export default MainDashboard;


























// "use client";
// import { useEffect, useState } from "react";
// import "./MainDashboard.css";
// import { useAuth } from "@/context/AuthContext";
// import BlockSection from "./BlockSection";
// import axios from "axios";
// import ApexCharts from "apexcharts";

// const MainDashboard = (props) => {
//   const { authState } = useAuth();

//   const [timeRange, setTimeRange] = useState("1d");
//   const [chartData, setChartData] = useState([]);

//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range); // Update the state with the new time range
//   };

//   useEffect(() => {
//     const getChartData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/v2/chartData/data?measurement=ARCADE_001&timeRange=${timeRange}`
//         );
//         const data = response.data.data.map((item) => ({
//           x: `${new Date(item.timeRange.split(" to ")[0]).toLocaleString()} - ${new Date(
//             item.timeRange.split(" to ")[1]
//           ).toLocaleString()}`,
//           y: item.coins,
//         }));
//         setChartData(data);
//       } catch (error) {
//         console.error("Error fetching arcade Chart Data:", error);
//         setChartData([]);
//       }
//     };

//     getChartData();
//   }, [timeRange]);

//   useEffect(() => {
//     const renderChart = () => {
//       const chartConfig = {
//         series: [
//           {
//             name: "Coins",
//             data: chartData,
//           },
//         ],
//         chart: {
//           type: "bar",
//           height: 400,
//           toolbar: { show: false },
//         },
//         dataLabels: { enabled: false },
//         plotOptions: {
//           bar: {
//             columnWidth: "90%",
//             borderRadius: 8,
//           },
//         },
//         xaxis: {
//           categories: chartData.map((item) => item.x),
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "12px",
//               fontFamily: "inherit",
//             },
//           },
//         },
//         yaxis: {
//           labels: {
//             style: {
//               colors: "#616161",
//               fontSize: "12px",
//               fontFamily: "inherit",
//             },
//           },
//         },
//         grid: {
//           borderColor: "#c0c0c0",
//         },
//         tooltip: { theme: "dark" },
//       };

//       const chartEl = document.querySelector("#bar-chart-md");
//       if (chartEl) {
//         const chart = new ApexCharts(chartEl, chartConfig);
//         chart.render();
//       }
//     };

//     renderChart();
//   }, [chartData]);

//   return (
//     <div className="dashboard-main">
//       <div className="dashboard-middle">
//         <div className="text-section">
//           <h3>ARCADE ID</h3>
//           <p>{props.middleText}</p>
//         </div>

//         <div className="dashboard-graph">
//           <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md" style={{ borderRadius: "54px", height: "441px" }}>
//             <div className="pt-6 px-2 pb-0">
//               <div id="bar-chart-md"></div>
//             </div>
//           </div>
//         </div>

//         <div className="graph-info-section">
//           <div className="graph-values">
//             <button className="value-button" data-value="1h" onClick={() => handleTimeRangeChange("1h")}>
//               1h
//             </button>
//             <button className="value-button" data-value="6h" onClick={() => handleTimeRangeChange("6h")}>
//               6h
//             </button>
//             <button className="value-button" data-value="12h" onClick={() => handleTimeRangeChange("12h")}>
//               12h
//             </button>
//             <button className="value-button" data-value="1d" onClick={() => handleTimeRangeChange("1d")}>
//               1d
//             </button>
//             <button className="value-button" data-value="7d" onClick={() => handleTimeRangeChange("7d")}>
//               7d
//             </button>
//             <button className="value-button" data-value="1w" onClick={() => handleTimeRangeChange("1w")}>
//               1w
//             </button>
//           </div>
//         </div>

//         {authState.role === "superadmin" ? (
//           <div>
//             <button className="play-button">Play</button>
//             <button className="stop-button">Stop</button>
//             <button className="power-off-button">Power Off</button>
//           </div>
//         ) : (
//           <div>
//             <button className="play-button">Play</button>
//           </div>
//         )}
//       </div>

//       <div className="dashboard-right">
//         <div className="text-section">
//           {props.venue ? (
//             <>
//               <p>
//                 <strong>Venue Name:</strong> {props.venue.venue_name}
//               </p>
//               <p>
//                 <strong>&nbsp; | Venue ID:</strong> {props.venue.venue_id}
//               </p>
//               <p>
//                 <strong>&nbsp; | Venue City:</strong> {props.venue.venue_city}
//               </p>
//             </>
//           ) : (
//             <p>No venue details available</p>
//           )}
//         </div>

//         <div className="data-sections-container">
//           <div className="data-section data_s1">
//             <h3>Coins</h3>
//             <p className="first_input">
//               {props.dataS1Text} <img src="/Star_Coin.png" alt="Icon" className="icon" />
//             </p>
//             <p>coins/day</p>
//           </div>
//           <div className="data-section data_s2">
//             <h3>Revenue</h3>
//             <p className="first_input">
//               {props.dataS2Text} <img src="/dollar_coin.png" alt="Icon" className="icon" />
//             </p>
//             <p>dollars/day</p>
//           </div>
//           <div className="data-section data_s3">
//             <h3>Hard Play</h3>
//             <p className="first_input">
//               {props.dataS3Text} <img src="/Play.png" alt="Icon" className="icon play_icon" />
//             </p>
//             <p>plays</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainDashboard;
