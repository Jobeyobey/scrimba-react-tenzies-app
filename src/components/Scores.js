import React from "react"

export default function Scores(props) {

    // Get centiseconds, seconds and minutes from props.time
    let cs = props.time % 100
    let sec = Math.floor(props.time / 100) % 60
    let min = Math.floor((props.time / 100) / 60)

    // Display double digits with 0 at start if time is single digit
    let csDisplay = cs < 10 ? `0${cs}` : cs
    let secDisplay = sec < 10 ? `0${sec}` : sec
    let minDisplay = min < 10 ? `0${min}` : min

    // Get centiseconds, seconds and minutes for high score stats
    let leastMs = props.highScore.fastestTime % 100
    let leastSec = Math.floor(props.highScore.fastestTime / 100) % 60
    let leastMin = Math.floor((props.highScore.fastestTime / 100) / 60)
    
    let leastMsDisplay = leastMs < 10 ? `0${leastMs}` : leastMs
    let leastSecDisplay = leastSec < 10 ? `0${leastSec}` : leastSec
    let leastMinDisplay = leastMin < 10 ? `0${leastMin}` : leastMin

    // Timer for if challenge is on. Substracts timer from challenge time to create countdown
    let challengeTime = props.timeChallenge.timer - props.time;

    let challengeCs = challengeTime % 100
    let challengeSec = Math.floor(challengeTime / 100) % 60
    let challengeMin = Math.floor((challengeTime / 100) / 60)

    let challengeDisplayCs = challengeCs < 10 ? `0${challengeCs}` : challengeCs
    let challengeDisplaySec = challengeSec < 10 ? `0${challengeSec}` : challengeSec
    let challengeDisplayMin = challengeMin < 10 ? `0${challengeMin}` : challengeMin

    // If timechallenge is on, display countdown style. Otherwise, display stopwatch style
    let timer = null

    if(!props.timeChallenge.challenge) {
        min < 60
        ? timer = <h4 className="timer">Time: {minDisplay}:{secDisplay}:{csDisplay}</h4>
        : timer = <h4 className="timer">Time: &gt;1 hour</h4>
    } else {
        timer = <h4 className="timer">Time: {challengeDisplayMin}:{challengeDisplaySec}:{challengeDisplayCs}</h4>
    }

    return (
        <div className="score-container">
            <h2 className="score-title">Current Game</h2>
            <div className="scores">
                {timer}
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