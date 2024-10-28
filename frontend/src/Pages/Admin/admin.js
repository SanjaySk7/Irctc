import React, { useState } from 'react';
import "./Admin.css";
import ViewTrains from './viewtrains'; 
import LogoutModal from '../../Component/logoutmodal';
import { useNavigate } from 'react-router-dom'; 

const Admin = () => {
    const [showAddTrainForm, setShowAddTrainForm] = useState(false);
    const [showViewTrains, setShowViewTrains] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        trainName: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        departureDate: '',
        arrivalDate: '',
        seats: ''
    });

    const [formErrors, setFormErrors] = useState({});
    
    const navigate= useNavigate(); 

    const handleAddTrainClick = () => {
        setShowAddTrainForm(true);
        setShowViewTrains(false);
    };

    const handleViewTrainsClick = () => {
        setShowAddTrainForm(false);
        setShowViewTrains(true);
    };

    const handleLogout = () => {
        setShowModal(true); 
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setFormErrors({
            ...formErrors,
            [e.target.name]: '', // Clear error when user starts typing
        });
    };

    const validateForm = () => {
        const errors = {};
        const { trainName, source, destination, departureTime, arrivalTime, departureDate, arrivalDate, seats } = formData;

        if (!trainName) errors.trainName = "Train Name is required.";
        if (!source) errors.source = "Source is required.";
        if (!destination) errors.destination = "Destination is required.";
        if (!departureTime) errors.departureTime = "Departure Time is required.";
        if (!arrivalTime) errors.arrivalTime = "Arrival Time is required.";
        if (!departureDate) errors.departureDate = "Departure Date is required.";
        if (!arrivalDate) errors.arrivalDate = "Arrival Date is required.";
        if (!seats) {
            errors.seats = "Total Seats is required.";
        } else if (seats <= 0) {
            errors.seats = "Total Seats must be greater than 0.";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return; // Stop form submission if there are errors
        }

        try {
            const response = await fetch('http://localhost:8081/add-train', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.Message); 
                setFormData({
                    trainName: '',
                    source: '',
                    destination: '',
                    departureTime: '',
                    arrivalTime: '',
                    departureDate: '',
                    arrivalDate: '',
                    seats: ''
                });
            } else {
                alert(data.Message); 
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting form");
        }
    };

    const handleConfirmLogout = () => {
        setShowModal(false); 
        navigate('/'); 
    };

    const handleCancelLogout = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className='admin-container'>
                <h2 className='admin-heading'>Welcome Admin!</h2>
                <nav className="admin-nav">
                    <button onClick={handleAddTrainClick}>Add Trains</button>
                    <button onClick={handleViewTrainsClick}>View Trains</button>
                    <button onClick={handleLogout}>Logout</button>
                </nav>

                {showAddTrainForm && (
                    <form className="add-train-form" onSubmit={handleSubmit}>
                        <label>
                            Train Name:
                            <input type="text" name="trainName" value={formData.trainName} onChange={handleChange} />
                            {formErrors.trainName && <p className="error-message">{formErrors.trainName}</p>}
                        </label>

                        <label>
                            Source:
                            <input type="text" name="source" value={formData.source} onChange={handleChange} />
                            {formErrors.source && <p className="error-message">{formErrors.source}</p>}
                        </label>

                        <label>
                            Destination:
                            <input type="text" name="destination" value={formData.destination} onChange={handleChange} />
                            {formErrors.destination && <p className="error-message">{formErrors.destination}</p>}
                        </label>

                        <label>
                            Departure Time:
                            <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} />
                            {formErrors.departureTime && <p className="error-message">{formErrors.departureTime}</p>}
                        </label>

                        <label>
                            Arrival Time:
                            <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} />
                            {formErrors.arrivalTime && <p className="error-message">{formErrors.arrivalTime}</p>}
                        </label>

                        <label>
                            Departure Date:
                            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} />
                            {formErrors.departureDate && <p className="error-message">{formErrors.departureDate}</p>}
                        </label>

                        <label>
                            Arrival Date:
                            <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} />
                            {formErrors.arrivalDate && <p className="error-message">{formErrors.arrivalDate}</p>}
                        </label>

                        <label>
                            Total Seats:
                            <input type="number" name="seats" value={formData.seats} onChange={handleChange} min="1" />
                            {formErrors.seats && <p className="error-message">{formErrors.seats}</p>}
                        </label>

                        <button type="submit">Submit</button>
                    </form>
                )}

                {showViewTrains && <ViewTrains />} 
                {showModal && (
                    <LogoutModal 
                        message="Are you sure you want to logout?"
                        onClose={handleCancelLogout}
                        onConfirm={handleConfirmLogout}
                    />
                )}
            </div>
        </div>
    );
};

export default Admin;
