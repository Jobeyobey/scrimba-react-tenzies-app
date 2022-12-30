import React from "react"

export default function Scores(props) {

    return (
        <div className="score-container">
            <h2 className="score-title">Current Game</h2>
            <div className="scores">
                <h4 className="timer">Time: 00:00:00</h4>
                <h4 className="rolls">Rolls: {props.scores.rolls}</h4>
            </div>
            <br />
            <h2 className="score-title">High Scores</h2>
            <div className="scores">
                <h4 className="timer">Time: 00:00:00</h4>
                <h4 className="rolls">Rolls: 0</h4>
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