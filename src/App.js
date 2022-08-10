import React from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import { StatusContext } from "./Helper/Context";

export default function App(){
    const [beginGameState, setBeginGameState] = React.useState(false)
    const [difficulty, setDifficulty] = React.useState('Any Difficulty')
    const [category, setCategory] = React.useState('Any Category')

    function handleClick(){
        setBeginGameState(true)
     }


    return (
        <StatusContext.Provider value={{ difficulty: [difficulty, setDifficulty], category: [category, setCategory]}}>
            {!beginGameState && <StartScreen handleClick={handleClick}/>}
            {beginGameState && <GameScreen/>}
        </StatusContext.Provider>
    )
}