import styled from "styled-components"
import {useState, useEffect} from "react";
import { selectMovieDetails } from "../features/pageSlice";
import { selectWatchLaterList, setAddMovie, setRemoveMovie, setPerserveList} from "../features/watchLaterSlice";
import {useSelector, useDispatch} from "react-redux"


const ButtonsContainer = () => {
    
    const dispatch = useDispatch()
    const [addToWatchlist, setAddToWatchlist] = useState(false)
    const [showToolBox, setShowToolBox] = useState(false);
    const movieDetails = useSelector(selectMovieDetails)
    const watchlaterList = useSelector(selectWatchLaterList)

    //Removes or add movies to the watchlist.
    function handleWatchlist(e) {
        const category = window.localStorage.getItem('category')
        e.preventDefault();
        setAddToWatchlist(!addToWatchlist);
        switch (addToWatchlist) {
            case false:
                dispatch(setAddMovie({
                    movieDetails: {...movieDetails, category: JSON.parse(category)},
                }))
            break;

            case true:
                dispatch(setRemoveMovie({
                    doc_id: movieDetails.doc_id,
                }))
            break;
        }
    }

    function handleWatchnowButton(e) {
        e.preventDefault();
    }

    //graps the state of the Watchlist when we refresh the page so it doesnt change the state to its initial state (basically preserves the state).
      useEffect(() => {
        const data = window.localStorage.getItem('Watch_Later_List');
        if (data != null) {
            dispatch(setPerserveList({
                watchLaterList: JSON.parse(data)
            }))
        }
    },[])

     useEffect(() => {
        window.localStorage.setItem('Watch_Later_List', JSON.stringify(watchlaterList));
        const checkMovieInList = watchlaterList.find((movie)=> movie.doc_id == movieDetails.doc_id)
        if(checkMovieInList){
            setAddToWatchlist(true)
        }
        else{
            setAddToWatchlist(false);
        }
    },[watchlaterList, movieDetails])

  
    return (
            <ButtonsContainerStyled>
                        <WatchnowButton
                            onClick = {handleWatchnowButton}
                        >
                            <span>
                                <i className = 'fa fa-play'/>
                            </span>
                            <span>Watch Now</span>
                        </WatchnowButton>
                        <WatchLaterButton
                            onClick = {handleWatchlist}
                            onMouseOver = {() => setShowToolBox(true)}
                            onMouseLeave = {() => setShowToolBox(false)}
                        >
                            <span>
                                <i className = {!addToWatchlist ? 'fa fa-plus' : "fa fa-check"}/>
                            </span>
                            {showToolBox && <PopTextStyled className = "animate__animated animate__fadeInUp">
                                <span>
                                    {!addToWatchlist? "Add to Watchlist": "Remove from Watchlist"}
                                </span>
                            </PopTextStyled>}
                        </WatchLaterButton>
                    </ButtonsContainerStyled>
    )

}

const ButtonsContainerStyled = styled.div`
   width:100%;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
`
const WatchnowButton = styled.button`
   max-width: 540px;
    position: relative;
    cursor: pointer;
    background-color: #e1e6f0;
    border-radius: 8px;
    min-width: min-content;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:5px;
    transition: all .3s;
    span {
        color: #0f1014;
        font-size: 20px;
        font-weight: 600;
        line-height: 20px;

        @media (min-width: 1275px) {
            font-size: 26px;
        }
        @media (min-width: 1920px) {
            font-size: 30px;
        }
    }

    &:hover {
        transform: scale(1.02);
    }
`
const WatchLaterButton = styled.div`
    cursor: pointer;
    position:relative;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    height: 100%;
    background: rgba(255,255,255,0.08);
    transition: all .3s;
    border-radius: 8px;
    
    span {
        @media (min-width: 1920px) {
            padding: 19px 24px;
            font-size: 30px;
        }
        padding: 16px 19px;
        font-size: 15px;
    }

    i {
        padding:0;
    }

    &:hover {
        background: rgba(238, 238, 238, .3);
    }

`

const PopTextStyled = styled.div`

            position:absolute;
            text-align: center;
            min-width: max-content;
            bottom: 120%;
            margin-left: -60px;
            left: 100%;
            z-index:1;
            display:block;
            padding: 8px 12px !important;
            font-size: 10px !important;
            font-weight: 500;
            line-height: 16px;
            background: rgba(15.16,20,.8);
            color: #fff;
            border-color: #252833;
            border-radius: 10px;
            border-width: 1px;
            text-align: center;
`

export default ButtonsContainer;