import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './Project.css'

// import 'react-select/dist/react-select.css';
// import {css} from '@emotion/css';

// const selectStyles = {
//   control: (provided, state) => ({
//           ...provided,
//           border: state.isFocused ? '2px solid blue' : '2px solid gray',
//           borderRadius: '4px',
//           padding: '5px',
//           boxShadow: state.isFocused ? '0 0 5px blue' : 'none',
//           outline: 'none',
//           '&:hover': {
//             border: '2px solid blue'
//           }

//     //       ...provided,
//     // border: state.isFocused ? '2px solid blue' : '1px solid #ccc', // Цвет рамки при фокусе и без фокуса
//     // borderRadius: '4px',
//     // boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none', // Тень при фокусе
//     // '&:hover': {
//     //   borderColor: state.isFocused ? 'blue' : '#aaa' // Цвет рамки при наведении курсора
//     // }
//         }),
//   option: (provided, state) => ({
//           ...provided,
//           backgroundColor: state.isSelected ? 'blue' : 'white',
//           color: state.isSelected ? 'white' : 'black',
//           '&:hover': {
//             backgroundColor: 'blue',
//             color: 'white'
//           }
//         }),
//   multiValue: (provided) => ({
//               ...provided,
//               backgroundColor: 'blue',
//               color: 'white',
//               borderRadius: '4px'
//             }),
//   multiValueLabel: (provided) => ({
//                     ...provided,
//                     color: 'white'
//                   }),
//   multiValueRemove: (provided) => ({
//                     ...provided,
//                     color: 'white',
//                     ':hover': {
//                       backgroundColor: 'blue',
//                       color: 'white'
//                     }
//                   })
// };


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

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    s_date: '',
    e_date: '',
    deposit: '',
    description: '',
    specialist: [],
    department: []
  });

  // const defaultDepartmentOption = {
  //   value: '',
  //   label: 'Please select Department'
  // };

  // const defaultSpecialistOption = {
  //   value: '',
  //   label: 'Please select Specialist'
  // };

  const [companies, setCompanies] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // const handleDepartmentChange = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setFormData({...formData, department: selectedValues});
  // };

  // const handleSpecialistChange = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setFormData({...formData, specialist: selectedValues});
  // };

  const handleDepartmentChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({...formData, department: selectedValues});
  };

  const handleSpecialistChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({...formData, specialist: selectedValues});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/saveProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Project saved successfully: ', data);
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
        setCompanies(data.companies);
        setDepartments(data.departments);
        setSpecialists(data.specialists);
      })
      .catch((error) => {
        console.log("Error getting data: ", error);
      });
  }, []);
  
  return (
    <div class="project-page">
      
      <h1>Project Page</h1>
      <h2>Create New Project</h2>
      <p>Create a new project, do not forget to correctly indicate the project timeline, budget and company.</p>
      <p>Describe the project - the essence and the planned result.</p>
      <p>Make sure to add all the necessary specialists.</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
          Name: 
          <input type = "text"
                  name = "name"
                  value = {formData.name}
                  onChange = {handleChange}
                  placeholder = "Project Name"/>
        </label>
        <br />
        <label>
          Company: 
        <select name = "company"
                  id = "company"
                  value = {formData.company}
                  onChange = {handleChange}>
          <option value = "">--Please choose a company--</option>
          {companies.map((company, index) => (
              <option key = {index} value = {company.company_id}>
                {company.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date Start: 
          <input type = "date"
                  name = "s_date"
                  value = {formData.s_date}
                  onChange = {handleChange}
                  placeholder = "Date Start"/>
        </label>
        <br />
        <label>
          Date End: 
          <input type = "date"
                  name = "e_date"
                  value = {formData.e_date}
                  onChange = {handleChange}
                  placeholder = "Date End"/>
        </label>
        <br />
        <label>
          Deposit: 
          <input type = "number"
                  name = "deposit"
                  value = {formData.deposit}
                  onChange = {handleChange}
                  placeholder = "Deposit"/>
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
          Department: 
          {/* <select name = "department"
                  id = "department"
                  value = {formData.department_id}
                  onChange = {handleChange}
                  // onChange = {handleDepartmentChange}
                  multiple>
          <option value = "">--Please choose a Department--</option>
          {departments.map((department, index) => (
              <option key = {index} value = {department.department_id}>
                {department.d_name}
              </option>
            ))}
          </select> */}


          {/* <Select name="department"
                  value={departments.filter((department) => formData.department.includes(department.department_id))}
                  options={departments.map((department) => ({value: department.department_id, label: department.d_name}))}
                  isMulti
                  onChange={handleDepartmentChange}
                  style={{selectStyles}}/> */}

          {/* <Select
            name="department"
            value={formData.department.length > 0 ? formData.department : defaultDepartmentOption}
            options={[defaultDepartmentOption, ...departments.map((department) => ({
              value: department.department_id,
              label: department.d_name
            }))]}
            isMulti
            onChange={handleDepartmentChange}
            styles={selectStyles}/> */}


          <Select name = "department"
                  value = {formData.department.map((value) => ({
                    value: value,
                    label: departments.find((department) => department.department_id === value).d_name
                  }))}
                  options = {departments.map((department) => ({
                    value: department.department_id,
                    label: department.d_name
                  }))}
                  isMulti
                  onChange = {handleDepartmentChange}
                  styles = {customStyles}
                  placeholder = "Please select a department"/>
        </label>
        <br />
        <label>
          Specialists: 
        {/* <select name = "specialist"
                  id = "specialist"
                  value = {formData.specialist_id}
                  onChange = {handleChange}
                  // onChange = {handleSpecialistChange}
                  multiple>
          <option value = "">--Please choose a specialist--</option>
           {specialists.map((specialist, index) => (
              <option key = {index} value = {specialist.specialist_id}>
                {specialist.f_name} {specialist.l_name}
              </option>
            ))}
          </select> */}

          {/* <Select name="specialist"
                  value={specialists.filter((specialist) => formData.specialist.includes(specialist.specialist_id))}
                  options={specialists.map((specialist) => ({value: specialist.specialist_id, label: `${specialist.f_name} ${specialist.l_name}`}))}
                  isMulti
                  onChange={handleSpecialistChange}
                  style={{selectStyles}}/> */}


          {/* <Select
            name="specialist"
            value={formData.specialist.length > 0 ? formData.specialist : defaultSpecialistOption}
            options={[defaultSpecialistOption, ...specialists.map((specialist) => ({
              value: specialist.specialist_id,
              label: `${specialist.f_name} ${specialist.l_name}`
            }))]}
            isMulti
            onChange={handleSpecialistChange}
            styles={selectStyles}
          /> */}


          <Select name = "specialist"
                  value = {formData.specialist.map((value) => ({
                    value: value,
                    label: specialists.find((specialist) => specialist.specialist_id === value).f_name + ' ' + specialists.find((specialist) => specialist.specialist_id === value).l_name
                  }))}
                  options = {specialists.map((specialist) => ({
                    value: specialist.specialist_id,
                    label: specialist.f_name + ' ' + specialist.l_name
                  }))}
                  isMulti
                  onChange = {handleSpecialistChange}
                  styles = {customStyles}
                  placeholder = "Please select a specialist"/>
        </label>
        <br />
        <button type = "submit">Create Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;