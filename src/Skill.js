import React, { useState, useEffect } from 'react';
import styles from './Skill.module.css';

function Skill() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetch('/api/skills')
      .then(response => response.json())
      .then(data => setSkills(data));
  }, []);

  const handleAddSkill = () => {
    fetch('/api/skills', {
      method: 'POST',
      body: JSON.stringify({ skill: newSkill }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setSkills([...skills, data]);
        setNewSkill('');
      });
  };

  const handleEditSkill = (skillId, updatedSkill) => {
    fetch(`/api/skills/${skillId}`, {
      method: 'PUT',
      body: JSON.stringify({ skill: updatedSkill }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const updatedSkills = skills.map(skill => {
          if (skill.id === skillId) {
            return data;
          } else {
            return skill;
          }
        });
        setSkills(updatedSkills);
      });
  };

  const handleDeleteSkill = (skillId) => {
    fetch(`/api/skills/${skillId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          const updatedSkills = skills.filter(skill => skill.id !== skillId);
          setSkills(updatedSkills);
        }
      });
  };

  const handleInputChange = (event) => {
    setNewSkill(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Skills</h2>
      <ul className={styles.list}>
        {skills.map(skill => (
          <li key={skill.id} className={styles.item}>
            <input className={styles.input} type="text" value={skill.name} onChange={(event) => handleEditSkill(skill.id, event.target.value)} />
            <div className={styles.buttons}>
              <button className={styles.button} onClick={() => handleDeleteSkill(skill.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.add}>
        <input className={styles.input} type="text" value={newSkill} onChange={handleInputChange} />
        <button className={styles.button} onClick={handleAddSkill}>Add Skill</button>
      </div>
    </div>
  );
}

export default Skill;
