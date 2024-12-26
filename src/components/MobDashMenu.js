import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function MobDashMenu() {
  return (
  
    <div className="bg-custom-headpurple left-1/2 transform -translate-x-1/2 px-3  flex items-center justify-around  rounded-t-[35px]  fixed bottom-0 z-30 pt-1  ">
    {/* Link 1 */}
    <Link
      href="/admin/dashboard"
      className="hover:rounded-full  hover:bg-[rgba(255,255,255,0.23)]  h-[45px] w-[45px] flex items-center justify-center"
    >
      <Image src="/WhiteHome.svg"  height={32} width={32} alt="Home" />
    </Link>
  
  
    {/* Link 2 */}
    <Link
      href="/admin/arcadeDisplay"
      className="hover:rounded-full hover:bg-[rgba(255,255,255,0.23)] h-[45px] w-[45px] flex items-center justify-center"
    >
      <Image src="/WhiteStick.svg" height={35} width={35} alt="Stick" />
    </Link>
  
    {/* Link 3 */}
    <Link
      href="/admin/ManagerManagement"
      className="hover:rounded-full hover:bg-[rgba(255,255,255,0.23)] h-[45px] w-[45px] flex items-center justify-center"
    >
      <Image src="/WhiteManagement.svg" height={35} width={35} alt="Management" />
    </Link>
  
    {/* Link 4 */}
    <Link
      href="/admin/gameManagement"
      className="hover:rounded-full hover:bg-[rgba(255,255,255,0.23)] h-[45px] w-[45px] flex items-center justify-center"
    >
      <Image src="/WhiteController.svg" height={35} width={35} alt="Controller" />
    </Link>
  
    {/* Link 5 */}
    <Link
      href="/admin/venueManagement"
      className="hover:rounded-full hover:bg-[rgba(255,255,255,0.23)] h-[45px] w-[45px] flex items-center justify-center"
    >
      <Image src="/WhiteLocation.svg" height={35} width={35} alt="Location" />
    </Link>
  
    {/* Link 6 */}
    <Link
      href="/"
      className="hover:rounded-full hover:bg-[rgba(255,255,255,0.23)] h-[45px] w-[45px] flex items-center justify-center"
    >
      <Image src="/WhiteBot.svg" height={35} width={35} alt="Bot" />
    </Link>
  </div>
  
  
  )
}

export default MobDashMenu