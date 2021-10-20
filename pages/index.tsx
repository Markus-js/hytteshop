import { GetServerSidePropsContext } from 'next'
import React, { useState, useContext, useEffect } from 'react'
import StateContext from "../contexts/StateContext"
import HytteCard from '../components/HytteCard'
import { Modal } from '../components/Modal'
import { AiFillQuestionCircle } from 'react-icons/ai';



export default function Home({ hytter }) {

  const { setHytter, setModalToggle, setModalType } = useContext(StateContext);
  const [rerender, setRerender] = useState(false)
  setHytter(hytter)

  // Show Popup first render & when rerender
  useEffect(() => {
    setModalToggle(true)
    setModalType("ModalChildPopup")
  }, [rerender])

  return (
    <section className="app_container">
      <p className="intro_txt">Her på siden kan du orientere dig om, hwilke udhuse/skure/byggeprojekter der er sat til salg.</p>
      <div className="grid-container">

        {hytter.items.map(hytte => {
          // If hytte is reserved, return 
          if (!hytte.is_reserved) {
            return (
              <HytteCard key={hytte.id} hytte={hytte} />
            )
          }

        }
        )}
      </div>
      <Modal />
      {/* Toggle Popup */}
      <AiFillQuestionCircle
        className="question_circle"
        // rerender useEffect to toggle Popup again
        onClick={() => setRerender(prevState => !prevState)}
      />
    </section>
  )
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const res = await fetch("http://localhost:3000/api/hytter")
  const data = await res.json()


  // console.log("SERVER", data)
  // Tilpas props til endpoint
  return {
    //Endpoint => props:hytter => Home(hytter)
    props: {
      hytter: data.hytter
    }
  }
}