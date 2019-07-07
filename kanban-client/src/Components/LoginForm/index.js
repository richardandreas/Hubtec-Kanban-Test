import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../api';
import * as helpers from '../../helpers';


export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            serverError: false,
            loginLoading: false,
            registerLoading: false,
            redirect: false,
            redirectLogon: false
        }
    }

    updateEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    submit = (event) => {
        event.preventDefault();
        this.setState({ loginLoading: true });

        API.post('/auth/sign_in', {
            "email": this.state.email,
            "password": this.state.password
        }).then(res => {
            helpers.setHeaders(res.headers);
            this.setState({ redirect: true });
        }).catch(err => {
            console.log(err);
            this.setState({ serverError: true, loginLoading: false });
        });
    }

    logon = () => {
        this.setState({ redirectLogon: true });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }
        if (this.state.redirectLogon) {
            return (<Redirect to="/logon" />);
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
                            className={`input ${this.state.serverError ? "is-danger" : ""}`}
                            value={this.state.email}
                            onChange={this.updateEmail}
                            type="email"
                            placeholder="e.g. example@email.com"></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label ">Password</label>
                    <div className="control">
                        <input
                            className={`input ${this.state.serverError ? "is-danger" : ""}`}
                            value={this.state.password}
                            onChange={this.updatePassword}
                            type="password"></input>
                    </div>
                    {this.state.serverError
                        ? <p className="help is-danger">User or password invalid!</p>
                        : null
                    }
                </div>

                <br></br>
                <div className="field">
                    <div className="control buttons">
                        <button
                            type="submit"
                            className={`button is-info is-fullwidth ${this.state.loginLoading ? "is-loading" : ""}`}
                        >Sign in</button>
                    </div>

                    <div className="control buttons">
                        <button
                            onClick={this.logon}
                            className={`button is-info is-fullwidth is-outlined ${this.state.registerLoading ? "is-loading" : ""}`}
                        >Sign up</button>
                    </div>
                </div>
            </form>
        );
    }
}