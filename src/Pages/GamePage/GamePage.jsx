import TikTakToe from "./TikTakToe";
import MillionaireGame from "../../Components/MillionaireGame/MillionaireGame";


import React from "react";



function GamePage() {
    return <div className="GamePage">
        <h1 className="TikTakToe__h1">Tik Tak Toe</h1>
        <TikTakToe/>
        <h1 className="TikTakToe__h1">Millionaire</h1>
        <MillionaireGame/>
    </div>
}



export default GamePage