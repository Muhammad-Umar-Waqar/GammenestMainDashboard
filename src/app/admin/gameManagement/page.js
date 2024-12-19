'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';
import showDeleteConfirm from '@/components/Modals/Delete';
import showEditModal from '@/components/Modals/Edit';
import LoadingComponent from '@/components/LoadingComponent';

function Page() {
    const [game, setGame] = useState("");  // Track game name input
    const [gameList, setGameList] = useState([]);  // Track list of games
    const [isLoading, setisLoading] = useState(false);

    const title = "Game's List";

    // Fetch the games when the component mounts
    useEffect(() => {
        const fetchGames = async () => {
            setisLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/games/getgames/');  // API to fetch games
                setGameList(response.data.games);  // Update the game list state
            } catch (error) {
                Swal.fire('Error', 'Error fetching games: ' + error.message, 'error');
            }finally{
                setisLoading(false);
            }
        };
        fetchGames();
    }, []);  // Empty dependency array, so it runs only once on mount

    // Handle form submission to add a new game
    async function handleGameSubmit(e) {
        e.preventDefault();
        if (!game) {
            Swal.fire('Error', 'Game name is required', 'error');
            return;  // Prevent sending request if game name is empty
        }

        try {
            // Send POST request to add the new game
            await axios.post('http://localhost:3000/api/games/addgame/', {
                game_name: game,
            });

            // After successful addition, fetch the updated game list
            const response = await axios.get('http://localhost:3000/api/games/getgames/');
            setGameList(response.data.games);  // Update the game list with the latest data
            setGame("");  // Clear the input field
            Swal.fire('Success', 'Game added successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || error.message, 'error');
        }
    }

    // Handle game deletion
    const handleDeleteGame = async (game_id) => {
        try {
            await axios.post('http://localhost:3000/api/games/deletegame/', { game_id });
            setGameList((prevList) => prevList.filter((game) => game.game_id !== game_id)); // Update state
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || error.message, 'error');
        }
    };

    // Handle edit game name
    const handleEditGame = async (game_id, currentName) => {
        showEditModal(async (newName) => {
            if (newName && newName !== currentName) {
                try {
                    // Send update request to the backend
                    await axios.post('http://localhost:3000/api/games/editgame/', {
                        game_id,
                        game_name: newName,
                    });

                    // Update the local state with the new game name
                    setGameList((prevList) =>
                        prevList.map((game) =>
                            game.game_id === game_id ? { ...game, game_name: newName } : game
                        )
                    );
                } catch (error) {
                    Swal.fire('Error', error.response?.data?.error || error.message, 'error');
                }
            }
        }, currentName);
    };


    if (isLoading) {
        // Show the loading component while data is being fetched
        return <LoadingComponent />;
    }

    return (

        <div>
            <h1 className="text-xl font-bold my-3  xs:ml-0 ml-2">Game Management</h1>

            <div className="flex md:flex-row gap-2 flex-col items-center justify-around">
                {/* Game List */}
                <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[75vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
                    <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue ">
                        {title}
                    </h2>
                    <ul>
                        {gameList.map((game) => (
                            <li
                                key={game.game_id}
                                className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
                            >
                                <div className='break-words sm:whitespace-nowrap xs:text-auto text-sm xs:w-auto w-[130px] px-1'>{game.game_name}</div>
                                <div className="flex space-x-2">
                                    {/* Delete Button */}
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() =>
                                            showDeleteConfirm(() => handleDeleteGame(game.game_id))
                                        }
                                    >
                                        <Image src="/Delete.svg" height={32} width={32} />
                                    </button>

                                    {/* Edit Button */}
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleEditGame(game.game_id, game.game_name)}
                                    >
                                        <Image src="/Setting.svg" height={32} width={32} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Add Game Form */}
                <form
                    className="sm:ml-[20px] flex flex-col items-center justify-center space-y-6 mx-2 w-[245px] sm:w-[400px] md:w-[500px] rounded-lg shadow-md bg-white p-6"
                    onSubmit={handleGameSubmit}
                >
                    <h1 className="text-start w-full text-2xl font-bold text-custom-blue mb-4">
                        Add Game
                    </h1>

                    <div className="grid grid-cols-3 items-center gap-4 w-full">
                        <label htmlFor="game1" className="text-left font-medium text-gray-700">
                            Game Name
                        </label>
                        <input
                            type="text"
                            id="game1"
                            name="game1"
                            className="p-2 border border-black focus:outline-none rounded-full col-span-2"
                            onChange={(e) => setGame(e.target.value)}
                            value={game}
                            placeholder="Enter Text"
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