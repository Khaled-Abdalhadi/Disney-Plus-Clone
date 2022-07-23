import {useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import fadeOutElement from "../functions/fadeOutElement";
import { BackgroundImgContainerStyled, BackgroundImgStyled } from "./styles";
import {  selectBackgroundTransition, selectMovieDetails, setBackgroundTransition } from "../features/pageSlice";
import { CSSTransition } from "react-transition-group";

const BackgroundImg = () => {
     const backgroundImgRef = useRef()
     const dispatch = useDispatch()
     const backgroundTransition = useSelector(selectBackgroundTransition)
    const movieDetails = useSelector(selectMovieDetails)

    //everytime you scroll, the fadeOutElement will execute. The function fades the refrenced element as you scroll.
    function handleScroll() {
        fadeOutElement(backgroundImgRef.current)   
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
       
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    },[])

    //The useEffect unhooks the background Img everytime it changes so CSSTransition can apply the css styles to it.
     useEffect(() => {
        const timer = setTimeout(() => {
        dispatch(setBackgroundTransition({
            transition: false
        }))
        }, 4950)
        return () => {
            clearTimeout(timer)
        }
        
    }, [movieDetails.backgroundImg])

    return (
            <BackgroundImgContainerStyled>
                <BackgroundImgStyled ref = {backgroundImgRef}>
                    <CSSTransition
                        in = {backgroundTransition}
                        classNames = "fade"
                        timeout = {1500}
                    >
                    <img src = {movieDetails.backgroundImg}/>
                    </CSSTransition>
                </BackgroundImgStyled>
            </BackgroundImgContainerStyled>
    )
}

export default BackgroundImg