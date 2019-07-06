import React, { Component } from 'react';

export default class TaskCard extends Component {
    state = {
        id: this.props.id,
        title: this.props.title,
        end_date: this.props.end_date,
    }

    render() {
        return (
            <a>
                <div className="card">
                    <h1 className="title">{this.state.title}</h1>
                    <p>{this.state.end_date}</p>
                </div>
            </a>
        )
    }
}
