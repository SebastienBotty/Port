import React from "react";
import "../scss/pageNotFound.scss"; // Assurez-vous d'importer le fichier CSS
import { Link } from "react-router-dom";
import { useLanguageContext } from "../Contexts/useLanguage";

function PageNotFound() {
  const { language } = useLanguageContext();
  const msg = {
    error: {
      FR: "La page que vous recherchez n'existe pas...",
      EN: "Oops, this page doesn't exist...",
    },
    goBack: {
      FR: "Retoue à la page d'accueil",
      EN: "Back to home page",
    },
  };
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <p>{msg.error[language]}</p>
      <Link to="/" className="home-link">
        {msg.goBack[language]}
      </Link>
    </div>
  );
}

export default PageNotFound;
