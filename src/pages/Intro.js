import styled from "styled-components";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

//the dinsey logo intro page animation.
const Intro = () => {
    let navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/home", {replace: true});
        }, 3000 )
    },[])
    return (
        <Container>
            <img src = "https://images.firstpost.com/wp-content/uploads/2018/11/Disneyplus.jpg"
                 className = "animate__animated animate__jackInTheBox"/>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    
    img {
        width: 50%;
    }
`

export default Intro;