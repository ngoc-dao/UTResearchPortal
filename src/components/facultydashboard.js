/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
// import Navbars from './Navbar';
// import Projects from './user_projects';
// import Datasets from './user_datasets';

const FacultyDashboard = (props) => {

  const navigate = useNavigate();         /* used to navigate user upon logout */
  // const [data, setData] = useState(null)  /* metadata */

  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate('/');
  }

  // useEffect(() => {
  //   fetch("/datasets").then(
  //     res => res.json
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   )
  // });

      return (
        <div className="App">
            {/* <Navbars /> */}
          <h1> Welcome to your Dashboard {props.user["eid"]}! </h1>
          <h2> Here you can view your projects and datasets. </h2>
          <Button 
            color={'secondary'} 
            variant={'contained'}
            onClick={logout}
          > 
            Logout 
          </Button>
          {/* <Outlet /> */}
        </div>
      );
};

export default FacultyDashboard;