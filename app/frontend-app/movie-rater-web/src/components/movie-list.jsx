import React from 'react';
var FontAwesome = require('react-fontawesome');

function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    }

    const removeClicked = movie => evt => {
        alert("this film will be deleted");
        //props.removeClicked(movie);
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