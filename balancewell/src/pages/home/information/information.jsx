import React from "react";
import "./information.css";
import group from "../../../assets/group.jpg"; 

function Information() {
  return (
    <section className="about-section">
      <div className="about-image">
        <img src={group} alt="Happy elderly people" />
      </div>
      <div className="about-content">
        <h2>
          Aging Well Isn’t a <br /> <span className="orange-text">Luxury– It’s a Right!</span>
        </h2>
        <p>
        We approach with a deeply personalized touch, striving to understand each individual's unique needs, preferences, and life story, because we believe that the most meaningful care is one that honors the individuality and dignity of every senior we serve.
        </p>
      </div>
    </section>
  );
}

export default Information;
