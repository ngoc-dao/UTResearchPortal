/* import statements */
import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import StudentLogin from "./components/studentlogin";
import FacultyLogin from "./components/facultylogin";
import StudentDashboard from "./components/studentdashboard";
import FacultyDashboard from "./components/facultydashboard";
import NewPosition from "./components/newposition";
import Apply from "./components/apply";
import ViewApplications from "./components/viewapplications";
import Navbar from "./components/navbar";

function App() {
  const [user, setUser] = useState(null);

  /* set up the routes to different links */
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route
          path="/studentlogin"
          element={<StudentLogin setUser={(i) => setUser(i)} />}
        ></Route>

        <Route
          path="/facultylogin"
          element={<FacultyLogin setUser={(i) => setUser(i)} />}
        ></Route>

        <Route
          path="/studentdashboard"
          element={
            <>
              <Navbar user={user} setUser={(i) => setUser(i)} />
              <StudentDashboard user={user} setUser={(i) => setUser(i)} />
            </>
          }
        ></Route>

        <Route
          path="/facultydashboard"
          element={
            <>
              <Navbar user={user} setUser={(i) => setUser(i)} />
              <FacultyDashboard user={user} setUser={(i) => setUser(i)} />
            </>
          }
        ></Route>

        <Route
          path="/newposition"
          element={
            <>
              <Navbar user={user} setUser={(i) => setUser(i)} />
              <NewPosition user={user} />
            </>
          }
        ></Route>

        <Route
          path="/apply"
          element={
            <>
              <Navbar user={user} setUser={(i) => setUser(i)} />
              <Apply user={user} />
            </>
          }
        ></Route>

        <Route
          path="/viewapplications"
          element={
            <>
              <Navbar user={user} setUser={(i) => setUser(i)} />
              <ViewApplications user={user} />
            </>
          }
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
