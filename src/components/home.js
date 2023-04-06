/* import statements */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    margin: 0,
  },
  subtitle: {
    fontSize: "1rem",
    fontStyle: "italic",
    fontFamily: "sans-serif",
    margin: "20px 0",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  signUpContainer: {
    display: "inline-flex",
    flexDirection: "column",
    padding: "20px",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    textAlign: "left",
    position: "fixed",
    right: 0,
    marginRight: "1rem",
    marginTop: "1rem",
  },
  signUpTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  formField: {
    marginBottom: "10px",
  },
  selectField: {
    width: "100%",
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid black",
    borderRadius: "5px",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#d35400",
    color: "#fff",
    textTransform: "initial",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    textDecoration: "none",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
  },
  error: {
    color: "red",
  },
};

const Home = () => {
  /* user data */
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [eid, setEid] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState("Student");
  const [error, setError] = useState();

  const navigate = useNavigate(); /* used to navigate user upon login */

  function studentLogin() {
    navigate("/studentlogin");
  }

  function facultyLogin() {
    navigate("/facultylogin");
  }

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
      setError("Please ensure your password is atleast 6 characters!");
      return;
    }

    const account = {
      first: fn,
      last: ln,
      email: em,
      eid: ei,
      password: ps,
      usertype: us,
    };

    axios.post("/newaccount", account).then((res) => {
      // set errors
      if (res.data["error"] === true) {
        setError("Please provide proper fields to create an account");
        if ("message" in res.data) {
          setError(res.data["message"]);
        }
      } else {
        setError("");
        // TODO - navigate to user dashboard OR ask user to sign in with new account
      }
    });
  }

  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.title}>UT Research Portal</h1>
        <div style={styles.buttonContainer}>
          <Button
            color="primary"
            onClick={studentLogin}
            variant="contained"
            style={styles.button}
          >
            For Students
          </Button>
          <Button
            color="primary"
            onClick={facultyLogin}
            variant="contained"
            style={styles.button}
          >
            For Faculty
          </Button>
        </div>
      </div>
      {/* <p style={styles.subtitle}>
        Sign in to the portal by first selecting whether you are a student or
        faculty member
      </p> */}
      <div style={styles.signUpContainer}>
        <h2 style={styles.signUpTitle}>New? Sign Up Below!</h2>
        <TextField
          label="First Name"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setFName(event.target.value)}
        />
        <TextField
          label="Last Name"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setLName(event.target.value)}
        />
        <TextField
          label="Email"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="EID"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setEid(event.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          style={styles.formField}
          oonChange={(event) => setPassword(event.target.value)}
        />
        <select
          value={userType}
          onChange={(event) => setUserType(event.target.value)}
          style={styles.formField}
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
        </select>
        {error && <p style={styles.error}>{error}</p>}
        <Button
          color="primary"
          variant="contained"
          onClick={accountCreation}
          style={styles.button}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default Home;
