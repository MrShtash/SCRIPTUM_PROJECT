import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
// import axios from 'axios';
import './NavBar.css';
import Logo from '../static/Logo.jpg';


function NavBar(props) {
  const handleLogout = () => {
    // delete token from localStorage or cookie
    localStorage.removeItem("token");
    localStorage.removeItem("group_id");
    // redirect user to start page
    window.location.href = "/";
  };

  // const navigate = useNavigate();
  // console.log('77777',props.groupId);

  return (
    <div className = "navbar">
      <div className = "logo">
        <img src = {Logo} alt = "Logo" style = {{width: '150px'}} />
      </div>
      <ul className="navigation-links">
        {props.groupId == 13 && (
          <>
            <li>
              <Link to = "/protected/cash">Cash</Link>
            </li>
            <li>
              <Link to = "/protected/company">Company</Link>
            </li>
            <li>
              <Link to = "/protected/hour">Hour</Link>
            </li>
            <li>
              <Link to = "/protected/category">Category</Link>
            </li>
            <li>
              <Link to = "/protected/department">Department</Link>
            </li>
            <li>
              <Link to = "/protected/grade">Grade</Link>
            </li>
            <li>
              <Link to = "/protected/group">Group</Link>
            </li>
            <li>
              <Link to = "/protected/project">Project</Link>
            </li>
            <li>
              <Link to = "/protected/register">Register</Link>
            </li>
            <li>
              <Link to = "/protected/sprint">Sprint</Link>
            </li>
            <li>
              <Link to = "/protected/work">Work</Link>
            </li>
            <li>
              <Link to = "/protected/speccalc">Work Calculate</Link>
            </li>
            <li>
              <Link to = "/protected/compclc">Company Calculate</Link>
            </li>
          </>
        )}
        {(props.groupId == 7 || props.groupId == 8) && (
          <>
            {/* <li>
              <Link to = "/protected/cash">Cash</Link>
            </li> */}
            <li>
              <Link to = "/protected/company">Company</Link>
            </li>
            <li>
              <Link to = "/protected/project">Project</Link>
            </li>
            <li>
              <Link to = "/protected/sprint">Sprint</Link>
            </li>
            <li>
              <Link to = "/protected/work">Work</Link>
            </li>
          </>
        )}
        {(props.groupId === "1" ||
          props.groupId === "2" ||
          props.groupId === "3" ||
          props.groupId === "4" ||
          props.groupId === "5" ||
          props.groupId === "6" ||
          props.groupId === "9" ||
          props.groupId === "10" ||
          props.groupId === "11" ||
          props.groupId === "12") && (
          <>
            <li><Link to = "/protected/work">Work</Link></li>
          </>
        )}
      </ul>
      {props.groupId && props.groupId!=='' ? <button
                                              className="logout-button"
                                              onClick = {handleLogout}>Logout</button>:null}
    </div>
  );
}

export default NavBar;
