import React from "react"

export default function settings() {

    return (
        <div className="settings-container">
            <h2 className="settings-title">Game Settings</h2>
            <div className="settings">
                <div className="settings-setting">
                    <h4>Time Challenge:</h4>
                    <div>
                        <button className="settings-button-red">OFF</button>
                        <button className="settings-button-green unselected">ON</button>
                    </div>
                </div>
                <div className="settings-setting">
                    <h4>Dice Number:</h4>
                    <div>
                        <button className="settings-button-red">-</button>
                        <button className="settings-button-green">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}