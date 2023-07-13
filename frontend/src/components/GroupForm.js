import React, {useState} from 'react';
import './Group.css'

function GroupForm() {
  const [formData, setFormData] = useState({
    group_name: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('/api/saveGroupData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Group_data saved successfully: ', data);
      })
      .catch(error => {
        console.log('Error saving data: ', error);
      });
  };

  return (
    <div className = "container">
      <h1>Group Page</h1>
      <p>Create a Group for Specialist</p><br></br>
      <form onSubmit={handleSubmit}>
        <label>
          Group: 
           </label>
          <input type = "text"
                  name = "group_name"
                  value = {formData.group_name}
                  onChange = {handleChange}
                  placeholder = "Group"/>
       
        <br />
        <button type = "submit">Create Group Item</button>
      </form>
    </div>
  );
}

export default GroupForm;