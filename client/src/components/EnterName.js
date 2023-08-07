import React, {useState } from "react";
import styled from "styled-components";


const EnterName = () => {

      const [nameEntered, setNameEntered] = useState(false);

      const onNameSubmit = () => {
            setNameEntered((prev) => (!prev));
      };

      return (
            <>
            
            {nameEntered && (
            <EnterNameContainer>
                  <form>
                        <input type="text" placeholder="Enter name"></input>
                        <button type="submit" onClick={onNameSubmit}>Join Chat</button>
                  </form>
            </EnterNameContainer>
            )}
            
            </>
      );

};


const EnterNameContainer = styled.div`
  background-color: gray;
  height: 100vh;
  width: 50vw;
  border: solid red;
  z-index: 7;
  position: absolute;
  opacity: .9;
`;

export default EnterName;