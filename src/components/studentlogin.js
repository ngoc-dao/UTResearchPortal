/* import statements */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const StudentLogin = (props) => {
    /* state hooks for login */
    const [email, setEmail] = useState();     /* value of entered email */
    const [pswd, setPswd] = useState();       /* value of entered pswd */
    const [error, setError] = useState();     /* value of error message displayed to user */
    const navigate = useNavigate();           /* used to navigate user upon login */
  
    /* function to try and log in the user */
    function tryLogin() {
      // TODO
    };
  
        return (
          <div className="App">
              <h1> Student Sign In </h1>
              <p> If you have an account, please login here. </p>
              
              <TextField 
                label="Username/Email" 
                variant="filled" 
                onChange={(event) => setEmail(event.target.value)}> 
              </TextField>
              <p></p>
              <TextField 
                label="Password" 
                variant="filled" 
                type="password" 
                onChange={(event) => setPswd(event.target.value)}> 
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

export default StudentLogin;