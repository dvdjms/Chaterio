import React from "react";
import styled from "styled-components";


const HomePage = () => {

    const handleSubmit = (e) => {
        const formData = {
            roomName: e.target.RoomName.value
        };
        console.log(formData)
        return (

            console.log(formData)
        )
    }


    return (
        <ContainerHome>
            <Header>Chaterio</Header>
            <SectionOuterButtons>
                <SectionInnerButtons>

                    <a href="/chaterio"><RoomButton>New Room</RoomButton></a>
                    <a href="/room"><RoomButton>Join Room</RoomButton></a>

                </SectionInnerButtons>
            </SectionOuterButtons>

            <SectionSearch>
                <Form onSubmit={handleSubmit}>
                    <InputField id="RoomName" name="RoomName" type="text" placeholder="Name Your Room"></InputField>
                    <SubmitButton type="submit">Start meeting</SubmitButton>
                </Form>
            </SectionSearch>


        </ContainerHome>
    );
};

const InputField = styled.input`
    border: none;
    border-radius: 2vw;
    font-size: 18px;
    height: 8vh;
    width: 70vw;
    margin-bottom: 3vh;
    padding-left: 5vw;
`;

const SubmitButton = styled.button`
    background-color: #10C2C9;
    border: none;
    border-radius: 2vw;
    border: none;
    border-radius: 2vw;
    font-size: 18px;
    font-weight: 600;
    color: white;
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
    height: 20vh;
    margin-top: 7vh;
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