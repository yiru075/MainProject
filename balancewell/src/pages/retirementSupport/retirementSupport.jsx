import React, { useState } from 'react';
import './retirementSupport.css';

const RetirementSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('government');

  const servicesData = {
    government: [
      {
        title: "Centrelink: Retirement Help",
        description: "Get financial guidance on super, pension, and retirement options in Australia.",
        link: "https://www.servicesaustralia.gov.au/financial-services-when-thinking-about-retirement?context=60044"
      },
      {
        title: "MyAgedCare Access and Info",
        description: "Pre-retirement support and planning tools for aged care and wellbeing.",
        link: "https://www.myagedcare.gov.au/"
      },
      {
        title: "Multicultural Grants and Programs",
        description: "Discover grant opportunities supporting multicultural communities in Victoria.",
        link: "https://www.vic.gov.au/grants-support-multicultural-communities"
      },
      {
        title: "TIS National – Translating and Interpreting Service",
        description: "Free interpreters for accessing Centrelink, MyAgedCare, and Services Australia.",
        link: "https://www.tisnational.gov.au"
      }
    ],
    community: [
      {
        title: "COTA Victoria (Council on the Ageing)",
        description: "Helps multicultural Victorians with community-based support and education.",
        link: "https://www.cotavic.org.au"
      },
      {
        title: "Ethnic Communities’ Council of Victoria (ECCV)",
        description: "Provides retirement info, aged care access and financial education for CALD communities.",
        link: "https://eccv.org.au"
      },
      {
        title: "Neighbourhood Houses Victoria",
        description: "Free financial help, digital skills training, and social support in local communities.",
        link: "https://www.nhvic.org.au"
      },
      {
        title: "Foundation House – Refugee & Migrant Financial Wellbeing",
        description: "Supports migrants and refugees with wellbeing and retirement financial advice.",
        link: "https://foundationhouse.org.au"
      }
    ]
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="support-outer">
      <div className="support-container">
        <div className="support-container">
          <h2>Retirement & Aging Support Services</h2>
          <p>Find trusted community and government services that support your retirement journey.</p>

          <label htmlFor="category-select" className="category-label">
            Choose your option for support services:
          </label>
          <div className="select-wrapper">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="government">Government Services</option>
              <option value="community">Community Services</option>
            </select>
          </div>

          <div className="support-group">
            {servicesData[selectedCategory].map((service, index) => (
              <SupportCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportCard = ({ title, description, link }) => (
  <div className="support-card">
    <h4>{title}</h4>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="visit-link">
      VISIT LINK
    </a>
  </div>
);

export default RetirementSupport;
