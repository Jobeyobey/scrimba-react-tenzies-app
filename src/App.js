import React from "react"
import Die from "./components/Die"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    function allNewDice() {
        const diceArray = []
        for(let i = 0 ; i < 10 ; i++) {
            const ranNum = Math.floor(Math.random() * 6 + 1)
            const currentDie = { value: ranNum, isHeld: false }
            diceArray.push(currentDie)
        }
        return diceArray
    }

    function rollDice() {
        setDice(allNewDice)
    }

    const allDice = dice.map((die, index) => 
        <Die 
            key={`Die ${index}`} 
            value={die.value} 
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

/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 * 
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */