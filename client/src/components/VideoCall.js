import React, { useState, useEffect, useRef } from "react";
// import ReactPlayer from 'react-player'
import Peer from 'peerjs';

import "./Chaterio.css";
// import styled from "styled-components";
import io from "socket.io-client";
// import Peer from "simple-peer";


const socket = io.connect("http://localhost:9000");

const VideoCall = () => {

  const [stream, setStream] = useState(null);
  // const [peers, setPeers] = useState({});
  const [userId, setUserId] = useState(null);
  const peers = {};

  const videoGridRef = useRef(null);
  const myVideo = React.useRef();


  useEffect(() => {  
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
      .then((stream) => {
        setStream(stream)
        if (myVideo.current) {
          myVideo.current.srcObject = stream
        }
        socket.emit("join-room", "xxxx", 989);
        socket.on("user-connected", (userId) => {
          setUserId(userId)
          console.log("User connected " + userId)

          // need to run after connection only
          connectToNewUser(userId, stream)

          socket.on("user-disconnected", (userId) => {
            if (peers[userId]) peers[userId].close();
          });
        });
      });

  }, []);      

  // useEffect(() => {
  //   if (myPeer.current) {
  //     myPeer.current.on("call", (call) => {
  //       call.answer(stream);
  //       setVideo(document.createElement("video"));
  //       call.on('stream', userVideoStream => {
  //         addVideoStream(video, userVideoStream);
  //     })
  //     });
  //     myPeer.current.on("open", (userId) => {
  //       socket.emit("join-room", roomId, userId);
  //       setRoomId(roomId)
  //       // setUserId(userId)
  //     });
  //   }
  // }, [myPeer, stream]);
  


  const connectToNewUser = (userId, stream ) => {
      const video = document.createElement('video');
      // socket.on('stream', userVideoStream => {
        // const call = myPeer.call(userId, stream)
         addVideoStream(video, stream);
        //  peer[userId] = call
      // })
      //  socket.on('close', () => {
      //      video.remove();
      //  })   
      // setPeers((prevState) => ({ ...prevState, [userId]: call }));
  };
  
  const addVideoStream = (video, stream) => {
    // console.log("NEW STREAM: ", stream)
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGridRef.current.appendChild(video);
  };


  return (
    <div>
       <h1>Video Call with ID: {userId}</h1>
       <div id="video-grid" ref={videoGridRef} />
      {stream && <video playsInline muted ref={myVideo} autoPlay width={500} height={500} />}
    </div>
  );
};

export default VideoCall;