import './App.css';
import React, { useState } from "react";
import Header from "./Components/Header/Header";
import SideBar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home/Home'
import ControlPanel from './Components/ControlPanel/ControlPanel'
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer'
import GamePage from './Pages/GamePage/GamePage'
// import PageUp from './Components/PageUp/PageUp';
import ScrollButton from './Components/ScrollButton/ScrollButton';
import StaredNote from './Pages/StaredNote/StaredNote';
import NoteEditor from './Pages/NoteEditor/NoteEditor';
import AgeCalculator from './Components/AgeCalculator/AgeCalculator';


function App() {
  const [right, setRight] = useState(-100);
  const [SearchPhones, setSearchPhones] = useState("none");

  function openSearchPhone() {
    setSearchPhones("flex");
  }

  function CloseSearchPhone() {
    setSearchPhones("none");
  }

  function openSidebar() {
    setRight(0);
  }

  function closeSidebar() {
    setRight(-100);
  }
  return (
    <div className="App">
        <Header 
          openSide={openSidebar} 
          openearch={openSearchPhone} 
        />
         <SideBar 
          rightValue={right}
          closeSide={closeSidebar}
        />

         <ControlPanel/>
         <ScrollButton/>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/Save" element={<StaredNote />} />
          <Route path="/Note" element={<NoteEditor />} />
          <Route path="/GamePage" element={<GamePage />} />
          <Route path="/AgeCalculator" element={<AgeCalculator />} />
        </Routes> 

    <Footer/>
    </div>
  );
}

export default App;
