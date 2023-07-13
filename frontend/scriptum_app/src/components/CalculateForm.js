import React, {useState, useEffect} from "react";
import axios from "axios";
import GantComponent from "./Gant";
import {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend
    } from "recharts";
import './CalculateForm.css'
// import 'smart-webcomponents-react/source/styles/smart.default.css';


const CompanyCalcForm = () => {
  const [data, setData] = useState({
      cashs: [],
      categories: [],
      companies: [],
      departments: [],
      grades: [],
      groups: [],
      hours: [],
      projects: [],
      project_departments: [],
      project_specialists: [],
      specialists: [],
      sprints: [],
      sprint_specialists: [],
      works: [],
      start_date: "",
      end_date: "",
    });

  const [selectedCompany, setSelectedCompany] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [filteredSprints, setFilteredSprints] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState("");
  const [selectedWork, setSelectedWork] = useState("");
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [remainingDeposit, setRemainingDeposit] = useState(0);
  const [sprintCost, setSprintCost] = useState(0);
  const [totalWorkCost, setTotalWorkCost] = useState(0);
  const [projectRemainingCost, setProjectRemainingCost] = useState(0);
  const [sprintRemainingCost, setSprintRemainingCost] = useState(0);
  const [selectedSprintHours, setSelectedSprintHours] = useState(0);
  const [selectedProjectHours, setSelectedProjectHours] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllData");
        setData(response.data);
        setSelectedProject(response.data.projects[0]?.project_id);
        setSelectedStartDate(response.data.start_date);
        setSelectedEndDate(response.data.end_date);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(
        selectedCompany !== '' &&
        selectedStartDate !== undefined &&
        selectedEndDate !== undefined
      ) {
      // console.log(data.projects[0].company_id == selectedCompany)
      // console.log("PROJECT START", data.projects[0].s_date,"SELECTED START", new Date(selectedStartDate).toISOString())
      // console.log(data.projects[0].s_date >= new Date(selectedStartDate).toISOString())
      // console.log("PROJECT END", data.projects[0].e_date, "SELECTED END", new Date(selectedEndDate).toISOString())
      // console.log(data.projects[0].e_date <= new Date(selectedEndDate).toISOString())
      // console.log("++++++++++++");
      const allProjects = data.projects.filter(
                                        (project) => 
                                          project.company_id === Number(selectedCompany)
                                          && project.s_date >= new Date(selectedStartDate).toISOString()
                                          && project.e_date <= new Date(selectedEndDate).toISOString())
    setFilteredProjects(allProjects)
    } 

    if(
        selectedProject !== '' &&
        selectedStartDate !== undefined &&
        selectedEndDate !== undefined
      ) {
      const allSprints = data.sprints.filter(
                                      (sprint) => 
                                        sprint.project_id === Number(selectedProject)
                                        && sprint.date_start >= new Date(selectedStartDate).toISOString()
                                        && sprint.date_end <= new Date(selectedEndDate).toISOString())
    setFilteredSprints(allSprints)
    //   console.log(data.sprints[0].project_id == selectedProject)
    //   console.log("SPRINT START", data.sprints[0].date_start,"SELECTED START", new Date(selectedStartDate).toISOString())
    //   console.log(data.sprints[0].date_start >= new Date(selectedStartDate).toISOString())
    //   console.log("SPRINT END", data.sprints[0].date_end, "SELECTED END", new Date(selectedEndDate).toISOString())
    //   console.log(data.sprints[0].date_end <= new Date(selectedEndDate).toISOString())
    //   console.log("++++++++++++");

    // console.log(data.sprints);
    // console.log(allSprints);
    // console.log(filteredSprints);
    // console.log(data.sprints[0].date_start);
    // console.log(data.sprints[0].date_end);
    }
    
    if(
        selectedSprint !== '' &&
        selectedStartDate !== undefined &&
        selectedEndDate !== undefined
      ) {
      const allWorks = data.works.filter(
                                  (work) => 
                                    work.sprint === Number(selectedSprint)
                                    && work.date_creation >= new Date(selectedStartDate).toISOString()
                                    && work.date_complete <= new Date(selectedEndDate).toISOString())
    setFilteredWorks(allWorks)
    }},

    [ 
      data.works,
      data.sprints,  
      data.projects,
      selectedCompany,
      selectedSprint,
      selectedProject,
      selectedWork,
      selectedStartDate,
      selectedEndDate
    ]);

  const handleCalculate = () => {
    const selectedProjectData = data.projects.find(
      (project) => project.project_id === Number(selectedProject)
    );

    const companyRemainingDeposit = data.companies.find(
      (company) => company.company_id === Number(selectedCompany)
    ).deposit;

    const remainingDeposit = companyRemainingDeposit - selectedProjectData.deposit;
    setRemainingDeposit(remainingDeposit);

    const selectedWorks = data.works.filter((work) =>
      selectedWork.includes(work.work_id.toString())
    );

    let totalWorkCost = 0;
    selectedWorks.forEach((work) => {
      const specialist = data.specialists.find(
        (specialist) => specialist.specialist_id === work.specialist_id
      );

      const specialistGrade = data.grades.find(
        (grade) => grade.grade_id === specialist.grade_id
      );

      const specialistHourlyCost = specialistGrade.cost;

      const workCost = specialistHourlyCost * work.hours;
      totalWorkCost += workCost;
    });
    setTotalWorkCost(totalWorkCost);

    const selectedSprintWorks = selectedWorks.filter(
      (work) => work.sprint === Number(selectedSprint)
    );

    const selectedSprintHours = selectedSprintWorks.reduce(
      (totalHours, work) => totalHours + work.hours,
      0
    );
    setSelectedSprintHours(selectedSprintHours);

    const selectedProjectHours = selectedWorks.reduce(
      (totalHours, work) => totalHours + work.hours,
      0
    );
    setSelectedProjectHours(selectedProjectHours);

    let sprintCost = 0;
    selectedSprintWorks.forEach((work) => {
      const specialist = data.specialists.find(
        (specialist) => specialist.specialist_id === work.specialist_id
      );

      const specialistGrade = data.grades.find(
        (grade) => grade.grade_id === specialist.grade_id
      );

      const specialistHourlyCost = specialistGrade.cost;

      const workCost = specialistHourlyCost * work.hours;
      sprintCost += workCost;
    });
    setSprintCost(sprintCost);

    const projectRemainingCost = selectedProjectData.deposit - totalWorkCost;
    setProjectRemainingCost(projectRemainingCost);

    const sprintRemainingCost = sprintCost;
    setSprintRemainingCost(sprintRemainingCost);

    const chartData = [
        {
        name: "Remaining Deposit",
        value: remainingDeposit,
        // color: "blue"
        color: "#8b7b74"
      },
        {
        name: "Project Remaining Cost",
        value: projectRemainingCost,
        // color: "green"
        color: "#00C49F"
      },
        {
        name: "Sprint Remaining Cost",
        value: sprintRemainingCost,
        // color: "red"
        color: "#FF0000"
      },
      ];
      setChartData(chartData);
  };


return (
    <div className = "companycalcpage">

      <div className = "header">
        <h1>Information about the company</h1>
        <p>Select a company to review financial performance and work progress.</p>
        <p>Correctly specify the period for which you want to see analytics.</p>
        <p>Select the company project, sprint and work of interest for greater accuracy.</p>
        <p>If you want to see the progress of work in a sprint, select a specific project.</p><br></br>
      </div>

      <div className = "content">

        <div className = "form-container">

          <div className = "form-group">
            <label>Select Company:</label>
            <select id = "company"
                    value = {selectedCompany}
                    onChange = {(e) => setSelectedCompany(e.target.value)}>
              <option value = "">--Please select Company--</option>
              {data.companies.map((company) => (
                <option key = {company.company_id}
                        value = {company.company_id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className = "form-group">
            <label>Start Date:</label>
            <input type = "date"
                    id = "start_date"
                    value = {selectedStartDate}
                    onChange = {(e) => setSelectedStartDate(e.target.value)}/>
          </div>

          <div className = "form-group">
            <label>End Date:</label>
            <input
              type = "date"
              id = "end_date"
              value = {selectedEndDate}
              onChange = {(e) => setSelectedEndDate(e.target.value)}
            />
          </div>

          <div className = "form-group">
            <label>Select Project:</label>
              <select id = "project"
                    // value = {selectedProject}
                    onChange = {(e) => setSelectedProject(e.target.value)}>
              <option value = "" selected>--Please select Project--</option>
              {filteredProjects.map((project) => (
                <option key = {project.project_id}
                        value = {project.project_id}>
                  {project.name} (Deposit: {project.deposit})
                </option>
              ))}
            </select>
          </div>

          <div className = "form-group">
            <label>Select Sprint:</label>
            <select id = "sprint"
                    value = {selectedSprint}
                    onChange = {(e) => setSelectedSprint(e.target.value)}>
              <option value = "">--Please select Sprint--</option>
              {filteredSprints.map((sprint) => (
                <option key = {sprint.sprint_id}
                        value = {sprint.sprint_id}>
                  {sprint.title}
                </option>
              ))}
            </select>
          </div>

          <div className = "form-group">
            <label>Select Work:</label>
            <select id = "work"
                    // multiple = 'True'
                    multiple = {true}
                    value = {selectedWork}
                    // onChange={(e) => setSelectedWork(e.target.value)}
                    onChange = {(e) =>
                      setSelectedWork(
                        Array.from(e.target.selectedOptions, (option) => option.value))}
            >
              <option value = "">--Please select Work--</option>
              {// selectedSprint &&
                filteredWorks.map((work) => (
                  <option key = {work.work_id}
                          value = {work.work_id} 
                          // selected = {selectedWork.includes(work.work_id.toString())}
                          defaultValue = {selectedWork.includes(work.work_id.toString())}
                  >
                    {work.title}
                  </option>
              ))} 
            </select>
          </div>

          <div className = "form-group">
            <button onClick = {handleCalculate}>Calculate</button>
          </div>

        </div>
      
        <div className = "results-chart-container">

          <div className = "results">
            <h2>Results:</h2>
            <p>Remaining Deposit: {remainingDeposit}</p>
            <p>Sprint Hours: {selectedSprintHours}</p>
            <p>Total Project Hours: {selectedProjectHours}</p>
            <p>Sprint budget: {sprintRemainingCost}</p>
            <p>Selected Project Remaining Cost: {projectRemainingCost}</p>
          </div>

          <div className = "charts">
            <div className = "bar-chart">
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
                      fill = {chartData[0].color}
                      // fill = {chartData.map((data) => data.color)}
                      // fill={(entry, index) => chartData[index].color}
                      // fill={(entry) => entry.color} 
                      />
              </BarChart>
            )}
            </div>
          </div>

        </div>

      </div>

      <div className = "gantt-chart">
        <GantComponent/>
      </div><br></br>

    </div>
  );
};

export default CompanyCalcForm;