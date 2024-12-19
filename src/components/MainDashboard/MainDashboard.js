"use client";
import { useEffect } from 'react';
import "./MainDashboard.css";
import { useAuth } from '@/context/AuthContext';
import BlockSection from './BlockSection';

const MainDashboard = (props) => {
  const { authState } = useAuth();
  console.log(props.items);
  console.log(props.api);
  console.log("Venues: ", props.venue);
  console.log("PROPS", props);
  


  const handlePlayClick = () => {
    console.log('Play button clicked');
  };

  useEffect(() => {
    console.log(authState)

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
      script.async = true;
      script.onload = () => renderChart();
      document.body.appendChild(script);
    };

    const renderChart = () => {
      const chartConfig = {
        series: [
          {
            name: "Sales",
            data: props.chartData,
          },
        ],
        chart: {
          type: "bar",
          height: 400,
          toolbar: { show: false },
          borderRadius: 10,
          stroke: {
            show: true,
            width: 10,
            colors: ['#2c509a'],
          },
        },
        dataLabels: { enabled: false },
        plotOptions: {
          bar: {
            columnWidth: "90%",
            borderRadius: 39,
          },
        },
        xaxis: {
          axisTicks: { show: false },
          axisBorder: { show: false },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: props.chartData.map((item) => item.x),
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#c0c0c0",
          xaxis: { lines: { show: false } },
          yaxis: { lines: { show: true } },
          padding: { top: 6, right: 0 },
        },
        fill: { opacity: 1 },
        tooltip: { theme: "dark" },
      };

      const chartEl = document.querySelector("#bar-chart-md");
      if (chartEl) {
        const chart = new ApexCharts(chartEl, chartConfig);
        chart.render();
      }
    };

    loadScript();
  }, [props.chartData]);

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
            <button className="value-button" data-value="Live">Live</button>
            <button className="value-button" data-value="1h">1h</button>
            <button className="value-button" data-value="6h">6h</button>
            <button className="value-button" data-value="12h">12h</button>
            <button className="value-button" data-value="1d">1d</button>
            <button className="value-button" data-value="7d">7d</button>
            <button className="value-button" data-value="1m">1m</button>
          </div>
        </div>
        { authState.role === "superadmin" ? 
          (
            <div>
              <button onClick={handlePlayClick} className="play-button">Play</button>
              <button onClick={handlePlayClick} className="stop-button">Stop</button>
              <button onClick={handlePlayClick} className="power-off-button">Power Off</button>
            </div>          
          ) : 
            <div>
              <button onClick={handlePlayClick} className="play-button">Play</button>
            </div>
        }
      </div>

      <div className="dashboard-right">
      <div className="text-section">
  {props.venue ? (
    <>
      <p><strong>Venue Name:</strong> {props.venue.venue_name}</p>
      <p><strong>&nbsp; | Venue ID:</strong> {props.venue.venue_id} </p>
      <p><strong>&nbsp; | Venue City:</strong> {props.venue.venue_city}</p>
    </>
  ) : (
    <p>No venue details available</p>
  )}
</div>


        <div className="data-sections-container">
          <div className="data-section data_s1">
            <h3>Coins</h3>
            <p className='first_input'>{props.dataS1Text} <img src="/Star_Coin.png" alt="Icon" className="icon" /></p>
            <p>coins/day</p>
          </div>
          <div className="data-section data_s2">
            <h3>Revenue</h3>
            <p className='first_input'>{props.dataS2Text} <img src="/dollar_coin.png" alt="Icon" className="icon" /></p>
            <p>dollars/day</p>
          </div>
          <div className="data-section data_s3">
            <h3>Hard Play</h3>
            <p className='first_input'>{props.dataS3Text} <img src="/Play.png" alt="Icon" className="icon play_icon" /></p>
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
