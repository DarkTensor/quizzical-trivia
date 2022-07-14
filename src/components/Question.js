import React from "react";
import { nanoid } from "nanoid";

export default function Question(props){

    let choices = [props.correctAnswer, ...props.incorrectAnswers]
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    shuffleArray(choices)    

    let buttonContainer = []

    choices.map(ele => {
        buttonContainer.push(<button key={nanoid()} className="choice">{ele}</button>)
    })

    return (
        <div className="question-container">
            <h1 className="question">{props.question}</h1>
            <div className="choice-containers">
               {buttonContainer}
            </div>
        </div>
    )
}