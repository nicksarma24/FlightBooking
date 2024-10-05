import React, { useState } from 'react';

const calculateDuration = (arrivalTime, departureTime) => {
  const parseTime = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  };

  const departure = parseTime(departureTime);
  const arrival = parseTime(arrivalTime);

  const departureDate = new Date(1970, 0, 1, departure.hours, departure.minutes);
  let arrivalDate = new Date(1970, 0, 1, arrival.hours, arrival.minutes);

  if (arrivalDate < departureDate) {
    arrivalDate.setDate(arrivalDate.getDate() + 1);
  }

  const durationInMinutes = (arrivalDate - departureDate) / (1000 * 60);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.round(durationInMinutes % 60);

  return `${hours}h ${minutes}m`;
};

const FlightResults = ({ flights, loading, error }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading flights.</div>;

  const airlineLogos = {
    "Emirates": "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0002/9305/brand.gif?itok=w5krm9GS",
    "Air India": "https://w7.pngwing.com/pngs/499/882/png-transparent-delhi-air-india-limited-airline-logo-others.png"
  };

  const handleSelectPackage = (flight) => {
    setSelectedFlight(flight);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedFlight(null);
  };

  return (
    <div className="relative p-6">
      <table className="min-w-full table-auto border-collapse">
        <tbody>
          {flights.map((flightPackage, index) => {
            const combinedPrice = flightPackage.departureFlight.price + flightPackage.returnFlight.price;

            return (
              <React.Fragment key={index}>
                <tr className="bg-white border-t border-gray-200 shadow-lg rounded-lg">
                  <td className="py-5 px-6 flex items-center">
                    <img
                      src={airlineLogos[flightPackage.departureFlight.airline]}
                      alt={`${flightPackage.departureFlight.airline} Logo`}
                      className="w-12 h-auto mr-3 rounded-lg"
                    />
                    <span className="font-bold text-gray-700">{flightPackage.departureFlight.airline}</span>
                  </td>
                  <td className="py-5 px-6">{flightPackage.departureFlight.departure}</td>
                  <td className="py-5 px-6">{flightPackage.departureFlight.arrival}</td>
                  <td className="py-5 px-6">
                    <small className="block text-gray-500">Departure</small>
                    {flightPackage.departureFlight.departureTime}
                  </td>
                  <td className="py-5 px-6">
                    <small className="block text-gray-500">Arrival</small>
                    {flightPackage.departureFlight.arrivalTime}
                  </td>
                  <td className="py-5 px-6">
                    <small className="block text-gray-500">Duration</small>
                    {calculateDuration(flightPackage.departureFlight.arrivalTime, flightPackage.departureFlight.departureTime)}
                  </td>
                  <td className="py-5 px-6" rowSpan="2">
                    <div className="flex flex-col items-center mb-2">
                      <p className="font-bold text-lg text-black-700">From: ${combinedPrice}</p>
                      <button
                        className="bg-emerald-700 text-white rounded-lg px-7 py-2 hover:bg-blue-500 transition duration-200 shadow-md mt-2"
                        onClick={() => handleSelectPackage(flightPackage)}
                      >
                        Select Flight
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="bg-gray-100 border-b border-gray-200 shadow-lg rounded-lg">
                  <td className="py-5 px-6 flex items-center">
                    <img
                      src={airlineLogos[flightPackage.returnFlight.airline]}
                      alt={`${flightPackage.returnFlight.airline} Logo`}
                      className="w-12 h-auto mr-3 rounded-lg"
                    />
                    <span className="font-bold text-gray-700">{flightPackage.returnFlight.airline}</span>
                  </td>
                  <td className="py-5 px-6">{flightPackage.returnFlight.departure}</td>
                  <td className="py-5 px-6">{flightPackage.returnFlight.arrival}</td>
                  <td className="py-5 px-6">
                    <small className="block text-gray-500">Departure</small>
                    {flightPackage.returnFlight.departureTime}
                  </td>
                  <td className="py-5 px-6">
                    <small className="block text-gray-500">Arrival</small>
                    {flightPackage.returnFlight.arrivalTime}
                  </td>
                  <td className="py-5 px-6">
                    {calculateDuration(flightPackage.returnFlight.arrivalTime, flightPackage.returnFlight.departureTime)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="7" className="py-2"></td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {isSidebarOpen && selectedFlight && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto border-l border-gray-200">
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            <h2 className="text-lg font-bold">Flight Details</h2>
            <button onClick={closeSidebar} className="text-gray-600 hover:text-gray-800">Close</button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">Departure Flight</h3>
            <p className="text-gray-600">{selectedFlight.departureFlight.airline}</p>
            <p>{selectedFlight.departureFlight.departure} - {selectedFlight.departureFlight.arrival}</p>
            <p className="text-gray-500">{selectedFlight.departureFlight.departureTime} - {selectedFlight.departureFlight.arrivalTime}</p>
            <p className="font-semibold">{calculateDuration(selectedFlight.departureFlight.arrivalTime, selectedFlight.departureFlight.departureTime)}</p>

            <div className="flex flex-col my-4">
              <div className="w-1 h-16 bg-gray-300"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full my-1"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full my-1"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full my-1"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full my-1"></div>
              <div className="w-1 h-16 bg-gray-300"></div>
            </div>

            <h3 className="font-semibold text-lg mt-4">Return Flight</h3>
            <p className="text-gray-600">{selectedFlight.returnFlight.airline}</p>
            <p>{selectedFlight.returnFlight.departure} - {selectedFlight.returnFlight.arrival}</p>
            <p className="text-gray-500">{selectedFlight.returnFlight.departureTime} - {selectedFlight.returnFlight.arrivalTime}</p>
            <p className="font-semibold">{calculateDuration(selectedFlight.returnFlight.arrivalTime, selectedFlight.returnFlight.departureTime)}</p>

            <p className="font-bold mt-4 text-lg">From ${selectedFlight.departureFlight.price + selectedFlight.returnFlight.price}</p>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40" 
          onClick={closeSidebar} 
        />
      )}
    </div>
  );
};

export default FlightResults;
