import React from "react"

export default function settings(props) {


    const challengeOn = props.timeChallenge.challenge

    // Converting centiseconds, seconds and minutes for time challenge display
    let cs = props.timeChallenge.timer % 100
    let sec = Math.floor(props.timeChallenge.timer / 100) % 60
    let min = Math.floor((props.timeChallenge.timer / 100) / 60)

    let csDisplay = cs < 10 ? `0${cs}` : cs
    let secDisplay = sec < 10 ? `0${sec}` : sec
    let minDisplay = min < 10 ? `0${min}` : min

    return (
        <div className="settings-container">
            <h2 className="settings-title">Game Settings</h2>
            <div className="settings">
                <div className="settings-setting">

                    {/* Time challenge on/off buttons */}
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

                {/* If time challenge is set to on, display the timer and buttons */}
                {props.timeChallenge.challenge &&
                    <div className="settings-setting">
                    <h4 className="settings-challenge-timer">Timer: {minDisplay}:{secDisplay}:{csDisplay}</h4>
                        <div>
                            <button
                                className="settings-button-red"
                                onClick={() => props.decrementChallengeTimer()}
                                >
                                    -
                                </button>
                            <button
                                className="settings-button-green"
                                onClick={() => props.incrementChallengeTimer()}
                            >
                                +
                            </button>
                        </div>
                </div>
                }

                {/* Number of dice text & buttons */}
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