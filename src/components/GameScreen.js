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
            setQuestionList((data.results).map(ele => {
                return {question:decodeHtml(ele.question),
                        choices:shuffleArray([
                        {text:decodeHtml(ele.correct_answer),selected:false},
                        {text:decodeHtml(ele.incorrect_answers[0]),selected:false},
                        {text:decodeHtml(ele.incorrect_answers[1]),selected:false},
                        {text:decodeHtml(ele.incorrect_answers[2]),selected:false}])}
            }))
        })
    },[playAnother])

    

    // This function decodes HTML encoding
    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }    

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }


    let questionElements = []
    if (questionList !== undefined) {
        questionList.map(ele => {
                questionElements.push(
                <Question
                    key={nanoid()}
                    question={ele.question} 
                    answerChoices={ele.choices}
                    toggleSelected={toggleSelected}
                    id={nanoid()}
                />)       
        })   
    }

    function toggleSelected(e, question){
        setQuestionList(oldVals => {
            return oldVals.map(ele => {
                return ele.question === question && ele.choices.map(bool => bool.selected = false) ? {...ele,choices:ele.choices.map(val => {
                    return val.text === e.target.innerHTML ? {...val, selected:!val.selected} : val
                })} : ele
            })
        })
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