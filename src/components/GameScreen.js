import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function GameScreen(){
    const [questionList, setQuestionList] = React.useState()

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {
            setQuestionList(data.results)
        })
    },[])

    // This function decodes HTML encoding
    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }    

    let questionElements = []

    if (questionList !== undefined) {
        questionList.map(ele => {
            questionElements.push(
                <Question
                    key={nanoid()}
                    question={decodeHtml(ele.question)} 
                    correctAnswer={decodeHtml(ele.correct_answer)}
                    incorrectAnswers={(ele.incorrect_answers)}
                />
            )
        })   
    }

    return (
        <div className="game-screen-container">
            {questionElements}
            <button className="check-answer-button">Check Answers</button>
        </div>
    )
}