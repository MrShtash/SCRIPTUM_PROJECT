import React, {useState, useEffect} from "react";
import './CalcSpec.css'
import axios from "axios";
import {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        Legend
      } from "recharts";


const Form = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [specialistsInDepartment, setSpecialistsInDepartment] = useState([]);
  const [workedHours, setWorkedHours] = useState(0);
  const [workedAmount, setWorkedAmount] = useState(0);
  const [allData, setAllData] = useState({});

  const [hourlyRate, setHourlyRate] = useState(0);
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    axios
      .get("/api/getAllData")
      .then((response) => {
        setAllData(response.data);
        setDepartments(response.data.departments);
      })
      .catch((error) => {
        console.log("Error getting data:", error);
      });
  }, []);

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    setSelectedDepartment(selectedDepartmentId);

    const specialists = allData.specialists.filter((specialist) => {
        return specialist.department_id == selectedDepartmentId && specialist.status === 'active'
      });
    setSpecialistsInDepartment(specialists);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCalculate = () => {
    // console.log('=======');
    const selectedSpecialist = specialistsInDepartment[0];
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const filteredWorks = allData.works.filter((work) =>
        work.specialist_id === selectedSpecialist.specialist_id &&
        // work.specialist_id === selectedSpecialist.id &&
        new Date(work.date_complete) >= startDateObj &&
        new Date(work.date_complete) <= endDateObj
    );

    // console.log(allData.works[0].specialist_id === selectedSpecialist.id)
    // console.log(new Date(allData.works[0].date_complete) >= startDateObj)
    // console.log(new Date(allData.works[0].date_complete) <= endDateObj) 

    // console.log(allData.works[0].specialist_id)
    // console.log(selectedSpecialist.id)
    // console.log(specialistsInDepartment)

    // console.log('$$$', filteredWorks);
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%', allData.works);

    const totalWorkedHours = filteredWorks.reduce(
      (total, work) => total + work.hours,
      0
    );
    
    const hourlyRate = allData.grades.find(
      (grade) => {return grade.grade_id === selectedSpecialist.grade_id}
    )
    // console.log('*******', allData.grades);
    // console.log(specialistsInDepartment);
    // console.log(specialistsInDepartment[0])  
    // console.log('!!!!!!!', hourlyRate?.cost, totalWorkedHours);

    const totalAmount = totalWorkedHours * hourlyRate?.cost;

    setWorkedHours(totalWorkedHours);
    setWorkedAmount(totalAmount);
    setHourlyRate(hourlyRate?.cost);

const chartData = [
      {
        name: "Worked Hours",
        value: totalWorkedHours,
        color: totalWorkedHours > 181 ? "red" : "#8b7b74",
      },
      {
        name: "Standard Hours",
        value: 181,
        color: "blue",
      },
    ];

    setChartData(chartData);
  };

  return (
    <div className = "speccontainer">
      <h1>Calculate Workload</h1>
      <p>Select a period, correct Department and Specialist</p><br></br>

      <div className="contet">
          <div className = "flex-container">

            <div className = "form-container">
              <div>
                <label>Start Date:</label>
                <input type = "date"
                        value = {startDate}
                        onChange = {handleStartDateChange} />
              </div>
              <div>
                <label>End Date:</label>
                <input type = "date"
                        value = {endDate}
                        onChange = {handleEndDateChange} />
              </div>
              <div>
                <label>Department:</label>
                <select value = {selectedDepartment}
                        onChange = {handleDepartmentChange}>
                  <option value = "">Please select Department</option>
                  {departments.map((department, index) => (
                    <option key = {index} value = {department.department_id}>
                      {department.d_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Specialist:</label>
                <select>
                    <option value = "">Please select Specialist</option>
                  {specialistsInDepartment.map((specialist, index) => (
                    <option key = {index} value = {specialist.id}>
                      {specialist.f_name} {specialist.l_name}
                    </option>
                  ))}
                </select>
              </div >
              <div>
                <button onClick={handleCalculate}>Calculate</button>
              </div>
              <div className="work-info">
                <div>
                  <label>Worked Hours: {workedHours}</label>
                </div>
                <div>
                  <label>Worked Amount: {workedAmount}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-container">
            {chartData.length > 0 && (
              <BarChart width = {400}
                        height = {300}
                        data = {chartData}>
                <CartesianGrid strokeDasharray = "3 3" />
                <XAxis dataKey = "name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey = "value"
                      fill = {chartData[0].color} />
              </BarChart>
            )}
          </div>
      </div>
    </div>
  );
};

export default Form;