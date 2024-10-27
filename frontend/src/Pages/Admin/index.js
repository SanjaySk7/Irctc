import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTrainsSuccess } from "./slice"; // Adjust the import path as necessary
import "./Admin.css"; // Import CSS for styling

function Admin() {
  const [listOfTrains, setListOfTrains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    trainName: "",
    source: "",
    destination: "",
    seatCapacity: "",
    arrivalTimeAtSource: "",
    arrivalTimeAtDestination: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Train Data:", formData);

    // Update the list of trains and dispatch the action
    const newTrain = { id: Date.now(), ...formData }; // Add a unique ID
    setListOfTrains([...listOfTrains, newTrain]);
    dispatch(postTrainsSuccess([...listOfTrains, newTrain])); // Dispatching action
    setShowForm(false);
    setFormData({
      trainName: "",
      source: "",
      destination: "",
      seatCapacity: "",
      arrivalTimeAtSource: "",
      arrivalTimeAtDestination: "",
    }); // Reset form
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Train"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="train-form">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Train Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="trainName"
                    value={formData.trainName}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Source:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
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
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Seat Capacity:</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="seatCapacity"
                    value={formData.seatCapacity}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Arrival Time at Source:</label>
                </td>
                <td>
                  <input
                    type="time"
                    name="arrivalTimeAtSource"
                    value={formData.arrivalTimeAtSource}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Arrival Time at Destination:</label>
                </td>
                <td>
                  <input
                    type="time"
                    name="arrivalTimeAtDestination"
                    value={formData.arrivalTimeAtDestination}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}

      {/* Table to display train details */}
      {listOfTrains.length > 0 && (
        <div>
          <h3>Train Details</h3>
          <table>
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Seat Capacity</th>
                <th>Arrival Time at Source</th>
                <th>Arrival Time at Destination</th>
              </tr>
            </thead>
            <tbody>
              {listOfTrains.map((train) => (
                <tr key={train.id}>
                  <td>{train.trainName}</td>
                  <td>{train.source}</td>
                  <td>{train.destination}</td>
                  <td>{train.seatCapacity}</td>
                  <td>{train.arrivalTimeAtSource}</td>
                  <td>{train.arrivalTimeAtDestination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
