import {useState, createContext} from 'react';
import './App.css';
import Scriptum_test from './components/Scriptum_test';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import CompanyForm from './components/CompanyForm';
import CashForm from './components/CashForm';
import HourForm from './components/HourForm';
import CategoryForm from './components/CategoryForm';
import DepartmentForm from './components/DepartmentForm';
import GradeForm from './components/GradeForm';
import GroupForm from './components/GroupForm';
import ProjectForm from './components/ProjectForm';
import RegisterForm from './components/RegisterForm';
import SprintForm from './components/SprintForm';
import WorkForm from './components/WorkForm';
import Form from './components/CalculateSpecialistForm';
import CompanyCalcForm from './components/CalculateForm';
import Profile from './components/Profile';
import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link,
      Routes,
      useNavigate
    } from "react-router-dom";

export const AppContext = createContext(null);

function App() {
  const [accessToken,setAccessToken] = useState('');
  const [group_id, setGroup_id] = useState(localStorage.getItem('group_id')||'');
  // useEffect(() => {
  //       const group_id = localStorage.getItem('group_id');
  //       setGroup_id(group_id);
  //   }, []);

  return (
    <AppContext.Provider value = {{accessToken,setAccessToken}} >
      <div>
            <NavBar groupId = {group_id}/>
            <Routes>
                  <Route exact path = "/" element = {<LoginForm/>} />
                  <Route path = "/protected/" element = {<Scriptum_test />} />
                  <Route path = "/protected/profile" element = {<Profile />} />
                  <Route path = "/protected/cash" element = {<CashForm />} />
                  <Route path = "/protected/company" element = {<CompanyForm />} />
                  <Route path = "/protected/hour" element = {<HourForm />} />
                  <Route path = "/protected/category" element = {<CategoryForm />} />
                  <Route path = "/protected/department" element = {<DepartmentForm />} />
                  <Route path = "/protected/grade" element = {<GradeForm />} />
                  <Route path = "/protected/group" element = {<GroupForm />} />
                  <Route path = "/protected/project" element = {<ProjectForm />} />
                  <Route path = "/protected/register" element = {<RegisterForm />} />
                  <Route path = "/protected/sprint" element = {<SprintForm />} />
                  <Route path = "/protected/work" element = {<WorkForm />} />
                  <Route path = "/protected/sprint" element = {<SprintForm />} />
                  <Route path = "/protected/speccalc" element = {<Form />} />
                  <Route path = "/protected/compclc" element = {<CompanyCalcForm />} />
                  {/* <Route path = "*" element = {<NotFoundComponent />} /> */}

          </Routes>
      </div>
     </AppContext.Provider>
  );
}

export default App;