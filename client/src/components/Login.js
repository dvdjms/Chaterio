import React from "react";
import styled from "styled-components";


const LoginPage = () => {


    return (
        <ContainerHome>
             <Header><a href="/">Chaterio</a></Header>
            <HeaderFour>Login</HeaderFour>
            <ContainerLogin>
                <Form>
                    <Input type="text" placeholder="Username"></Input>
                    <Input type="password" placeholder="Password"></Input>
                    <Input type="submit"></Input>
                </Form>
            </ContainerLogin>

        <Register><Alink href="/register">Register</Alink></Register>

        </ContainerHome>
    );
};

const HeaderFour = styled.h4`
    color: #10C2C9;
    font-size: 7vw;
    margin: 0;
    text-align: center;
`;

const Alink = styled.a`
    text-align: center;
    color: #10C2C9;
    font-size: 5vw;
    text-decoration: none;
`;


const Register = styled.div`
    margin-top: 12vh;
    text-align: center;
`;

const Input = styled.input`
    border: none;
    border-radius: 2vw;
    font-size: 3vh;
    height: 8vh;
    width: 70vw;
    margin-bottom: 3vh;
    padding-left: 5vw;
`;


const Form = styled.form`
    margin-top: 7vh;
    height: 50vh;
`;


const ContainerLogin = styled.div`
    height: 50vh;
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




export default LoginPage;