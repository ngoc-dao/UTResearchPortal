/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import ResearchPositionComponentFaculty from './researchpositioncomponentfaculty';

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

  useEffect(() => {
    axios.get("/getpositions").then(
        res => {
          const pos = res.data['positions'];
          let faculty_positions = [];
          for(let i = 0; i < pos.length; i++) {
            if (pos[i]["eid"] === props.user["eid"]) {
              faculty_positions.push(pos[i])
            }
          }

          console.log(faculty_positions);
          setPositions(faculty_positions);
        }
    )
  });

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
          <h2><b>Your Research Positions:</b></h2>

            {
              positions.length === 0 ? (
                <p>No Research Positions</p>
              ) : (
                positions.map(pos => (
                  <ResearchPositionComponentFaculty pos={pos} />
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
          <p class='p-3'></p>
        </div>
      );
};

export default FacultyDashboard;