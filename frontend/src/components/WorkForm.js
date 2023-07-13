import React, {useState, useEffect} from 'react';
import './Work.css'

function WorkForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hour: '',
    specialist: '',
    date_creation: '',
    date_complete: '',
    deadline: '',
    result: '',
    sprint: ''
  });

  const [specialists, setSpecialists] = useState([]);
  const [sprints, setSprints] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/saveWork', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Work saved successfully: ', data);
      })
      .catch(error => {
        console.log('Error saving data: ', error);
      });
  };

  useEffect(() => {
    fetch("/api/getAllData")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSpecialists(data.specialists);
        setSprints(data.sprints);
      })
      .catch((error) => {
        console.log("Error getting data: ", error);
      });
  }, []);

  return (
    <div className="work-page">
      <h1>Work Page</h1>
      <h2>Add Your work</h2>
      <p>Enter the title of the job, a short full description, and the number of hours you spent on the job.</p>
      <p>Correctly indicate the start and end dates of the work, indicate the specialist and the result upon completion of the work.</p>
      <p>Correctly select the sprint for entering work data.</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
         Title: 
          <input type = "text"
                  name = "title"
                  value = {formData.title}
                  onChange = {handleChange}
                  placeholder = "Title"/>
        </label>
        <br />
        <label>
         Description: 
          <input type = "text"
                  name = "description"
                  value = {formData.description}
                  onChange = {handleChange}
                  placeholder = "Description"/>
        </label>
        <br />
         <label>
         Hours: 
          <input type = "number"
                  name = "hour"
                  value = {formData.hour}
                  onChange = {handleChange}
                  placeholder = "Hours"/>
        </label>
        <br />
        <label>
          Specialist: 
          <select name = "specialist"
                  id = "specialist"
                  value = {formData.specialist}
                  onChange = {handleChange}>
          <option value = "">--Please choose a Specialist--</option>
          {specialists.map((specialist, index) => (
              <option key = {index} value = {specialist.specialist_id}>
                {specialist.f_name} {specialist.l_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date Start: 
          <input type = "date"
                  name = "date_creation"
                  value = {formData.date_creation}
                  onChange = {handleChange}
                  placeholder = "Date Start"/>
        </label>
        <br />
        <label>
          Date End: 
          <input type = "date"
                  name = "date_complete"
                  value = {formData.date_complete}
                  onChange = {handleChange}
                  placeholder = "Date End"/>
        </label>
        <br />
        <label>
          Deadline: 
          <input type = "date"
                  name = "deadline"
                  value = {formData.deadline}
                  onChange = {handleChange}
                  placeholder = "Deadline"/>
        </label>
        <br />
        <label>
          Result: 
          <input type = "text"
                  name = "result"
                  value = {formData.result}
                  onChange = {handleChange}
                  placeholder = "Result"/>
        </label>
        <br />
        <label>
          Sprint: 
          <select name= "sprint"
                  id = "sprint"
                  value = {formData.sprint}
                  onChange = {handleChange}>
          <option value = "">--Please choose a Sprint--</option>
          {sprints.map((sprint, index) => (
              <option key = {index} value = {sprint.sprint_id}>
                {sprint.title}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type = "submit">Create Work</button>
      </form>
    </div>
  );
}

export default WorkForm;