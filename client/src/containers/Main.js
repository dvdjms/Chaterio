import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import Room from "../components/Room";
import Login from "../components/Login";
import Register from "../components/Register";
import Chaterio from "../components/Chaterio";
import VideoCall from "../components/VideoCall";

// import { SocketProvider } from '../providers/Socket';
// import { PeerProvider } from '../providers/Peer'; 

const Main = () => {


    return (
        // <SocketProvider>
        //     <PeerProvider>
                <Router>
                    <Routes>
                        <Route path = "/" element={<Home/>} />
                        <Route path = "/chaterio" element={<Chaterio/>} />
                        <Route path = "/room" element={<Room/>} />
                        <Route path = "/login" element={<Login/>} />
                        <Route path = "/register" element={<Register/>} />
                        <Route path = "/videocall/:roomId" element={<VideoCall/>} />
                        {/* <Route path="/videocall/" render={(routeProps) => (
        <VideoCall id={routeProps.location.state.id} />
      )} /> */}

                    </Routes>
                </Router>
    //     </PeerProvider>
    // </SocketProvider>
    )
}

export default Main;