/* import statements */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const FacultyLogin = (props) => {
    /* state hooks for login */
    const [eid, setEid] = useState();             /* value of entered eid */
    const [password, setPassword] = useState();   /* value of entered password */
    const [error, setError] = useState();         /* value of error message displayed to user */
    const navigate = useNavigate();               /* used to navigate user upon login */
  
    /* function to try and log in the user */
    function tryLogin() {
      const ei = eid;
      const ps = password;

      if (!ei || !ps) {
        setError("Please fill out EID and/or Password fields");
        return;
      }

      const user = {
        "eid" : ei,
        "password" : ps,
      }

      axios.post("/facultylogin", user).then(
        res => {
          if (res.data["error"] === true) {
            setError(res.data["message"]);
          } else {
            setError("");
            // try this?
            localStorage.setItem('token-info', JSON.stringify(user));
            console.log("LOGIN SUCCESS");

            // TODO - navigate to faculty dashboard
          }
        }
      )
    };
  
        return (
          <div className="App">
              <h1> Faculty Sign In </h1>
              <p> If you have an account, please login here. </p>
              
              <TextField 
                label="EID" 
                variant="filled" 
                onChange={(event) => setEid(event.target.value)}> 
              </TextField>
              <p></p>
              <TextField 
                label="Password" 
                variant="filled" 
                type="password" 
                onChange={(event) => setPassword(event.target.value)}> 
              </TextField>
              <p></p>
              <Button 
                color='primary' 
                onClick={tryLogin}
                variant={'contained'}
              > 
                Submit 
              </Button>
              <p></p>
              <p> {error} </p>
          </div>
        );
};

export default FacultyLogin;