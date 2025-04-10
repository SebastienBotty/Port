import React from "react";
import ContactForm from "./ContactForm";

import "../scss/contactContainer.scss";

function ContactContainer() {
  return (
    <div className="contact-container">
      <div className="title">Contact</div>
      <ContactForm />
    </div>
  );
}

export default ContactContainer;
