/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

const FacultyDashboard = (props) => {
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate('/');
  }

  function newPosition() {
    navigate('/newposition');
  }

      return (
        <div className="App">
            {/* <Navbars /> */}
          <h1 class='text-4xl p-5 font-semibold'> 
          Welcome to your Dashboard {props.user["eid"]}!
          </h1>

          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={newPosition}
          >
            Add New Position
          </Button>

          <p class='p-3' />

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