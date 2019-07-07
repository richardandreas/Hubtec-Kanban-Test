import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Header.css'


export default class Header extends Component {
    state = {
        hasLogout: this.props.hasLogout,
        redirect: false
    }

    signOut = () => {
        console.log("HEllo")
        localStorage.clear();
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/login" />);
        }

        return (
            <div className="navbar" aria-label="main navigation">
                <div className="container is-fullhd is-flex">
                    <div className="navbar-brand">
                        <h1 className="navbar-item title logo has-text-info">KANBAN</h1>
                    </div>
                    {this.state.hasLogout
                        ? <div className="navbar-end">
                            <div className="navbar-item">
                                <button
                                    className="button is-info is-outlined is-inverted is-medium"
                                    onClick={this.signOut}
                                >Sign out</button>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}