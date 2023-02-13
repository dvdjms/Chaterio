import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import ReactPlayer from 'react-player'
import Peer from 'peerjs';
import { useParams  } from 'react-router-dom';
import "./Chaterio.css";
// import styled from "styled-components";
import io from "socket.io-client";
// import Peer from "simple-peer";
import styled from "styled-components";
import AssignmentIcon from '@mui/icons-material/Assignment';
import "./Chaterio.css"


const socket = io.connect("http://localhost:9000");

const VideoCall = () => {

  const [stream, setStream] = useState(null);
  // const [peers, setPeers] = useState({});
  const [userId, setUserId] = useState(null);
  const peers = {};

  const videoGridRef = useRef(null);
  const myVideo = React.useRef();

  const { roomId } = useParams();

  console.log("This is a print from useParams in videocall page ", roomId);


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
        socket.emit("join-room", roomId, 989);
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
    <>
      <OuterContainer>
      <Header><AlinkHeader href="/">Chaterio</AlinkHeader></Header>
      <Container>
          <CopyToClipboard text={roomId} style={{ marginBottom: ".5rem" }}>
              <Button variant="contained" color="primary" starIcon={<AssignmentIcon fontSize="large" />}>
                  Copy Room Id
              </Button>
          </CopyToClipboard>
        </Container>
    <div>
       <div id="video-grid" ref={videoGridRef} />
      {stream && <video playsInline muted ref={myVideo} autoPlay width={500} height={500} />}
    </div>
   
        <SectionOuterButtons>
            <SectionInnerButtons>

                <a href="/"><RoomButton>Leave Room</RoomButton></a>
                <a href="/room"><RoomButton>Join Room</RoomButton></a>

            </SectionInnerButtons>
        </SectionOuterButtons>
      </OuterContainer>
    </>
  );
};


const SectionInnerButtons = styled.section`
    width: 90%;
    margin: auto;
`;

const SectionOuterButtons = styled.section`
    margin-top: 15vh;
    height: 9vh;
    text-align: center;
`;

const RoomButton = styled.button`
    background-color: #10C2C9;
    border: none;
    border-radius: 2vw;
    height: 8vh;
    width: 37vw;
    margin-left: 3vw;
    margin-right: 3vw;
    font-size: 18px;
    font-weight: 600;
    color: white;
`;

const Container = styled.div`
	/* display: grid; */
	grid-template-columns: 7fr 3fr;
    height: 10vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    border: solid red;
    height: 30px;
    width: 206px;
`;

const Header = styled.h1`
    color:  #d9005a;
    margin-top: 0;
    font-size: 17px;
    padding-top: 2vh;
    text-align: center;
    text-decoration: none;
`;
const AlinkHeader = styled.a`
    color:  #d9005a;
    text-decoration: none;
`;

const OuterContainer = styled.div`
    background-color: #252934;
    min-height: 100vh;
`;



export default VideoCall;