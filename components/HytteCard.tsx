import { FC, useContext, useEffect } from "react"
import StateContext from "../contexts/StateContext";
import { ICardDetails } from "../types"

import Style from "./hytteCard.module.scss";

const HytteCard: FC<{ hytte: ICardDetails }> = ({
    hytte: {
        id,
        image,
        number,
        price,
        title,
        type,
    }
}) => {

    const {
        setModalToggle,
        setModalType,
        setSelectedHytteId
    } = useContext(StateContext);

    const handleModal = (id: number) => {
        setSelectedHytteId(id)
        setModalToggle(true)
        setModalType("ModalChildDetails")
    }



    return (
        <div className={Style.card}>
            <img src={image} alt={title} />
            <div>
                <header>
                    <h2>{type} nr. {number}</h2>
                </header>
                <footer >
                    <h3>Pris: <span>{price}kr.</span></h3>
                    <button className="btn" onClick={() => handleModal(id)}>LÆS MERE</button>
                </footer>
            </div>
        </div>
    )
}

export default HytteCard
