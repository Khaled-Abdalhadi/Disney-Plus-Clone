import styled from "styled-components";
import { BackgroundImgContainerStyled, BackgroundImgStyled, MainContainerStyled, PageContent,  } from "../components/styles";
import studios from "../data/studios";
import {useEffect, useState, useRef} from "react"
import {useParams} from "react-router-dom";
import Categories from "../components/Categories";
import fadeOutElement from "../functions/fadeOutElement";
import { SideBar } from "../components";


const Studio = () => {
    const {studioName} = useParams();
    const [studio, setStudio] = useState({})
    const backgroundImgRef = useRef();

   useEffect(() => { 
        function getStudioData() {
            const studioData = studios.find((studio) => studio.name == studioName)
            setStudio(studioData)
        }
        getStudioData()
    },[studioName])

    useEffect(() => {
        function handleScroll() {
            fadeOutElement(backgroundImgRef.current)
        }
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    },[])
    return (
        <>
            <SideBar/>
            <PageContent>
                <BackgroundImgContainerStyled>
                    <BackgroundImgStyled ref = {backgroundImgRef}>
                        <img src = {studio.backgroundImg}/>
                    </BackgroundImgStyled>
                </BackgroundImgContainerStyled>
                <MainContainerStyled>
                    <ImageTitle>
                        <img src = {studio.titleImg}/>
                    </ImageTitle>
                </MainContainerStyled>
                <StudioCategoriesStyled>
                    <Categories categoriesForPage={studioName}/>
                </StudioCategoriesStyled>
            </PageContent>
        </>
    )
}

const ImageTitle = styled.div`
    overflow:hidden;
    height: 66%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 630px;
        height: 16/9;
    }
`
const StudioCategoriesStyled = styled.div`
    margin-top: -22%;
`
export default Studio