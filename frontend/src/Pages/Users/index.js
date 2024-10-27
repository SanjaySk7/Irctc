// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import "./User.css"; // Import the CSS for styling

// function User() {
//   const [showForm, setShowForm] = useState(false);
//   const [searchData, setSearchData] = useState({ source: "", destination: "" });
//   const [availableTrains, setAvailableTrains] = useState([]);

//   // Access train list from Redux store
//   const trainList = useSelector((state) => state.trains.trainList);

//   // Toggle form display
//   const toggleForm = () => setShowForm(!showForm);

//   // Handle input change for source and destination
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchData({ ...searchData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const matchedTrains = trainList?.filter(
//       (train) =>
//         train.source.toLowerCase() === searchData.source.toLowerCase() &&
//         train.destination.toLowerCase() === searchData.destination.toLowerCase()
//     );
//     setAvailableTrains(matchedTrains);
//     console.log("Matched Trains:", matchedTrains); // Log matched trains
//   };

//   return (
//     <div>
//       <h2>User Page</h2>
//       <p>This is the user page.</p>

//       <button onClick={toggleForm}>
//         {showForm ? "Close Booking Form" : "Book Ticket"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="booking-form">
//           <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <label>Source:</label>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="source"
//                     value={searchData.source}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label>Destination:</label>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="destination"
//                     value={searchData.destination}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan="2" style={{ textAlign: "center" }}>
//                   <button type="submit">Search Trains</button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </form>
//       )}

//       {availableTrains.length > 0 && (
//         <div>
//           <h3>Available Trains</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Train Name</th>
//                 <th>Seat Count</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {availableTrains.map((train) => (
//                 <tr key={train.id}>
//                   <td>{train.trainName}</td>
//                   <td>{train.seatCount}</td>
//                   <td>
//                     <button>Book Ticket</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default User;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./User.css"; // Import the CSS for styling

function User() {
  const [showForm, setShowForm] = useState(false);
  const [searchData, setSearchData] = useState({ source: "", destination: "" });
  const [availableTrains, setAvailableTrains] = useState([]);

  // Access train list from Redux store
  const trainList = useSelector((state) => state.trains.trainList);

  // Mock data to use when there are no trains
  const mockTrainData = [
    {
      id: 1,
      trainName: "Mock Train A",
      seatCount: 50,
      source: "City A",
      destination: "City B",
    },
    {
      id: 2,
      trainName: "Mock Train B",
      seatCount: 75,
      source: "City A",
      destination: "City C",
    },
    {
      id: 3,
      trainName: "Mock Train C",
      seatCount: 100,
      source: "City B",
      destination: "City A",
    },
  ];

  // Toggle form display
  const toggleForm = () => setShowForm(!showForm);

  // Handle input change for source and destination
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedTrains = trainList?.filter(
      (train) =>
        train.source.toLowerCase() === searchData.source.toLowerCase() &&
        train.destination.toLowerCase() === searchData.destination.toLowerCase()
    );

    // If no trains match, use mock data for display
    const trainsToDisplay =
      matchedTrains.length > 0 ? matchedTrains : mockTrainData;
    setAvailableTrains(trainsToDisplay);
    console.log("Available Trains:", trainsToDisplay); // Log available trains
  };

  return (
    <div>
      <h2>User Page</h2>
      <p>This is the user page.</p>

      <button onClick={toggleForm}>
        {showForm ? "Close Booking Form" : "Book Ticket"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="booking-form">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Source:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="source"
                    value={searchData.source}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Destination:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="destination"
                    value={searchData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <button type="submit">Search Trains</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}

      {availableTrains.length > 0 && (
        <div>
          <h3>Available Trains</h3>
          <table>
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Seat Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {availableTrains.map((train) => (
                <tr key={train.id}>
                  <td>{train.trainName}</td>
                  <td>{train.seatCount}</td>
                  <td>
                    <button>Book Ticket</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default User;