import React from "react";
import Question from "./Question";

export default function GameScreen(){
    const [questionList, setQuestionList] = React.useState()

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {
            setQuestionList(data.results)
        })
    },[])

    if (questionList !== undefined)
    {
        console.log(questionList[0].question)
    }

    return (
        <div className="game-screen-container">
            <Question 
            
            />
        </div>
    )
}