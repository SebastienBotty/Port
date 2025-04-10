import React from "react";
import "../scss/experiences.scss";
import { ExperienceType } from "../Typescript/Types";
import { useLanguageContext } from "../Contexts/useLanguage";

function Experience({ experienceData }: { experienceData: ExperienceType }) {
  const { language } = useLanguageContext();
  return (
    <div className="experience">
      <div className="left-side-img">
        <img className="img-container" src={experienceData.image} alt="" />
      </div>
      <div className="text">
        <div className="dates">
          {experienceData.dates.start[language]} - {experienceData.dates.end[language]}
        </div>
        <div className="title">{experienceData.name[language]}</div>
        <div className="second-title">{experienceData.secondTitle[language]}</div>
        <div className="description">{experienceData.description[language]}</div>
      </div>
    </div>
  );
}

export default Experience;
