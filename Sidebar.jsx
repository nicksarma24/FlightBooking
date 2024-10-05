// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ isOpen, onClose, flightDetails }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Flight Details</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
      </div>
      <div className="p-4">
        {flightDetails ? (
          <div>
            <h3 className="font-semibold">Departure</h3>
            <p>{flightDetails.departureCity}</p>
            <p>{flightDetails.departureTime}</p>
            <h3 className="font-semibold">Arrival</h3>
            <p>{flightDetails.arrivalCity}</p>
            <p>{flightDetails.arrivalTime}</p>
          </div>
        ) : (
          <p>No flight details available.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
