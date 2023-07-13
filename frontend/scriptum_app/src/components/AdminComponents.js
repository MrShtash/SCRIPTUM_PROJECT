import React, {useState, useEffect} from 'react';
import axios from "axios";
import AdminDashboard from './AdminDashBoard';

function AdminComponent({specialistData}) {
  console.log(specialistData);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    if (specialistData && specialistData.department_id) {
      const departmentId = specialistData.department_id;
      axios
        .get(`/api/getAllData/`)
        .then((response) => {
          const department = response.data.departments.filter(
            (value) => value.department_id == departmentId
          );
          // console.log("Your department =>", department);
          setDepartmentData(department[0]);
        })
        .catch((error) => console.log("Error getting department:", error));
    }
  }, [specialistData]);

  useEffect(() => {
    if (departmentData && departmentData.length > 0) {
      const department = departmentData.find(
        (department) =>
          department.department_id === specialistData.department_id
      );
      if (department) {
        setDepartmentName(department.d_name);
      }
    }
  }, [departmentData, specialistData.department_id]);


  return (
    <div className="user-info">
      {specialistData && (
        <div>
          <h3>Hello,</h3>
          <p>{specialistData.f_name} {specialistData.l_name}</p>
          <p>From {departmentData.d_name} Department </p>
          <p>Your status is {specialistData.status} and you can start work</p>
          {/* <AdminDashboard/> */}
        </div>
      )}
    </div>
  );
}

export default AdminComponent;