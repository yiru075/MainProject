import React from "react";
import "./introduction.css";
import woman from "../../../assets/woman.png";

function Introduction() {
  return (
    <section className="introduction">
      <div className="introduction-content">
        <h1>
          Your aging journey starts with{" "}
          <span className="highlight">BalanceWell</span>
        </h1>
        <p>
          Everyone deserves growing older with confidence, care and connection.
          <br />
          How ready are you for aging planning?
        </p>
        <button className="test-button">Test your readiness</button>
      </div>
      <div className="introduction-image">
        <img src={woman} alt="Aging Woman" />
      </div>
    </section>
  );
}

export default Introduction;
