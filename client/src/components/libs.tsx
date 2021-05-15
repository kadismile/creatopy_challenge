import React from "react";

export function LoadingButton() {
  return (
    <button
      type="button"
      className="btn btn-primary btn-large waves-effect waves-light"
      style={{ margin: "auto", display: "block",
        width: "200px",filter: "opacity(0.5)",
        color: "#fff"
        , fontSize: "15px", pointerEvents: "none" }}
    > Loading ....</button>
  )
}

export function DisabledButton() {
  return (
    <button
      type="button"
      className="btn btn-primary btn-large waves-effect waves-light"
      style={{ margin: "auto", display: "block",
        width: "200px",filter: "opacity(0.5)",
        color: "#fff"
        , fontSize: "15px", pointerEvents: "none" }}
    > Submit
    </button>
  )
}

export function FullPageSpinner() {
  return (
    <div style={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="spinner-border avatar-lg text-primary m-2" role="status"> </div>
    </div>
  )
}
