import styled from "styled-components";
import {useState} from "react";

const Trailer = ({trailer, trailerController}) => {
    const [zoomIn, setZoomIn] = useState(true)
    const frameStyled = {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
    }
    function handleTrailer(){
        setZoomIn(false)
        setTimeout(() => {
            trailerController(false)
        },300)
    }
    
    return (
        <TrailerContainer
            onClick = {handleTrailer}
        > 
                <TrailerWrapper className = {zoomIn? "zoomIn" : "zoomOut"}>
                    <VideoContainer>
                            <iframe
                            title = "Youtube movie/tv show trailer"
                            src = {trailer}
                            style = {frameStyled}
                            frameborder = "0"
                            allow = "accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                            allowFullScreen
                            />
                    </VideoContainer>
                    <CloseButtonContainer>
                        <CloseButton
                            onClick = {handleTrailer}
                        >
                            <span>
                                <i className = "fa fa-close"/>
                            </span>
                        </CloseButton>
                    </CloseButtonContainer>
                </TrailerWrapper>
        </TrailerContainer>
    )
}

const TrailerContainer = styled.div`
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    inset:0;
    z-index: 2;
    
`
const TrailerWrapper = styled.div`
    position: absolute;
    inset:0;
    margin: auto;
    width: 75vw;
    aspect-ratio: 16/9;
    z-index: 2;
`

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
`

const CloseButtonContainer = styled.div`
    cursor: pointer;
    opacity:0.8;
    position: absolute;
    inset: 0;
    margin-left: auto;
    right: -20px;
    width: 20px;
    height: 20px;
    top: -3rem;
    transition: all 300ms;
    &:hover {
        opacity: 1;
        transform: scale(1.1)
    }
`
const CloseButton = styled.div`
    font-size: 30px;
    color: red;
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    align-items: center;
`
export default Trailer
