import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

class MovieForm extends Component {

  state = {
    editedMovie: this.props.movie
  }

  cancelMovieForm = movie => evt => {
      this.props.cancelMovieForm(movie);
  }

  inputChanged = event => {
      // console.log("input changed");
    let movie = this.state.editedMovie
    movie[event.target.name] = event.target.value
    this.setState({editedMovie: movie})
  }

  saveMovie = () => event => {
    fetch(`${process.env.REACT_APP_MOVIE_API_URL}/api/movies/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`,
        },
        body: JSON.stringify(this.state.editedMovie)
    }).then( resp => resp.json())
    .then( res => this.props.newMovie(res))
    .catch( error => console.log(error))
  }

  updateMovie = () => event => {
    fetch(`${process.env.REACT_APP_MOVIE_API_URL}/api/movies/${this.state.editedMovie.id}/`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`,
      },
      body: JSON.stringify(this.state.editedMovie)
  }).then( resp => resp.json())
  .then( res => this.props.editedMovie(res))
  .catch( error => console.log(error))
  }
  
  render() {
    const isDisabled = this.state.editedMovie.title.length == 0 ||
                       this.state.editedMovie.description.length == 0

    return (
      <React.Fragment>
          <span>Title</span> <br/>
          <input type="text" name="title" value={this.props.movie.title} onChange={this.inputChanged} /> <br/>
          <span>Description</span> <br/>
          <textarea name="description" value={this.props.movie.description} onChange={this.inputChanged} /> <br/>
          
          <div className="movie-form__button-grp">
            {this.props.movie.id ? 
              <button onClick={this.updateMovie()}>update</button> :
              <button disabled={isDisabled} onClick={this.saveMovie()}>save</button>}

            <button onClick={this.cancelMovieForm(this.state.editedMovie)}>cancel</button>
          </div>
      </React.Fragment>
    );
  }

}

export default MovieForm;
