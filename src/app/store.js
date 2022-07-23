import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import pageReducer from "../features/pageSlice";
import watchLaterReducer from '../features/watchLaterSlice';

/* 
    We store all the reducers that controls the state of the app here. Check the page and watchlater reducers. 
    The reducer functions and their initial states can be found in the features folder.
*/

export default configureStore({
    reducer: {
        page: pageReducer,
        watchLater: watchLaterReducer,
    },

    middleware: getDefaultMiddleware({
        serializableCheck: false, 
    }),
});
