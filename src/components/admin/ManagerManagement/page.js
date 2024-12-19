'use client';

import React, { useState } from 'react';
import showEditModal from '@/components/Modals/ManagerEdit';

function Page() {
  const [managerList, setManagerList] = useState([
    { id: 1, name: 'Manager 123-123-1', password: 'pass1', contact_no: '1234567890', email: 'manager1@example.com' },
    { id: 2, name: 'Manager 123-123-2', password: 'pass2', contact_no: '1234567891', email: 'manager2@example.com' },
  ]);

  const handleEditManager = (manager) => {
    showEditModal((updatedData) => {
      setManagerList((prevList) =>
        prevList.map((m) => (m.id === manager.id ? { ...m, ...updatedData } : m))
      );
    }, manager);
  };

  return (
    <div>
      <h1 className="text-xl font-bold my-3">Manager Management</h1>

      <div className="max-h-[80vh] min-h-[60vh] md:min-w-[30vw] min-w-[70vw] max-w-[40vw] overflow-y-auto bg-white rounded-xl shadow-md">
        <h2 className="text-lg text-center pt-5 text-custom-headblue font-bold border-2 border-b-custom-headblue ">
          Manager's List
        </h2>
        <ul>
          {managerList.map((manager) => (
            <li
              key={manager.id}
              className="flex justify-between items-center bg-white border border-b-black p-3 shadow hover:bg-gray-100"
            >
              <span>{manager.name}</span>
              <div className="flex space-x-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleEditManager(manager)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
