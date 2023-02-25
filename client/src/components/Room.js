import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { Peer } from 'peerjs';
import { useParams  } from 'react-router-dom';
import "./Chaterio.css";
import io from "socket.io-client";
import styled from "styled-components";

// const myPeer = new Peer(undefined, {
//   host: '/', 
//   port: '9001'
// })

const socket = io.connect("http://localhost:3000");


const Room = () => {

  const [stream, setStream] = useState(null);
  // const peers ={};
  const [video, setVideo] = useState()
 
  const videoGridRef = useRef(null);
  const myVideo = React.useRef();
  const userVideo = React.useRef();

  const { roomID } = useParams();
  // const { v4: uuidV4 } = require('uuid')
  // const userID = uuidV4();


  useEffect(() => {  

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
      .then((stream) => {
        setStream(stream);
        // addVideoStream(myVideo, stream)

        if (myVideo.current) {
          myVideo.current.srcObject = stream
        };


        socket.on("user-connected", (userId) => {
          console.log("user connected " + userId)
          // connectToNewUser(userId, stream)
        });
       
        socket.on("call", (call) => {
            call.answer(stream);
            userVideo.current.appendChild(video);

            call.on('stream', userVideoStream => {
              setVideo(video, stream)
              // addVideoStream(video, userVideoStream);
            })
        })
      
      });

 
        // socket.on('user-disconnected', userId => {
        //   console.log(userId)
        //     // if (peers[userId]) peers[userId].close()
        // });

        // socket.on('open', id => {
        //     // send event to server, pass arguments roomId and userId
        //     socket.emit('join-room', roomID, id)
        //     console.log("This is the id from peerJS", id)
        // });


  }, []);      




//   const connectToNewUser = (userId, stream) => {
//     // const call = myPeer.call(userId, stream)
//     videoGridRef.current.appendChild(video);
 
//     call.on('stream', userVideoStream => {
//         // addVideoStream(video, userVideoStream)
//     })
//     call.on('close', () => {
//         video.remove()

//     })
//     setPeers((prevState) => ({ ...prevState, userId }));
//     peers[userId] = call
// }



  // const addVideoStream = (video, stream) => {
  //   if(video && stream) {
  //   video.srcObject = stream;
  //   video.addEventListener("loadedmetadata", () => {
  //     video.play();
  //   });
  // }
  //   videoGridRef.current.appendChild(video);
  // }

  return (
    <>
      <OuterContainer>
        <Header><AlinkHeader href="/">Chaterio</AlinkHeader></Header>
          <Container>
            <CopyToClipboard text={roomID} style={{ marginBottom: ".5rem" }}>
                <Button variant="contained" color="primary" >
                    Copy Room Id
                </Button>
            </CopyToClipboard>
          </Container>
          <VideoContainer>
            <VideoDrag  >
              {stream && <video id="myVideo" draggable="true" playsInline muted ref={myVideo} autoPlay width={500} height={500} />}
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
`;

const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
  justify-content: center;
  z-index: 1;
    /* 1fr 1fr */
`;


const SectionInnerButtons = styled.section`
    width: 90%;
    margin: auto;
`;

const SectionOuterButtons = styled.section`
    margin-top: 9vh;
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



export default Room;