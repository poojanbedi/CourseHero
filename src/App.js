import React from "react";
import TextField from "./common/textField/textField";
import SearchResultsView from "./common/searchResultView/searchResult";
import "./styles.css";

export default function App() {
  const defaultErrorState = {
    hasError: false,
    errorMessage: ""
  };
  let [isSubmitEnabled, setSubmitEnabled] = React.useState(false);
  let [courseNameError, setCourseNameError] = React.useState(defaultErrorState);
  let [courseName, setCourseName] = React.useState("");
  let [searchResult, setSearchResult] = React.useState({});

  const getSemister = semister => {
    let output = semister;
    const semisterTypes = {
      F: "Fall",
      W: "Winter",
      S: "Spring",
      Su: "Summer"
    };

    if (semister.length === 1) {
      output = semisterTypes[semister.toUpperCase()];
    }
    return output;
  };

  const getSemisterYear = year => {
    let output = year;
    if (year.length === 2) {
      output = 2000 + parseInt(year, 10); // Assume years start from 2000.
    }
    return output;
  };

  const validateAndConvertInput = input => {
    const regexp = /([A-Za-z]{1,})[\s:-]{0,}(\d{1,})\s{1}(\d{2,4}|[a-zA-Z]{1,})\s{0,}(\d{2,4}|[a-zA-Z]{1,})/gm;
    const match = regexp.exec(input);
    if (match === null || match.length < 5 || match.length > 5) {
      throw new Error("Error: Could not parse course");
    }
    return match;
  };
  const courseName_Keyup_handler = React.useCallback(
    ev => {
      let target = ev.target;
      setCourseName(target.value);
      setSearchResult({});
      setCourseNameError(defaultErrorState);
      if (target.value === "") {
        setSubmitEnabled(false);
      } else {
        setSubmitEnabled(true);
      }
    },
    [defaultErrorState]
  );

  const submitOnClickHandler = ev => {
    ev.preventDefault();
    try {
      let compiledResults = {};
      setCourseNameError(defaultErrorState);
      const match = validateAndConvertInput(courseName);
      compiledResults.department = match[1];
      compiledResults.course = match[2];

      if (match[3].length > 1 && match[3].length < 3) {
        // Means it is two digit year
        compiledResults.year = getSemisterYear(match[3]);
        compiledResults.semister = getSemister(match[4]);
      } else if (match[3].length === 1) {
        compiledResults.semister = getSemister(match[3]);
        compiledResults.year = getSemisterYear(match[4]);
      } else if (isNaN(match[3])) {
        // Means it is semister
        compiledResults.semister = getSemister(match[3]);
        compiledResults.year = getSemisterYear(match[4]);
      } else {
        compiledResults.semister = getSemister(match[4]);
        compiledResults.year = getSemisterYear(match[3]);
      }

      setSearchResult(compiledResults);
    } catch (ex) {
      setCourseNameError({
        hasError: true,
        errorMessage: ex.message
      });
    }
  };

  return (
    <div className="App">
      <div className="course-form">
        <form>
          <TextField
            fieldPlaceholder="Enter Course"
            fieldId="course-name"
            fieldLabel="Course"
            onKeyUp={courseName_Keyup_handler}
            error={courseNameError}
          />
          <div class="form-actions">
            <button
              className=""
              id="btnSubmit"
              disabled={!isSubmitEnabled}
              onClick={submitOnClickHandler}
            >
              Submit
            </button>
          </div>
        </form>
        <SearchResultsView results={searchResult} />
      </div>
    </div>
  );
}
