import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import { StatusContext } from "../Helper/Context";


export default function GameScreen(props){
    const [questionList, setQuestionList] = React.useState()
    const [check, setCheck] = React.useState([{bool:false},{num:0}])
    const [playAnother, setPlayAnother] = React.useState(false)
    const {difficulty, category} = React.useContext(StatusContext)
    const [difficultyValue] = difficulty
    const [categoryValue] = category

    let BaseURL = ""

    if (difficultyValue === "Any Difficulty" && categoryValue === "Any Category"){
      BaseURL = "https://opentdb.com/api.php?amount=5"
    }
    else if (difficultyValue !== "Any Difficulty" && categoryValue === "Any Category"){
      BaseURL = `https://opentdb.com/api.php?amount=5&difficulty=${difficultyValue}`
    }
    else if (difficultyValue === "Any Difficulty" && categoryValue !== "Any Category"){
      BaseURL = `https://opentdb.com/api.php?amount=5&category=${categoryValue}`
    }
    else if (difficultyValue !== "Any Difficulty" && categoryValue !== "Any Category"){
      BaseURL = `https://opentdb.com/api.php?amount=5&category=${categoryValue}&difficulty=${difficultyValue}`
    }


    React.useEffect(() => {
        fetch(BaseURL)
        .then(res => res.json())
        .then(data => {
            setQuestionList((data.results).map(ele => {
                return {question:decodeHtml(ele.question),
                        choices:shuffleArray([
                        {text:decodeHtml(ele.correct_answer),selected:false},
                        {text:decodeHtml(ele.incorrect_answers[0]),selected:false},
                        {text:decodeHtml(ele.incorrect_answers[1]),selected:false},
                        {text:decodeHtml(ele.incorrect_answers[2]),selected:false}]),
                        correct:decodeHtml(ele.correct_answer)}
            }))
        })
    },[playAnother]) // eslint-disable-line react-hooks/exhaustive-deps

    

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
          return questionElements.push(
                <Question
                    key={nanoid()}
                    question={ele.question} 
                    answerChoices={ele.choices}
                    toggleSelected={toggleSelected}
                    checkOn={check[0].bool}
                    correct={ele.correct}
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
        setCheck(old => {
            return [{bool:!old[0].bool},{...old[1]}]
        })
    }

    function checkOn(){
        setCheck(old => {
            return [{bool:!old[0].bool},{num:checkCorrect()}]
        })
    }

    function checkCorrect(){
        let correct = 0
        for (let i = 0; i < questionList.length; i++) {
            const element = questionList[i]
            for (let i = 0; i < element.choices.length; i++) {
                const choices = element.choices[i]
                if (choices.selected && choices.text === element.correct) {
                    correct++
                }
            }
        }
        return correct
    }

    return (
        <div className="game-screen-container">
            {questionElements}
            {!check[0].bool && <button onClick={checkOn} className="check-answer-button">Check Answers</button>}
            {check[0].bool && <div className="check-container"><p className="number-of-correct-text">You scored {check[1].num}/5 correct answers</p><button onClick={playAgain} className="play-again-button">Play Again</button></div>}
        </div>
    )
}