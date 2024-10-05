import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import { airportData } from './airportsData';
import LoadingScreen from './LoadingScreen';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  useEffect(() => {
    setAirports(airportData.airports);
  }, []);

  const mockFlightData = [
    {
      id: 1,
      departureFlight: {
        flightNumber: 'AI101',
        departure: 'DEL',
        arrival: 'DXB',
        departureTime: '10:00 AM',
        arrivalTime: '12:30 PM',
        airline: 'Air India',
        price: 5000,
      },
      returnFlight: {
        flightNumber: 'AI102',
        departure: 'DXB',
        arrival: 'DEL',
        departureTime: '1:30 PM',
        arrivalTime: '4:00 PM',
        airline: 'Air India',
        price: 5000,
      },
    },
    {
      id: 2,
      departureFlight: {
        flightNumber: 'EK500',
        departure: 'DEL',
        arrival: 'DXB',
        departureTime: '11:00 AM',
        arrivalTime: '1:00 PM',
        airline: 'Emirates',
        price: 7000,
      },
      returnFlight: {
        flightNumber: 'EK501',
        departure: 'DXB',
        arrival: 'DEL',
        departureTime: '2:00 PM',
        arrivalTime: '4:30 PM',
        airline: 'Emirates',
        price: 7000,
      },
    },
  ];

  const navigate = useNavigate();

  const searchFlights = async () => {
    if (!from || !to) {
      alert("Please select both 'From' and 'To' airports.");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchInitiated(true);

    setFlights([]);
    navigate('/flights');

    setTimeout(() => {
      setFlights(mockFlightData);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {searchInitiated && (
        <header className="sticky top-0 bg-gray-100 border-b border-gray-300 shadow-md z-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 ">Flight Search</h2>
          <div className="flex justify-between mt-2">
            <div className="flex-1 text-center text-gray-600 p-2 border border-gray-300 rounded-lg mx-1">{from || 'From'}</div>
            <div className="flex-1 text-center text-gray-600 p-2 border border-gray-300 rounded-lg mx-1">{to || 'To'}</div>
            <div className="flex-1 text-center text-gray-600 p-2 border border-gray-300 rounded-lg mx-1">{departureDate || 'Departure'}</div>
            <div className="flex-1 text-center text-gray-600 p-2 border border-gray-300 rounded-lg mx-1">{returnDate || 'Return'}</div>
          </div>
        </header>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div className="p-6">
              <h1 className="text-3xl font-bold text-center text-emerald-800 mb-6">Good Morning, Brian</h1>
              <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              
                <SearchForm
  airports={airports}
  setFrom={setFrom}
  setTo={setTo}
  setDepartureDate={setDepartureDate}
  setReturnDate={setReturnDate}
  searchFlights={searchFlights}
  departureDate={departureDate} 
/>
                 
              </div>
            </div>
          }
        />
        <Route
          path="/flights"
          element={loading ? (
            <LoadingScreen />
          ) : (
            <FlightResults from={from} to={to} flights={flights} error={error} />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
