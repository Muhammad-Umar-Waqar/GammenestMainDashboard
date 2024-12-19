import ArcadeList from '@/components/admin/ArcadeList'
import React from 'react'

function Page() {

       const venues = [
  { id: 1, name: 'Khi-GM-A001' },
  { id: 2, name: 'Khi-GM-A002' },
  { id: 3, name: 'Khi-GM-A003' },
  { id: 4, name: 'Khi-GM-B001' },
  { id: 5, name: 'Khi-GM-B002' },
  { id: 6, name: 'LHE-GM-C001' },
  { id: 7, name: 'LHE-GM-C002' },
  { id: 8, name: 'ISB-GM-D001' },
  { id: 9, name: 'ISB-GM-D002' },
  { id: 10, name: 'PES-GM-E001' },
];

    
      const title = "Venue's List"
  return (
    <div>
        <h1 className='text-xl font-bold my-3'>Venue Management</h1>
       
        <div className='flex md:flex-row gap-2 flex-col items-center justify-around'>
        <ArcadeList arcadeList={venues} title={title}/>  

        
        <form className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6">
            {/* Form Title */}
    <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
        Add Game
    </h1>

    {/* First Field */}
    <div className="grid grid-cols-3 items-center gap-4 w-full">
        <label htmlFor="arcade1" className="text-left font-medium text-gray-700">
            Game Name
        </label>
        <input
            type="text"
            id="arcade1"
            name="arcade1"
            className="p-2 border border-black  focus:outline-none  rounded-full col-span-2"
       placeholder='Enter Text' />
    </div>

    <div className="grid grid-cols-3 items-center gap-4 w-full">
        <label htmlFor="arcade1" className="text-left font-medium text-gray-700">
            City Name
        </label>
        <input
            type="text"
            id="arcade1"
            name="arcade1"
            className="p-2 border border-black  focus:outline-none  rounded-full col-span-2"
       placeholder='Enter Text' />
    </div>

    <div className="flex justify-end w-full space-x-4">

<button
    type="submit"
    className="bg-custom-headblue text-white py-1 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
    Submit
</button>
<button
    type="button"
    className="text-red-500  py-1 px-6 rounded-xl border border-black hover:border-red-600 hover:text-black "
>
    Cancel
</button>
</div>
        </form>
        </div>
    </div>
  )
}

export default Page