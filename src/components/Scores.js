import React from "react"

export default function Scores(props) {
    const [finalTime, setFinalTime] = React.useState(null)

    // Convert time into Centiseconds, Seconds and Minutes. Return an <h4> element with "Time: MM:SS:CC"
    function displayTime(time) {

        let cs = time % 100
        let sec = Math.floor(time / 100) % 60
        let min = Math.floor((time / 100) / 60)
        
        let csDisplay = cs < 10 ? `0${cs}` : cs
        let secDisplay = sec < 10 ? `0${sec}` : sec
        let minDisplay = min < 10 ? `0${min}` : min

        return <h4 className="timer">Time: {minDisplay}:{secDisplay}:{csDisplay}</h4>
    }



    // Find index of object with ID corresponding with number of dice. If it doesn't exist, display N/A. If it does, display fastest time
    let fastestTimeDisplay = null

    function displayFastestTime() {
        let scoreIndex = props.highScore.findIndex(item => item.id === props.numDice)
        if(props.highScore[scoreIndex] === undefined) {
            return fastestTimeDisplay = <h4 className="timer">Time: N/A</h4>
        } else if(props.highScore[scoreIndex].fastestTime === "None") {
            return fastestTimeDisplay = <h4 className="timer">Time: N/A</h4>
        } else {
            return displayTime(props.highScore[scoreIndex].fastestTime)
        }
    }

        // Find index of object with ID corresponding with number of dice. If it doesn't exist, display N/A. If it does, display least rolls
        function displayRolls() {
            let scoreIndex = props.highScore.findIndex(item => item.id === props.numDice)
            if(props.highScore[scoreIndex] === undefined) {
                return <h4 className="rolls">Rolls: N/A</h4>
            }
            return <h4 className="rolls">Rolls: {props.highScore[scoreIndex].leastRolls}</h4>
        }

        // Find index of object with ID corresponding with number of dice. If it doesn't exist, display 0. If it does, display number of wins
        function displayTimedWins() {
            let scoreIndex = props.highScore.findIndex(item => item.id === props.numDice)
            if(props.highScore[scoreIndex] === undefined) {
                return <h4 className="wins">Wins: 0</h4>
            }
            return <h4 className="wins">Wins: {props.highScore[scoreIndex].wins}</h4>
        }

        // Find index of object with ID corresponding with number of dice. If it doesn't exist, display 0. If it does, display number of losses
        function displayTimedLosses() {
            let scoreIndex = props.highScore.findIndex(item => item.id === props.numDice)
            if(props.highScore[scoreIndex] === undefined) {
                return <h4 className="losses">Losses: 0</h4>
            }
            return <h4 className="losses">Losses: {props.highScore[scoreIndex].losses}</h4>
        }
        
    // Clear high scores from local storage
    function resetScore() {
        props.setHighScore([])
    }
    
    // Creates current game element. If time challenge is on, display countdown timer. If off, display stopwatch timer. If clock goes over 60m, display "">1 hour"
    
    let challengeTime = props.timeChallenge.timer - props.time;
    let timer = null

    if(!props.timeChallenge.challenge) {
        let min = Math.floor((props.time / 100) / 60)
        min < 60
        ? timer = displayTime(props.time)
        : timer = <h4 className="timer">Time: &gt;1 hour</h4>
    } else {
        timer = displayTime(challengeTime)
    }

    // When game is finished (win or loss), update finalTime to equal the above `time` value. Keep this displayed until game is reset.
    React.useEffect(() => {
        setFinalTime(timer)
    }, [props.gameFinished])

    return (
        <div className="score-container">
            <h2 className="score-title">Current Game</h2>
            <div className="scores">
                {props.gameFinished ? finalTime : timer}
                <h4 className="rolls">Rolls: {props.rolls}</h4>
            </div>
            <br />
            <h2 className="score-title">High Scores: {props.numDice} Dice</h2>
            <div className="scores">
                {displayFastestTime()}
                {displayRolls()}
            </div>
            <br />
            <h2 className="score-title">Timed Score</h2>
            <div className="scores">
                {displayTimedWins()}
                {displayTimedLosses()}
            </div>
            <button className="scores-reset" onClick={resetScore}>Reset Scores</button>
        </div>
    )
}