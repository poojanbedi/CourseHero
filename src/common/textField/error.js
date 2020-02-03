import React from "react";

export default function fieldError(props) {
  if (props.hasError) {
    return <span className="error">{props.errorMessage}</span>;
  }
  return null;
}
