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
import { format, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

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
            `http://localhost:3001/api/v2/chartData/data?measurement=ARCADE_001&timeRange=${timeRange}`
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
            <div className="pt-6 px-2 pb-0">
              <div id="bar-chart-md"></div>
            </div>
          </div>
        </div>

        <div className="graph-info-section">
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
        </div>

        {authState.role === "superadmin" ? (
          <div>
            <button className="play-button">Play</button>
            <button className="stop-button">Stop</button>
            <button className="power-off-button">Power Off</button>
          </div>
        ) : (
          <div>
            <button className="play-button">Play</button>
          </div>
        )}
      </div>

      <div className="dashboard-right">
        <div className="text-section">
          {props.venue ? (
            <>
              <p>
                <strong>Venue Name:</strong> {props.venue.venue_name}
              </p>
              <p>
                <strong>&nbsp; | Venue ID:</strong> {props.venue.venue_id}
              </p>
              <p>
                <strong>&nbsp; | Venue City:</strong> {props.venue.venue_city}
              </p>
            </>
          ) : (
            <p>No venue details available</p>
          )}
        </div>

        <div className="data-sections-container">
          <div className="data-section data_s1">
            <h3>Coins</h3>
            <p className="first_input">
              {props.dataS1Text} <img src="/Star_Coin.png" alt="Icon" className="icon" />
            </p>
            <p>coins/day</p>
          </div>
          <div className="data-section data_s2">
            <h3>Revenue</h3>
            <p className="first_input">
              {props.dataS2Text} <img src="/dollar_coin.png" alt="Icon" className="icon" />
            </p>
            <p>dollars/day</p>
          </div>
          <div className="data-section data_s3">
            <h3>Hard Play</h3>
            <p className="first_input">
              {props.dataS3Text} <img src="/Play.png" alt="Icon" className="icon play_icon" />
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
                 <span className="left-text">{item.username}</span>
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
