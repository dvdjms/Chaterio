import React from "react";
import styled from "styled-components";


const HomePage = () => {


    return (
        <ContainerHome>
            <Header>Chaterio</Header>
            <VideoSection>
                <VideoScreen></VideoScreen>
            </VideoSection>
        </ContainerHome>
    );
};

const Header = styled.h1`
    color:  #d9005a;
    margin-top: 0;
    font-size: 14vw;
    padding-top: 2vh;
    text-align: center;
`;



const VideoScreen = styled.div`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border: solid #e31a6d;
    border-radius: 2vh;
    margin: auto;
`;


const VideoSection = styled.div`
    border: rgb(E3, 1A, 60) solid;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-auto-rows: 300px;
    margin-left: 5vh;
`;

const ContainerHome = styled.div`
    background-color: #252934;
    height: 100vh;
`;




export default HomePage;