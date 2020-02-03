import React from "react";

export default function SearchResultView(props) {
  if (props.results.hasOwnProperty("department")) {
    return (
      <div className="search-results">
        <div className="results-heading">{`${props.results.department} ${
          props.results.course
        }`}</div>
        <ul className="results-details">
          <li>
            <span className="label">Department</span>
            <span className="value">{props.results.department}</span>
          </li>
          <li>
            <span className="label">Course</span>
            <span className="value">{props.results.course}</span>
          </li>
          <li>
            <span className="label">Year</span>
            <span className="value">{props.results.year}</span>
          </li>
          <li>
            <span className="label">Semister</span>
            <span className="value">{props.results.semister}</span>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
