/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import ResearchPositionComponentStudent from './researchpositioncomponentstudent';

const TextArea = (props) => {
    function question(val) {
        const ques = props.ques;
        ques[props.q] = val;
        props.setQ(ques);
    }

    return (
        <div>
            <label>
                <b>Question: </b> {props.q}
            </label>

            <p></p>
            <textarea cols={75} rows={7} onChange={(event) => question(event.target.value)} />
            
        </div>
    )
}

const Apply = (props) => {
  const { state } = useLocation();
  const [gpa, setGpa] = useState("");
  const [major, setMajor] = useState("");
  const [questions, setQuestions] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit() {
    const gp = gpa;
    const ma = major;
    const qu = questions;

    if (gp == "" || ma == "" || (questions == {} && state.additional_questions.length > 0) /*|| (state.additional_questions.length != questions.length)*/) {
        setError("Please fill out all fields");
        return;
    }

    const application = {
        "gpa" : gp,
        "major" : ma,
        "questions" : qu,
        "fname" : props.user.fname,
        "lname" : props.user.lname,
        "email" : props.user.email,
        "eid" : props.user.eid,
        "_id" : state._id,
    }

    console.log(application);

    axios.post("/apply", application).then(
        res => {
          if (res.data["error"] === true) {
            setError(res.data["message"]);
          } else {
            setError("");
            // TODO
            navigate('/studentdashboard')
          }
        }
    )
  }

  return (
    <div className="App">
        <h1 class='text-4xl p-5 font-semibold'> Application for {state.position} at {state.lab_name} </h1>
        <p></p>

        <TextField 
          label="GPA" 
          variant="filled" 
          onChange={(event) => setGpa(event.target.value)}> 
        </TextField>

        <p></p>
        <TextField 
          label="Major" 
          variant="filled" 
          onChange={(event) => setMajor(event.target.value)}> 
        </TextField>

        <p class='p-3'></p>
        {
            state.additional_questions.length === 0 ? (
              <p></p>
            ) : (
                state.additional_questions.map(q => (
                    <TextArea q={q} setQ={setQuestions} ques={questions} />
                ))
            )
        }

        <p class='p-3' />
        <Button
            color={'secondary'} 
            variant={'contained'}
            onClick={submit}
        >
            Submit
        </Button>

        <p class='p-3' />

        <p> {error} </p>

        <p class='p-3' />
    </div>
  )
};

export default Apply;