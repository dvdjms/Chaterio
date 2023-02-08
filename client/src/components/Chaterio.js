import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client"
import "./Chaterio.css"
import styled from "styled-components";

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
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
                setStream(stream)
                myVideo.current.srcObject = stream
            })

            socket.on('me', (id) => {
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
        <Header><a href="/">Chaterio</a></Header>
        <Container>
            <VideoContainer>
                <VideoMe>
                    {stream && <video playInline muted ref={myVideo} autoPlay style={{width: "300px"}} />}
                </VideoMe>
                <VideoYou className="video">
                    {callAccepted && !callEnded ?
                    <video playInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
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
                    style={{ marginBottom: "20px" }} 
                />
                <CopyToClipboard text={me} style={{marginBottom: "2rem"}}>
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
                <div className="call=button">
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
                </div>
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
        </OuterContainer>
        </>
    )
}

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
`;

const Button = styled.button`
    border: solid red;
`;

const IconButton = styled.button`
    border: solid red;
`;

const AssignmentIcon = styled.i`
    border: solid red;
`;

const PhoneIcon = styled.button`
    border: solid red;
`;

const Header = styled.h1`
    color:  #d9005a;
    margin-top: 0;
    font-size: 57px;
    padding-top: 2vh;
    text-align: center;
`;


const ContainerInput = styled.div`
    border-radius: 5px;
    padding: 2rem;
    display: grid;
    background-color: slategray;
    height: 17vh;
    position: absolute;
    margin-top: 37vh;
`;

const OuterContainer = styled.div`
    background-color: #252934;
    min-height: 100vh;
`;


export default Chaterio;