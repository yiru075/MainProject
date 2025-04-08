import React from "react";
import { Link } from "react-router-dom";
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
        <div className="button-group">
          <Link to="/quiz" className="test-button">Test your readiness</Link>
          {/* <Link to="/quiz" className="quiz-button">Quiz</Link> */}
        </div>
      </div>
      <div className="introduction-image">
        <img src={woman} alt="Aging Woman" />
      </div>
    </section>
  );
}

export default Introduction;
