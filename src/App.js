import React from "react";
import "./App.css";
import RutInput from "./challenge1/RutInput";

function App() {
    return (
        <div className="App">
            <div className="challenge1">
                <div>Challenge 1: Format rut when user is writting</div>
                <RutInput />
            </div>
        </div>
    );
}

export default App;
