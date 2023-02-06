/* import statements */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const Home = () => {
  /* user data */
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [eid, setEid] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const [error, setError] = useState(); 

  const navigate = useNavigate();           /* used to navigate user upon login */

  function studentLogin() {
    navigate('/studentlogin');
  };

  function facultyLogin() {
    navigate('facultylogin')
  };

  function accountCreation() {
    const fn = fname;
    const ln = lname;
    const em = email;
    const ei = eid;
    const ps = password;
    const us = userType;

    if (!fn || !ln || !em || !ei || !ps) {
      setError("Please fill out all fields!");
      return;
    }

    if (ps.length < 6) {
      setError("Please ensure your password is atleast 6 characters!")
      return;
    }

    const account = {
      "first" : fn,
      "last" : ln,
      "email" : em,
      "eid" : ei,
      "password" : ps,
      "usertype" : us,
    }

    axios.post("/newaccount", account).then(
      res => {
        // set errors
        if (res.data["error"] === true) {
          setError("Please provide proper fields to create an account");
        } else {
          setError("");
          // TODO - navigate to user dashboard OR ask user to sign in with new account
        }
      }
    )
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
      <p> If you do not have an account, please create one below </p>
      <TextField 
        label="First Name" 
        variant="filled" 
        onChange={(event) => setFName(event.target.value)}> 
      </TextField>
      <br></br>
      <TextField 
        label="Last Name" 
        variant="filled" 
        onChange={(event) => setLName(event.target.value)}> 
      </TextField>
      <br></br>
      <TextField 
        label="Email" 
        variant="filled" 
        onChange={(event) => setEmail(event.target.value)}> 
      </TextField>
      <br></br>
      <TextField 
        label="EID" 
        variant="filled" 
        onChange={(event) => setEid(event.target.value)}> 
      </TextField>
      <br></br>
      <TextField 
        label="Password" 
        variant="filled" 
        type="password" 
        onChange={(event) => setPassword(event.target.value)}> 
      </TextField>
      <br></br>
      <select
        onChange={(event) => setUserType(event.target.value)}
      >
        <option value="Student"> Student </option>
        <option value="Faculty"> Faculty </option>
      </select>
      <p></p>
      <Button
        color='primary'
        onClick={accountCreation}
        variant={'contained'}
      >
        Submit
      </Button>
      <p></p>
      <p> {error} </p>
      <p></p>
    </div>
  );
};

export default Home;