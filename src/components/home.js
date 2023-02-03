/* import statements */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();           /* used to navigate user upon login */

  function studentLogin() {
    navigate('/studentlogin');
  };

  function facultyLogin() {
    navigate('facultylogin')
  };

  return (
    <div className="App">
      <h1> Welcome to the UT Research Portal </h1>
      <p> Sign in to the portal by first selecting whether you are a student or faculty member </p>
      <Button
        color='primary'
        onClick={studentLogin}
        variant={'contained'}
      >
        Student
      </Button>
      <p></p>
      <Button
        color='primary'
        onClick={facultyLogin}
        variant={'contained'}
      >
        Faculty
      </Button>
      <p></p>
    </div>
  );
};

export default Home;