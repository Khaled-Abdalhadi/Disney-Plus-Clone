import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    watchLaterList: [],
};

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        setAddMovie: (state, action) => {
            state.watchLaterList = [...state.watchLaterList, {...action.payload.movieDetails}]
        } ,

        setPerserveList: (state, action) => {
        state.watchLaterList = action.payload.watchLaterList
    },

    setRemoveMovie: (state, action) => {
        const newList = state.watchLaterList.filter(movie => movie.doc_id != action.payload.doc_id)
        state.watchLaterList = newList
    },

    setRemoveAll: (state, action) => {
        state.watchLaterList = action.payload.movie
    },
}
    
});

export const { setAddMovie, setPerserveList, setRemoveMovie, setRemoveAll} = watchLaterSlice.actions

export const selectWatchLaterList = state => state.watchLater.watchLaterList;


export default watchLaterSlice.reducer;