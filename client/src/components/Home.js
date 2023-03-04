import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import picture from "../static/images/backgroundpicture.jpg"
import logo from "../static/images/chaterioLogo.png"

const { v4: uuidV4 } = require('uuid')

const HomePage = () => {

    const inputRoomName = useRef();
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        const changeSpecialCharacters = inputRoomName.current.value;
        const roomName = changeSpecialCharacters.replace(/[^a-zA-Z0-9]/g,'');
        if (roomName === "") {
            const roomId = uuidV4();
            navigate(`/videocall/${roomId}`)
        }
        else {
            navigate(`/videocall/${roomName}`)
        }
    }, [navigate]);


    return (
        <ContainerHome>
            <Logo alt="people talking on laptop" src={logo}></Logo>
 
            <Image alt="people talking on laptop" src={picture}></Image>

            <Header></Header>
            <Paragraph>Chat to your friends for free. No account needed!</Paragraph>

            <SectionSearch>
                <InputField id="RoomName" name="RoomName" placeholder="Enter Room Name" ref={inputRoomName} type="text" oninput="this.value = this.value.replace(/[^a-z]/, '')"></InputField>
                <SubmitButton onClick={handleJoinRoom} type="submit">Start meeting</SubmitButton>
            </SectionSearch>
        </ContainerHome>
    );
};

const Logo = styled.img`
    padding: 3vw;
    padding-left: 17vw;
    width: 150px;
    z-index: 1;
    position: absolute;
    @media (max-width: 676px) {
        padding-top: 13vw;
    }
`;

const Image = styled.img`
    filter: blur(4px) brightness(50%);
    height: 100vh;
    width: 100vw;
    z-index: 0;
    position: absolute;
    @media (max-width: 876px) {
        height: auto;
    }
`;

const Paragraph = styled.p`
    color: white;
    margin-top: 33vh;
    text-align: center;
    position: relative;
    z-index: 1;
`;

const InputField = styled.input`
    border: none;
    border-radius: .5vw;
    font-size: 18px;
    height: 8vh;
    width: 35vw;
    margin-bottom: 3vh;
    padding-left: 15px;
    @media (max-width: 676px) {
        min-width: 55vw;
    }
`;

const SubmitButton = styled.button`
    background-color: #10C2C9;
    border: none;
    border-radius: .5vw;
    border: none;
    font-size: 18px;
    font-weight: 600;
    color: white;
    height: 8vh;
    width: 35vw;
    margin-bottom: 3vh;
    @media (max-width: 676px) {
        min-width: 55vw;
    }
`;

const SectionSearch = styled.section`
    height: 20vh;
    text-align: center;
    width: 50vw;
    margin: auto;
    padding-top: 4vh;
    position: relative;
    z-index: 1;

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
`;

const SectionInnerButtons = styled.section`
    width: 90%;
    margin: auto;
`;

const SectionOuterButtons = styled.section`
    height: 9vh;
    text-align: center;
`;

const Header = styled.h1`
    color:  #d9005a;
    margin-top: 0;
    font-size: 57px;
    padding-top: 2vh;
    text-align: center;
    position: relative;
    z-index: 1;
`;

const ContainerHome = styled.div`
    background-color: #252934;
    min-height: 100vh;
`;


export default HomePage;