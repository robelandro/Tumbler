import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    document.title = "Profile";
    // Fetch user data from an API
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

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
            <span>{userData.dob}</span>
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
              value={userData.website}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.website}</span>
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
      <div className="register">
      <Link to="/login">log out</Link>
      </div>
    </div>
  );
}

export default Profile;
