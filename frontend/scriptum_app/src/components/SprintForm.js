import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './Sprint.css'

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: '#ccc',
    borderRadius: '4px',
    '&:hover': {
      borderColor: '#aaa'
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000'
  })
};

function SprintForm() {
  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    date_start: '',
    date_end: '',
    deadline: '',
    result: '',
    specialist: []
  });

  const [projects, setProjects] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSpecialistChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({...formData, specialist: selectedValues});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/saveSprint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Sprint saved successfully:', data);
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
        setProjects(data.projects);
        setSpecialists(data.specialists);
      })
      .catch((error) => {
        console.log("Error getting data: ", error);
      });
  }, []);

  return (
    <div class="sprint-page">
      <h1>Sprint Page</h1>
      <h2>Add Your Sprint</h2>
      <p>Create a sprint and name the project correctly. Don't forget to add all the necessary specialists to the sprint.</p>
      <p>Do not forget to indicate the planned dates and the result upon completion.</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
          Project: 
          <select name = "project"
                  id = "project"
                  value = {formData.project}
                  onChange = {handleChange}>
          <option value = "">--Please choose a project--</option>
          {projects.map((project, index) => (
              <option key = {index} value = {project.project_id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <br />
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
          Date Start: 
          <input type = "date"
                  name = "date_start"
                  value = {formData.date_start}
                  onChange = {handleChange}
                  placeholder = "Date Start"/>
        </label>
        <br />
        <label>
          Date End: 
          <input type = "date"
                  name = "date_end"
                  value = {formData.date_end}
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
          Specialist: 
        {/* <select name = "specialist"
                  id = "specialist"
                  value = {formData.specialist}
                  onChange = {handleChange}
                  placeholder = "Specialist"
                  multiple>
          <option value = "">--Please choose a Specialist--</option>
          {specialists.map((specialist, index) => (
              <option key = {index} value = {specialist.specialist_id}>
                {specialist.f_name}
              </option>
            ))}
          </select> */}


          {/* <Select name="specialist"
                  value={formData.specialist.map((value) => ({
                    value: value,
                    label: specialists.find((specialist) => specialist.specialist_id === value).f_name + ' ' + specialists.find((specialist) => specialist.specialist_id === value).l_name
                  }))}
                  options={specialists.map((specialist) => ({
                    value: specialist.specialist_id,
                    label: specialist.f_name + ' ' + specialist.l_name
                  }))}
                  isMulti
                  onChange={handleSpecialistChange}
                  styles={customStyles}
                  placeholder="Please select a specialist"/> */}

          <Select name = "specialist"
                  value = {formData.specialist.map((value) => ({
                  value: value,
                  label: specialists.find((specialist) => specialist.specialist_id === value).f_name + ' ' + specialists.find((specialist) => specialist.specialist_id === value).l_name
                }))}
                options={specialists.length > 0 ? specialists.map((specialist) => ({
                  value: specialist.specialist_id,
                  label: specialist.f_name + ' ' + specialist.l_name})) : []}
                isMulti
                onChange = {handleSpecialistChange}
                styles = {customStyles}
                placeholder = "Please select a specialist"/>
        </label>
        <br />
        <button type = "submit">Create Sprint</button>
      </form>
    </div>
  );
}

export default SprintForm;