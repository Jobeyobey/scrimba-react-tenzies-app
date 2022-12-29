import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    // Check for a win whenever "dice" state updates
    React.useEffect(() => {
        if(dice.every(die => die.isHeld)) {
            if(dice.every(die => die.value === dice[0].value)) {
                setTenzies(true)
            }
        }
    }, [dice])
    
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

    // 'roll' dice and update state with new dice. Keep 'isHeld' dice. If game is won, reset game
    function rollDice() {
        if (tenzies) {
            setDice(allNewDice)
            setTenzies(false)
        } else {
            const newDice = allNewDice();
            setDice(oldDice => oldDice.map((die, index) => {
                return die.isHeld ? 
                die : 
                newDice[index]
            }))
        }
    }

    // Flip 'isHeld' value when a dice is clicked, using the id property
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
            }
        ))
    }

    // Map over dice array to create the dice components
    const allDice = dice.map((die, index) => 
        <Die 
            key = {die.id}
            id = {die.id}
            value = {die.value} 
            isHeld = {die.isHeld}
            holdDice = {holdDice}
        />
    )

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="description">Roll until all dice are the same. Click each die to
                freeze it at its current value between rolls.</p>
            <div className="dice-holder">
                {allDice}
            </div>
            <button 
                className="roll-button" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll Dice"}
            </button>
        </main>
    )
}