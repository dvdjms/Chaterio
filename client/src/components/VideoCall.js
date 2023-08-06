import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams  } from 'react-router';
import Draggable from 'react-draggable';
import "./Chaterio.css";
import io from "socket.io-client";
import styled from "styled-components";
import logo from "../static/images/chaterioLogo.png"
import picture from "../static/images/backgroundpicture.jpg"


const VideoCall = ({ peer }) => {

  const [localStream, setLocalStream] = useState(null);
  const [buttonText, setButtonText] = useState("Copy Room URL")
  const [peers, setPeers] = useState([]);
  const videoGridRef = useRef(null);
  const nodeRef = useRef(null);
  const myVideo = useRef();  
  const { roomId } = useParams();
  const peers1 = {};

  // const serverConnect = "https://60bf-92-1-199-163.ngrok-free.app";
  const serverConnect = "http://localhost:9000";

  useEffect(() => {

    const socket = io.connect(`${serverConnect}`);

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
          call.on('stream', remoteStream => {
            addVideoStream(video, remoteStream);
          });
        });

        socket.on("user-connected", (userID) => {
          // send local stream to new user
          connectToNewUser(userID, localStream)
          console.log("CLIENT: user-connected", userID)
        });

        socket.on("user-disconnected", (userId) => {
          console.log("CLIENT: user-disconnected", userId)
          // query below - this should close the video!
          if (peers1[userId]) peers1[userId].close();
          deleteUser(userId)
        });
      })
      .catch((error) => {
        console.error("Error getting user media: ", error)
      })

      return () => {
        socket.close();
      };
      // eslint-disable-next-line
  },[]);


  const connectToNewUser = (userId, stream) => {
    // send local video stream to remote user
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    // receive remote video stream
    call.on('stream', remoteStream => {
       addVideoStream(video, remoteStream);
    })
    call.on('close', () => {
      video.remove();
    })
    peers1[userId] = call
    setPeers(prevPeers => ({ ...prevPeers, [userId]: call }))
  };


  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();  
    });
      videoGridRef.current.appendChild(video);
  };


  const deleteUser = (userId) => {
    const filteredItems = peers.filter((key) => key !== userId);
    setPeers(filteredItems);
  };

  const handleChangeText = () => {
    setButtonText("Copied to clipboard");
    setTimeout(() => setButtonText("Copy Room URL"), [2000])
  };


  const handleCamera = () => {
    // query
  }



  return (
    <>
      <OuterContainer>
      <Image alt="people talking on laptop" draggable="false" src={picture}></Image>

        <Header>
            <Logo alt="Chaterio logo" draggable="false" src={logo} ></Logo>
        </Header>

        <InnerContainer>
          <CopyToClipboardContainer>
            <CopyToClipboard text={`${serverConnect}/videocall/${roomId}`} style={{ marginBottom: ".5rem" }}>
                <CopyToClipboardButton variant="contained" color="primary" onClick={handleChangeText}>
                    {buttonText}
                </CopyToClipboardButton>
            </CopyToClipboard>
          </CopyToClipboardContainer>
        </InnerContainer>

          <VideoContainer >
            <Draggable nodeRef={nodeRef}>
              <VideoDrag ref={nodeRef}>
                {localStream && <video id="myVideo" playsInline muted ref={myVideo} autoPlay width={500} height={500} />}
      
                {/* <UserName>{nameToShowOnVideo}</UserName> */}
              </VideoDrag>
            </Draggable>
              <div id="video-grid" ref={videoGridRef} />
          </VideoContainer>
  
          <SectionOuterButtons>
              <SectionInnerButtons>
                  <a href="/"><RoomButton>Leave Room</RoomButton></a>
                 <RoomButton onClick={handleCamera}>Change Room</RoomButton>
              </SectionInnerButtons>
          </SectionOuterButtons>
      </OuterContainer>
    </>
  );
};


const Logo = styled.img`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  display: block;
  justify-content: center;
  width: 140px;
  z-index: 1;
`;

const VideoDrag = styled.div`
	z-index: 2;
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
    border-radius: .5vw;
    height: 8vh;
    width: 37vw;
    margin-left: 3vw;
    margin-right: 3vw;
    font-size: 18px;
    font-weight: 600;
    color: white;
    @media (min-width: 676px) {
      width: 27vw;
    }
`;

const CopyToClipboardContainer = styled.div`
    height: vh;
    margin-top: 8vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    position: absolute;
`;

const CopyToClipboardButton = styled.button`
    border-radius: .5vw;
    border: solid #10C2C9;
    height: 25px;
    width: 130px;
    &:hover {
      background-color: #10C2C9;
      color: white;
    }
    &:active {
      background-color: black;
    }
`;

const Header = styled.h1`
    margin-top: 0;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 9vh;
    padding-top: 1vh;
    position: absolute;
`;

const InnerContainer = styled.div`
  padding-top: 3.5vh;
`;

const OuterContainer = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    background-color: #252934;
    position: absolute;
    z-index: -1;
`;

const Image = styled.img`
    filter: blur(4px) brightness(30%);
    height: 100vh;
    width: 100vw;
    z-index: -1;
    position: absolute;
`;


export default VideoCall;