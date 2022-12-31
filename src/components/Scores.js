import React from "react"

export default function Scores(props) {

    // Get milliseconds, seconds and minutes from props.time
    let ms = props.time % 100
    let sec = Math.floor(props.time / 100) % 60
    let min = Math.floor((props.time / 100) / 60)

    // Display double digits with 0 at start if time is single digit
    let msDisplay = ms < 10 ? `0${ms}` : ms
    let secDisplay = sec < 10 ? `0${sec}` : sec
    let minDisplay = min < 10 ? `0${min}` : min

    let leastMs = props.highScore.fastestTime % 100
    let leastSec = Math.floor(props.highScore.fastestTime / 100) % 60
    let leastMin = Math.floor((props.highScore.fastestTime / 100) / 60)
    
    let leastMsDisplay = leastMs < 10 ? `0${leastMs}` : leastMs
    let leastSecDisplay = leastSec < 10 ? `0${leastSec}` : leastSec
    let leastMinDisplay = leastMin < 10 ? `0${leastMin}` : leastMin

    return (
        <div className="score-container">
            <h2 className="score-title">Current Game</h2>
            <div className="scores">
                {
                    min < 60
                    ? <h4 className="timer">Time: {minDisplay}:{secDisplay}:{msDisplay}</h4>
                    : <h4 className="timer">Time: &gt;1 hour</h4>
                }
                <h4 className="rolls">Rolls: {props.rolls}</h4>
            </div>
            <br />
            <h2 className="score-title">High Scores</h2>
            <div className="scores">
                <h4 className="timer">Time: {leastMinDisplay}:{leastSecDisplay}:{leastMsDisplay}</h4>
                <h4 className="rolls">Rolls: {props.highScore.leastRolls}</h4>
            </div>
            <br />
            <h2 className="score-title">Timed Score</h2>
            <div className="scores">
                <h4 className="wins">Wins: 0</h4>
                <h4 className="losses">Losses: 0</h4>
            </div>
        </div>
    )
}