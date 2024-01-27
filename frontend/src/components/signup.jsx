import React from 'react';
export function Signup(){
    return( 
        <div className="max-w-md mx-auto bg-white rounded-md p-8 shadow-md">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Firstname"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Lastname"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Signup
        </button>
      </div>
      )
}