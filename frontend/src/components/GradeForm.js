import React, {useState} from 'react';
import './Grade.css'

function GradeForm() {
  const [formData, setFormData] = useState({
    grade_type: '',
    cost: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('/api/saveGrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Grade saved successfully: ', data);
      })
      .catch(error => {
        console.log('Error saving data: ', error);
      });
  };

  return (
    <div className = "container">
      <h1>Grade Page</h1>
      <p>Create a Grade for Specialist</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
          Grade: 
          </label>
          <input type = "text"
                  name = "grade_type"
                  value = {formData.grade_type}
                  onChange = {handleChange}
                  placeholder = "Grade"/>
        <br />
        <label>
          Cost: 
          </label>
          <input type = "number"
                  name = "cost"
                  value = {formData.cost}
                  onChange = {handleChange}
                  placeholder = "Cost"/>
        
        <br />
        <button type = "submit">Create Grade</button>
      </form>
    </div>
  );
}

export default GradeForm;