import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import Room from "../components/Room";
import Login from "../components/Login";
import Register from "../components/Register";
import Chaterio from "../components/Chaterio";

const Main = () => {


    return (

        <Router>
            <Routes>
                <Route path = "/" element={<Home/>} />
                <Route path = "/chaterio" element={<Chaterio/>} />
                <Route path = "/room" element={<Room/>} />
                <Route path = "/login" element={<Login/>} />
                <Route path = "/register" element={<Register/>} />
            </Routes>
        </Router>
    )
}


export default Main;