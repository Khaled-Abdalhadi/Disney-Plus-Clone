import styled from "styled-components";
import {useEffect, useState, useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import { selectActiveCarousel, setBackgroundTransition, setMovieDetails} from "../features/pageSlice";

//Probably the most complex container in the project. If you have any questions about the container please feel free to message me.
const MovieCarousel = () => {
    const [count, setCount] = useState(0)
    const activeCarousel = useSelector(selectActiveCarousel)
    const [moveCarousel, setMoveCarousel] = useState(false)
    const sliderRef = useRef([]);
     const dispatch = useDispatch();
    const [indicators, setIndicators] = useState(
        {
        leftIndicator: false,
        rightIndicator: false, 
    })

    //the function will update the carousel and displays the next movie in the carousel. When it hits the last movie in the carousel, it will reset back to 1.
    function updateCarousel(index) {

        if (index <= activeCarousel.length -1) {
                dispatch(setBackgroundTransition({
                    transition: true,
                }))
                dispatch(setMovieDetails({
                    movieDetails:{...activeCarousel[index]}
                }))
                sliderRef.current[index].classList.add('carousel-slide-active')
                sliderRef.current.map((slider, key)=> {
                    if (key != index) {
                        slider.classList.remove('carousel-slide-active')
                    }
                })
        }
        
        //translate the carousel to display the hidden movie
        if (index == 3) {
            handleIndicator('right') // check function for logic
         }
        
        //resets the carousel back to the first movie.
        if (index > activeCarousel.length-1) {
            sliderRef.current[0].classList.add('carousel-slide-active');
            sliderRef.current[activeCarousel.length-1].classList.remove('carousel-slide-active')
            dispatch(setBackgroundTransition({
                transition: true,
            }))
            dispatch(setMovieDetails({
                movieDetails: {...activeCarousel[0]}
            }))
             setCount(0);
            handleIndicator('left')
        }
        }

    function handleCarousel(e) {
        e.preventDefault();
    }

    //function that deals what should happen when we click on a movie in the carousel. (ex: change backgroundImg..etc).
    function handleClick(index) {
        dispatch(setBackgroundTransition({
            transition: false,
        }))
        setCount(index)
        setTimeout(() => {
            updateCarousel(index)
        }, 0)
    }

    //translate the carousel (left/right).
    function handleIndicator(arrow,e) {
        switch (arrow){
            case 'left':
                setIndicators({
                    leftIndicator: false,
                    rightIndicator: false,
                })
                setMoveCarousel(false);
            break;
            case 'right': 
                setIndicators({
                    leftIndicator: true,
                    rightIndicator: true,
                })
                setMoveCarousel(true)
            break;
        }
    }
    
    //the hook that continously change the carousel based on a time interval.
    useEffect(() => {
        const index = count+1;
        const timer = setTimeout(() => {
            setCount(index)
            updateCarousel(index)
        }, 5000)
        return () => {
            clearTimeout(timer)
        }
    },[count, activeCarousel])

   
    //triggered if the carousel list changes 
    useEffect(() => {
        sliderRef.current = sliderRef.current.slice(0, activeCarousel.length)
    }, [activeCarousel])

    return (
        <CarouselContainer onClick = {handleCarousel}>
            <SwiperIconLeft
                onClick = {() => handleIndicator('left')}
                leftIndicator = {indicators.leftIndicator}
            >
                <span>
                    <i class = "fa fa-chevron-left"/>
                </span>
            </SwiperIconLeft>
            <CarouselWrapper moveCarousel = {moveCarousel}>
                {activeCarousel.map(({backgroundImg, id}, index) => {
                    return (
                    <SlideContainer onClick = {() => handleClick(index)}
                        key = {id}
                        ref = {el => sliderRef.current[index] = el}
                    >
                        <SliderContent>
                            <img src = {backgroundImg}/>
                        </SliderContent>
                    </SlideContainer>
                    )
                })}
            </CarouselWrapper>
            <SwiperIconRight
                onClick = {() => handleIndicator('right')}
                rightIndicator = {indicators.rightIndicator}
            >
                <span>
                    <i class = "fa fa-chevron-right"/>
                </span>
            </SwiperIconRight>
        </CarouselContainer>
    )
}

const CarouselContainer = styled.div`
    display: flex;
    align-items: center;
    width: 20rem;
    height: 3.625rem;
    overflow:hidden;
    position:relative;
`

const SwiperIconLeft = styled.div`
    position:absolute;
    display:none;
    width: 50px;
    height:45px;
    z-index:1;
    background:linear-gradient(176.27deg,rgba(15,16,20,0) 57.9%,rgba(15,16,20,0.01) 64.8%,rgba(15,16,20,0.05) 67.56%,#0f1014 96.94%),linear-gradient(90deg,#0f1014,rgba(15,16,20,0.85) 16.15%,rgba(15,16,20,0.73) 25.52%,rgba(15,16,20,0.6) 32.81%,rgba(15,16,20,0.05) 52.08%,rgba(15,16,20,0) 65.1%);

    ${({leftIndicator}) => leftIndicator && `
        display:block;
    `}
`

const SwiperIconRight = styled.div`
    position: absolute;
    width:50px;
    height:45px;
    right:-18px;
    z-index:1;
    background: linear-gradient(176.27deg,rgba(15,16,20,0) 57.9%,rgba(15,16,20,0.01) 64.8%,rgba(15,16,20,0.05) 67.56%,#0f1014 96.94%),linear-gradient(90deg,#0f1014,rgba(15,16,20,0.85) 16.15%,rgba(15,16,20,0.73) 25.52%,rgba(15,16,20,0.6) 32.81%,rgba(15,16,20,0.05) 52.08%,rgba(15,16,20,0) 65.1%);

    ${({rightIndicator}) => rightIndicator && `
        display:none;
    `}
`
const CarouselWrapper = styled.div`
    cursor: pointer;
    display:flex;
    max-width:100%;
    width:auto;
    height:auto;
    align-items: center;
    transform: translateX(0);
    transition: all 1000ms;

    ${({moveCarousel}) => moveCarousel && `
        transform: translateX(-124px);
`}
   
`


const SlideContainer = styled.div`
    border: 0.8px solid transparent;
    border-radius: 4px;
    margin-left: 4px;
    margin-right: 4px;
    height: 2.8rem;
    width: 5rem;
    opacity:0.6;
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    flex-shrink: 0;

  
    &:hover {
        transform: scale(1.2);
        opacity:1;
        z-index:1;
    }

    &:focus {
        border-color: white;
    }
    `


const SliderContent = styled.div`
    border-radius: 4px;
    width:100%;
    height:auto;

    img {
        border-radius: 4px;
    }
`


export default MovieCarousel