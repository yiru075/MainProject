import React from "react";
import { Link } from "react-router-dom";
import "./introduction.css";
import woman from "../../../assets/woman.png";

function Introduction() {
  return (
    <section className="introduction">
      <div className="introduction-content">
        <h1>
          <span className="highlight">Helping you age well with clarity, care and financial confidence.</span>
        </h1>
        <p>
        Start shaping a future that supports your well-being
        </p>
        <div className="button-group">
          <Link to="/quiz" className="test-button">Start Your Guided Path</Link>
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
