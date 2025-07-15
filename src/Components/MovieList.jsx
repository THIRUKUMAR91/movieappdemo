import React from 'react';

const MovieList = (props) => {
  const FavouriteComponent = props.favouritesComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="col-sm-3 mb-4 d-flex flex-column align-items-center">
          <img src={movie.Poster} alt="movie" />
          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className="col-sm-3 mb-4 d-flex flex-column align-items-center"
          >
            {<FavouriteComponent/>}
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
