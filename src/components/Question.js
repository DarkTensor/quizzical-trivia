import React from "react";
import { nanoid } from "nanoid";

export default function Question(props){

    const [choices, setChoices] = React.useState([{text:props.answerChoices[0],selected:false},
                                                  {text:props.answerChoices[1],selected:false},
                                                  {text:props.answerChoices[2],selected:false},
                                                  {text:props.answerChoices[3],selected:false}])
    
   

    function toggleSelected(text){
        setChoices(oldValues => {
            return oldValues.map(val => {
                return (val.text === text ? 
                        {text:val.text, 
                         selected:!val.selected, 
                        } : 
                        val)
            })
        })
    }

    console.log(choices)
    

    let buttonContainer = []

    choices.map(ele => {
        return buttonContainer.push(<button onClick={() => toggleSelected(ele.text)} key={nanoid()} className={!ele.selected ? 'choice' : 'selected-answer'}>{ele.text}</button>)
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