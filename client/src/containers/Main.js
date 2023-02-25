import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import Room from "../components/Room";
import Login from "../components/Login";
import Register from "../components/Register";
// import Chaterio from "../components/Chaterio";
import VideoCall from "../components/VideoCall";
import VideoCallAgain from "../components/VideoCallAgain";
import { Peer } from 'peerjs';


const peer = new Peer(undefined, {
    host: '/', 
    port: 9001,
});

const Main = () => {


    return (
        <Router>
            <Routes>
                <Route path = "/" element={<Home/>} />
                {/* <Route path = "/chaterio" element={<Chaterio/>} /> */}
                <Route path = "/room/:roomId" element={<Room/>} />
                <Route path = "/login" element={<Login/>} />
                <Route path = "/register" element={<Register/>} />
                <Route path = "/videocall/:roomId" element={<VideoCall peer={peer} />} />
                <Route path = "/videocallagain/:roomId" element={<VideoCallAgain/>}/>
            </Routes>
        </Router>
    )
}

export default Main;