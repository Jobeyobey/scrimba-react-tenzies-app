import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    // Create an array of dice objects with an id, value and isHeld property
    function allNewDice() {
        const diceArray = []
        for(let i = 0 ; i < 10 ; i++) {
            const ranNum = Math.floor(Math.random() * 6 + 1)
            const currentDie = { 
                id: nanoid(), 
                value: ranNum, 
                isHeld: false
            }
            diceArray.push(currentDie)
        }
        return diceArray
    }

    // Function to 'roll' the dice and update state when 'roll' button is clicked
    function rollDice() {
        setDice(allNewDice)
    }

    // Map over dice array to create the dice components
    const allDice = dice.map((die, index) => 
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld = {die.isHeld}
        />
    )

    return (
        <main>
            <div className="dice-holder">
                {allDice}
            </div>
            <button className="roll-button" onClick={rollDice}>Roll Dice</button>
        </main>
    )
}