import { NavBarStyled } from "./styles"
import {useState} from "react";
import navBarIcons from "../data/icons";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const NavBar = ({setBackDropActive}) => {

    const [navBarHover, setNavBarHover] = useState(false)

    //react method of styling the active link.
    function navLinkStyled({isActive}) {
        return {
            opacity: isActive && "1",
            color: isActive && "white",
        }
    }
   
    //function that shows the navigation bar when hovered over. (The function basically just changes states of hooks)
    function showNavBarContent() {
        setNavBarHover(true)
        setBackDropActive(true)
    }
    
    function hideNavBarContent() {
        setNavBarHover(false)
        setBackDropActive(false)
    }

    return (
        <NavBarStyled
            onMouseEnter  = {showNavBarContent}
            onMouseLeave = {hideNavBarContent}
        >
            {navBarIcons.map(({name, className, pageName}) => {
                return (
                <NavLink to = {`/${pageName}`} className = 'icon'
                         style = {navLinkStyled}>
                    <div className = 'icon icon-content'>
                        <span>
                            <i class = {className}/>
                        </span>
                        <span class = {navBarHover ? `icon-text` : `icon-text-disappear`}>{name}</span>
                    </div>
                </NavLink>
                )
            })}
            <SocialsStyled>
              <a href = "https://www.linkedin.com/in/khaled-a-1098ab140/" className = 'icon' target= "_blank">
                    <div className = 'icon icon-content'>
                        <span>
                            <i class = 'fa-brands fa-linkedin-in'/>
                        </span>
                        <span class = {navBarHover ? `icon-text` : `icon-text-disappear`}>Linkedin</span>
                    </div>
                </a>
                <a href = "https://github.com/Khaled-Abdalhadi?tab=repositories" className = 'icon' target = "_blank">
                    <div className = 'icon icon-content'>
                        <span>
                            <i class = 'fa-brands fa-github'/>
                        </span>
                        <span class = {navBarHover ? `icon-text` : `icon-text-disappear`}>Github</span>
                    </div>
                </a>
            </SocialsStyled>
        </NavBarStyled>
    )
}

const SocialsStyled = styled.div`
    padding: 10px;
   position: absolute;
   inset:0;
   top: 50vh;
   margin-top: 20px;
   height:200px;
   
`
export default NavBar;