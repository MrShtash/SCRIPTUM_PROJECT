import React, {
        useState,
        useEffect,
        // useContext
} from 'react';
import axios from 'axios';
import './Login.css'
import Logo from '../static/Logo.jpg'

// import {AppContext} from '../App';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  //   fetch('/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(formData)
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Data saved successfully:', data);
  //     })
  //     .catch(error => {
  //       console.log('Error saving data: ', error);
  //     });
  // };

  axios.post('/api/login', formData)
      .then(response => {
        const {
              success,
              token,
              group_id,
              specialist_id
            } = response.data;
        if (success && token) {
          // save token, group_id, specialist_id on localStorage or cookie
          localStorage.setItem('token',
                              token);
          localStorage.setItem('group_id',
                                // response.data.group_id
                                group_id
                                ); // Check group specialist
          localStorage.setItem('specialist_id',
                                specialist_id);
          // redirect to protect rout
          window.location.href = '/protected';
        } else {
          console.log('Error authorization:', response.data.message);
        }
      })
      .catch(error => {
        console.log('Error authorization:', error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/protected';
    }
  }, []);

  return (
    <div>
      {/* <h1>Login Page</h1> */}
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <form onSubmit = {handleSubmit}>
        <label>
          {/* Username   */}
          <input type = "text"
                  name = "username"
                  value = {formData.username}
                  onChange = {handleChange}
                  placeholder = "Username"/>
        </label>
        <br />
        <label>
          {/* Password */}
          <input type = "password"
                  name = "password"
                  value = {formData.password}
                  onChange = {handleChange}
                  placeholder = "Password"/>
        </label>
        <br />
        <button type = "submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;