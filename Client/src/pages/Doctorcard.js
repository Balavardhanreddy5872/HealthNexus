import React from 'react'
import "../styles/Doctorcard.css"

const Doctorcard = (props) => {

    return (
        <>
            <div className="box22">
                <div className="card2">
                    <div className="imgBx">
                        <img src={props.img} alt="images" />
                    </div>
                    <div className="details">
                        <h2>{props.name}<br /><span>{props.spec}</span></h2>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Doctorcard
