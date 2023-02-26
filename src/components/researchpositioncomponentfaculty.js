/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

const ResearchPositionComponentFaculty = (props) => (
    <div class='flex bg-white shadow-lg m-4 p-4 bg-cyan-100'>
        <div class='align-middle text-xl font-bold'>
            <h1>{props.pos['position']}</h1>
        </div>

        <div class='ml-2'>
            <h3>{props.pos['faculty_member']} · {props.pos['lab_name']}</h3>
            
            {
              props.pos['majors'].length === 0 ? (
                <h3><b>All majors</b></h3>
              ) : ( 
                <h3><b>Majors: </b>{props.pos['majors'].toString()}</h3>
              )
            }

            <h3>Posted {props.pos['date_posted']} · GPA: {props.pos['minimum_gpa']}+</h3>
        </div>

        <div class='align-middle'>
            {
              props.pos['applicants'].length === 0 ? (
                <h3><b>No applicants</b></h3>
              ) : ( 
                <h3><b>Applicants: </b>{props.pos['applicants'].toString()}</h3>
              )
            }
        </div>
    </div>
)

export default ResearchPositionComponentFaculty;