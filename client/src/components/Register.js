import React from "react";
import styled from "styled-components";


const Register = () => {


    return (
        <ContainerHome>
            <Header><a href="/">Chaterio</a></Header>
            <ContainerLogin>
                <HeaderFour>Register</HeaderFour>
                <Form>
                    <Input type="text" placeholder="First name"></Input>
                    <Input type="text" placeholder="Last name"></Input>
                    <Input type="text" placeholder="Username"></Input>
                    <Input type="text" placeholder="Email"></Input>
                    <Input type="password" placeholder="Password"></Input>
                    <Input type="password" placeholder="Confirm Password"></Input>

                    <Input type="submit"></Input>
                </Form>
            </ContainerLogin>

            <Login><Alink href="/login">Login</Alink></Login>

        </ContainerHome>
    );
};


const HeaderFour = styled.h4`
    color: #10C2C9;
    font-size: 7vw;
    margin: 0;
`;


const Alink = styled.a`
    text-align: center;
    color: #10C2C9;
    font-size: 5vw;
    text-decoration: none;
`;

const Login = styled.div`
    text-align: center;
`;


const Input = styled.input`
    border: none;
    border-radius: 2vw;
    font-size: 3vh;
    height: 6vh;
    width: 70vw;
    margin-bottom: 3vh;
    padding-left: 5vw;
`;


const Form = styled.form`
    margin-top: 3vh;
    height: 62vh;
`;


const ContainerLogin = styled.div`
    height: 75vh;
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



export default Register;