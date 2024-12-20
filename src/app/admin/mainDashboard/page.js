// MainDashboardPage.js
"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainDashboard from '@/components/MainDashboard/MainDashboard';
import axios from 'axios';

export default function MainDashboardPage() {
  const searchParams = useSearchParams();
  const arcade_id = searchParams.get('arcade_id');
  const coins = searchParams.get('coins');
  const hardPlay = searchParams.get('hardPlay');
  const [managers, setManagers] = useState([]);
  const [api, setApi] = useState(null);
  const [venues, setVenues] = useState([]);

  if (!arcade_id) {
    return <p>Loading...</p>;
  }

  const arcadeCoins = parseFloat(coins) || 0;
  const arcadeHardPlay = parseFloat(hardPlay) || 0;



  useEffect(() => {
    const getArcadeApi = async () => {
      // console.log(arcade_id)
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v2/arcadeManagement/getarcadeapi/${arcade_id}`);

        console.log(response.data.data)
        setApi(response.data || []);
      } catch (error) {
        console.error("Error fetching arcade api details:", error);
        setApi([]);
      }
    }

    const getVenueDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v2/arcadeManagement/venuebyarcade/${arcade_id}`
        );

        console.log(response)
        setVenues(response.data.data || []);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setVenues([]);
      }
    }

    const getManagerDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v2/userManagement/managerbyarcade/${arcade_id}`
        );
        setManagers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching manager details:", error);
        setManagers([]);
      }
    };

    getManagerDetail();
    getArcadeApi();
    getVenueDetail();
  }, [arcade_id]);

  return (
    <div>
      <MainDashboard
        middleText={arcade_id}
        // chartData={chartData}
        imgSrc="#"
        rightText="Some venue details..."
        dataS1Text={arcadeCoins.toString()}
        dataS2Text={(arcadeCoins * 0.25).toFixed(2)}
        dataS3Text={arcadeHardPlay.toString()}
        items={managers}
        api={api}
        venue={venues[0]}
        blockText="API Key Info"
        blockImageSrc="#"
      />
    </div>
  );
}