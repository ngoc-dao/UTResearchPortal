/* import statements */
import './App.css';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home';
import StudentLogin from './components/studentlogin'
import FacultyLogin from './components/facultylogin'
import StudentDashboard from './components/studentdashboard';
import FacultyDashboard from './components/facultydashboard';


function App() {
  const [user, setUser] = useState(null);

  /* set up the routes to different links */
  return (
    <HashRouter>
      <Routes>
        <Route 
          exact path='/'
          element={
            <Home /> 
          }> 
        </Route>

        <Route 
          path='/studentlogin'
          element={
            <StudentLogin
              setUser={(i) => setUser(i)}
            />
          }>
        </Route>

        <Route 
          path='/facultylogin'
          element={
            <FacultyLogin
              setUser={(i) => setUser(i)}
            />
          }>
        </Route>

        <Route
          path='/studentdashboard'
          element={
            <StudentDashboard 
              user={user}
              setUser={(i) => setUser(i)}
            />
          }>
        </Route>

        <Route
          path='/facultydashboard'
          element={
            <FacultyDashboard 
              user={user}
              setUser={(i) => setUser(i)}
            />
          }>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
