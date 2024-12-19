
'use client'

import Image from 'next/image'
import React from 'react'

function ArcadeList({arcadeList, title}) {
  return (
    <div><div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[70vw]  max-w-[40vw]  overflow-y-auto bg-white  rounded-xl shadow-md">
    <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold  border-2 border-b-custom-headblue ">{title}</h2>
    <ul className="">
        {arcadeList.map((arcade) => (
            <li
                key={arcade.arcade_id}
                className="flex justify-between items-center bg-white border border-b-black p-3  shadow hover:bg-gray-100"
            >
                <span>{arcade.arcade_id}</span>
                <div className="flex space-x-2">
                    {/* Settings Icon */}
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => console.log(`Settings for ${arcade.name}`)}
                    >
                        <Image src="/Delete.svg"  height={32} width={32} />
                    </button>
                    {/* Delete Icon */}
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => console.log(`Delete ${arcade.name}`)}
                    >
                        <Image src="/Setting.svg" height={32} width={32} />
                    </button>
                </div>
            </li>
        ))}
    </ul>
</div>

</div>
  )
}

export default ArcadeList