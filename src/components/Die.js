import React from "react"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons" 

export default function Die(props) {

    const faceOne = <FontAwesomeIcon icon={faCircle} />

    // create a string to to place className for the dice
    function dieClass() {
        const arr = []
        if(props.isHeld) {
            arr.push("die selected")
        } else {
            arr.push("die")
        };
        switch(props.value) {
            case 1:
                arr.push("faceOne")
                break;
            case 2:
                arr.push("faceTwo")
                break;
            case 3:
                arr.push("faceThree")
                break;
            case 4:
                arr.push("faceFour")
                break;
            case 5:
                arr.push("faceFive")
                break;
            case 6:
                arr.push("faceSix")
                break;
            default:
                arr.push("Error")
        }
        return arr.stringify
    };

    // create the variable that can be placed in the die component for className
    const thisClass = dieClass();

    return(
        <div 
            className={
                props.isHeld ?
                "die selected" :
                "die"
            }
            onClick = {() => props.holdDice(props.id)}
        >
            {faceOne}
        </div>
    )
}