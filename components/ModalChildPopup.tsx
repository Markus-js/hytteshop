import React, { useContext, useEffect, useState } from 'react'
import StateContext from "../contexts/StateContext"

import Style from "./modalChildPopup.module.scss"




const ModalChildPopup = () => {

    // Global States
    const {
        hytter,
        setModalToggle
    } = useContext(StateContext);

    // Destrutured prop from => hytter
    const {
        txt_before_reservation
    } = hytter




    const createBeforeReservationMarkup = () => {
        return {
            __html: txt_before_reservation
        }
    }


    function handleExit() {
        // Toggle modal 
        setModalToggle(false);
    }




    return (
        <main>
            <header className="header header--blue">
                <h2>Læs dette, inden du bestiller</h2>
            </header>
            <div className={Style.content_wrapper}>
                <p dangerouslySetInnerHTML={createBeforeReservationMarkup()} />
                <button className="btn btn--blue" onClick={handleExit}>Luk</button>
            </div>
        </main>
    )
}

export default ModalChildPopup


