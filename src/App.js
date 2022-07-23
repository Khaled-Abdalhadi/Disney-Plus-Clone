import {BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom'
import { Home, Series, Movies, Search, WatchLaterList, Studio, Watch_Movie_TV_Show, Intro} from "./pages"
import ScrollToTop from './components/scrollToTop';


function App() {
  return (
    <div className="page">
      <Router>
        <ScrollToTop /> 
        <Switch>
          <Route exact path =  "/" element = {<Intro/>}/>
          <Route path = "/home" element = {<Home/>}/>
          <Route path = "/shows" element = {<Series/>}/>
          <Route path = "/movies" element = {<Movies/>}/>
          <Route path = "/:name" element = {<Search />} />
          <Route path = "/watchlist" element = {<WatchLaterList />} />
          <Route path = "/studio/:studioName" element = {<Studio/>}/>
          <Route path = "/:movie_tv/:name/:id" element = {<Watch_Movie_TV_Show/>} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
