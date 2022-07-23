
/* 
   This script is just for refrence on how I fetch movie details from www.themoviedb.org then add it to my database on firestore.

   I have restricted permission for developers to write data on the database however, I have shown in the functions below
   how its done with the data schema modal I have used. 

   You will need to create your own API Key if you want to fetch movie details from www.themoviedb.org as I have made
   my key private and it will not be shown for the public.

   If you have any questions in regards to any of these functions or any other scripts in the code base please contact me

*/

import db from "../firebase";
import {setCategories, setLoadPage} from "../features/pageSlice";
import {getDocs, collection} from "firebase/firestore"
const base_url = "https://api.themoviedb.org/3"
const api_key = `api_key=${process.env.API_KEY}` //replace the env variable with ur api key!!
const type = ''; //movie or tv ?
const id = '' // id number of the movie from https://www.themoviedb.org/
const category = '' //the name of the collection in your firestore db in which to add the document in


//add a series to the firestore db
async function addSeriesToDb(path, queryString, category) {
    const endpoint_url = base_url+path+api_key+queryString
    const response = await fetch(endpoint_url);
    const {
        backdrop_path,
        poster_path,
        overview,
        genres,
        first_air_date,
        number_of_seasons,
        languages,
        id,
        name,
        videos,
        vote_average,
    } = await response.json();
    var trailer = null;
    const {results} = videos
    if(Object.keys(results).length !=0) {
        console.log(results)
        const trailerList = results.filter((result) => result.type === "Trailer")
        if (trailerList) {
            trailer = `https://www.youtube.com/embed/${trailerList[0]}`
        }
        else {
            trailer = null
           
        }
    }
    else {
        trailer = null;
        
    
    }
    const genreList = genres.map(({name}) => {
        return name
    })

    const languagesTotal = languages.length;
    const date = first_air_date.split("-");
    const year = date[0];
    const ratings = Math.round(vote_average*10);

    //series Modal
    const series = {
        backgroundImg: `https://image.tmdb.org/t/p/original${backdrop_path}`,
        cardImg: `https://image.tmdb.org/t/p/original${poster_path}`,
        description: {overview},
        genre: genreList,
        info: {
            age: null,
            company: null,
            duration: `${number_of_seasons} seasons`,
            languages: `${languagesTotal} langauges`,
            year,
        },
        movie_id: id.toString(),
        movie_tv: 'tv',
        title: name,
        ratings: ratings.toString(),
        trailer,
    }
    //adding document to movies collection
     db.collection(category).add(series);
}

//add a movie to the cloud firebase db
async function addMovieToDb(path, queryString, category) {
    const endpoint_url = base_url+path+api_key+queryString
    const response = await fetch(endpoint_url);
    const {
        backdrop_path,
        poster_path,
        overview,
        genres,
        release_date,
        runtime,
        spoken_languages,
        id,
        title,
        videos,
        vote_average,
    } = await response.json();
    var trailer = null;
    const {results} = videos
    if(Object.keys(results).length !=0) {
        const trailerList = results.filter((result) => result.type === "Trailer")
        if (trailerList) {
            trailer = `https://www.youtube.com/embed/${trailerList[0]}`
        }
        else {
            trailer = null
           
        }
    }
    else {
        trailer = null;
        
    
    }
    const genreList = genres.map(({name}) => {
        return name
    })

    const languagesTotal = spoken_languages.length;
    const date = release_date.split("-");
    const year = date[0];
    const ratings = Math.round(vote_average*10);
    function timeConvert(runtime){
        var num = runtime;
        var hours = (num/60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) *60;
        var rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }
    const duration = timeConvert(runtime);

    //movie modal
    const movie = {
        backgroundImg: `https://image.tmdb.org/t/p/original${backdrop_path}`,
        cardImg: `https://image.tmdb.org/t/p/original${poster_path}`,
        description: {overview},
        genre: genreList,
        info: {
            age: null,
            company: null,
            duration,
            languages: `${languagesTotal} languages`,
            year,
        },
        movie_id: id.toString(),
        movie_tv: 'movie',
        title,
        ratings: ratings.toString(),
        trailer,
    }
    //adding document to movies collection
     db.collection(category).add(movie);
}

//function to post data onto the data base
function postData(type, id, category) {
    switch (type) {
        case 'tv':
            addSeriesToDb(`/${type}/${id}?`, '&append_to_response=videos&language=en-US', category)
        break;
    
        case 'movie':
            addMovieToDb(`/${type}/${id}?`, '&append_to_response=videos&language=en-US', category)

    }
}

//function to the get the cateogires of the respective page we are actively on.
async function getCategories(categoriesTitles, dispatch) {
            const categoriesList = [];
            await Promise.all(categoriesTitles.map(async(title) => {
            const movies = [];
            const querySnapshot = await getDocs(collection(db, title))
            querySnapshot.forEach((doc) => {
                const movieDetails = {id: doc.id, movieDetails: doc.data()}
                movies.push(movieDetails)
            })
            categoriesList.push({
                title,
                movies,
            })
        }))
        dispatch(setCategories({
            categoriesList,
        }))
        dispatch(setLoadPage({
            loadPage: false
        }))
        }

//updateData(collection)
//postData(type, id, category)

  export  {getCategories};