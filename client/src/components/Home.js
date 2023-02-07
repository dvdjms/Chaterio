import React from "react";
import styled from "styled-components";


const HomePage = () => {


    return (
        <ContainerHome>
            <Header>Chaterio</Header>
            <SectionOuterButtons>
                <SectionInnerButtons>

                    <a href="/"><RoomButton>New Room</RoomButton></a>
                    <a href="/room"><RoomButton>Join Room</RoomButton></a>

                </SectionInnerButtons>
            </SectionOuterButtons>

            <SectionSearch>
                <Form>
                    <InputField type="text" placeholder="Search Room"></InputField>
                    <SubmitButton type="submit">Join Room</SubmitButton>

                </Form>
            </SectionSearch>


        </ContainerHome>
    );
};

const InputField = styled.input`
    border: none;
    border-radius: 2vw;
    font-size: 3vh;
    height: 8vh;
    width: 70vw;
    margin-bottom: 3vh;
    padding-left: 5vw;
`;

const SubmitButton = styled.button`
    border: none;
    border-radius: 2vw;
    font-size: 3vh;
    height: 8vh;
    width: 70vw;
    margin-bottom: 3vh;
    padding-left: 5vw;
`;

const Form = styled.form`
    height: 10vh;
    text-align: center;
`;


const SectionSearch = styled.section`
    height: 10vh;
    border: solid red;
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
`;


const ContainerHome = styled.div`
    background-color: #252934;
    min-height: 100vh;
`;



export default HomePage;