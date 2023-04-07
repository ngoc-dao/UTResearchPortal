/* import statements */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const styles = {
  logo: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    width: "20%",
  },
  container: {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Open Sans",
  },
  outerFormContainer: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  innerFormContainer: {
    width: "50%",
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "1rem",
  },
  button: {
    fontFamily: "Open Sans",
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
    width: "100%",
  },
  button2: {
    fontFamily: "Open Sans",
    display: "inline-block",
    backgroundColor: "#808080",
    color: "#fff",
    textTransform: "initial",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    textDecoration: "none",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    width: "100%",
    marginTop: ".5rem",
  },
};

const StudentLogin = (props) => {
  /* state hooks for login */
  const [eid, setEid] = useState(); /* value of entered eid */
  const [password, setPassword] = useState(); /* value of entered password */
  const [error, setError] =
    useState(); /* value of error message displayed to user */
  const navigate = useNavigate(); /* used to navigate user upon login */

  /* function to try and log in the user */
  function tryLogin() {
    const ei = eid;
    const ps = password;

    if (!ei || !ps) {
      setError("Please fill out EID and/or Password fields");
      return;
    }

    const user = {
      eid: ei,
      password: ps,
    };

    axios.post("/studentlogin", user).then((res) => {
      if (res.data["error"] === true) {
        setError(res.data["message"]);
      } else {
        setError("");
        // try this?
        user["fname"] = res.data["fname"];
        user["lname"] = res.data["lname"];
        user["email"] = res.data["email"];
        localStorage.setItem("token-info", JSON.stringify(user));
        console.log("LOGIN SUCCESS");

        // set user details
        props.setUser(user);

        // TODO - navigate to student dashboard
        navigate("/studentdashboard");
      }
    });
  }

  return (
    <div className="App" style={styles.container}>
      <div>
        <button style={styles.logo} onClick={() => navigate("/")}>
          <img src="RGB_university_primary.png" alt="UT Research Portal" />{" "}
        </button>
      </div>
      <div style={styles.outerFormContainer}>
        <div style={styles.innerFormContainer}>
          <h1 class="text-4xl p-5 font-semibold"> Student Sign In </h1>
          <p class="text-1xl p-3 italic">
            {" "}
            If you have a student account, please login here.{" "}
          </p>
          <TextField
            label="EID"
            variant="filled"
            onChange={(event) => setEid(event.target.value)}
            style={{ width: "100%" }}
          ></TextField>
          <p></p>
          <TextField
            label="Password"
            variant="filled"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: "100%" }}
          ></TextField>
          <p class="p-3"></p>
          <Button
            color="primary"
            onClick={tryLogin}
            variant={"contained"}
            style={styles.button}
          >
            Submit
          </Button>
          <Button
            color="primary"
            onClick={() => navigate("/")}
            variant={"contained"}
            style={styles.button2}
          >
            Return to Home
          </Button>
          <p></p>
          <p> {error} </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
