import React, { Component } from 'react';
import './taskCard.css';

export default class TaskCard extends Component {
    state = {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        end_date: this.props.end_date,
    }

    onSelect = () => {
        this.props.onSelect(this.state);
    }

    render() {
        return (
            <a className="box" onClick={this.onSelect}>
                <h4 className="title is-marginless is-single-line">{this.state.title}</h4>
                <p className="is-marginless">{`Until: ${new Date(this.state.end_date).toLocaleDateString()}`}</p>
                <p className="is-marginless has-text-grey is-single-line">{this.state.description}</p>
            </a>
        )
    }
}
