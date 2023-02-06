import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import Room from "../components/Room";

const Main = () => {

    return (

        <>
            <Router>
                <Routes>
                    <Route path = "/" element={<Home/>} />
                    <Route path = "/room" element={<Room/>} />
                </Routes>
            </Router>
        </>
    )

}

export default Main;