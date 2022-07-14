import React from "react";
import { nanoid } from "nanoid";

export default function Question(props){

    const [choices, setChoices] = React.useState([{text:props.correctAnswer,selected:false},
                                                  {text:props.incorrectAnswers[0],selected:false},
                                                  {text:props.incorrectAnswers[1],selected:false},
                                                  {text:props.incorrectAnswers[2],selected:false}])
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function toggleSelected(text){
        setChoices(oldValues => {
            return oldValues.map(val => {
                return (val.text === text ? 
                        {...val, selected:!val.selected} : 
                        val)
            })
        })
    }

    React.useEffect(() => {
        shuffleArray(choices)
    },[])

    console.log(choices)
    

    let buttonContainer = []

    choices.map(ele => {
        return buttonContainer.push(<button onClick={() => toggleSelected(ele.text)} key={nanoid()} className="choice">{ele.text}</button>)
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