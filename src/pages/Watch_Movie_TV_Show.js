import styled from "styled-components";
import { useParams } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import db from "../firebase";
import {Trailer, ButtonsContainer, Loading, SideBar}  from "../components"
import { selectLoadPage, selectMovieDetails, setLoadPage, setMovieDetails } from "../features/pageSlice.js";
import {PageContent, ShadowMaskBottom, ShadowMaskLeft, TextContainerStyled, TextStyled}  from "../components/styles/";


//This component is the last component in the website. It shows the details of the movie u picked, so you can either play trailer or watch it.
const Movie = () => {

    const {id} = useParams()
    const movieDetails = useSelector(selectMovieDetails)
    const loadPage = useSelector(selectLoadPage)
    const [filteredInfo, setFilteredInfo] = useState({});
    const [genreSliced, setGenreSliced] = useState([]);
    const [playTrailer, setPlayTrailer] = useState(false);
    const dispatch = useDispatch();

 
    useEffect(() => {
        const data = window.localStorage.getItem('category');
        const category = JSON.parse(data)
        //we are grabbing the movie from the firebase database based on the id of the document
         async function fetchMovie() {
            const doc = await db.collection(category).doc(id).get()
            const genreSliced = doc.data().genre.slice(1);
            const filteredInfo = Object.fromEntries(Object.entries(doc.data().info).filter(([_,v]) => v != null))
            delete filteredInfo['year'];
            delete filteredInfo['age'];
            setFilteredInfo(filteredInfo);
            setGenreSliced(genreSliced)
            dispatch(setMovieDetails({
                movieDetails: doc.data()
            }))
            dispatch(setLoadPage({
                loadPage: false
            }))
         }
         fetchMovie()
    }, [id])

    if (loadPage) {
        return (
            <Loading/>
        )
    }

  
   
    return (
        <>
            <SideBar/>
            <PageContent>
                {playTrailer && <Trailer trailer = {movieDetails.trailer} trailerController = {setPlayTrailer} playTrailer = {playTrailer}/>
                }
                <MovieContainer playTrailer = {playTrailer}>
                    <MovieDetails>
                        <TitleStyled>
                            <span>
                                {movieDetails.title}
                            </span>
                        </TitleStyled>
                        <YearDurationStyled>
                            <TextContainerStyled>
                                <TextStyled>
                                    {movieDetails.info.year}
                                </TextStyled>
                            </TextContainerStyled>
                            {Object.values(filteredInfo).map((info) => {
                                return (
                                    <TextContainerStyled>
                                        <TextStyled>
                                            <span>
                                                <i class = "fa fa-dot-circle-o"/>
                                            </span>
                                        </TextStyled>
                                        <TextStyled>
                                            <span>{info}</span>
                                        </TextStyled>
                                    </TextContainerStyled>
                                )
                            })}
                        <TrailerContainer
                            onClick = {() => setPlayTrailer(true)}
                        >
                            <PlayIconStyled>
                                <span>
                                    <i className = "fa fa-play" />
                                </span>
                            </PlayIconStyled>
                            <TextStyled>
                                <span>Play Trailer</span>
                            </TextStyled>
                        </TrailerContainer>
                        </YearDurationStyled>
                        <DescriptionStyled>
                            <p>{movieDetails.description["overview"]}</p>
                        </DescriptionStyled>
                        <GenreStyled>
                            <TextContainerStyled>
                                <TextContainerStyled>
                                    {movieDetails.genre && <TextStyled>
                                        <span>
                                            {movieDetails.genre[0]}
                                        </span>
                                    </TextStyled>}
                                </TextContainerStyled>
                            </TextContainerStyled>
                            {movieDetails.genre && genreSliced.map((genre) => {
                                return (
                                    <TextContainerStyled>
                                        <TextStyled>
                                            <span>
                                                <i className = "fa fa-dot-circle-o"/>
                                            </span>
                                        </TextStyled>
                                        <TextStyled>
                                            <span>{genre}</span>
                                        </TextStyled>
                                    </TextContainerStyled>
                                )
                            })}
                        </GenreStyled>
                        <ButtonsContainer/>
                    </MovieDetails>
                    <Background>
                        <BackgroundImg>
                            <img src = {movieDetails.backgroundImg} />
                        </BackgroundImg>
                        <ShadowMaskLeft/>
                        <ShadowMaskBottom/>
                    </Background>
                </MovieContainer>
            </PageContent>
        </>
    )
}

const MovieContainer = styled.div`

    position: relative;
    display:flex;
    flex-direction: space-between;

    ${({playTrailer}) => playTrailer && `
        opacity: 0.2;

    `}
`

const Background = styled.div`
    margin-left:auto;
    position: relative;
    width: 55vw;
    aspect-ratio: 16/9;
`

const BackgroundImg = styled.div`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
`


const MovieDetails = styled.div`
    width: 320px;
    @media (min-width: 800px) {
        width: 400px;
        font-size: 14px;
    }

    @media (min-width: 950px) {
        width: 510px
    }

    @media (min-width: 1275px) {
        width: 600px;
        font-size: 20px;
        
    }

    @media (min-width: 1920px) {
        width: 800px;
        font-size: 24px;
        line-height: 36px;
    }
  
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`
const YearDurationStyled = styled.div`
    display: flex;

`
const TitleStyled = styled.div``

const TrailerContainer = styled(TextContainerStyled)`
    cursor: pointer;
    margin-left: 20px;
    border-radius: 10px;
    padding: 0px 8px;
    background: rgba(255,255,255,0.08);
    transition: all .3s;
    border-radius: 8px;

    &:hover {
        background: rgba(238, 238, 238, .3);
    }
`
const PlayIconStyled = styled.div``
const DescriptionStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding-top: 16px;
    

    P {
        
        font-size: inherit;
        font-weight: 400;
        line-height: 24px;
        margin: 0;
       
    }

    @media (max-width: 1000px) {
        display:none;
    }
`

const GenreStyled = styled.div`
    padding: 16px 0px;
    display: flex;
`


export default Movie;