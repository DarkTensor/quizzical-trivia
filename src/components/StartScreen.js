import React from "react";

export default function StartScreen(props){
    return (
        <div className="start-screen-container">
            <h1 className="quizzical">Quizzical</h1>
            <p className="game-description">Quizzical is a fun trivia game that test your knowledge!</p>
            <button onClick={props.handleClick} className="start-quiz-button">Start Quiz</button>
        </div>
    )
}