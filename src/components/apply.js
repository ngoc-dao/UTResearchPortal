/* import statements */
import React, { Component, useEffect, useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import ResearchPositionComponentStudent from "./researchpositioncomponentstudent";

const styles = {
  logo: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    width: "20%",
  },
  welcome: {
    fontSize: "1.5rem",
    fontFamily: "Open Sans",
    color: "white",
    marginTop: "1rem",
  },
  subtitle: {
    fontSize: "1rem",
    fontFamily: "Open Sans",
    color: "white",
  },
  button: {
    backgroundColor: "#bf5700",
    color: "#fff",
    textTransform: "initial",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "5px",
    textDecoration: "none",
    fontFamily: "Open Sans",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    width: "50%",
    marginBottom: "1rem"
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  formField: {
    background: "#f5f5f5",
    fontFamily: "Open Sans",
  },
};

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
      <textarea
        style={{ width: "90%", background:'lightgrey', padding: '.75rem' }}
        cols={75}
        rows={7}
        onChange={(event) => question(event.target.value)}
      />
    </div>
  );
};

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

    if (
      gp == "" ||
      ma == "" ||
      (questions == {} &&
        state.additional_questions.length >
          0) /*|| (state.additional_questions.length != questions.length)*/
    ) {
      setError("Please fill out all fields");
      return;
    }

    const application = {
      gpa: gp,
      major: ma,
      questions: qu,
      fname: props.user.fname,
      lname: props.user.lname,
      email: props.user.email,
      eid: props.user.eid,
      _id: state._id,
    };

    console.log(application);

    axios.post("/apply", application).then((res) => {
      if (res.data["error"] === true) {
        setError(res.data["message"]);
      } else {
        setError("");
        // TODO
        navigate("/studentdashboard");
      }
    });
  }

  return (
    <div className="App">
      <h1 style={styles.welcome}>
        Application for {state.position} at {state.lab_name}
      </h1>

      <p class="p-3" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // // height:
          // //   "100vh" /* set the container to the full height of the viewport */,
        }}
      >
        <div
          style={{
            /* set the width and height of the div */
            width: "25rem",
            /* center the div horizontally and vertically */
            margin: "auto",
            background: "white",
            borderRadius: "1rem",
            paddingTop: "1rem",
            height: 'fitContent'
          }}
        >
          <TextField
            label="GPA"
            variant="filled"
            style={styles.formField}
            onChange={(event) => setGpa(event.target.value)}
          ></TextField>

          <br></br>

          <TextField
            label="Major"
            variant="filled"
            style={styles.formField}
            onChange={(event) => setMajor(event.target.value)}
          ></TextField>

          <br></br>

          {state.additional_questions.length === 0 ? (
            <p></p>
          ) : (
            state.additional_questions.map((q) => (
              <TextArea q={q} setQ={setQuestions} ques={questions} />
            ))
          )}

          <br></br>

          <br />

          <p class="text-red-500">
            <b>{error}</b>
          </p>

          <Button style={styles.button} onClick={submit}>
            Submit
          </Button>
        </div>

        <br />
        <br />
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default Apply;
