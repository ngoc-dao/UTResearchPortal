/* import statements */
import React from "react";
import { useNavigate} from "react-router-dom";
import { Button } from "@mui/material";

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

const Navbar = (props) => {
  const navigate = useNavigate(); /* used to navigate user upon logout */
    console.log(props)
  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate("/");
  }

  return (
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
        <h1 style={styles.welcome}> Welcome {props.user?.fname}</h1>
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
  );
};

export default Navbar;
