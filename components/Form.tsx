import React, { useContext, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import Style from "./form.module.scss";
init("user_iKlFVYLk9kyYQV2fO6bD6");

import StateContext from "../contexts/StateContext"

export const Form = () => {


  const {
    hytter,
    reservationData,
    setSuccess,
  } = useContext(StateContext);

  // Destrutured prop from => reservationData
  const {
    price,
    number,
    type
  } = reservationData
  const {
    txt_after_reservation,
  } = hytter

  const [data, setData] = useState({
    name: "",
    email: "",
    tlf: "",
    type: "",
    reservation_number: "",
    txt_after_reservation: ""
  });



  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_58zi6jz",
        "template_b9c11vh",
        e.target,
        process.env.EMAIL_JS_API_KEY
      )
      .then(
        (result) => {
          setSuccess(true);
        },
        (error) => {
          setSuccess(false)
        }
      );
    e.target.reset();
  }






  return (
    <section className={Style.form_section} >

      <form className={Style.form} onSubmit={sendEmail}>

        {/* NAME */}
        <div>
          <label>Dit navn og efternavn</label>
          <input
            name="name"
            type="text"
            placeholder="Navn"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        {/* PHONE */}
        <div>
          <label>Dit telefon nr</label>
          <input
            name="tlf"
            type="number"
            placeholder="+45 12 34 56 78"
            onChange={(e) => setData({ ...data, tlf: e.target.value })}
            required
          />
        </div>
        {/* E-MAIL */}
        <div>
          <label>Din mailadresse</label>
          <input
            name="user_email"
            type="email"
            placeholder="example@email.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        {/* hidden */}
        <div style={{ display: 'none' }}>
          <input
            name="txt_after_reservation"
            value={txt_after_reservation}
            onChange={(e) => setData({ ...data, txt_after_reservation: e.target.value })}
          />
          <input
            name="num"
            value={number}
            onChange={(e) => setData({ ...data, reservation_number: e.target.value })}
          />
          <input
            name="type"
            value={type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          />
        </div>

        <footer>
          <h3>Pris: <span>{price}kr.</span></h3>
          <button className="btn" type="submit" >send</button>
        </footer>
      </form>

    </section>
  );
};
