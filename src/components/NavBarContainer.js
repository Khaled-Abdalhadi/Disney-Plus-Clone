import styled from "styled-components";
import { NavBarContainerStyled } from "./styles";
import NavBar from "./NavBar";
import {useState} from "react";

const NavBarContainer = () => {
    const [backDropActive, setBackDropActive] = useState(false);
    
    return (
       <NavBarContainerStyled>
           <BackDrop className ={backDropActive ? 'animate__animated animate__fadeInLeftBig' : ' animate__animated animate__fadeOutLeftBig'}/>
           <NavBar setBackDropActive = {setBackDropActive}/>
       </NavBarContainerStyled>
    )
}

const BackDrop = styled.div`
    position: absolute;
    inset:0;
    background: linear-gradient(90.43deg,rgba(15,16,20,0.95) 16.24%,rgba(15,16,20,0) 98.46%);
    width:75vw;
  
`

export default NavBarContainer;