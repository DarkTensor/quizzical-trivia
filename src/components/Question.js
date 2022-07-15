import React from "react";
import { nanoid } from "nanoid";

export default function Question(props){

    let buttonContainer = []

    props.answerChoices.map(ele => {
        return (ele.text !== 'undefined' && buttonContainer.push(<button key={nanoid()} onClick={(e) => props.toggleSelected(e, props.question)} className={!props.chechOn && ele.selected ? 'selected-answer' : props.checkOn && props.correct === ele.text ? 'correct-answer' : 'choice'}>{ele.text}</button>))
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