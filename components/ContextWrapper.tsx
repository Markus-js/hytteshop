import StateContext from "../contexts/StateContext";
import { useState } from "react"



function ContextWrapper({ children }) {
    // Data
    const [hytter, setHytter] = useState({})
    const [selectedHytteId, setSelectedHytteId] = useState(null)
    const [reservationData, setReservationData] = useState({})

    // Modal
    const [success, setSuccess] = useState(false)
    const [modalToggle, setModalToggle] = useState(false)
    const [modalType, setModalType] = useState("HytteDetails")



    return (
        <StateContext.Provider
            value={{
                hytter,
                setHytter,
                success,
                setSuccess,
                modalToggle,
                setModalToggle,
                modalType,
                setModalType,
                selectedHytteId,
                setSelectedHytteId,
                reservationData,
                setReservationData
            }}
        >

            {children}
        </StateContext.Provider>
    )
}


export default ContextWrapper;