import React from "react";
import { StatusContext } from "../Helper/Context";

export default function StartScreen(props){
    const {difficulty, category} = React.useContext(StatusContext)
    const [difficultyValue ,setDifficultyValue] = difficulty
    const [categoryValue ,setCategoryValue] = category


    function handleDifficultyChange(e){
        const {value} = e.target
        setDifficultyValue(prev => {
            return value
        })
    }

    function handleCategoryChange(e){
        const {value} = e.target
        setCategoryValue(prev => {
            return value
        })
    }

    return (
        <div className="start-screen-container">
            <h1 className="quizzical">Quizzical</h1>
            <p className="game-description">Quizzical is a fun trivia game that test your knowledge!</p>
            <div className="button-select-container">
                <button onClick={props.handleClick} className="start-quiz-button">Start Quiz</button>
                
                <p className="difficulty-selector">Difficulty:</p>
                <select className="difficulty-dropdown" value={difficultyValue} onChange={handleDifficultyChange} name="difficulty">
                    <option value="Any Difficulty">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <p className="category-selector">Category:</p>
                <select className="category-dropdown" value={categoryValue} onChange={handleCategoryChange} name="category">
                    <option value="Any Category">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16s">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>
            </div>
        </div>
    )
}