import React, {Component} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'
import { withCookies } from 'react-cookie';
var FontAwesome = require('react-fontawesome');

class App extends Component {

  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token'),
  }

  componentDidMount() {
    if(this.state.token) {
      fetch(`${process.env.REACT_APP_MOVIE_API_URL}/api/movies/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      }).then( resp => resp.json())
      .then( res => this.setState({movies: res}))
      .catch( error => console.log(error))
    } else {
      window.location.href = "#/";
    }
    
  }

  loadMovie = movie => {
    this.setState({selectedMovie: movie, editedMovie: null})
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter( movie => movie.id !== selMovie.id)
    this.setState({movies: movies, selectedMovie: null})
  }

  editClicked = selMovie => {
    this.setState({editedMovie: selMovie})
  }

  addMovie = () => {
    console.log("1 addMovie");
    this.setState({editedMovie: {title: '', description: ''}})
  }

  newMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]})
  }

  cancelMovieForm = movie => {
    this.setState({editedMovie: null})
    if (movie.title.length > 0) this.loadMovie(movie)
  }

  render() {
    
    return (
      
      <div className="App">
        <h1>
          <FontAwesome name="film"/>
          <span>Movie Rater</span>
        </h1>

        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
          movieDeleted={this.movieDeleted} editClicked={this.editClicked} addMovie={this.addMovie} token={this.state.token} />
          <div>
            { !(this.state.editedMovie) ? (
              <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token}/>
            ) : <MovieForm key={this.state.editedMovie.id} movie={this.state.editedMovie} newMovie={this.newMovie} cancelMovieForm={this.cancelMovieForm} editedMovie={this.loadMovie} token={this.state.token}/>}
          </div>
        </div>

      </div>
    );
  }

}

export default withCookies(App);
