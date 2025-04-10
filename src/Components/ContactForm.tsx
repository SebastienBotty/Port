import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { contactFormText } from "../translations/contactForm";

import "../scss/contactForm.scss";
import { useLanguageContext } from "../Contexts/useLanguage";

function ContactForm() {
  const formSpreeEndPoint = process.env.REACT_APP_FORM_ENDPOINT;
  const { language } = useLanguageContext();
  const [state, handleSubmit] = useForm(formSpreeEndPoint as string);
  if (state.succeeded) {
    return <p>{contactFormText.confirmMessage[language]}</p>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} method="post" className="contact-form">
        <div className="secondTitle">{contactFormText.secondTitle[language]}</div>

        <input
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder={contactFormText.mail[language]}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea id="message" name="message" className="form-textarea" />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <button type="submit" disabled={state.submitting} className="form-button">
          {contactFormText.submit[language]}
        </button>
      </form>
    </>
  );
}

export default ContactForm;
