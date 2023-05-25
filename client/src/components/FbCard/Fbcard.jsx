import React from "react";
import "./Fbcard.css";

const Fbcard = ({ children }) => {
  return (
    <>
      <div className="fb-card">
        <div className="card-wrapper">{children}</div>
      </div>
    </>
  );
};

export default Fbcard;
