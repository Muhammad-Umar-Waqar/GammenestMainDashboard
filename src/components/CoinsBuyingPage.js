'use client'
import React, { useState } from 'react'
import Image from 'next/image'

function CoinsBuyingPage(props) {

    const [coins, setCoins] = useState(0);
    const [krona,setKrona] = useState(0);

    
    function HandleAddCoins(){
        setCoins((prevCoins) => prevCoins + 1);
        setKrona((prevKrona)=> prevKrona + 10);
    }

    function HandleDecreCoins() {
        setCoins((prevCoins) => Math.max(0, prevCoins - 1));
        setKrona((prevKrona)=> Math.max(0, prevKrona - 10));
      }
      

  return (
    <>
    <div className="flex flex-col my-3 justify-center items-center px-2 ">
    <div className="relative">
  <Image src="/MobLogo.png" height={65} width={210} className="block" />
  <div className="absolute bottom-[-220%] left-[27%] text-white text-center w-[100px]">
    <div className='font-poppins font-bold text-[#EEEBF3] text-xl  '>Pay</div>
    <div className='font-poppins font-bold text-xl '>
    {krona} <span className='font-poppins font-semibold  text-base'>Krona</span>
    </div>
  </div>
</div>

        <h2 className='font-poppins font-bold text-[20px] leading-[36px] text-[#0D00A1]'>Welcome</h2>
        <p className='text-gray-700  font-poppins font-extralight text-[15px]  '>&quot;Game on! Tap to Play!&quot; 🎮</p>
       {/* <CustomDropdown/> */}


      <Image src="/CoinImg.svg" height={133} width={133} className='mt-5'/>
       {/* <h1 className='font-extralight  mt-[20px]'>Coins Required: <span className='font-bold'>03</span></h1>  */}
       <div className='border border-black rounded-full  flex items-center justify-between py-1 px-1 min-w-[120px] mt-1'> 
            <button onClick={HandleDecreCoins} className='bg-[#d9d9d99a] rounded-full w-[30px] h-[30px] flex items-center justify-center p-2'><Image src="minus.svg" alt="Decrement Icon" height={5} width={20} className='bg-[rgba(255,255,255,0.23)] '/></button><div className='text-xl  font-bold font-poppins mx-1'>{coins}</div><button onClick={HandleAddCoins} className='bg-[#d9d9d99a] rounded-full w-[30px] h-[30px] flex items-center justify-center p-2'><Image src="PlusIcon.svg" height={20} width={20}/></button>
       </div>
       <h1 className='font-extralight text-sm   mt-[20px]'>Choose your payment method</h1>
       <div className='w-[250px] flex items-center justify-around my-7'>
        <Image src="./GooglePay.svg" width={46}  height={46} alt='Google Payment Icon' />
        <Image src="./ApplePay.svg" width={46}  height={46} alt='Google Payment Icon' />
        <Image src="./BamBora.svg" width={46}  height={46} alt='Google Payment Icon' />
       </div>

        <h1 className='text-sm  font-extralight leading-[18px] text-center'>Tap pay to get started...</h1>
        <button className=" px-8 py-2 my-4 text-center text-lg text-white mt-[29px] bg-custom-purple rounded-[35px] border border-black disabled:bg-gray-500" disabled={coins===0}>
            Pay
        </button>

        <h1 className='text-sm  font-extralight leading-[18px] text-center'>
        01 coins = 10 karona
        </h1>

        <p className='text-sm font-light mt-[15px]  '>
            Unique ID: {props.unique_id}
        </p>
    </div>
       </>
  )
}

export default CoinsBuyingPage