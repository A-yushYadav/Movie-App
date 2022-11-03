import React,{ useState , useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';
import AddFavourite from './AddFavourites';
import RemoveFavourites from './RemoveFavourites';



function App() {
 
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async(searchValue) =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5a97fd21`;
               
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.search){
      setMovies(responseJson.search);
    }
  }; 

  useEffect(() => {
   getMovieRequest(searchValue);
  },[searchValue]);

  const AddFavouriteMovie = ( movie )=>{
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }
  

  const removeFavouriteMovie=(movie)=>{
    const  newFavouriteList = favourites.filter(
      (favourite)=>favourite.imdbID !== movie.imdbID
    );
  }
 
  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-item-center mt-4 mb-4">
        <MovieListHeading  heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handelFavouritesClick={AddFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
      </div>
     <div className="row d-flex align-items-center  mt-4 mb-4">
      <MovieListHeading heading="Favourites"/>
     </div>
     <div className="row">
      <MovieList
      movies={favourites}
      handelFavouritesClick={removeFavouriteMovie}
      favouriteComponent={RemoveFavourites}
      />
     </div>
    </div>
  );
}

export default App;
