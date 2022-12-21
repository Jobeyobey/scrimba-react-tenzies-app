import React from "react"
import Die from "./components/Die"

export default function App() {

    return (
        <main>
            <div className="dice-holder">
                <Die value={1} />
                <Die value={2} />
                <Die value={3} />
                <Die value={4} />
                <Die value={5} />
                <Die value={6} />
                <Die value={1} />
                <Die value={2} />
                <Die value={3} />
                <Die value={4} />
            </div>
        </main>
    )
}

/**
 * Challenge:
 * 
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components 
 *   to look like they do in the slide
 */