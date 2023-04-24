/* import statements */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { SyncLoader } from "react-spinners";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "0 2rem 0 0",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    fontFamily: "Open Sans",
    margin: 0,
    color: "white",
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
    backgroundColor: "#f5f5f5",
    textAlign: "left",
    position: "fixed",
    right: 0,
    marginRight: "1rem",
    marginTop: "1rem",
    width: "30%",
    borderRadius: ".5rem",
    height: "70vh",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Open Sans",
    marginBottom: "10px",
  },
  formField: {
    marginBottom: "10px",
    background: "#f5f5f5",
    fontFamily: "Open Sans",
    width: "100%",
  },
  selectField: {
    width: "100%",
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid black",
    fontFamily: "Open Sans",
    borderRadius: "5px",
  },
  button: {
    display: "inline-block",
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
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
    fontSize: "1.5rem",
    fontFamily: "Open Sans",
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); /* used to navigate user upon login */

  function studentLogin() {
    navigate("/studentlogin");
  }

  function facultyLogin() {
    navigate("/facultylogin");
  }

  function handleSubmit() {const fn = fname;
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
    setLoading(true);
    accountCreation();
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
        setSuccess(true);
        setLoading(false);
        // TODO - navigate to user dashboard OR ask user to sign in with new account
      }
    });
  }

  return (
    <div>
      <div style={styles.container}>
        <img src="UT_tagline.png" style={{ width: "30%" }} />
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

      <div
        className="center-div"
        style={{
          background: "#333333",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={styles.title}>UT Research Portal</h1>
      </div>
      <div>
        <img
          src="eer.jpg"
          style={{ width: "40%", display: "inline", margin: "2rem 0 0 10rem" }}
        />
        <div style={styles.signUpContainer}>
          {loading ? (
            <SyncLoader color="#bf5700" />
          ) : (
            <>
              {success ? (
                <>
                  <h1 style={styles.success}>Account successfully created!</h1>
                </>
              ) : (
                <>
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
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <select
                    value={userType}
                    onChange={(event) => setUserType(event.target.value)}
                    style={styles.selectField}
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                  {error && <p style={styles.error}>{error}</p>}
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    style={styles.button}
                  >
                    Create Account
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
