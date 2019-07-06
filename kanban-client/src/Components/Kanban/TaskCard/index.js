import React, { Component } from 'react';

export default class TaskCard extends Component {
    state = {
        id: this.props.id,
        title: this.props.title,
        end_date: this.props.end_date,
    }

    render() {
        return (
            <a className="box">
                <h4 className="title">{this.state.title}</h4>
                <p>{this.state.end_date}</p>
            </a>
        )
    }
}
