import { createSlice } from "@reduxjs/toolkit";
import { homeCarousel } from "../data/heroData";

const initialState = {
    loadPage: true,
    categories: [],
    movieDetails:{title: "Toy Story 4",
            movie_tv: "movie",
            cardImg: "https://image.tmdb.org/t/p/original/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg",
            doc_id: "SGqcPOq4m4j9rk9Nia8G",
            backgroundImg: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/8760/1268760-i-1a2fd988c91e",
            titleImg: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3128/1273128-t-7b5f3575aa95",
            info: {year: '2019', duration: '1h 44m', company: 'Disney', languages: '3 Languages', age: '7+'},
            description:{overview: 'Pixar Animation Studios proudly presents the adeventure of a lifetime!'},
            genre: ['Animation', 'Family', 'Comedy']},
    activeCarousel: homeCarousel,
    backgroundTransition: true,
};


const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setLoadPage: (state, action) => {
            state.loadPage = action.payload.loadPage;
        },
        setCategories: (state, action) => {
            state.categories = action.payload.categoriesList.map(({title, movies}) => {
                return (
                    {
                        title,
                        movies,
                    }
                )
            })
        },
        setMovieHero: (state, action) => {
            state.movieHero = {...action.payload.movieHero}
            state.backgroundTransition = action.payload.backgroundTransition;
        },
        setMovieDetails: (state,action) => {
            state.movieDetails = {...action.payload.movieDetails}
        },
        setActiveCarousel: (state, action) => {
            state.activeCarousel = action.payload.activeCarousel
        },
        setBackgroundTransition: (state, action) => {
            state.backgroundTransition = action.payload.transition
        }
    }
});

export const {setCategories, setLoadPage, setMovieHero, setMovieDetails, setActiveCarousel, setBackgroundTransition} = pageSlice.actions


export const selectCategories = state => state.page.categories;
export const selectLoadPage = state => state.page.loadPage;
export const selectMovieDetails = state => state.page.movieDetails;
export const selectActiveCarousel = state => state.page.activeCarousel;
export const selectBackgroundTransition = state => state.page.backgroundTransition;


export default pageSlice.reducer;