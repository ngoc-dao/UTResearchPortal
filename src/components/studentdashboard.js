/* import statements */
import React, { Component, useEffect, useState } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import SearchBar from "./searchbar";
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
    marginRight: "2rem",
    width: "7%",
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const StudentDashboard = (props) => {
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate(); /* used to navigate user upon logout */

  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate("/");
  }

  useEffect(() => {
    axios.get("/getpositions").then((res) => {
      // console.log(res.data)
      // console.log(props);
      const pos = res.data["positions"];
      let ppos = pos;
      let b = false;

      for (let i = 0; i < pos.length; i++) {
        b = false;
        let p = pos[i]["applicants"];
        // console.log("p = ", p);
        for (let j = 0; j < p.length; j++) {
          if (p[j]["eid"] === props.user["eid"]) {
            b = true;
            break;
          }
        }

        ppos[i]["applied"] = b;
      }

      setPositions(ppos);
      console.log(positions);
    });
  });

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:'#343541',
        }}
      >
        <div style={{ marginRight: "auto", display: "flex" }}>
          <button style={styles.logo}>
            <img src="RGB_university_primary.png" alt="UT Research Portal" />{" "}
          </button>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "contents",
            marginRight: "1rem",
          }}
        >
          <h1 style={styles.welcome}> Welcome {props.user["fname"]} </h1>
          <Button
            color={"secondary"}
            variant={"contained"}
            onClick={logout}
            style={styles.button}
          >
            Logout
          </Button>
        </div>
      </div>
      {/* <Navbars /> */}
      {positions.length !== 0 && <SearchBar placeholder="Search for a position" data={positions} />}
      
      {/* <Outlet /> */}
      <p class="p-3" />
    </div>
  );
};

export default StudentDashboard;
