import React from 'react';

function SearchForm({ airports, setFrom, setTo, setDepartureDate, setReturnDate, searchFlights, departureDate }) {
  const handleSearch = (e) => {
    e.preventDefault();
    searchFlights();
  };

  return (
    <form onSubmit={handleSearch} className="max-w-8xl mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Flights</h2>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <select 
          className="border p-2 rounded-lg w-3/5"
          onChange={(e) => setFrom(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Where From</option>
          {airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.name} ({airport.code})
            </option>
          ))}
        </select>
        
        <img 
          src="https://img.freepik.com/free-vector/two-way-black-arrow-art-illustration_56104-735.jpg" 
          alt="Arrow" 
          className="w-12 h-12 rounded-full"
        />
        
        <select 
          className="border p-2 rounded-lg w-3/5"
          onChange={(e) => setTo(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Where To</option>
          {airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.name} ({airport.code})
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col w-3/5">
          <label htmlFor="departureDate" className="text-sm">Departure</label>
          <input 
            type="date" 
            id="departureDate"
            className="border p-2 rounded-lg" 
            onChange={(e) => {
              setDepartureDate(e.target.value); 
              setReturnDate(''); // Reset return date when departure date changes
            }} 
          />
        </div>

        <div className="flex flex-col w-3/5">
          <label htmlFor="returnDate" className="text-sm">Return</label>
          <input 
            type="date" 
            id="returnDate"
            className="border p-2 rounded-lg" 
            onChange={(e) => {
              setReturnDate(e.target.value); 
            }} 
            min={departureDate} // Set min to the selected departure date
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="submit" className="bg-emerald-700 text-white p-2 rounded-lg">
          Search Flights
        </button>
      </div>
      
      <br />
      <div className="text-center text-gray-600">
        <p>Please select flights from Delhi to Dubai only</p>
      </div>
    </form>
  );
}

export default SearchForm;
