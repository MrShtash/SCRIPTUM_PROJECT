import 'smart-webcomponents-react/source/styles/smart.default.css';
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import {GanttChart} from 'smart-webcomponents-react/ganttchart';

const GantComponent = () => {
    const treeSize = '40%';
	const durationUnit = 'hour';

	const taskColumns = [
        {
            label: 'Tasks',
            value: 'label',
            size: '30%'
        },
        {
            label: 'Duration (hour)',
            value: 'duration',
            formatFunction: (date) => parseInt(date)
        }
	];

    const [ganttData, setGanttData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filteredSprints, setFilteredSprints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("/api/getAllData");
            setGanttData(response.data);
        } catch (error) {
            console.error("Error getting data:", error);
        }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCompany && ganttData.projects) {
        const projects = ganttData.projects.filter(
            (project) => project.company_id === Number(selectedCompany)
        );
        setFilteredProjects(projects);
        setSelectedProject("");
        }
    }, [selectedCompany, ganttData.projects]);

    useEffect(() => {
        if (selectedProject && ganttData.sprints) {
        const sprints = ganttData.sprints.filter(
            (sprint) => sprint.project_id === Number(selectedProject)
        );
        setFilteredSprints(sprints);
        }
    }, [selectedProject, ganttData.sprints]);

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    const handleProjectChange = (e) => {
        setSelectedProject(e.target.value);
    };

const dataSource = filteredSprints.length > 0 && ganttData.works
  ? filteredSprints.map((sprint) => {
      const works = ganttData.works.filter(
        (work) => work.sprint === sprint.sprint_id
      );
      const sprintItem = {
        label: sprint.title,
        dateStart: sprint.date_start,
        dateEnd: sprint.date_end,
        class: 'sprint-team',
        type: 'task',
        tasks: works.map((work) => {
          const duration =
            typeof work.hours === 'number'
              ? parseFloat(work.hours).toFixed()
              : '0';

          console.log(work.title, duration);

          return {
            label: work.title,
            dateStart: work.date_creation,
            dateEnd: work.date_complete,
            class: 'work-team',
            type: 'task',
            duration: duration !== 'NaN' ? duration : '0'
          };
        })
      };
      return sprintItem;
    })
  : [];

    console.log(dataSource);
    // console.log(dataSource.projects);
    // console.log(dataSource[0]?.children);
    // console.log(dataSource.project);
    // console.log(dataSource[0]);
    // console.log(dataSource.sprint);
    // console.log(dataSource[0]?.children[0]);
    // console.log(dataSource.work);
    // console.log(dataSource[0].children[0]?.children);
    // console.log(dataSource.works);
    
	return (
		<div className="gantt-controls">
            <div>
                <label>Select Company:</label>
                    <select id = "company"
                            value = {selectedCompany}
                            onChange = {handleCompanyChange}>
                    <option value = "">--Please select Company--</option>
                    {ganttData.companies && ganttData.companies.map((company) => (
                        <option key = {company.company_id}
                                value = {company.company_id}>
                        {company.name}
                        </option>
                    ))}
                    </select>
            </div><br></br>
            <div >
                <label>Select Project:</label>
                    <select id = "project"
                            value = {selectedProject}
                            onChange = {handleProjectChange}>
                <option value = "">--Please select Project--</option>
                {filteredProjects.map((project) => (
                    <option key = {project.project_id}
                            value = {project.project_id}>
                    {project.name}
                    </option>
                ))}
                </select>
            </div><br></br>
            <div>
                <GanttChart dataSource = {dataSource}
                            taskColumns = {taskColumns}
                            treeSize = {treeSize}
                            durationUnit = {durationUnit}
                            view = "week" 
                            id = "gantt"
                            style={{height: '200px',
                                    width: '1500px'}}>
                </GanttChart>
            </div>
		</div>
	);
}

export default GantComponent;