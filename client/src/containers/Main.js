import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import VideoCall from "../components/VideoCall";
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
                <Route path = "/videocall/:roomId" element={<VideoCall peer={peer} />} />
            </Routes>
        </Router>
    )
}

export default Main;