import React, { useContext, useState } from 'react'
import StateContext from "../contexts/StateContext"

import Style from "./modalChildDetails.module.scss"



const ModalChildDetails = () => {
    const {
        hytter,
        selectedHytteId,
        setModalType,
        reservationData,
        setReservationData
    } = useContext(StateContext);
    // const [reservationData, setReservationData] = useState<IData[]>();

    // Find curresponding Hytte with selected-Hytte-Id 
    const selectedHytteDataByID = hytter.items.find((hytte: { id: number; }) => {
        if (hytte.id === selectedHytteId) {
            return hytte
        }
    })
    // Destrutured props from => selectedHytteDataByID
    const {
        description,
        heigth,
        image,
        length,
        number,
        price,
        title,
        type,
        width,
    } = selectedHytteDataByID

    // String to HTML elements
    const createMarkup = () => {
        return {
            __html: description
        }
    }

    // 
    const handleReservation = (selectedHytteDataByID) => {
        setReservationData(selectedHytteDataByID)
        setModalType("ModalChildReservation")
        console.log(reservationData)
    }


    return (
        <main className={Style.main}>
            <header className="header">
                <h2>Du kigger nu på {type} nr. {number}</h2>
            </header>
            <div className={Style.flex_wrapper}>
                {/* LEFT Column */}
                <div className={Style.left_col}>
                    {/* <h2>{type} nr. {number}</h2> */}
                    <h2>{title}</h2>
                    <h3>Beskrivelse:</h3>
                    <p dangerouslySetInnerHTML={createMarkup()} />
                    <p> (LxBxH). {length}x{width}x{heigth}&#13217;</p>
                    <div className={Style.row}>
                        <h3>Pris: <span>{price}kr.</span></h3>
                        <button className="btn btn--sm" onClick={() => handleReservation(selectedHytteDataByID)}>reserver nu</button>
                    </div>
                </div>
                {/* RIGHT Column */}
                <div className={Style.right_col}>
                    <img src={image} alt={title} />
                    <button className="btn btn--lg" onClick={() => handleReservation(selectedHytteDataByID)}>reserver nu</button>
                </div>
            </div>

        </main>
    )
}

export default ModalChildDetails
