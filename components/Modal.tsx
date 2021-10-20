import { FC, useContext } from "react";
import StateContext from "../contexts/StateContext"
// Components 
import ModalChildDetails from "./ModalChildDetails";
import ModalChildReservation from "./ModalChildReservation";
// Style
import Style from "./modal.module.scss"
import ModalChildPopup from "./ModalChildPopup";

export const Modal: FC = () => {
  const {
    setSuccess,
    modalToggle,
    setModalToggle,
    modalType,
  } = useContext(StateContext);



  function handleExit() {
    // Toggle modal 
    setSuccess(false)
    setModalToggle(false);
  }



  return (
    <>
      {modalToggle && modalType !== "" ? (
        <section className={Style.modal_container}>
          <span className={Style.close} onClick={() => {
            handleExit();
          }}>
            &#10005;
          </span>
          {/* Popup */}
          {modalType === "ModalChildPopup" ? <ModalChildPopup /> : null}
          {/* Details & Reservation */}
          {modalType === "ModalChildDetails" ? <ModalChildDetails /> : null}
          {modalType === "ModalChildReservation" ? <ModalChildReservation /> : null}


        </section>
      ) : null}

      {/* Modal BG */}
      {modalToggle ?
        <div
          className={Style.overlay}

          onClick={() => {
            handleExit();
          }}

        ></div> : null}
    </>
  );
};




