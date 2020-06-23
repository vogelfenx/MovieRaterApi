import React, { Component } from "react";
import { withCookies } from 'react-cookie';


class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true,
    }

    inputChanged = event => {
        let credentials = this.state.credentials
        credentials[event.target.name] = event.target.value
        this.setState({credentials: credentials})
    }

    loginUser = event => {
        if (this.state.isLoginView) {
            fetch(`${process.env.REACT_APP_MOVIE_API_URL}/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => {
                this.props.cookies.set('mr-token', res.token)
                if (res.token) { 
                    window.location.href = "#/movies" 
                }
            })
            .catch( error => console.log(error))     
        } else {
            fetch(`${process.env.REACT_APP_MOVIE_API_URL}/api/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => this.setState({isLoginView: true}) )
            .catch( error => console.log(error))     
        }
   
    }

    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView})
    }

    render() {
        
        return (
            <div className="login-container">
                <h1>
                    {this.state.isLoginView ? 'Login' : 'Register'}
                </h1>
                <span>Username</span> <br/>
                <input type="text" name="username" value={this.state.username} onChange={this.inputChanged} /> <br/>
                
                <span>Password</span> <br/>
                <input type="password" name="password" value={this.state.password} onChange={this.inputChanged} /> <br/>
            
                <button onClick={this.loginUser}>Login</button>
                <p onClick={this.toggleView}>
                    {this.state.isLoginView ? 'Create Account' : 'Back to Login'}
                </p>
            </div>
        );
      }
}


export default withCookies(Login);