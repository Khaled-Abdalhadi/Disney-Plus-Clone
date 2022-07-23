import styled from "styled-components";

const BackgroundImgContainerStyled = styled.div`
    position:fixed;
    width:100%;
    opacity:1;
    aspect-ratio: 16/9;
    z-index:-1;
    transition-property: all;
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0.4, 0, .2, 1);
`
export default BackgroundImgContainerStyled;