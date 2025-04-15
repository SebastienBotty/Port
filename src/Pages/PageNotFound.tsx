import React from "react";
import "../scss/pageNotFound.scss"; // Assurez-vous d'importer le fichier CSS
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to="/" className="home-link">
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default PageNotFound;
