import React from "react"
import Die from "./components/Die"
import Scores from "./components/Scores"
import Settings from "./components/Settings"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [numDice, setNumDice] = React.useState(10)
    const [timeChallenge, setTimeChallenge] = React.useState({challenge: false, timer: 2000})
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [gameFinished, setGameFinished] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0)
    // const [highScore, setHighScore] = React.useState(
    //         localStorage.getItem('highScore') 
    //         ? JSON.parse(localStorage.getItem('highScore'))
    //         : {fastestTime: 0, leastRolls: 0, wins: 0, losses: 0}
    //     )
    const [highScore, setHighScore] = React.useState(
            localStorage.getItem('highScore') 
            ? JSON.parse(localStorage.getItem('highScore'))
            : []
        )
    const [inProgress, setInProgress] = React.useState(false)
    const intervalRef = React.useRef(null)
    
    // Check for a win whenever "dice" state updates. Stop timer on win. Set high scores on win.
    React.useEffect(() => {
        if(dice.every(die => die.isHeld)) {
            if(dice.every(die => die.value === dice[0].value)) {
                console.log("Game won!")
                setTenzies(true)
                clearInterval(intervalRef.current)
                intervalRef.current = null
                setInProgress(false)
                setGameFinished(true)
                setHighScore(prevHighScore => {
                    let newHighScore = [...prevHighScore]
                    let scoreIndex = newHighScore.findIndex(item => item.id === numDice)
                    if(scoreIndex !== -1) {
                        let newScore = {...newHighScore[scoreIndex]}
                        if(newScore.fastestTime > time || newScore.fastestTime === "None") {
                            newScore.fastestTime = time
                        }
                        if(newScore.leastRolls > rolls || newScore.leastRolls === "None") {
                            newScore.leastRolls = rolls
                        }
                        if(timeChallenge.challenge) {
                            newScore.wins += 1
                        }
                        newHighScore.splice(scoreIndex, 1, newScore)
                    } else {
                        let newScore = {
                            id: numDice,
                            fastestTime: time,
                            leastRolls: rolls,
                            wins: timeChallenge.challenge ? 1 : 0,
                            losses: 0
                        }
                        newHighScore.push(newScore)
                    }
                    return newHighScore
                })
            }
        }
    }, [dice])

    // If time challenge is on, check for a loss. If time elapsed is greater than timeChallenge.timer, trigger a loss
    React.useEffect(() => {
        if(time >= timeChallenge.timer && timeChallenge.challenge && inProgress) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setInProgress(false)
            setGameFinished(true)
            setHighScore(prevHighScore => {
                let newHighScore = [...prevHighScore]
                    let scoreIndex = newHighScore.findIndex(item => item.id === numDice)
                    if(scoreIndex !== -1) {
                        let newScore = {...newHighScore[scoreIndex]}
                        newScore.losses += 1
                        newHighScore.splice(scoreIndex, 1, newScore)
                    } else {
                        let newScore = {
                            id: numDice,
                            fastestTime: "None",
                            leastRolls: "None",
                            wins: 0,
                            losses: timeChallenge.challenge ? 1 : 0
                        }
                        newHighScore.push(newScore)
                    }
                    return newHighScore
            })
        }
    })

    // Save highScore to localStorage on win
    React.useEffect(() => {
        localStorage.setItem('highScore', JSON.stringify(highScore))
    }, [highScore])

    // Start timer on load. Reference for interval timer set as `intervalRef.current`.
    React.useEffect(() => {
        if(!tenzies && intervalRef.current === null && inProgress) {
            intervalRef.current = setInterval(() => {
                setTime((time) => time + 1)
            }, 10)
        }
    }, [inProgress])

    // Increment number of dice in game in settings Component (max 20)
    function incrementNumDice() {
        setNumDice(prevNumDice => {
            return prevNumDice < 20
            ? prevNumDice + 1
            : prevNumDice
        })
    }

    // Decrement number of dice in game in settings Component (min 5)
    function decrementNumDice() {
        setNumDice(prevNumDice => {
            return prevNumDice > 5
            ? prevNumDice - 1
            : prevNumDice
        })
    }
    
    // Flip time challenge true/false in settings Component
    function toggleChallenge(value) {
        if(value === "on") {
            setTimeChallenge(prevTimeChallenge => {
                return {
                    ...prevTimeChallenge,
                    challenge: true
                }
            })
        } else if (value === "off") {
            setTimeChallenge(prevTimeChallenge => {
                return {
                    ...prevTimeChallenge,
                    challenge: false
                }
            })
        }
    }

    // Increment time challenge timer
    function incrementChallengeTimer() {
        setTimeChallenge(prevTimeChallenge => {
            if(timeChallenge.timer >= 6000) {
                return prevTimeChallenge
            } else {
                return {
                    ...prevTimeChallenge,
                    timer: prevTimeChallenge.timer + 500
                }
            }
        })
    }

    // Decrement time challenge timer
    function decrementChallengeTimer() {
        setTimeChallenge(prevTimeChallenge => {
            if(timeChallenge.timer <= 500) {
                return prevTimeChallenge
            } else {
                return {
                    ...prevTimeChallenge,
                    timer: prevTimeChallenge.timer - 500
                }
            }
        })
    }

    // Create an array of dice objects with an id, value and isHeld property
    function allNewDice() {
        const diceArray = []
        for(let i = 0 ; i < numDice ; i++) {
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
        if (!inProgress) {
            setInProgress(!inProgress)
            setDice(allNewDice)
            setTenzies(false)
            setRolls(0)
            setTime(0)
            setGameFinished(false)
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

            {/* Render container for app, if the game is won, display confetti */}
            <div className="main-container">
                {tenzies && <Confetti />}

                <h1 className="title">Tenzies</h1>
                <p className="description">Roll until all dice are the same. Click each die to
                    freeze it at its current value between rolls.</p>

                {/* Only display dice when game is in progress */}
                {inProgress &&
                <div className="dice-holder">
                    {allDice}
                </div>
                }
                
                <button 
                    className="roll-button" 
                    onClick={rollDice}
                >
                    {inProgress ? "Roll Dice" : "Start New Game"}
                </button>
            </div>
            <Scores
                rolls={rolls}
                time={time}
                highScore={highScore}
                timeChallenge={timeChallenge}
                inProgress={inProgress}
                gameFinished={gameFinished}
                setHighScore={setHighScore}
            />

            {/* Only display settings when game is not in progress */}
            { !inProgress&& <Settings
                    incrementNumDice={incrementNumDice}
                    decrementNumDice={decrementNumDice}
                    numDice={numDice}
                    timeChallenge={timeChallenge}
                    toggleChallenge={toggleChallenge}
                    incrementChallengeTimer={incrementChallengeTimer}
                    decrementChallengeTimer={decrementChallengeTimer}
                />
            }
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
 * Add/Remove dice DONE
 * Set timer with possibility to lose DONE
 * Clear high scores button DONE
 * Update/Display high scores corresponding with numDice
*/

/**
 * Display high scores with corresponding dice
 *  Create an array containing an object for each high score/dice
 *  Each object should have an ID corresponding to number of dice, fastest time and least rolls
 *  High score title should display High Score: X Dice.
 *      Access highScore array by iterating through, .findIndex(object => object.id === ${dice}) to find the corresponding ID
 *      Use corresponding ID index to save into a variable for easy access
 *      Use this to display the relevant scores etc.
 */