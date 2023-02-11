import React from "react";
import './spinner.css'

function Spinner() {
  return (
        <div className="spinner">
            <div className="container spin">
                <div className="first block"></div>
                <div className="second block"></div>
                <div className="third block"></div>
            </div>
        </div>
  );
}

export default Spinner;
