/* import statements */
import './App.css';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home';
import StudentLogin from './components/studentlogin'
import FacultyLogin from './components/facultylogin'


function App() {

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
            <StudentLogin />
          }>
        </Route>
        <Route 
          path='/facultylogin'
          element={
            <FacultyLogin />
          }>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
