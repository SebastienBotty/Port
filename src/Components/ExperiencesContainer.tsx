import React, { useState } from "react";
import { useLanguageContext } from "../Contexts/useLanguage";
import { experiencesText } from "../translations/experiences";
import "../scss/experiencesContainer.scss";
import { ExperienceType } from "../Typescript/Types";
import { studiesArr, workArr } from "../Constants/experiences";
import Experience from "./Experience";

function ExperiencesContainer() {
  const { language } = useLanguageContext();
  const [showInfos, setShowInfos] = useState<"studies" | "work">("work");

  const changeDatas = (type: "studies" | "work") => setShowInfos(type);

  const datas: ExperienceType[] = showInfos === "studies" ? studiesArr : workArr;

  return (
    <div className="experiences">
      <div className="titles-container">
        <div
          className="title"
          onClick={() => changeDatas("studies")}
          style={
            showInfos === "studies"
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "transparent" }
          }
        >
          {experiencesText.titles.studies[language]}
        </div>
        <div
          className="title"
          onClick={() => changeDatas("work")}
          style={
            showInfos === "work"
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "transparent" }
          }
        >
          {experiencesText.titles.experiences[language]}
        </div>
      </div>
      <div className="content">
        {datas.length > 0 ? (
          datas.map((exp) => <Experience key={exp.name.EN} experienceData={exp} />)
        ) : (
          <div className="nothing">
            <div>{experiencesText.nothing[language]}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperiencesContainer;
