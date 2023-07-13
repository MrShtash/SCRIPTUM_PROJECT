import React, {useState} from 'react';
import './Cash.css'

function CashForm() {
  const [formData, setFormData] = useState({
    cash: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/saveCash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Cash saved successfully:', data);
      })
      .catch(error => {
        console.log('Error saving data: ', error);
      });
  };

  return (
    <div className = "container">
      <h1>Cash Page</h1>
      <p>Enter amount</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
          Cash: 
          </label>
          <input type = "number"
                  name = "cash"
                  value = {formData.cash}
                  onChange = {handleChange}
                  placeholder = "Cash" />
        
        <br />
        {/* <label>
          Cash: 
        <select name = "cash"
                  id = "cash"
                  value = {formData.cash}
                  onChange = {handleChange}>
          <option value = "">--Please choose a cash--</option>
          </select>
        </label>
        <br /> */}
        <button type = "submit">Create Cash</button>
      </form>
    </div>
  );
}

export default CashForm;