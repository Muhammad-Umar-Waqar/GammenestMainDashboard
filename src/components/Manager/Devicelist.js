import Link from "next/link";
import { useState } from "react";
const DeviceList = ({devices}) => {
  // Define the device data directly in the component's state
  
const handleDeviceClick = (device) =>{
    console.log(device.name);
    
}
  return (
    <div className="device-list">
   {devices.map((device) => (
  <li key={device.id} className="list-none my-2">
    <button
      className="flex  hover:bg-gray-100  focus:bg-gray-200  items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:backdrop-blur-lg dark:hover:bg-gray-700 group"
      onClick={() => handleDeviceClick(device)}  // Custom click handler
      aria-label={`${device.status === "on" ? "Turn off" : "Turn on"} ${device.name}`}
    >
      {/* Device Name */}
      <div className="ms-3 whitespace-nowrap">{device.name}</div>
      {/* Device Status Button */}
      <div
        className={`w-4 h-4 rounded-full ${device.status === "on" ? "bg-green-500" : "bg-red-500"}`}
        aria-hidden="true"  // Hide the status circle from screen readers
      />
    </button>
  </li>
))}
    </div>
  );
};
export default DeviceList;