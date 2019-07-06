import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../api';
import * as helpers from '../../helpers';


export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.setRedirect = this.setRedirect.bind(this)
    }

    state = {
        email: "",
        password: "",
        redirect: false
    }

    updateEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    setRedirect = () => {
        this.setState({ redirect: true });
    }

    submit = (event) => {
        event.preventDefault();

        API.post('/auth/sign_in', {
            "email": this.state.email,
            "password": this.state.password
        }).then(res => {
            helpers.setHeaders(res.headers);
            setTimeout(this.setState({ redirect: true }), 100)
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }
        return (
            <form className="box content" onSubmit={this.submit}>
                <div className="has-text-centered">
                    <h2>Login</h2>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            value={this.state.email}
                            onChange={this.updateEmail}
                            type="email"
                            placeholder="e.g. example@email.com"></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            value={this.state.password}
                            onChange={this.updatePassword}
                            type="password"></input>
                    </div>
                </div>

                <br></br>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-info is-fullwidth">Login</button>
                    </div>
                </div>
            </form>
        );
    }
}