/* import statements */
import React, { Component, useEffect, useState } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

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
    marginTop: "1rem",
  },
  subtitle: {
    fontSize: "1rem",
    fontFamily: "Open Sans",
    color: "white",
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
  formField: {
    background: "#f5f5f5",
    fontFamily: "Open Sans"
  },
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const NewPosition = (props) => {
  /* new position fields */
  const [positionName, setPositionName] = useState("");
  const [labName, setLabName] = useState("");
  const [gpa, setGpa] = useState("");
  const [deadline, setDeadline] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [newQ, setNewQ] = useState("");
  const [majors, setMajors] = useState({optionSelected: []});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const majorOptions = [
    { value: "A I", label: "Artificial Intelligence" },
    { value: "AAR", label: "Applied Archaeology" },
    { value: "AAS", label: "Asian American Studies" },
    { value: "ACC", label: "Accounting" },
    { value: "ACF", label: "Actuarial Foundations" },
    { value: "ADV", label: "Advertising" },
    { value: "AED", label: "Art Education" },
    { value: "AET", label: "Arts and Entertainment Technologies" },
    { value: "AFR", label: "African and African American Std" },
    { value: "AFS", label: "Air Force Science" },
    { value: "AHC", label: "Ancient Hist and Classical Civ" },
    { value: "ALD", label: "Applied Learning and Development" },
    { value: "AMS", label: "American Studies" },
    { value: "ANS", label: "Asian Studies" },
    { value: "ANT", label: "Anthropology" },
    { value: "ARA", label: "Arabic" },
    { value: "ARC", label: "Architecture" },
    { value: "ARE", label: "Architectural Engineering" },
    { value: "ARH", label: "Art History" },
    { value: "ARI", label: "Architectural Interior Design" },
    { value: "ART", label: "Studio Art" },
    { value: "ARY", label: "Archaeology" },
    { value: "ASE", label: "Aerospace Engineering" },
    { value: "ASL", label: "American Sign Language" },
    { value: "AST", label: "Astronomy" },
    { value: "B A", label: "Business Administration" },
    { value: "BCH", label: "Biochemistry" },
    { value: "BDP", label: "Bridging Disciplines" },
    { value: "BEN", label: "Bengali" },
    { value: "BGS", label: "Business, Government, and Society" },
    { value: "BIO", label: "Biology" },
    { value: "BME", label: "Biomedical Engineering" },
    { value: "BSN", label: "Bassoon" },
    { value: "C C", label: "Classical Civilization" },
    { value: "C E", label: "Civil Engineering" },
    { value: "C L", label: "Comparative Literature" },
    { value: "C S", label: "Computer Sciences" },
    { value: "CAM", label: "Computational and Applied Math" },
    { value: "CGS", label: "Cognitive Science" },
    { value: "CH ", label: "Chemistry" },
    { value: "CHE", label: "Chemical Engineering" },
    { value: "CHI", label: "Chinese" },
    { value: "CLA", label: "Clarinet" },
    { value: "CLS", label: "Cultural Studies" },
    { value: "CMS", label: "Communication Studies" },
    { value: "COE", label: "Computational Engineering" },
    { value: "COM", label: "Communication" },
    { value: "CON", label: "Conducting" },
    { value: "CRP", label: "Community and Regional Planning" },
    { value: "CRW", label: "Creative Writing" },
    { value: "CSD", label: "Comm Sciences and Disorders" },
    { value: "CTI", label: "Core Text and Ideas" },
    { value: "CZ ", label: "Czech" },
    { value: "CLD", label: "Communication and Leadership" },
    { value: "CSE", label: "Comp Sci, Engr and Mathematics" },
    { value: "D B", label: "Double Bass" },
    { value: "DAN", label: "Danish" },
    { value: "DCH", label: "Dutch" },
    { value: "DES", label: "Design " },
    { value: "DEV", label: "Developmental Studies" },
    { value: "DRS", label: "Drum Set" },
    { value: "D S", label: "Decision Science" },
    { value: "E  ", label: "English" },
    { value: "E E", label: "Electrical and Computer Engr" },
    { value: "E M", label: "Engineering Mechanics" },
    { value: "E S", label: "Engineering Studies" },
    { value: "ECE", label: "Electrical/Computer Engineering" },
    { value: "ECO", label: "Economics" },
    { value: "EDA", label: "Educational Administration" },
    { value: "EDC", label: "Curriculum and Instruction" },
    { value: "EDP", label: "Educational Psychology" },
    { value: "EEE", label: "Earth Energy Engineering" },
    { value: "EER", label: "Energy and Earth Resources" },
    { value: "ENM", label: "Engineering Management" },
    { value: "ENS", label: "Ensemble" },
    { value: "ESL", label: "English as a Second Language" },
    { value: "EUP", label: "Euphonium" },
    { value: "EUS", label: "European Studies" },
    { value: "EVE", label: "Environmental Engineering" },
    { value: "EVS", label: "Environmental Science" },
    { value: "ELP", label: "Educational Leadership/Policy" },
    { value: "F A", label: "Fine Arts" },
    { value: "F C", label: "French Civilization" },
    { value: "F H", label: "French Horn" },
    { value: "FIN", label: "Finance" },
    { value: "FLE", label: "Foreign Language Education" },
    { value: "FLU", label: "Flute" },
    { value: "FNH", label: "Finnish" },
    { value: "FR ", label: "French" },
    { value: "G E", label: "General Engineering" },
    { value: "GEO", label: "Geological Sciences" },
    { value: "GER", label: "German" },
    { value: "GK ", label: "Greek" },
    { value: "GOV", label: "Government" },
    { value: "GRC", label: "Germanic Civilization" },
    { value: "GRG", label: "Geography" },
    { value: "GRS", label: "Graduate School" },
    { value: "GSD", label: "German, Scandinavian, and Dutch Studies" },
    { value: "GUI", label: "Guitar" },
    { value: "H E", label: "Human Ecology" },
    { value: "H S", label: "Health and Society" },
    { value: "HAR", label: "Harp" },
    { value: "HDF", label: "Human Dev and Family Sciences" },
    { value: "HDO", label: "Human Dimensions of Orgs" },
    { value: "HEB", label: "Hebrew" },
    { value: "HED", label: "Health Education" },
    { value: "HIN", label: "Hindi" },
    { value: "HIS", label: "History" },
    { value: "HMN", label: "Humanities" },
    { value: "HSC", label: "Harpsichord" },
    { value: "HCT", label: "Health Care Transformation" },
    { value: "I B", label: "International Business" },
    { value: "IMS", label: "Identity Management" },
    { value: "INF", label: "Information Studies" },
    { value: "IRG", label: "Intl Rels and Global Studies" },
    { value: "ISL", label: "Islamic Studies" },
    { value: "ITC", label: "Italian Civilization" },
    { value: "ITL", label: "Italian" },
    { value: "ILA", label: "Iberian/Latin American Langs" },
    { value: "I  ", label: "Informatics" },
    { value: "ISP", label: "Information Security and Privacy" },
    { value: "ITD", label: "Integrated Design" },
    { value: "J  ", label: "Journalism" },
    { value: "J S", label: "Jewish Studies" },
    { value: "JPN", label: "Japanese" },
    { value: "KIN", label: "Kinesiology" },
    { value: "KOR", label: "Korean" },
    { value: "L A", label: "Liberal Arts" },
    { value: "LAH", label: "Liberal Arts Honors" },
    { value: "LAL", label: "Indigenous Languages of Latin America" },
    { value: "LAR", label: "Landscape Architecture" },
    { value: "LAS", label: "Latin American Studies" },
    { value: "LAT", label: "Latin" },
    { value: "LAW", label: "Law" },
    { value: "LEB", label: "Legal Environment of Business" },
    { value: "LIN", label: "Linguistics" },
    { value: "LTC", label: "Language Teaching and Coordination" },
    { value: "M  ", label: "Mathematics" },
    { value: "M E", label: "Mechanical Engineering" },
    { value: "M S", label: "Military Science" },
    { value: "MAL", label: "Malayalam" },
    { value: "MAN", label: "Management" },
    { value: "MAS", label: "Mexican American Studies" },
    { value: "MBU", label: "Music Business" },
    { value: "MDV", label: "Medieval Studies" },
    { value: "MED", label: "Medicine" },
    { value: "MEL", label: "Middle Eastern Languages and Cultures" },
    { value: "MES", label: "Middle Eastern Studies" },
    { value: "MFG", label: "Manufacturing Sys Engineering" },
    { value: "MIS", label: "Management Information Systems" },
    { value: "MKT", label: "Marketing" },
    { value: "MLS", label: "Medical Laboratory Science" },
    { value: "MNS", label: "Marine Science" },
    { value: "MOL", label: "Molecular Biology" },
    { value: "MRT", label: "Music Recording Technology" },
    { value: "MSE", label: "Materials Science and Engr" },
    { value: "MST", label: "Mathematical Statistics" },
    { value: "MUS", label: "Music" },
    { value: "N  ", label: "Nursing" },
    { value: "N S", label: "Naval Science" },
    { value: "NE", label: "Nanoengineering" },
    { value: "NEU", label: "Neuroscience" },
    { value: "NOR", label: "Norwegian" },
    { value: "NSC", label: "Natural Sciences" },
    { value: "NTR", label: "Nutrition" },
    { value: "O M", label: "Operations Management" },
    { value: "OBO", label: "Oboe" },
    { value: "OPR", label: "Opera" },
    { value: "ORG", label: "Organ" },
    { value: "ORI", label: "Operations Rsch and Indstrl Engr" },
    { value: "P A", label: "Public Affairs" },
    { value: "P L", label: "Public Leadership" },
    { value: "P R", label: "Public Relations" },
    { value: "P S", label: "Physical Science" },
    { value: "PBH", label: "Public Health" },
    { value: "PED", label: "Physical Education" },
    { value: "PER", label: "Percussion" },
    { value: "PGE", label: "Petroleum and Geosystems Engr" },
    { value: "PHL", label: "Philosophy" },
    { value: "PHM", label: "Pharmacy(Pharm D)" },
    { value: "PHR", label: "Pharmacy" },
    { value: "PHY", label: "Physics" },
    { value: "PIA", label: "Piano" },
    { value: "POL", label: "Polish" },
    { value: "POR", label: "Portuguese" },
    { value: "PRC", label: "Portuguese Civilization" },
    { value: "PRF", label: "Performance" },
    { value: "PRS", label: "Persian" },
    { value: "PSH", label: "Pashto" },
    { value: "PSY", label: "Psychology" },
    { value: "PGS", label: "Pharmacy Graduate Studies" },
    { value: "PSF", label: "Public Safety" },
    { value: "R E", label: "Real Estate" },
    { value: "R M", label: "Risk Management" },
    { value: "R S", label: "Religious Studies" },
    { value: "REC", label: "Recorder" },
    { value: "REE", label: "Russian East Eur and Eurasian Stds" },
    { value: "RHE", label: "Rhetoric and Writing" },
    { value: "ROM", label: "Romanian" },
    { value: "RTF", label: "Radio Television and Film" },
    { value: "RUS", label: "Russian" },
    { value: "RIM", label: "Race/Indigeneity/Migration" },
    { value: "S C", label: "Serbian and Croatian" },
    { value: "S S", label: "Social Science" },
    { value: "S W", label: "Social Work" },
    { value: "SAL", label: "South Asian Languages" },
    { value: "SAN", label: "Sanskrit" },
    { value: "SAX", label: "Saxophone" },
    { value: "SCA", label: "Scandinavian" },
    { value: "SCI", label: "Science" },
    { value: "SDS", label: "Statistics and Data Sciences" },
    { value: "SED", label: "Special Education" },
    { value: "SEL", label: "Slavic and Eurasian Languages" },
    { value: "SLA", label: "Slavic" },
    { value: "SME", label: "Science and Mathematics Education" },
    { value: "SOC", label: "Sociology" },
    { value: "SPC", label: "Spanish Civilization" },
    { value: "SPN", label: "Spanish" },
    { value: "SSB", label: "Systems and Synthetic Biology" },
    { value: "SSC", label: "Statistics and Scientific Computat" },
    { value: "STA", label: "Statistics" },
    { value: "STC", label: "Sci and Tech Commercialization" },
    { value: "STS", label: "Science Tech and Society" },
    { value: "SUS", label: "Sustainability Studies" },
    { value: "SWA", label: "Swahili" },
    { value: "SWE", label: "Swedish" },
    { value: "STM", label: "Science, Technology, Engineeri" },
    { value: "SLH", label: "Speech, Language, and Hearing" },
    { value: "T C", label: "Tutorial Course" },
    { value: "T D", label: "Theatre and Dance" },
    { value: "TAM", label: "Tamil" },
    { value: "TBA", label: "Tuba" },
    { value: "TEL", label: "Telugu" },
    { value: "TRO", label: "Trombone" },
    { value: "TRU", label: "Trumpet" },
    { value: "TUR", label: "Turkish" },
    { value: "TXA", label: "Textiles and Apparel" },
    { value: "U D", label: "Urban Design" },
    { value: "UDN", label: "Urban Design" },
    { value: "UGS", label: "Undergraduate Studies" },
    { value: "URB", label: "Urban Studies" },
    { value: "URD", label: "Urdu" },
    { value: "UTL", label: "UTeach and Liberal Arts" },
    { value: "UTS", label: "UTeach and Natural Sciences" },
    { value: "UKR", label: "Ukrainian" },
    { value: "V C", label: "Violoncello" },
    { value: "VAS", label: "Visual Art Studies" },
    { value: "VIA", label: "Viola" },
    { value: "VIB", label: "Vibraphone" },
    { value: "VIO", label: "Violin" },
    { value: "VOI", label: "Voice" },
    { value: "VTN", label: "Vietnamese" },
    { value: "WCV", label: "Western Civilization" },
    { value: "WGS", label: "Women's and Gender Studies" },
    { value: "WRT", label: "Writing" },
    { value: "YID", label: "Yiddish" },
    { value: "YOR", label: "Yoruba" },
  ];

  /* handles user logout */
  function submit() {
    const pn = positionName;
    const ln = labName;
    const gp = gpa;
    const dl = deadline;
    const aq = additionalQuestions;
    const ma = majors;

    if (pn === "" || ln === "" || gp === "" || dl === "") {
      setError("Please fill out all mandatory fields!");
      return;
    }

    const new_position = {
      position: pn,
      lab_name: ln,
      minimum_gpa: gp,
      deadline: dl,
      additional_questions: aq,
      majors: ma,
      eid: props.user["eid"],
      applicants: [],
    };

    axios
      .post("/addnewposition", new_position)
      .then((res) => {
        if (res.data["error"] === true) {
          setError(res.data["message"]);
        } else {
          setError("");
          console.log("SUCCESSFULLY ADDED NEW POSITION");
          navigate("/facultydashboard");
        }
      });
  }
  /* handles user logout */
  function logout() {
    props.setUser(null);
    navigate("/");
  }
  function handleChange(selected) {
    setMajors({
      optionSelected: selected,
    });
  }

  function newQuestion() {
    const q = newQ;
    const qs = additionalQuestions;
    qs.push(q);
    setAdditionalQuestions(qs);
    setNewQ("");
  }

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
          <h1 style={styles.subtitle}> Welcome {props.user["fname"]} </h1>
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
      <h1 style={styles.welcome}>Add a Research Position</h1>

      <p class="p-3" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // // height:
          // //   "100vh" /* set the container to the full height of the viewport */,
        }}
      >
      <div
        style={{
          /* set the width and height of the div */
          width: "25rem",
          height: "32rem",
          /* center the div horizontally and vertically */
          margin: "auto",
          background: "white",
          borderRadius: '1rem',
          paddingTop: '1rem'
        }}
      >
        <TextField
          label="Position Name"
          variant="filled"
          onChange={(event) => setPositionName(event.target.value)}
          style={styles.formField}
        ></TextField>

        <br></br>

        <TextField
          label="Lab Name"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setLabName(event.target.value)}
        ></TextField>

        <br></br>

        <TextField
          label="Minimum GPA"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setGpa(event.target.value)}
        ></TextField>

        <br></br>

        <TextField
          label="Deadline"
          variant="filled"
          style={styles.formField}
          onChange={(event) => setDeadline(event.target.value)}
        ></TextField>

        <p>Optional questions will appear here:</p>

        {additionalQuestions.length === 0 ? (
          <p></p>
        ) : (
          additionalQuestions.map((q, index) => (
            <p>
              <b>Question {index + 1}: </b> {q}{" "}
            </p>
          ))
        )}

        <TextField
          label="Add optional questions"
          variant="filled"
          onChange={(event) => setNewQ(event.target.value)}
        ></TextField>
        <br />
        <Button onClick={newQuestion} style={styles.button}>
          Add Optional Questions
        </Button>

        <p class="p-2">Select Majors Below</p>

        <span
          // class="d-inline-block"
          // data-toggle="popover"
          // data-trigger="focus"
          // data-content="Please selecet account(s)"
          class="mx-13"
        >
          <ReactSelect
            options={majorOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={majors.optionSelected}
          >
            Select Majors
          </ReactSelect>
        </span>

        <br />

        <p class="text-red-500">
          <b>{error}</b>
        </p>

        <Button style={styles.button} onClick={submit}>
          Submit
        </Button>
      </div>

      <br />
      <br />
      {/* <Outlet /> */}
    </div>
    </div>
  );
};

export default NewPosition;
