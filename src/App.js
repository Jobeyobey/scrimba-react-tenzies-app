import React from "react"
import Die from "./components/Die"

export default function App() {

    function allNewDice() {
        const diceArray = []
        for(let i = 0 ; i < 10 ; i++) {
            const ranNum = Math.floor(Math.random() * 6 + 1)
            diceArray.push(ranNum)
        }
        return diceArray
    }

    console.log(allNewDice())

    return (
        <main>
            <div className="dice-holder">
                <Die value={1} />
                <Die value={2} />
                <Die value={3} />
                <Die value={4} />
                <Die value={5} />
                <Die value={6} />
                <Die value={1} />
                <Die value={2} />
                <Die value={3} />
                <Die value={4} />
            </div>
        </main>
    )
}

/**
 * Challenge:
 * 
 * Write a function (allNewDice) that returns an array 
 * of 10 random numbers between 1-6 inclusive.
 * 
 * Log the array of numbers to the console for now
 */