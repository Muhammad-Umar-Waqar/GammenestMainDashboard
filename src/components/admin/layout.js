'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


function Layout({ children }) {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // To ensure the UI updates only after hydration

    useEffect(() => {
        setIsMounted(true); // Set mounted to true after the component is hydrated
    }, []);

    const handleMouseEnter = () => {
        setSidebarVisible(true);
    };

    const handleMouseLeave = () => {
        setSidebarVisible(false);
    };

    if (!isMounted) {
        // Render nothing or a fallback to avoid mismatches during SSR
        return null;
    }



    const menuItems = [
        {
            name: "Dashboard",
            id: "dashboard",
            imageUrl: "/time.svg", 
        },
        {
            name: "Manager Management",
            id: "manager-management",
            imageUrl: "/Manager.svg", 
            source:"/admin/ManagerManagement"
        },
        {
            name: "Arcade Management",
            id: "arcade-management",
            imageUrl: "/JoyStick.svg",
            source: "/admin/arcadeDisplay",
            
        },
        {
            name: "Game Management",
            id: "game-management",
            imageUrl: "/controller.svg", 
            source: "/admin/gameManagement"
        }
    ]

    const handleMenuClick = (menuItem) => {
        setSidebarVisible(false);
        console.log(menuItem.name);
    };




    return (
        <div>
            <div className="relative">
                {/* Sidebar */}
                <aside
                    className={`fixed  shadow-lg bg-opacity-70 top-0 left-0 z-40 h-screen 
                    transition-all duration-300 ease-in-out rounded-2xl
                    ${isSidebarVisible ? "w-[270px]" : "w-[60px]"} 
                    bg-custom-blue`}
                    id="default-sidebar"
                    aria-label="Sidebar"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >

                    <div className="h-full mt-[50px] px-3 py-4 overflow-x-hidden dark:bg-gray-800">
                    
                            <div className="menu-list  mt-[100px]">
                                <Image src="/IotIcon.svg" height={32} width={32} alt="IOTFIY ICON" className={`fixed top-[120px]`}/>
                                {menuItems.map((menuItem) => (
                                    <li key={menuItem.id} className="list-none my-2">
                                        <Link href={String(menuItem.source)}
                                            className="flex items-center justify-start  my-[50px] text-gray-900 rounded-lg dark:text-white hover:backdrop-blur-lg dark:hover:bg-gray-700 group"
                                            onClick={() => handleMenuClick(menuItem)} // Custom click handler
                                            aria-label={`Navigate to ${menuItem.name}`}
                                        >
                                            {/* Menu Item Image */}
                                            <Image
                                                src={menuItem.imageUrl}
                                                alt={menuItem.name}
                                                className='mr-3'
                                                height={28}
                                                width={28}
                                            />
                                            {/* Menu Item Name */}
                                            <div className={`ms-3 whitespace-nowrap text-white text-md transition-all duration-900 delay-900 ${
                                        isSidebarVisible ? "opacity-100 visible" : "opacity-0 invisible"
                                    }`}>{menuItem.name}</div>
                                        </Link>
                                    </li>
                                ))}
                                <button className={`flex items-center fixed bottom-5  transition-all duration-900 delay-900  ${
                                        isSidebarVisible ? "opacity-100 visible " : "opacity-0 invisible"
                                    }`}>
                                    <Image src="/Logout.svg" height={32} width={32} className="mr-2 ml-1" />
                                    <div
                                    className={`ms-3 whitespace-nowrap text-white`}
                                >
                                    Logout
                                </div>
                                </button>
                            </div>
                       </div>
                </aside>
            </div>
            <div className={`${isSidebarVisible ? "md:ml-[270px]" : "ml-[65px]"} transition-all duration-300`} >
                {children}
            </div>
        </div>
    );
}

export default Layout;
















