import React, { useState } from "react";
import "./OrderForm.css";

function OrderForm() {
  const [workType, setWorkType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [address, setAddress] = useState("");
  const [skillRequired, setSkillRequired] = useState("");
  const [scenario, setScenario] = useState("");
  const [setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

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
    // handle form submission logic here
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="basic-info-card">
        <h3>Basic Info</h3>
        <label>
          Work Type:
          <input
            type="text"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          />
        </label>
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
      <div className="image-upload ">
        <h3>Upload Image</h3>
        <div className="file-upload">
          <input type="file" onChange={handleFileInputChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" />}
        </div>
      </div>
      <button type="submit" className="order-btn">
        Order
      </button>
    </form>
  );
}

export default OrderForm;
