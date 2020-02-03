import React from "react";
import FieldError from "./error";

export default function TextField(props) {
  let [fieldValue, setFieldValue] = React.useState("");
  let onKeyUp_handler = ev => {
    if (typeof props.onKeyUp === "function") {
      props.onKeyUp(ev);
    }
  };

  let onChangeHandler = ev => {
    let target = ev.target;
    setFieldValue(target.value);
  };

  return (
    <div className="form-field">
      <label>
        <span className="inputLabel">{props.fieldLabel}</span>
        <input
          type="text"
          placeholder={props.fieldPlaceholder}
          value={fieldValue}
          onKeyUp={onKeyUp_handler}
          onChange={onChangeHandler}
          className={props.error.hasError ? "error" : ""}
        />
        <FieldError
          hasError={props.error.hasError}
          errorMessage={props.error.errorMessage}
        />
      </label>
    </div>
  );
}
