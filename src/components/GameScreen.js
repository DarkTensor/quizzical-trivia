import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function GameScreen(){
    const [questionList, setQuestionList] = React.useState()
    const [check, setCheck] = React.useState(false)
    const [playAnother, setPlayAnother] = React.useState(false)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {
            setQuestionList(data.results)
        })
    },[playAnother])

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

    let numberOfCorrect = 0

    function checkAnswers(){
        
    }

    function playAgain(){
        setPlayAnother(old => !old)
        setCheck(old => !old)
    }

    function checkOn(){
        setCheck(old => !old)
    }

    return (
        <div className="game-screen-container">
            {questionElements}
            {!check && <button onClick={checkOn} className="check-answer-button">Check Answers</button>}
            {check && <div className="check-container"><p className="number-of-correct-text">You scored {3}/5 correct answers</p><button onClick={playAgain} className="play-again-button">Play Again</button></div>}
        </div>
    )
}