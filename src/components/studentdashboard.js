/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import ResearchPositionComponentStudent from './researchpositioncomponentstudent';

const StudentDashboard = (props) => {
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();         /* used to navigate user upon logout */

  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate('/');
  }

  useEffect(() => {
    axios.get("/getpositions").then(
        res => {
          console.log(res.data)
          const pos = res.data['positions'];
          setPositions(pos);
          console.log(positions);
        }
    )
  });

      return (
        <div className="App">
            {/* <Navbars /> */}
          <h1 class='text-4xl p-5 font-semibold'> Welcome to your Dashboard {props.user["eid"]}! </h1>

          {
            positions.length === 0 ? (
              <p>Fetching research positions...</p>
            ) : (
              positions.map(pos => (
                <ResearchPositionComponentStudent pos={pos} />
              ))
            )
          }

          <Button 
            color={'secondary'} 
            variant={'contained'}
            onClick={logout}
          > 
            Logout 
          </Button>
          {/* <Outlet /> */}

          <p class='p-3' />
        </div>
      );
};

export default StudentDashboard;