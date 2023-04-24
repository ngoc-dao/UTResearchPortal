/* import statements */
import React, { Component, useEffect, useState } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import SearchBar from "./searchbar";
import ResearchPositionComponentFaculty from "./researchpositioncomponentfaculty";

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
  subtitle: {
    fontSize: "1rem",
    fontFamily: "Open Sans",
    color: "white",
    marginTop: "1rem"
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
    marginRight: "2rem",
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const FacultyDashboard = (props) => {
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate("/");
  }

  function newPosition() {
    navigate("/newposition");
  }

  useEffect(() => {
    axios.get("/getpositions").then((res) => {
      const pos = res.data["positions"];
      let faculty_positions = [];
      for (let i = 0; i < pos.length; i++) {
        if (pos[i]["eid"] === props.user["eid"]) {
          faculty_positions.push(pos[i]);
        }
      }

      console.log(faculty_positions);
      setPositions(faculty_positions);
    });
  });

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#343541",
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
      <div style={{ paddingTop: "1rem" }}>
        <Button onClick={newPosition} style={styles.button}>
          Add New Position
        </Button>
      </div>

      <p class="p-3" />
      <h1 style={styles.welcome}>
        <b>Your Research Positions</b>
      </h1>
      {positions.length !== 0 && <SearchBar placeholder="Search for a position" data={positions} />}
      {/* {positions.length === 0 ? (
        <h1 style={styles.subtitle}>No Research Positions</h1>
      ) : (
        positions.map((pos) => <ResearchPositionComponentFaculty pos={pos} />)
      )} */}
      {/* <Outlet /> */}
      <p class="p-3"></p>
    </div>
  );
};

export default FacultyDashboard;
