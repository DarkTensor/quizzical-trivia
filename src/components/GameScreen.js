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

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    // This function decodes HTML encoding
    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }    

    let questionElements = []

    if (questionList !== undefined) {
        questionList.map(ele => {
                let choices = [ele.correct_answer, ...ele.incorrect_answers]
                shuffleArray(choices)
                questionElements.push(
                <Question
                    key={nanoid()}
                    question={decodeHtml(ele.question)} 
                    answerChoices={choices}
                />)
            
        })   
    }


    return (
        <div className="game-screen-container">
            {questionElements}
            <button className="check-answer-button">Check Answers</button>
        </div>
    )
}