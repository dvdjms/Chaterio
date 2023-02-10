import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import Room from "../components/Room";
import Login from "../components/Login";
import Register from "../components/Register";
import Chaterio from "../components/Chaterio";
import TestRoom from "../components/TestRoom";
import VideoCall from "../components/VideoCall";

const Main = () => {

    return (

        <Router>
            <Routes>
                <Route path = "/" element={<Home/>} />
                <Route path = "/chaterio" element={<Chaterio/>} />
                <Route path = "/room" element={<Room/>} />
                <Route path = "/login" element={<Login/>} />
                <Route path = "/register" element={<Register/>} />
                <Route path = "/testroom/:id" element={<TestRoom/>} />
                <Route path = "/videocall" element={<VideoCall/>} />
            </Routes>
        </Router>
    )
}


export default Main;