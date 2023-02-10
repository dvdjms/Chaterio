import React from "react";
import styled from "styled-components";

const Room = () => {


    return (
        <ContainerRoom>
          <Header><AlinkHeader href="/">Chaterio</AlinkHeader></Header>

        <HeaderFive>Room name here</HeaderFive>

            <VideoSection>
                <VideoScreen></VideoScreen>
            </VideoSection>

            <SectionOuterButtons>
                <SectionInnerButtons>

                    <a href="/"><RoomButton>Leave Room</RoomButton></a>
                    <a href="/room"><RoomButton>Join Room</RoomButton></a>

                </SectionInnerButtons>
            </SectionOuterButtons>
        </ContainerRoom>
    );
    
};

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


const SectionInnerButtons = styled.section`
    width: 90%;
    margin: auto;
`;

const SectionOuterButtons = styled.section`
    margin-top: 20vh;
    height: 9vh;
    text-align: center;
`;

const Header = styled.h1`
    color:  #d9005a;
    margin-top: 0;
    font-size: 57px;
    padding-top: 2vh;
    text-align: center;
    text-decoration: none;
`;

const AlinkHeader = styled.a`
    color:  #d9005a;
    text-decoration: none;
`;


const HeaderFive = styled.h5`
    color: #d9005a;
    margin-top: 0;
    font-size: 27px;
    padding-top: 2vh;
    text-align: center;
`;


const VideoScreen = styled.div`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border: solid #e31a6d;
    border-radius: 2vh;
`;

const VideoSection = styled.div`
    border: rgb(E3, 1A, 60) solid;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-auto-rows: 300px;
    margin-left: 5vh;
    width: 95vw;
`;

const ContainerRoom = styled.div`
    background-color: #252934;
    min-height: 100vh;
`;


export default Room;