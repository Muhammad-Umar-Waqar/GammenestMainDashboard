import React from 'react'
import CustomDropdown from './CustomSelect'
import Image from 'next/image'

function Welcome(props) {
  return (
    <>
    <div className="flex flex-col my-3 justify-center items-center px-2 ">
    <div className="relative">
  <Image src="/MobLogo.png" height={65} width={210} className="block" />
  <div className="absolute bottom-[-220%] left-[27%] text-white text-center w-[100px]">
    <div className='font-poppins font-bold text-[#EEEBF3] text-xl'>Pay</div>
    <div className='font-poppins font-bold text-xl '>
      999 <span className='font-poppins font-semibold  text-base'>Krona</span>
    </div>
  </div>
</div>

        <h2 className='font-poppins font-bold text-[20px] leading-[36px] text-[#0D00A1]'>Welcome</h2>
        <p className='text-gray-700  font-poppins font-extralight text-[15px]  '>&quot;Game on! Tap to Play!&quot; 🎮</p>
       {/* <CustomDropdown/> */}

      <Image src="/CoinImg.svg" height={133} width={133} className='mt-5'/>
       <h1 className='font-extralight  mt-[20px]'>Coins Required: <span className='font-bold'>03</span></h1> 
       <h1 className='font-extralight text-sm   mt-[20px]'>Choose your payment method</h1>
       <div className='w-[250px] flex items-center justify-around my-7'>
        <Image src="./GooglePay.svg" width={46}  height={46} alt='Google Payment Icon' />
        <Image src="./ApplePay.svg" width={46}  height={46} alt='Google Payment Icon' />
        <Image src="./BamBora.svg" width={46}  height={46} alt='Google Payment Icon' />
       </div>

        <h1 className='text-sm  font-extralight leading-[18px] text-center'>Tap pay to get started...</h1>
        <button className="px-8 py-2 my-4 text-center text-lg text-white mt-[29px] bg-custom-purple rounded-[35px] border border-black">
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

export default Welcome