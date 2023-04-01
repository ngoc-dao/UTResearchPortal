/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import ResearchPositionComponentFaculty from './researchpositioncomponentfaculty';

const ApplicationView = (props) => {
    return (
        <div class='bg-white shadow-lg m-4 p-4 bg-cyan-100'>
            <h1 class='text-3xl'> <b> {props.applicant.fname} {props.applicant.lname} ({props.applicant.eid}) </b> </h1>
            <p> <b> Email: </b> {props.applicant.email} </p>
            <p> <b> Major: </b> {props.applicant.major} </p>
            <p> <b> GPA: </b> {props.applicant.gpa} </p>
            {
                props.applicant.questions === {} ? (
                    <h3><b>No applicants</b></h3>
                ) : (
                Object.keys(props.applicant.questions).map((key, index) => ( 
                    <p> <b>{key}: </b> {props.applicant.questions[key]} </p> 
                )))
            }
        </div>
    )
}

const ViewApplications = (props) => {
    const { state } = useLocation();
    const navigate = useNavigate();

    function goBack() {
        navigate('/facultydashboard');
    }

    return (
        <div className="App">
            {/* <Navbars /> */}
          <h1 class='text-4xl p-5 font-semibold'> 
            Applications for {state.position} at {state.lab_name}
          </h1>

          <p class='p-3' />

          {
              state.applicants.length === 0 ? (
                <h3><b>No applicants</b></h3>
              ) : ( 
                // <h3><b>Applicants: </b>{props.pos['applicants'].toString()}</h3>
                state.applicants.map(a => (
                    <ApplicationView applicant={a} />
                ))
              )
            }

          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={goBack}
          > 
            Go Back
          </Button>
          {/* <Outlet /> */}
          <p class='p-3'></p>
        </div>
      );
};

export default ViewApplications;