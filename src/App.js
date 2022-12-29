import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Scores from "./components/Scores"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [scores, setScores] = React.useState({time: 0, rolls: 0})
    
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
            setScores({time: 0, rolls: 0})
        } else {
            const newDice = allNewDice();
            setDice(oldDice => oldDice.map((die, index) => {
                return die.isHeld ? 
                die : 
                newDice[index]
            }))
            setScores(oldScores => {
                return {
                    ...oldScores,
                    rolls: oldScores.rolls + 1
                }
            })
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
            <div className="main-container">
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
            </div>
            <Scores scores={scores}/>
        </main>
    )
}

/** 
 * Extra Credit Ideas:
 * Real dots on dice (CSS) DONE
 * Track number of rolls DONE
 * Track time taken to win
 * Track high scores (locally)
 * Add/Remove dice
 * Set timer with possibility to lose
*/

/**
 * Track time taken to win
 *  Find a way to track time starting from game start
 *      Create a state in which the game has not started
 *  Create a way to start the game, starting the timer
 *  Stop the timer when the game is won
 *  Reset timer when new game is started
 */

/**
 * Track high scores
 *  Initialise a highScore state as object with scores wanting tracking
 *  Whenever a high score is achieved, update state and save it to local storage
 *  Whenever state is initilaised, check localStorage for high score
 */

/**
 * Add or remove dice
 *  Add a + / - button to increment/decrement dice to a min/max of 5/20
 *  Increase grid spaces to accomodate more dice
 *  This would cause an issue with score tracking, I'd need different high score sets for different numbers of dice... Possibly too complicated for right now
 */

/**
 * Timer with possibility to lose
 *  Before game is started, making it possible to set a countdown timer
 *  If countdown timer reaches 0, the game is lost
 *      This can contribute to a win/loss tracker if I wanted
 */