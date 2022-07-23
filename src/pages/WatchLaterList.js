import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useRef} from "react";
import {selectWatchLaterList, setPerserveList, setRemoveMovie, setRemoveAll} from "../features/watchLaterSlice.js";
import {setLoadPage} from "../features/pageSlice";
import {Link} from "react-router-dom"
import {PageContent} from "../components/styles";
import SideBar from "../components/SideBar.js";
const WatchList = ( ) => {
    const dispatch = useDispatch();
    const watchLaterList = useSelector(selectWatchLaterList);
    const movieRef = useRef([])
    const listRef = useRef(null)
    const trashRef = useRef([])

    //this useEffect will perserve the the list in our local storage when the component first renders and will not
    // set the watchLaterList state to its initial state
    useEffect(() => {
        const data = window.localStorage.getItem('Watch_Later_List');
        if (data != null) {
            dispatch(setPerserveList({
                watchLaterList: JSON.parse(data)
            }))
        }
    },[])

    //this useEffect will add our new list state to our local storage and saves it so we can perserve it.
     useEffect(() => {
        window.localStorage.setItem('Watch_Later_List', JSON.stringify(watchLaterList));
    },[watchLaterList])

    const handleList = (id,e, index) => {
        e.preventDefault()
        console.log(movieRef.current[index])
        movieRef.current[index].classList.add("delete-watchList")
        setTimeout(() => {
            movieRef.current[index].classList.remove("delete-watchList")
            dispatch(setRemoveMovie({
                doc_id: id,
    }))
        },300)       
    }

    const handleLink = (category) => {
        window.localStorage.setItem('category', JSON.stringify(category))
        dispatch(setLoadPage({
            loadPage: true,
        }))
    }
    const clearAll = () => {
        listRef.current.classList.add("delete-watchList")
        setTimeout(() => {
            dispatch(setRemoveAll({
            movie: [],
        }))
        },300)
        
    }

    const showToolBox = (index) => {
        trashRef.current[index].classList.add("showToolBox", "animate__animated", "animate__fadeInUp")
    }  

    const deleteToolBow = (index) => {
        trashRef.current[index].classList.remove("showToolBox", "animate__animated", "animate__fadeInUp")
    }

    if (watchLaterList.length == 0) {
        return (
            <>
                <SideBar/>
                <EmptyList>
                    <span>
                        <h1>Your Watchlist is empty!</h1>
                    </span>
                </EmptyList>
            </>
        )
    }

    return (
        <>  
            <SideBar/>
            {watchLaterList.length > 0 && 
                <PageContent>
                <Content ref = {listRef}>
                    {watchLaterList.map((movie, index) => {
                        console.log(index)
                        return (
                            <LinkStyled  to = {`/${movie.movie_tv}/${movie.title}/${movie.doc_id}`}
                                         ref = {el => movieRef.current[index] = el}
                                         onClick = {() => handleLink(movie.category)}
                                         >
                                <Wrap key = {movie.movie_id}>
                                    <div>
                                        <img src = {movie.cardImg}/>
                                    </div>
                                    <Detail>
                                        <Wrapper>
                                                <Title>
                                                    <div>
                                                        <a href = {`/${movie.type}/${movie.id}`} alt = {movie.title} target= "_blank">
                                                            <h2>{movie.title}</h2>
                                                        </a>
                                                    </div>
                                                </Title>
                                        </Wrapper> 
                                        <OverView>
                                            <p>{movie.description.overview}</p>
                                        </OverView>
                                    </Detail>
                                    <RemoveCardBtn>
                                            <TrashIcon onClick = {(e) => handleList(movie.doc_id, e, index)}
                                                       onMouseEnter = {(() => showToolBox(index))}
                                                       onMouseLeave = {() => deleteToolBow(index)}>
                                                <i className = "fa fa-trash" />
                                                <PopTextStyled
                                                        ref = {el => trashRef.current[index]= el}>
                                                    <span>Delete</span>
                                                </PopTextStyled>
                                            </TrashIcon>
                                            
                                    </RemoveCardBtn>
                                </Wrap>
                            </LinkStyled>
                        )
                    })}
                </Content>
                {watchLaterList.length > 1 && <ClearAllBtn onClick = {clearAll}>
                     <span>Clear List</span>
                </ClearAllBtn>}
            </PageContent>}
        </>
    )
}


const Content = styled.div`
    position: relative;
    height: auto;
    overflow:hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
`

const Wrap = styled.div`
    position: relative;
    border: 2px solid transparent;
    border-radius: 10px;
    width:(100% - 50px);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    display: flex;
    overflow: hidden;
    margin: 15px 20px;


    img {
        min-width: 94px;
        border-radius: 4px;
        width: 8vw;
        aspect-ratio: 9/16;
        height:100%;
    }

    &:hover {
        box-shadow: rgb(0 0 0/80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22x -10px;
        border-color: white;
        transform: scale(1.01);
    }

    

`

const LinkStyled = styled(Link)`
    width: 100%;
`
const RemoveCardBtn = styled.div`
    flex-grow: 1;
    position:relative;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
`

const TrashIcon = styled.div`
    opacity: 0.6;
    transition: opacity 300ms;
    position: relative;
    margin-left: auto;
    padding-right: 20px;

    &:hover {
            opacity: 1
        } 

`


const Detail = styled.div`
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    gap: 20px;

        width: 250px;
    @media (min-width: 800px) {
        width: 600px;
        font-size: 14px;
    }

    @media (min-width: 950px) {
        width: 800px
    }

    @media (min-width: 1275px) {
        width: 900px;
        font-size: 20px;
        
    }

    @media (min-width: 1920px) {
        width: 1600px;
        font-size: 26px;
        line-height: 36px;
    }
 
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;

`
const Title = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    overflow: hidden;

    h2 {
        font-size: 1.2em;
        line-height: 1.2em;
        margin-bottom: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
    }

   

    span {
        white-space: nowrap;
        color: #999;
    }
`
const OverView = styled.div`
    display: block;
    height: auto;

    p {
       
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0;
    }

`

const ClearAllBtn = styled.button`
    background-color: rgb(128,0,0);
    color: #0f1014;
    display: block;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    padding: 10px 24px;
    font-size:15px;
    margin: 0 auto;
    
    margin-top: 60px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1.5px;
    transition: all 0.6s ease 0s;

    &:hover {
        background-color: red;
        transform: scale(1.01);
        color: white;
    }

     @media (min-width: 1275px) {
            font-size: 20px;
        }
        @media (min-width: 1920px) {
            font-size: 30px;
        }
`

const EmptyList  = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
`

const PopTextStyled = styled.div`

            position:absolute;
            text-align: center;
            min-width: max-content;
            bottom: 60px;
            right: 5px;
            z-index:1;
            display:block;
            padding: 8px 12px !important;
            font-size: 10px !important;
           visibility: hidden;
            font-weight: 500;
            line-height: 16px;
            background: red;
            color: #fff;
        
            border-radius: 10px;
            border-width: 1px;
            text-align: center;
            
            span {
                font-size: 15px;
                font-weight: 900;
            }
`
export default WatchList;