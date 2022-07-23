import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import { selectCategories} from "../features/pageSlice";
import MovieCard from "./MovieCard";
import { useEffect} from "react";
import { getCategories } from "../functions/movieDB_API";
import {categoriesByPage} from "../data/categories";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation} from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation';

/* This is a scalable component that has categories of movies. 
    We can add as much categories as we want to it if its available in our database (/data/categories), without
    writing any extra code. It will automatically scale.
*/

const Categories = ({categoriesForPage}) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories); 
    const categoriesTitles = categoriesByPage[categoriesForPage];
    
    //a hook to grap the categories from the database.
    useEffect(() => {
        getCategories(categoriesTitles, dispatch)  
    },[categoriesTitles])

    return (
        <Container>
            {categories.map(({movies, title, key}) => {
                return (
                    <div key = {key} >
                        <h2>{title}</h2>
                            <Swiper
                                modules = {[Navigation]}
                                slidesPerGroup = {6}
                                slidesPerView = {6}
                                spaceBetween = {5}
                                navigation = {true}
                            >
                                {movies.map(({id, movieDetails}) => {

                                    return (
                                        <SwiperSlide>
                                            <MovieCard key = {movieDetails.movie_id} {...movieDetails} category = {title} doc_id = {id}/>
                                        </SwiperSlide>      
                                    )
                                })}
                            </Swiper>
                       
                    </div>
                )
            })}
        </Container>
    )
}


const Container = styled.div`
    position: relative;
    margin-left:10px;

    h2 {
        margin-block-end: 0px;
    }
`
export default Categories