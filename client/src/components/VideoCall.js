import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { Peer } from 'peerjs';
import { useParams  } from 'react-router';
import "./Chaterio.css";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io.connect("http://localhost:9000");

const VideoCall = ({ peer }) => {

  const [localStream, setLocalStream] = useState(null);
  const [peers, setPeers] = useState({})
  const videoGridRef = useRef(null);
  const myVideo = useRef();
  const { roomId } = useParams();


  useEffect(() => {  

    console.log("useEffect started...")

    peer.on("open", (id) => {
      socket.emit("join-room", roomId, id);
    });
  
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
      .then((localStream) => {
        setLocalStream(localStream);
        if (myVideo.current) {
          myVideo.current.srcObject = localStream
          myVideo.current.muted = true
        };

        // receive calls by listening to the on call event
        peer.on('call', call => {
          call.answer(localStream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
            call.answer(userVideoStream);
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userID) => {
          connectToNewUser(userID, localStream)
        });

        socket.on("user-disconnected", (userId) => {
          console.log("CLIENT: user-disconnected", userId)
          if (peers[userId]) peers[userId].close();
        });
        console.log("peers 1", peers);


      })
      .catch((error) => {
        console.error("Error getting user media: ", error)
      })
  }, [peers]);


  const connectToNewUser = (userId, stream) => {
    // can make calls when new users connect to our room
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    console.log("CLIENT: user-connected", userId)
    call.on('stream', remoteStream => {
       addVideoStream(video, remoteStream);
    })
    call.on('close', () => {
      video.remove();
    })
    setPeers(prevPeers => ({ ...prevPeers, [userId]: call }))
    console.log("peers 2 ", peers)
  };


  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();  
    });
    if (videoGridRef.current) {
      videoGridRef.current.appendChild(video);
    }
  };



  return (
    <>
      <OuterContainer>
        <Header><AlinkHeader href="/">Chaterio</AlinkHeader></Header>
          <Container>
            <CopyToClipboard text={roomId} style={{ marginBottom: ".5rem" }}>
                <Button variant="contained" color="primary" >
                    Copy Room Id
                </Button>
            </CopyToClipboard>
          </Container>
          <VideoContainer>
            <VideoDrag >
              {localStream && <video id="myVideo" draggable="true" playsInline muted ref={myVideo} autoPlay width={500} height={500} />}
            </VideoDrag>
              <div id="video-grid" ref={videoGridRef} />
          </VideoContainer>
        
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


const VideoDrag = styled.div`
	z-index: 4;
	width: 200px;
	position: absolute;
  margin-left: 1vw;
`;

const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
  justify-content: center;
  z-index: 1;
`;


const SectionInnerButtons = styled.section`
    width: 90%;
    margin: auto;
`;

const SectionOuterButtons = styled.section`
    padding-bottom: 3vh;
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
	  /* grid-template-columns: 7fr 3fr; */
    height: 10vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    position: absolute;
`;

const Button = styled.button`
    border: solid red;
    height: 30px;
    width: 206px;
`;

const Header = styled.h1`
    color:  #d9005a;
    margin-top: 0;
    font-size: 23px;
    padding-top: 2vh;
    text-align: center;
    text-decoration: none;
    position: relative;
`;
const AlinkHeader = styled.a`
    color:  #d9005a;
    text-decoration: none;
`;

const OuterContainer = styled.div`
    background-color: #252934;
    min-height: 100vh;
    z-index: -2;
`;



export default VideoCall;