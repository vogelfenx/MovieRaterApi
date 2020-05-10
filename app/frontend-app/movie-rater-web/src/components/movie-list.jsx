import React from 'react';
var FontAwesome = require('react-fontawesome');

function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    }

    const removeClicked = movie => evt => {

        // props.movieDeleted(movie) //use it for DEBUG and comment out the fetch

        fetch(`${process.env.REACT_APP_MOVIE_API_URL}/api/movies/${movie.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Token 691aff3fe3c45bb695a91b5f26b52948cf545a60'
            }
          }).then( resp => props.movieDeleted(movie))
          .catch( error => console.log(error))
    }

    return(
        <div>
            { props.movies.map( movie => {
                return (
                    <div className="movieList">
                        <h3 key={movie.id} onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <div className="movieList__edit-update">
                            <FontAwesome name="edit" className="movieList__update" />
                            <FontAwesome name="trash" className="movieList__trash" onClick={removeClicked(movie)} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieList;