import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client"
import "./Chaterio.css"
import styled from "styled-components";


import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import Button from '@mui/icons-material/Button';
// import PhoneIcon from '@mui/material/Icon';

const socket = io.connect("http://localhost:3000");

function Chaterio() {

    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

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
            })

            socket.on("me", (id) => {
                setMe(id)
            })

            socket.on("callUser", (data) => {
                setReceivingCall(true)
                setCaller(data.from)
                setName(data.name)
                setCallerSignal(data.signal)
            })
    }, []);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
         })

         peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
         })

         socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
         })

         connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("answerCall", {signal: data, to: caller})
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    return ( 
        <>
        <OuterContainer>
        <Header><AlinkHeader href="/">Chaterio</AlinkHeader></Header>
        <Container>
            <VideoContainer>
                <VideoMe>
                    {stream && <video playsInline muted ref={myVideo} autoPlay style={{width: "300px"}} />}
                </VideoMe>
                <VideoYou className="video">
                    {callAccepted && !callEnded ?
                    <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
                    null}
                </VideoYou>
            </VideoContainer>

            <ContainerInput>
                <TextField 
                    id="filled-basic" 
                    label="Name" 
                    variant="filled" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: ".5rem" }} 
                />
                <CopyToClipboard text={me} style={{marginBottom: ".5rem"}}>
                    <Button variant="contained" color="primary" starIcon={<AssignmentIcon fontSize="large"/>}>
                        Copy ID
                    </Button>
                </CopyToClipboard>

                <TextField 
                    id="filled-basic" 
                    label="ID to call" 
                    variant="filled" 
                    value={idToCall} 
                    onChange={(e) => setIdToCall(e.target.value)} 
                />
                <CallButton>
                    {callAccepted && !callEnded ? (
                        <Button variant="contained" color="secondary" onClick={leaveCall}>
                            End call
                        </Button>
                    ) : (
                        <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            <PhoneIcon fontSize="large" />
                        </IconButton>
                    )}
                    {idToCall}
                </CallButton>
            </ContainerInput>
            <div>
                {receivingCall && !callAccepted ? (
                    <div className="caller">
                        <h1>{name} is calling...</h1>
                        <Button variant="contained" color="primary" onClick={answerCall}>
                            Answer
                        </Button>
                    </div>
                ) : null}
            </div>
        </Container>
        <SectionOuterButtons>
                <SectionInnerButtons>

                    <a href="/"><RoomButton>Leave Room</RoomButton></a>
                    <a href="/room"><RoomButton>Join Room</RoomButton></a>

                </SectionInnerButtons>
            </SectionOuterButtons>
        </OuterContainer>
        </>
    )
}


const CallButton = styled.div`
	text-align: center;
	margin-top: .5rem;
	height: 20px;
	width: 20px;
	border: solid white;
`;

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


const VideoMe = styled.div`
    float: left;

`;

const VideoYou = styled.div`
    float: left;
 
`;

const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
    /* 1fr 1fr */
`;

const Container = styled.div`
	/* display: grid; */
	grid-template-columns: 7fr 3fr;
    height: 67vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
`;

const TextField = styled.input`
    border: solid red;
    height: 25px;
    width: 200px;
`;

const Button = styled.button`
    border: solid red;
    height: 30px;
    width: 206px;
`;

// const IconButton = styled.div`
//     border: solid red;
// `;

// const AssignmentIcon = styled.div`
//     border: solid red;
// `;

const PhoneIcon = styled.span`
    border: solid red;
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


const ContainerInput = styled.div`
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    background-color: slategray;
    height: 16vh;
    position: absolute;
    margin-top: 53vh;
`;

const OuterContainer = styled.div`
    background-color: #252934;
    min-height: 100vh;
`;


export default Chaterio;