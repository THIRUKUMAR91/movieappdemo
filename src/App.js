import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourties';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
   const [favourites, setfavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=68162520`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]); // clear list if no results
    }
  };

  useEffect(() => {
    if (searchValue.trim() !== '') {
      getMovieRequest(searchValue);
    } else {
      setMovies([]); // clear movies if search box is empty
    }
  }, [searchValue]);




  const saveToLocalStorage =(items) =>{
    localStorage.setItem("react-movie-app-favourites",JSON.stringify(items))
  }

  const AddFavouritesMovie =(movie) => {
    const newFavouritesList =[...favourites,movie];
    setfavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
  }

 const removeFavouriteMovie = (movie) => {
  const newFavouritesList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );
  setfavourites(newFavouritesList); // ← you forgot to update the state!
  saveToLocalStorage(newFavouritesList);
};


  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies}
        handleFavouritesClick={AddFavouritesMovie}
        favouritesComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-item-center mt-4 mb-4'>
       <MovieListHeading heading="Favourites"/>
      </div>
      <div className="row">
       <MovieList
  movies={favourites}
  handleFavouritesClick={removeFavouriteMovie}  // ✅ Corrected name
  favouritesComponent={RemoveFavourites}        // ✅ Also fix spelling here
/>

      </div>
    </div>
  );
}

export default App;
