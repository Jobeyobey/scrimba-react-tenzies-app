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

    function displayRolls(rolls) {
        return <h4 className="rolls">Rolls: {rolls}</h4>
    }

    // Clear high score from local storage
    function resetScore() {
        props.setHighScore({fastestTime: 0, leastRolls: 0, wins: 0, losses: 0})
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
            <h2 className="score-title">High Scores</h2>
            <div className="scores">
                {displayTime(props.highScore.fastestTime)}
                {displayRolls(props.highScore.leastRolls)}
            </div>
            <br />
            <h2 className="score-title">Timed Score</h2>
            <div className="scores">
                <h4 className="wins">Wins: {props.highScore.wins}</h4>
                <h4 className="losses">Losses: {props.highScore.losses}</h4>
            </div>
            <button className="scores-reset" onClick={resetScore}>Reset Scores</button>
        </div>
    )
}