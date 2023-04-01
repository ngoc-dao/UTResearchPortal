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
          // console.log(res.data)
          // console.log(props);
          const pos = res.data['positions'];
          let ppos = pos;
          let b = false;

          for (let i = 0; i < pos.length; i++) {
            b = false;
            let p = pos[i]['applicants'];
            // console.log("p = ", p);
            for (let j = 0; j < p.length; j++) {
              if (p[j]['eid'] === props.user['eid']) {
                b = true;
                break;
              }
            }

            ppos[i]["applied"] = b;
          }

          setPositions(ppos);
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