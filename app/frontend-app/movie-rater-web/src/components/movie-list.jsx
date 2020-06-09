import React from 'react';
var FontAwesome = require('react-fontawesome');

function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    }

    const editClicked = movie => evt => {
        props.editClicked(movie);
    }

    const addMovie = () => evt => {
        props.addMovie();
    }

    const removeClicked = movie => evt => {

        // props.movieDeleted(movie) //use it for DEBUG and comment out the fetch

        fetch(`${process.env.REACT_APP_MOVIE_API_URL}/api/movies/${movie.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${props.token}`,
            }
          }).then( resp => props.movieDeleted(movie))
          .catch( error => console.log(error))
    }

    return(
        <div>
            { props.movies.map( movie => {
                return (
                    <div className="movieList" key={movie.id}>
                        <h2 onClick={movieClicked(movie)}>
                            {movie.title}
                        </h2>
                        <div className="movieList__edit-update">
                            <FontAwesome name="edit" className="movieList__update" onClick={editClicked(movie)} />
                            <FontAwesome name="trash" className="movieList__trash" onClick={removeClicked(movie)} />
                        </div>
                    </div>
                )
            })}
            Add new movie <FontAwesome name="plus-square" className="movieList__add" onClick={addMovie()} />
        </div>
    )
}

export default MovieList;