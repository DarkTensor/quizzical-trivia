import React from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

export default function App(){
    const [beginGameState, setBeginGameState] = React.useState(false)

    function handleClick(){
        setBeginGameState(true)
     }


    return (
        <>
            {!beginGameState && <StartScreen handleClick={handleClick}/>}
            {beginGameState && <GameScreen/>}
        </>
    )
}