import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import "./OrderForm.css";

function OrderForm() {
  const [deadline, setDeadline] = useState("");
  const [address, setAddress] = useState("");
  const [skillRequired, setSkillRequired] = useState("");
  const [scenario, setScenario] = useState("");
  const [selectedFile, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [Cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const token = Cookie.token;

const handleFileInputChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("deadline", deadline);
  formData.append("skillRequired", skillRequired);
  formData.append("scenario", scenario);
  formData.append("selectedFile", selectedFile);
  formData.append("address", address);
  formData.append("token", token);
  fetch("http://localhost:5000/add_post", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) navigate("/");
    })
    .catch((err) => console.error(err));
};

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="basic-info-card">
        <h3>Basic Info</h3>
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Skill Required:
          <input
            type="text"
            value={skillRequired}
            onChange={(e) => setSkillRequired(e.target.value)}
          />
        </label>
      </div>
      <div className="scenario-box">
        <h3>Scenario</h3>
        <textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
        ></textarea>
      </div>
      <div className="image-upload">
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose file
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileInputChange}
          style={{ opacity: 0 }}
        />
        {selectedFile && (
          <p>
            Selected file: <strong>{selectedFile.name}</strong>
          </p>
        )}
        {previewUrl && <img src={previewUrl} alt="Preview" />}
      </div>
      <button type="submit" className="order-btn">
        Order
      </button>
    </form>
  );
}

export default OrderForm;
