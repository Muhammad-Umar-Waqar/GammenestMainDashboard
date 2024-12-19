'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';
import showDeleteConfirm from '@/components/Modals/Delete';
import showEditModal from '@/components/Modals/ManagerEdit';
import LoadingComponent from '@/components/LoadingComponent';


function Page() {
  const USER_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_USER_ROUTE_API_BASE_URL; 
  const ARCADE_ROUTE_API_BASE_URL = process.env.NEXT_PUBLIC_ARCADE_ROUTE_API_BASE_URL;
const [isLoading, setisLoading] = useState(false);

  const [managerList, setManagerList] = useState([]);
  const [arcadeList, setArcadeList] = useState([]);
  const [selectedArcades, setSelectedArcades] = useState([]);
  const [currentTab, setCurrentTab] = useState('all'); // 'all', 'selected', 'unselected'
  const [newManager, setNewManager] = useState({
    username: '',
    password: '',
    phone_number: '', // Initialize phone_number as an empty string
    email: '',
  });

  const title = "Manager's List";

  // Fetch managers and arcades when the component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setisLoading(true);
        const response = await axios.get(USER_ROUTE_API_BASE_URL + 'getusers');
        setManagerList(response.data.data);
      } catch (error) {
        Swal.fire('Error', 'Error fetching managers: ' + error.message, 'error');
      }finally{
        setisLoading(false);
      }
    };

      const fetchArcades = async () => {
        try {
          const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + "getarcades");
          console.log("Arcade API Response:", response.data);
          setArcadeList(response.data.data || []); // Default to an empty array
        } catch (error) {
          console.error("Error fetching arcades:", error.message);
          Swal.fire("Error", "Error fetching arcades: " + error.message, "error");
        }
      };
  
        

    fetchManagers();
    fetchArcades();
  }, []);

  const toggleArcadeSelection = (arcade_id) => {
    setSelectedArcades((prev) =>
      prev.includes(arcade_id)
        ? prev.filter((id) => id !== arcade_id)
        : [...prev, arcade_id]
    );
    console.log('Updated selectedArcades:', selectedArcades);
  };  

  const getFilteredArcades = () => {
    if (!Array.isArray(arcadeList)) {
      console.warn("arcadeList is not an array:", arcadeList);
      return [];
    }
  
    if (currentTab === "selected") {
      return arcadeList.filter((arcade) => selectedArcades.includes(arcade.arcade_id));
    } else if (currentTab === "unselected") {
      return arcadeList.filter((arcade) => !selectedArcades.includes(arcade.arcade_id));
    }
    return arcadeList;
  };
  

  const fetchManagerArcades = async (username) => {
    try {
      const response = await axios.get(ARCADE_ROUTE_API_BASE_URL + `getarcades/${username}`);
      return response.data.data;
    } catch (error) {
      Swal.fire('Error', 'Error fetching manager arcades: ' + error.message, 'error');
      return [];
    }
  };

  // Handle form submission to add a new manager
  const handleAddManager = async (e) => {
    e.preventDefault();
    const { username, password, phone_number, email } = newManager;

    if (!username || !password || !phone_number || !email || selectedArcades.length === 0) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    try {
      await axios.post(USER_ROUTE_API_BASE_URL + 'adduser', {
        ...newManager,
        selectedArcades,
      });
      const response = await axios.get(USER_ROUTE_API_BASE_URL + 'getusers');
      setManagerList(response.data.data);
      setNewManager({ username: '', password: '', phone_number: '', email: '' });
      setSelectedArcades([]);
      Swal.fire('Success', 'Manager added successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || error.message, 'error');
    }
  };

  // Handle edit functionality
  const handleEditManager = async (manager) => {
    const managerArcades = await fetchManagerArcades(manager.username);
    showEditModal(
      async (updatedData) => {
        console.log(updatedData)
        try {
          await axios.post(USER_ROUTE_API_BASE_URL + 'updateuser', updatedData);
          const response = await axios.get(USER_ROUTE_API_BASE_URL + 'getusers');
          setManagerList(response.data.data);
          // Swal.fire('Success', 'Manager updated successfully!', 'success');
        } catch (error) {
          Swal.fire('Error', error.response?.data?.error || error.message, 'error');
        }
      },
      manager,
      arcadeList, // All arcades
      managerArcades // Manager's arcades
    );
  };

  // Handle delete functionality with confirmation modal
  const handleDeleteManager = async (username) => {
    showDeleteConfirm(async () => {
      try {
        await axios.post(USER_ROUTE_API_BASE_URL + 'deleteuser', { username });
        setManagerList((prevList) => prevList.filter((user) => user.username !== username));
      } catch (error) {
        Swal.fire('Error', error.response?.data?.error || error.message, 'error');
      }
    });
  };




  if(isLoading){
    return(
      <LoadingComponent/>
    )
  }

  



  return (
    <div>
      <h1 className="text-xl font-bold my-3  xs:ml-0 ml-2">Manager Management</h1>

      <div className="flex md:flex-row gap-2 flex-col items-center justify-around">
        {/* Manager List */}
        <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
          <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue ">
            {title}
          </h2>
          <ul>
            {managerList.map((manager) => (
              <li
                key={manager.username}
                className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
              >
                <div className='break-words sm:whitespace-nowrap xs:text-auto text-sm xs:w-auto w-[130px] px-1'>{manager.email}</div>
                <div className="flex space-x-2">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleDeleteManager(manager.username)}
                  >
                    <Image src="/Delete.svg" alt="Delete" height={32} width={32} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleEditManager(manager)}
                  >
                    <Image src="/Setting.svg" alt="Edit" height={32} width={32} />
                  </button>
           
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Manager Form */}
        <form
          className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6"
          onSubmit={handleAddManager}
        >
          <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
            Add Manager
          </h1>

          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <label htmlFor="name" className="text-left font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-2 border border-black focus:outline-none rounded-full col-span-2"
              placeholder="Enter Name"
              value={newManager.username}
              onChange={(e) =>
                setNewManager((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <label htmlFor="password" className="text-left font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 border border-black focus:outline-none rounded-full col-span-2"
              placeholder="Enter Password"
              value={newManager.password}
              onChange={(e) =>
                setNewManager((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <label htmlFor="phone_number" className="text-left font-medium text-gray-700">
              Contact No.
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              className="p-2 border border-black focus:outline-none rounded-full col-span-2"
              placeholder="Enter Contact No."
              value={newManager.phone_number}
              onChange={(e) =>
                setNewManager((prev) => ({ ...prev, phone_number: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <label htmlFor="email" className="text-left font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 border border-black focus:outline-none rounded-full col-span-2"
              placeholder="Enter Email"
              value={newManager.email}
              onChange={(e) =>
                setNewManager((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="w-full max-w-xs border border-black rounded-lg p-2">
            <div className="flex sm:flex-row flex-col sm:gap-y-auto gap-y-2 justify-around mb-4">
              <button
                type="button"
                className={`px-4 py-2 text-white ${
                  currentTab === 'all' ? 'bg-custom-headblue' : 'bg-gray-700'
                } rounded-md text-sm`}
                onClick={() => setCurrentTab('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-white ${
                  currentTab === 'selected' ? 'bg-custom-headblue' : 'bg-gray-700'
                } rounded-md text-sm`}
                onClick={() => setCurrentTab('selected')}
              >
                Selected
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-white ${
                  currentTab === 'unselected' ? 'bg-custom-headblue' : 'bg-gray-700'
                } rounded-md text-sm`}
                onClick={() => setCurrentTab('unselected')}
              >
                Unselected
              </button>
            </div>

            <div className="max-h-[200px] overflow-y-auto">
  {Array.isArray(getFilteredArcades()) && (
    <ul>
      {getFilteredArcades().map((arcade) => (
        <li
          key={arcade.arcade_id}
          className="flex justify-between items-center border-b p-2"
        >
          <span className="text-sm">{arcade.arcade_id}</span>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={selectedArcades.includes(arcade.arcade_id)}
            onChange={() => toggleArcadeSelection(arcade.arcade_id)}
          />
        </li>
      ))}
    </ul>
  )}
</div>

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
              onClick={() =>
                setNewManager({ username: '', password: '', phone_number: '', email: '' })
              }
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