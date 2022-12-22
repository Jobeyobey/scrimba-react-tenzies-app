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

    const allDice = dice.map((die, index) => 
        <Die 
            key={`Die ${index}`} 
            value={dice[die]} 
        />
    )

    return (
        <main>
            <div className="dice-holder">
                {allDice}
            </div>
        </main>
    )
}

/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */