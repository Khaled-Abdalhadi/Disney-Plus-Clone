import styled from "styled-components";
import { selectMovieDetails, selectBackgroundTransition} from "../features/pageSlice";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { TextContainerStyled, TextStyled } from "./styles";
import ButtonsContainer from "./ButtonsContainer"

const SliderMovieDetails = () => {
    const backgroundTransition = useSelector(selectBackgroundTransition)
    var genreSliced = [];
    var filteredInfo = {};
    const {titleImg, info, description, genre} = useSelector(selectMovieDetails)
    if (genre !== undefined && info !== undefined ) {
         genreSliced = genre.slice(1);
         //filter null and undefined from objects
          filteredInfo = Object.fromEntries(Object.entries(info).filter(([_,v]) => v != null))
          delete filteredInfo['year'];
          delete filteredInfo['age'];
    }   
    return (
        <CSSTransition
            in = {backgroundTransition}
            classNames = 'fade'
            timeout = {1500}
        >
            <SliderMovieDetailsStyled>
                <MovieLogo>
                    <img src = {titleImg} />
                </MovieLogo>
                <div>
                    <ContainerOne>
                            {info && <TextContainerStyled>
                                <TextStyled>
                                    <span>{info.year}</span>
                                </TextStyled>
                            </TextContainerStyled>}
                            {info && Object.values(filteredInfo).map((info) => {
                                return (
                                    <TextContainerStyled>
                                        <TextStyled>
                                            <span>
                                                <i class = 'fa fa-dot-circle-o'/>
                                            </span>
                                        </TextStyled>
                                        <TextStyled>
                                            <span>{info}</span>
                                        </TextStyled>
                                    </TextContainerStyled>
                                )
                            })}
                            {info && <TextContainerStyled>
                                <TextStyled>
                                    <span>
                                        <i class = "fa fa-dot-circle-o"/>
                                    </span>
                                </TextStyled>
                                <AgeStyled>
                                    <span>{info.age}</span>
                                </AgeStyled>
                            </TextContainerStyled>}
                    </ContainerOne>
                    <DescriptionStyled>
                        <p>{description.overview}</p>
                    </DescriptionStyled>
                            
                    <ContainerTwo>
                        {genre && <TextContainerStyled>
                            <TextStyled>
                                <span>{genre[0]}</span>
                            </TextStyled>
                        </TextContainerStyled>}
                        {genreSliced.length !==0 && genreSliced.map((genre) => {
                            return (
                                <TextContainerStyled>
                                    <TextStyled>
                                        <span>
                                            <i class = 'fa fa-dot-cireclie-o'/>
                                        </span>
                                    </TextStyled>
                                    <TextStyled>
                                        <span>{genre}</span>
                                    </TextStyled>
                                </TextContainerStyled>
                            )
                        })}
                    </ContainerTwo>
                    <ButtonsContainer/>
                </div>
            </SliderMovieDetailsStyled>
        </CSSTransition>
    )
}

const SliderMovieDetailsStyled = styled.div`
    width: 250px;
    @media (min-width: 800px) {
        width: 300px;
        font-size: 14px;
    }

    @media (min-width: 950px) {
        width: 380px
    }

    @media (min-width: 1275px) {
        width: 416px;
        font-size: 20px;
        
    }

    @media (min-width: 1920px) {
        width: 624px;
        font-size: 24px;
        line-height: 36px;
    }
`

const MovieLogo = styled.div`
   display: inline-flex;
   max-width: 100%;

   @media (max-width: 800px) {
    max-width: 100px;
    max-height: 100px;
   }

    img {
      max-height: 148px;
    }
   
`


const DescriptionStyled = styled.div`

    display:flex;
    padding-top: 16px;

    P {
        font-size: inherit;
        font-weight: 400;
        line-height: 24px;
        margin: 0
    }

    @media (max-width: 1000px) {
        display:none;
    }
`

const ContainerOne = styled.div`
   @media (min-width: 1920px) {
    max-height: 70px;
   }
    min-height: 1.5rem;
    max-height: 60px;
    overflow: hidden;
    padding-top: 16px;
    display:flex;
    align-items: center;
    flex-wrap:wrap;
`
const ContainerTwo = styled(ContainerOne)`
    @media (max-width: 800px) {
        display: none;
    }
    margin-bottom: 32px;
`



const AgeStyled = styled.span`
    display:flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
    margin: 0%;
    padding: 8px 16px;

    span {

        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
    }
`




export default SliderMovieDetails