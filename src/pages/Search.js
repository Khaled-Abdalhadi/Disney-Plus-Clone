import styled from "styled-components";
import  {useEffect, useState, useRef} from "react";
import {collection,getDocs, query, where} from "firebase/firestore"
import { PageContent } from "../components/styles";
import { SideBar } from "../components";
import {allCategories} from "../data/categories"
import db from "../firebase";
import MovieCard from "../components/MovieCard";

const Search = () => {
    const [searchTerm , setSearchTerm] = useState('')
    const [queryItem, setQueryItem] = useState({})
    const [currentCateogry, setCurrentCategory] = useState('')
    const searchValue = useRef('')

    useEffect(() => {
        if(searchTerm == '') {
            setQueryItem({})
        }
        
        //we search all collections in the data base for the search term the user inputs in the search form
         async function searchMovie() {
            var queryTerm = searchTerm.toLowerCase();
            await Promise.all(allCategories.map(async (category)=> {
                const collectionRef = collection(db, category)
                const q = query(collectionRef, where("searchTerm", "==", queryTerm))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setQueryItem(doc.data())
                    setCurrentCategory(category)
                    
                })
            }))
        }
        searchMovie()
    }, [searchTerm])
    
    const handleChange = () => {
       setSearchTerm(searchValue.current.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <SideBar/>
            <PageContent>
                <Content>
                    <h2>Search for a Movie or TV show by name. The name must exactly match.</h2>
                    <form onSubmit = {handleSubmit}>
                        <input 
                        id = "name"
                        name = "name"
                        type = "text" 
                        onChange = {handleChange}
                        placeHolder = "search for a movie or a tv show..."
                        ref = {searchValue}
                        ></input>
                    </form>
                    {Object.keys(queryItem).length !=0 && <SearchQueryContainer>
                        <MovieCard {...queryItem} category = {currentCateogry} />
                    </SearchQueryContainer>}
                </Content>
            </PageContent>
        </>
    )
}


export default Search;


const Content = styled.div`
    position: relative;
    width: 100%;
    display:flex;
    flex-direction:column;
    flex-wrap: wrap;
    padding: 80px 40px;

    input {
        width: 100%;
        padding: 12px 20px;
        box-sizing: border-box;
        max-width: 600px;
    }

    @media (min-width: 1600px) {
        font-size: 24px;
    }

    @media (min-width: 1800px) {
        font-size: 30px;
    }
   
`
const SearchQueryContainer = styled.div`
    margin-top: 15px;
    width: 15vw;
    min-width: 100px;
  
`
const WatchList = styled.div`
    position: relative;
    width:100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 40px;
    overflow: hidden;
    padding: 30px;
    margin-top: 50px;

    @media (max-width: 1100px ) {
        grid-template-columns: repeat(2, minmax(0, 1fr))
    }

    @media (max-width: 840px) {
        grid-template-columns: repeat(1, minmax(0,1fr))
    }
    
`