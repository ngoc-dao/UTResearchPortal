import React, { useState } from "react";
import "../searchbar.css";
import ResearchPositionComponentStudent from "./researchpositioncomponentstudent";
import ResearchPositionComponentFaculty from "./researchpositioncomponentfaculty";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
      return (
        value.lab_name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.faculty_member.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.position.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData(data);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData(data);
    setWordEntered("");
  };

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            style={{
              outline: "none",
              width: "20rem",
              height: "4rem",
              borderRadius: "0.4rem",
            }}
          />
          <div className="searchIcon">
            <i className="fas fa-search" />
          </div>
        </div>
        <button className="clearBtn" onClick={clearInput}>
          Clear
        </button>
      </div>
      <div className="centered">
        {filteredData.length === 0 ? (
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              fontFamily: "Open Sans",
              margin: 0,
              color: "white",
            }}
          >
            No research positions...
          </h1>
        ) : (
          filteredData.map((pos) => (
            <ResearchPositionComponentFaculty pos={pos} />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchBar;
