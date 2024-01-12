import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Hotels from "./components/Hotels/Hotels";
import Hotel from "./components/Hotel/Hotel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route exact path="/" element={<Home/>}/>
     <Route exact path="/hotels" element={<Hotels/>}/>
     <Route exact path="/hotels/:id" element={<Hotel/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
