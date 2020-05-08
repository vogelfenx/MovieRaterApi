import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome')


class MovieDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high});
    }

    rateClicked = stars => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Token 691aff3fe3c45bb695a91b5f26b52948cf545a60'
                'Authorization': 'Token 9878f1e92af53b04874392ac44aa6a0403c25fe7'
            },
            body: JSON.stringify({stars: stars + 1})
        }).then( resp => resp.json())
        .then( res => this.getDetails())
        .catch( error => console.log(error))
    }

    getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 691aff3fe3c45bb695a91b5f26b52948cf545a60'
            }
        }).then( resp => resp.json())
        .then( res => this.props.updateMovie(res))
        .catch( error => console.log(error))
    }

    render() {
        const mov = this.props.movie
    
        return (
            <React.Fragment>
                { mov ? (
                        <div>
                            <h3>{mov.title}</h3>
                            <FontAwesome name="star" className={mov.avg_rating > 0 ? 'orange': ''}/>
                            <FontAwesome name="star" className={mov.avg_rating > 1 ? 'orange': ''}/>
                            <FontAwesome name="star" className={mov.avg_rating > 2 ? 'orange': ''}/>
                            <FontAwesome name="star" className={mov.avg_rating > 3 ? 'orange': ''}/>
                            <FontAwesome name="star" className={mov.avg_rating > 4 ? 'orange': ''}/>
                            ({mov.no_of_ratings})
                            <p>{mov.description}</p>
                            <div className="rate-container">

                                <h2>Rate it !!!</h2>

                                {[...Array(5)].map( (e, i) => {
                                    return <FontAwesome key={i} name="star" className={this.state.highlighted > i - 1 ? 'purple': ''} onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>
                                })}
                            </div>   
                        </div>
                    ) : null
                }
            </React.Fragment>
        )
    }
}


export default MovieDetails;