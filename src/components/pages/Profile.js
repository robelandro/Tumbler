import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [Cookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile";
    // Fetch user data from an API
    fetch(`http://localhost:5000/get_user/${Cookie.token}`)
    .then(response => {
      if (response.ok) { // Check if response status is 200 OK
        return response.json(); // Parse response data as JSON
      } else {
        throw new Error(`User not found. Status code: ${response.status}`);
      }
    })
    .then(data => {
      setUserData(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [Cookie]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Save user data to the API
    console.log("User data saved: ", userData);
  };

  const handleLogOut = () => {
    removeCookie("token");
    navigate("/login");
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="user-info">
        <div className="info-field">
          <label>Name:</label>
          {isEditMode ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.name}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
        <div className="info-field">
          <label>Email:</label>
          {isEditMode ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.email}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
        <div className="info-field">
          <label>Phone Number:</label>
          {isEditMode ? (
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.phone}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
        <div className="info-field">
          <label>Gender:</label>
          {isEditMode ? (
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
        <div className="info-field">
          <label>Date of Birth:</label>
          {isEditMode ? (
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.date_of_birth}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
        <div className="info-field">
          <label>Address:</label>
          {isEditMode ? (
            <input
              type="text"
              name="address"
              value={userData.location}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.location}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
        <div className="info-field">
          <label>Skill:</label>
          {isEditMode ? (
            <input
              type="text"
              name="skill"
              value={userData.skill}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.skill}</span>
          )}
          {isEditMode && (
            <FontAwesomeIcon
              icon={faSave}
              onClick={handleSaveClick}
              className="edit-btn"
            />
          )}
          {!isEditMode && (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            />
          )}
        </div>
      </div>
      <div className="log-out">
      <button onClick={handleLogOut}>log out</button>
      </div>
    </div>
  );
}

export default Profile;
