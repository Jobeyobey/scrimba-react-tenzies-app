import React from "react"
import Die from "./components/Die"
import Scores from "./components/Scores"
import Settings from "./components/Settings"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [highScore, setHighScore] = React.useState(
            localStorage.getItem('fastestTime' && 'leastRolls') 
            ? {fastestTime: parseInt(localStorage.getItem('fastestTime')), leastRolls: parseInt(localStorage.getItem('leastRolls'))}
            : {fastestTime: 0, leastRolls: 0}
        )
    const [inProgress, setInProgress] = React.useState(false)
    const intervalRef = React.useRef(null)
    
    // Check for a win whenever "dice" state updates. Stop timer on win. Set high scores on win.
    React.useEffect(() => {
        if(dice.every(die => die.isHeld)) {
            if(dice.every(die => die.value === dice[0].value)) {
                setTenzies(true)
                clearInterval(intervalRef.current)
                setHighScore(prevHighScore => {
                    let score = {...prevHighScore}
                    if(score.fastestTime > time || score.fastestTime === 0) {
                        score.fastestTime = time
                    }
                    if(score.leastRolls > rolls || score.leastRolls === 0) {
                        score.leastRolls = rolls
                    }
                    return score
                })
            }
        }
    }, [dice])

    // Save highScore to localStorage on win
    React.useEffect(() => {
        localStorage.setItem('fastestTime', highScore.fastestTime.toString())
        localStorage.setItem('leastRolls', highScore.leastRolls.toString())
    }, [highScore])

    // Start timer on load. Reference for interval timer set as `intervalRef.current`.
    React.useEffect(() => {
        if(!tenzies && intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                setTime((time) => time + 1)
            }, 10)
        }
    }, [tenzies])
    
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
            setRolls(0)
            setTime(0)
        } else {
            const newDice = allNewDice();
            setDice(oldDice => oldDice.map((die, index) => {
                return die.isHeld ? 
                die : 
                newDice[index]
            }))
            setRolls(prevRolls => prevRolls + 1)
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
            <Scores rolls={rolls} time={time} highScore={highScore}/>
            { !inProgress && <Settings />}
        </main>
    )
}

/** 
 * Extra Credit Ideas:
 * Real dots on dice (CSS) DONE
 * Track number of rolls DONE
 * Track time taken to win DONE
 * Track high scores (locally) DONE
 * When game is stopped, have settings appear DONE
 * Add/Remove dice
 * Set timer with possibility to lose
*/

/**
 * Settings
 *  Create a state for whether game is in progress
 *  When game is not in progress, render a settings window
 *  Settings window should have a number of dice setting, and timer setting
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