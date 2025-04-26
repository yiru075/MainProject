import React from 'react';
import './tool.css'; 

const tools = [
  {
    title: "Your Housing Affordability Guide",
    description: "See if your current rent fits your income, and get suburbs recommendations that support financial stability and peace of mind.",
  },
  {
    title: "Explore suburb-level rent prices",
    description: "Use our interactive map to discover affordable areas across Victoria based on real housing data - so you can plan where to live with confidence.",
  },
  {
    title: "Your personalized learning hub",
    description: "Take a quiz to find your retirement planning level, then access tailored lessons on saving, superannuation, health budgeting, and more — all designed for your stage in life.",
  },
  {
    title: "Rental Sustainability Estimator",
    description: "Estimate how long you can afford to rent in your desired suburb. We factor in rent trends to help you plan ahead.",
  },
  {
    title: "Health & Wellbeing Events Suggestions",
    description: "Find free or low-cost health checkups, workshops, and wellness activities near you.",
  },
  {
    title: "Nearby Support Services",
    description: "Community or government support services related to aging and retirement.",
  },
];

const Tool = () => {
  return (
    <section className="tools-section">
      <h2 className="tools-title">
        Tools that help you plan smarter, live healthier, and age better
      </h2>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <h3 className="tool-card-title">{tool.title}</h3>
            <p className="tool-card-description">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tool;
