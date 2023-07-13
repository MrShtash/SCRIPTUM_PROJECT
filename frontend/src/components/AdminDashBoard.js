import React from 'react';
import CompanyForm from './CompanyForm';
import CashForm from './CashForm';
import HourForm from './HourForm';
import CategoryForm from './CategoryForm';
import DepartmentForm from './DepartmentForm';
import GradeForm from './GradeForm';
import GroupForm from './GroupForm';
import ProjectForm from './ProjectForm';
import RegisterForm from './RegisterForm';
import SprintForm from './SprintForm';
import WorkForm from './WorkForm';
import Form from './CalculateSpecialistForm';
import CompanyCalcForm from './CalculateForm';
import './AdminashBoard.css'

const AdminDashboard = () => {
  return (
    <div className='admin'>
      <h1>Admin Dashboard</h1>

      <div className = "grid-container">
        <div className = "grid-item">
          <CashForm/>
        </div>
        <div className = "grid-item">
          <HourForm/>
        </div>
        <div className = "grid-item">
          <CategoryForm/>
        </div>
        <div className = "grid-item">
          <GradeForm/>
        </div>
        <div className = "grid-item">
          <GroupForm/>
        </div>
        <div className = "grid-item">
          <DepartmentForm/>
        </div>
        <div className = "grid-item">
          <RegisterForm/>
        </div>
        <div className = "grid-item">
          <CompanyForm/>
        </div>
        <div className = "grid-item">
          <ProjectForm/>
        </div>
        <div className = "grid-item">
          <SprintForm/>
        </div>
        <div className = "grid-item">
          <WorkForm/>
        </div>
        <div className = "grid-item">
          <CompanyCalcForm/>
        </div>
        <div className = "grid-item">
          <Form/>
        </div>

      </div>

    </div>
  )
};

export default AdminDashboard;
