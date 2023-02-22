/* import statements */
import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

const ResearchPositionComponent = (props) => (
    <div class='flex bg-white shadow-lg m-4 p-4 bg-cyan-100'>
        <div class='align-middle text-xl'>
            <h2>{props.pos['position']}</h2>
        </div>

        <div class='ml-2'>
            <h3>{props.pos['faculty_member']} · {props.pos['lab_name']}</h3>
            
            {
              props.pos['majors'].length === 0 ? (
                <h3>All majors</h3>
              ) : (
                <h3>Majors: {props.pos['majors'].toString()}</h3>
              )
            }

            <h3>Posted {props.pos['date_posted']} · Min GPA Required: {props.pos['minimum_gpa']}</h3>
        </div>

        <div class='align-middle'>
            <Button>
                Apply
            </Button>
        </div>
    </div>
)

export default ResearchPositionComponent;