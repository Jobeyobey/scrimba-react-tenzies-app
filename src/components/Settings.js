import React from "react"

export default function settings(props) {

    const challengeOn = props.timeChallenge.challenge

    return (
        <div className="settings-container">
            <h2 className="settings-title">Game Settings</h2>
            <div className="settings">
                <div className="settings-setting">
                    <h4>Time Challenge:</h4>
                    <div>
                        <button
                            className={`settings-button-red ${challengeOn ? "unselected" : ""}`}
                            onClick={() => props.toggleChallenge("off")}
                        >
                            OFF
                        </button>
                        <button
                            className={`settings-button-green ${challengeOn ? "" : "unselected"}`}
                            onClick={() => props.toggleChallenge("on")}
                            >
                                ON
                            </button>
                    </div>
                </div>
                {props.timeChallenge.challenge &&
                    <div className="settings-setting">
                    <h4 className="settings-challenge-timer">Timer: 0</h4>
                        <div>
                            <button className="settings-button-red">-</button>
                            <button className="settings-button-green">+</button>
                        </div>
                </div>
                }
                <div className="settings-setting">
                    <h4>Dice Number: {props.numDice}</h4>
                    <div>
                        <button className="settings-button-red" onClick={props.decrementNumDice}>-</button>
                        <button className="settings-button-green" onClick={props.incrementNumDice}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}