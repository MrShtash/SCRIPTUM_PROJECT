import React, {useState, useEffect} from "react";
import './Register.css'

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    grade: "",
    department: "",
    group: "",
    status: "",
  });

  const [grades, setGrades] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/saveSpecialist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Specialist saved successfully: ", data);
      })
      .catch((error) => {
        console.log("Error saving data: ", error);
      });
  };

  useEffect(() => {
    fetch("/api/getAllData") 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGrades(data.grades);
        setDepartments(data.departments);
        setGroups(data.groups);
      })
      .catch((error) => {
        console.log("Error getting data: ", error);
      });
  }, []);

  return (
    <div className = "regcontainer">
      <h1>Register Page</h1>
      <p>Create a new Specialist</p>
      <p>Check the Department, grade and personal data</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
          Username:
          </label>
          <input type = "text"
                  name = "username"
                  value = {formData.username}
                  onChange = {handleChange}
                  placeholder = "Username"/>
        <br />
        <label>
          First Name:
          </label>
          <input type = "text"
                  name = "f_name"
                  value = {formData.f_name}
                  onChange = {handleChange}
                  placeholder = "First Name"/>
        <br />
        <label>
          Last Name:
          </label>
          <input type = "text"
                  name = "l_name"
                  value = {formData.l_name}
                  onChange = {handleChange}
                  placeholder = "Last Name"/>
        <br />
        <label>
          Email:
          </label>
          <input type = "email"
                  name = "email"
                  value = {formData.email}
                  onChange = {handleChange}
                  placeholder = "Email"/>
        <br />
        <label>
          Password:
          </label>
          <input type = "password"
                  name = "password"
                  value = {formData.password}
                  onChange = {handleChange}
                  placeholder = "Password"/>
        <br />
        <label>
          Grade:
          </label>
          <select name = "grade"
                    id = "grade"
                    value = {formData.grade}
                    onChange = {handleChange}
                    placeholder = "Group">
            <option value="">--Please choose a grade--</option>
            {grades.map((grade, index) => (
              <option key = {index} value = {grade.grade_id}>
                {grade.grade_type}
              </option>
            ))}
          </select>
        <br />
        <label>
          Department:
          </label>
          <select name = "department"
                    id = "department"
                    value = {formData.department}
                    onChange = {handleChange}>
            <option value = "">--Please select a department--</option>
            {departments.map((department, index) => (
              <option key = {index} value = {department.department_id}>
                {department.d_name}
              </option>
            ))}
          </select>
        <br />
        <label>
          Group:
          </label>
          <select name = "group"
                    id = "group"
                    value = {formData.group}
                    onChange = {handleChange}>
            <option value = "">--Please choose a group--</option>
            {groups.map((group, index) => (
              <option key = {index} value = {group.group_id}>
                {group.group_name}
              </option>
            ))}
          </select>
        <br />
        <label>
          Status:
          </label>
          <select name = "status"
                    id = "status"
                    value = {formData.status}
                    onChange = {handleChange}>
            <option value = "">--Please choose a status--</option>
            <option value = "active">Active</option>
            <option value = "inactive">Inactive</option>
          </select>
        <br />
        <button type = "submit">Create Specialist</button>
      </form>
    </div>
  );
}

export default RegisterForm;
