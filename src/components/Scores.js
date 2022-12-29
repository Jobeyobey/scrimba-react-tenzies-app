import React from "react"

export default function Scores(props) {

    return (
        <div className="score-container">
            <h2 className="score-title">Current Game</h2>
            <div className="scores">
                <h4 className="timer">Time: 00:00</h4>
                <h4 className="rolls">Rolls: {props.scores.rolls}</h4>
            </div>
        </div>
    )
}