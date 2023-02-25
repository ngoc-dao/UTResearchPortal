/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import ResearchPositionComponent from './researchpositioncomponent';

const StudentDashboard = (props) => {
  const [positions, setPositions] = useState([]);
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
                <ResearchPositionComponent pos={pos} />
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
        </div>
      );
};

export default StudentDashboard;