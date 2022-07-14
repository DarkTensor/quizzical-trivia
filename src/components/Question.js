import React from "react";

export default function Question(props){

    let choices = []
    choices.push(props.correctAnswer)
    choices.push(props.incorrectAnswers)

    return (
        <div className="question-container">
            <h1 className="question">{props.question}</h1>
            <div className="choice-containers">
               <button className="choice"></button>
               <button className="choice"></button>
               <button className="choice"></button>
               <button className="choice"></button>
               <p>{props.correctAnswer}</p>
               <p>{props.incorrectAnswers}</p>
            </div>
        </div>
    )
}