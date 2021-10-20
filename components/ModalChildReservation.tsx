import React, { useContext, useEffect, useState } from 'react'
import StateContext from "../contexts/StateContext"
import { Form } from "../components/Form"

import Style from "./modalChildReservation.module.scss"


const ModalChildReservation = () => {
    // States for closing Modal by btn => runTimer
    // runTimer runs => initializeCount witch runs => count
    const [runTimer, setRunTimer] = useState(false);
    const [initializeCount, setInitializeCount] = useState(false);
    const [count, setCount] = useState(4);
    // Global States
    const {
        hytter,
        success,
        setSuccess,
        modalToggle,
        setModalToggle,
        reservationData
    } = useContext(StateContext);
    // const [reservationData, setReservationData] = useState<IData[]>();

    // Destrutured prop from => hytter
    const {
        txt_after_reservation
    } = hytter

    // Destrutured props from => selectedHytteDataByID
    const {
        description,
        number,
        type,
    } = reservationData

    // String to HTML elements
    const createDescriptionMarkup = () => {
        return {
            __html: description
        }
    }
    const createAfterReservationMarkup = () => {
        return {
            __html: txt_after_reservation
        }
    }



    useEffect(() => {


        if (runTimer === true) {
            // Start Counter  §1
            setInitializeCount(true)
            const timer = setTimeout(() => {
                // Toggle modal 
                setSuccess(false)
                setModalToggle(false);

            }, 4000);
            // If the modal is closed, then stop timer, else it will close other modals when the time run out. 
            if (modalToggle === true) {
                return () => clearTimeout(timer)
            }
        }
    }, [runTimer]);


    useEffect(() => {
        const countExit = setInterval(() => {
            // email result asynchronous
            if (initializeCount) {
                setCount(x => x - 1)
            }
        }, 1000);
        return () => {
            clearInterval(countExit)
        }
    }, [initializeCount])


    // const submitReservation = async () => {
    //     const response = await fetch("/api/hytter/", {
    //         method: "PUT",
    //         body: JSON.stringify({ hytter }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })

    //     const data = await response.json()
    //     const currentHytte = await data.hytter.items.find(item => item.id === id)
    //     console.log(currentHytte.is_reserved)
    // }


    return (
        <main>
            <header className={success ? "header header--green" : "header"}>
                {!success && <h2>Du er nu ved at reservere {type} nr. {number}</h2>}
                {success && <h2>Du har reserveret {type} nr. {number}</h2>}
            </header>
            <div className={success ? Style.content_wrapper && Style.content_wrapper_centered : Style.content_wrapper}>
                {success &&
                    <>
                        <h2>Sendt!</h2>
                        <p dangerouslySetInnerHTML={createAfterReservationMarkup()} />
                    </>
                }
                {!success &&
                    <>
                        <p dangerouslySetInnerHTML={createDescriptionMarkup()} />
                        <h3><b>Reservation af {type} {number}</b></h3>
                        <Form />
                    </>
                }
                {initializeCount &&
                    <>
                        <h3>Lukker om</h3>
                        <h4>{count}</h4>
                    </>
                }
                {success && !initializeCount && <button className="btn btn--green" onClick={() => setRunTimer(true)}>Luk</button>}
            </div>

        </main>
    )
}

export default ModalChildReservation


