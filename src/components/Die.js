import React from "react"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons" 

export default function Die(props) {

    let face = null;

    // Depending on the value, assign `face` the die face layout
    switch(props.value) {
        case 1:
            face = 
            <div className="die-grid">
                <FontAwesomeIcon className="e" icon={faCircle} />
            </div>
            break;
        case 2:
            face = 
            <div className="die-grid">
                <FontAwesomeIcon className="c" icon={faCircle} />
                <FontAwesomeIcon className="g" icon={faCircle} />
            </div>
            break;
        case 3:
            face =
                <div className="die-grid">
                    <FontAwesomeIcon className="c" icon={faCircle} />
                    <FontAwesomeIcon className="e" icon={faCircle} />
                    <FontAwesomeIcon className="g" icon={faCircle} />
                </div>
            break;
        case 4:
            face =
                <div className="die-grid">
                    <FontAwesomeIcon className="a" icon={faCircle} />
                    <FontAwesomeIcon className="c" icon={faCircle} />
                    <FontAwesomeIcon className="g" icon={faCircle} />
                    <FontAwesomeIcon className="i" icon={faCircle} />
                </div>
            break;
        case 5:
            face =
                <div className="die-grid">
                    <FontAwesomeIcon className="a" icon={faCircle} />
                    <FontAwesomeIcon className="c" icon={faCircle} />
                    <FontAwesomeIcon className="e" icon={faCircle} />
                    <FontAwesomeIcon className="g" icon={faCircle} />
                    <FontAwesomeIcon className="i" icon={faCircle} />
                </div>
            break;
        case 6:
            face =
                <div className="die-grid">
                    <FontAwesomeIcon className="a" icon={faCircle} />
                    <FontAwesomeIcon className="c" icon={faCircle} />
                    <FontAwesomeIcon className="d" icon={faCircle} />
                    <FontAwesomeIcon className="f" icon={faCircle} />
                    <FontAwesomeIcon className="g" icon={faCircle} />
                    <FontAwesomeIcon className="i" icon={faCircle} />
                </div>
            break;
        default:
            face = null;
    }

    return(
        <div 
            className={
                props.isHeld ?
                "die selected" :
                "die"
            }
            onClick = {() => props.holdDice(props.id)}
        >
            {face}
        </div>
    )
}