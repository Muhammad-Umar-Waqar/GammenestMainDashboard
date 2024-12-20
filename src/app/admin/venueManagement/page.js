'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';
import showDeleteConfirm from '@/components/Modals/Delete';
import showEditModal from '@/components/Modals/VenueEdit';
import LoadingComponent from '@/components/LoadingComponent';

function Page() {
    const [venueName, setVenueName] = useState("");
    const [cityName, setCityName] = useState("");
    const [venueList, setVenueList] = useState([]);
    const [isLoading, setisLoading] = useState(false);



    const title = "Venue's List";

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                setisLoading(true);
                const response = await axios.get('http://localhost:3000/api/venues/getvenues/');
                setVenueList(response.data.venues);
            } catch (error) {
                Swal.fire('Error', 'Error fetching venues: ' + error.message, 'error');
            } finally{
                setisLoading(false);
            }
        };
        fetchVenues();
    }, []);

    async function handleVenueSubmit(e) {
        e.preventDefault();
        if (!venueName || !cityName) {
            Swal.fire('Error', 'Venue Name and City Name are required', 'error');
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/venues/addvenue/', {
                venue_name: venueName,
                venue_city: cityName,
            });

            const response = await axios.get('http://localhost:3000/api/venues/getvenues/');
            setVenueList(response.data.venues);
            setVenueName("");
            setCityName("");
            Swal.fire('Success', 'Venue added successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || error.message, 'error');
        }
    }

    const handleDeleteVenue = async (venue_id) => {
        try {
            await axios.post('http://localhost:3000/api/venues/deletevenue/', { venue_id });
            setVenueList((prevList) => prevList.filter((venue) => venue.venue_id !== venue_id));
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || error.message, 'error');
        }
    };

    const handleEditVenue = (venue) => {
        showEditModal(
            async (updatedData) => {
                try {
                    await axios.post('http://localhost:3000/api/venues/editvenue/', {
                        venue_id: venue.venue_id,
                        ...updatedData,
                    });

                    setVenueList((prevList) =>
                        prevList.map((v) =>
                            v.venue_id === venue.venue_id
                                ? { ...v, ...updatedData }
                                : v
                        )
                    );

                } catch (error) {
                    Swal.fire('Error', error.response?.data?.error || error.message, 'error');
                }
            },
            venue // Pass the entire venue object
        );
    };


    if(isLoading){
        return(
          <LoadingComponent/>
        )
      }
    
      
    return (
        <div>
            <h1 className="text-xl font-bold my-3  xs:ml-0 ml-2">Venue Management</h1>

            <div className="flex md:flex-row gap-2 flex-col items-center justify-around">
                <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
                    <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue ">
                        {title}
                    </h2>
                    <ul>
                        {venueList.map((venue) => (
                            <li
                                key={venue.venue_id}
                                className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
                            >
                                <div className='break-words sm:whitespace-nowrap xs:text-auto text-sm xs:w-auto w-[130px] px-1'>{venue.venue_name}</div>
                                <div className="flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() =>
                                            showDeleteConfirm(() => handleDeleteVenue(venue.venue_id))
                                        }
                                    >
                                        <Image src="/Delete.svg" height={32} width={32} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleEditVenue(venue)}
                                    >
                                        <Image src="/Setting.svg" height={32} width={32} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <form
                    className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6"
                    onSubmit={handleVenueSubmit}
                >
                    <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
                        Add Venue
                    </h1>

                    <div className="grid grid-cols-3 items-center gap-4 w-full">
                        <label htmlFor="venue1" className="text-left font-medium text-gray-700">
                            Venue Name
                        </label>
                        <input
                            type="text"
                            id="venue1"
                            name="venue1"
                            className="p-2 border border-black focus:outline-none rounded-full col-span-2"
                            onChange={(e) => setVenueName(e.target.value)}
                            value={venueName}
                            placeholder="Enter Venue Name"
                        />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4 w-full">
                        <label htmlFor="city1" className="text-left font-medium text-gray-700">
                            City Name
                        </label>
                        <input
                            type="text"
                            id="city1"
                            name="city1"
                            className="p-2 border border-black focus:outline-none rounded-full col-span-2"
                            onChange={(e) => setCityName(e.target.value)}
                            value={cityName}
                            placeholder="Enter City Name"
                        />
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
                            className="text-red-500 py-1 px-6 rounded-xl border border-black hover:border-red-600 hover:text-black"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;
