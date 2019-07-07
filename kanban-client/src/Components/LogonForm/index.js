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
            passwordConf: "",
            pswShortError: false,
            pswEqlError: false,
            loginLoading: false,
            serverError: false,
            registerLoading: false,
            redirect: false
        }
    }

    updateEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    updatePasswordConf = (event) => {
        this.setState({ passwordConf: event.target.value });
    }

    submit = (event) => {
        event.preventDefault();
        var validData = true;

        if (this.state.password.length < 6) {
            this.setState({ pswShortError: true });
            validData = false;
        }
        if (this.state.password !== this.state.passwordConf) {
            this.setState({ pswEqlError: true });
            validData = false;
        }
        if (!validData) return;

        this.setState({ registerLoading: true });

        API.post('/auth', {
            "email": this.state.email,
            "password": this.state.password
        }).then(res => {

            API.post('/auth/sign_in', {
                "email": this.state.email,
                "password": this.state.password
            }).then(res => {
                helpers.setHeaders(res.headers);
                this.setState({ redirect: true });
            }).catch(err => {
                console.log(err);
                this.setState({ serverError: true, registerLoading: false });
            });

        }).catch(err => {
            console.log(err);
            this.setState({ serverError: true, registerLoading: false });
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        return (
            <form className="box content" onSubmit={this.submit}>
                <div className="has-text-centered">
                    <h2>Welcome!</h2>
                </div>
                {this.state.serverError
                    ? <div className="notification is-danger">Oops! Could not submit to server.</div>
                    : ""
                }
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
                            className={`input ${this.state.pswShortError ? "is-danger" : ""}`}
                            value={this.state.password}
                            onChange={this.updatePassword}
                            type="password"></input>
                    </div>
                    {this.state.pswShortError
                        ? <p className="help is-danger">Password too short!</p>
                        : null
                    }
                </div>

                <div className="field">
                    <label className="label ">Password confirmation</label>
                    <div className="control">
                        <input
                            className={`input ${this.state.pswEqlError ? "is-danger" : ""}`}
                            value={this.state.passwordConf}
                            onChange={this.updatePasswordConf}
                            type="password"></input>
                    </div>
                    {this.state.pswEqlError
                        ? <p className="help is-danger">Passwords are not equal!</p>
                        : null
                    }
                </div>

                <br></br>
                <div className="field">
                    <div className="control buttons">
                        <button
                            type="submit"
                            className={`button is-info is-fullwidth ${this.state.registerLoading ? "is-loading" : ""}`}
                        >Dive in!</button>
                    </div>
                </div>
            </form>
        );
    }
}