import React from "react"
import Die from "./components/Die"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    function allNewDice() {
        const diceArray = []
        for(let i = 0 ; i < 10 ; i++) {
            const ranNum = Math.floor(Math.random() * 6 + 1)
            diceArray.push(ranNum)
        }
        return diceArray
    }

    function rollDice() {
        setDice(allNewDice)
    }

    const allDice = dice.map((die, index) => 
        <Die 
            key={`Die ${index}`} 
            value={die} 
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
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 * 
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
 */