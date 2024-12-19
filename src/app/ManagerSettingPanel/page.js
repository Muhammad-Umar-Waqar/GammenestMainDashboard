'use client'

import React, { useState } from 'react';

import DeviceList from '@/components/Manager/Devicelist';
import AddDeviceSpeedDial from '@/components/Manager/Adddevice';
import SignIn from '@/components/Manager/SigninManager';

function Page() {

  //example data
  const [devices] = useState([
    {
      name: "Smart Light",
      id: "12345-abcde-67890",
      status: "on",
      version: "v1.2.0",
    },
    {
      name: "Smart Thermostat",
      id: "23456-bcdef-78901",
      status: "off",
      version: "v2.0.1",
    },
    {
      name: "Smart Door Lock",
      id: "34567-cdefg-89012",
      status: "on",
      version: "v1.5.3",
    },
    {
      name: "Smart Camera",
      id: "45678-defgh-90123",
      status: "off",
      version: "v3.1.0",
    },
    {
      name: "Smart Refrigerator",
      id: "56789-efghi-01234",
      status: "on",
      version: "v4.0.0",
    },
    {
      name: "Smart Speaker",
      id: "67890-fghij-12345",
      status: "off",
      version: "v2.3.1",
    },
  ]);

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return (
    <div>
    <div className="relative">
      {/* Sidebar */}
      <aside
        className={`fixed shadow-lg bg-opacity-70 top-0 left-0 z-40 w-[260px] h-screen 
        transition-transform duration-500 ease-[cubic-bezier(0.07,0.88,0.37,1.05)] 
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-[76.5%]"} 
        bg-white/40 backdrop-blur-lg shadow-[0_8px_32px_rgba(31,38,135,0.4)]`}
        id="default-sidebar"
        aria-label="Sidebar"
      >
        <div className="h-full mt-[50px] px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <div>
            <DeviceList devices = { devices }/>
          </div>
          <div className={`fixed bottom-[8%]  ${isSidebarVisible ? "right-[50%] left-[50%]" : "right-[1%]"}`}>
          
            <AddDeviceSpeedDial />
          </div>
        </div>
      </aside>

      {/* Hamburger Button - Positioned outside of the Sidebar */}
      <button 
        onClick={toggleSidebar} 
        data-drawer-target="default-sidebar" 
        data-drawer-toggle="default-sidebar" 
        aria-controls="default-sidebar" 
        type="button" 
        className={`fixed top-4 ${isSidebarVisible ?  "left-6" : "left-2"}  z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
    </div>
    <SignIn/>
    </div>
  )
}

export default Page;
