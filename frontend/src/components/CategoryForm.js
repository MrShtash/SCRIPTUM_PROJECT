import React, {useState} from 'react';
import './Category.css'

function CategoryForm() {
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/saveCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Category saved successfully:', data);
      })
      .catch(error => {
        console.log('Error saving data: ', error);
      });
  };

  return (
    <div className = "container">
      <h1>Category Page</h1>
      <p>Create a Company Category</p><br></br>
      <form onSubmit = {handleSubmit}>
        <label>
          Category Name: 
          </label>
          <input type = "text"
                  name = "name"
                  value = {formData.category}
                  onChange = {handleChange}
                  placeholder = "Category name"/>
        <br />
        <button type = "submit">Create Category</button>
      </form>
    </div>
  );
}

export default CategoryForm;