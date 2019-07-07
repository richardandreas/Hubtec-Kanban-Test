import React, { Component } from 'react';
import './taskCard.css';

export default class TaskCard extends Component {
    state = {
        id: this.props.task.id,
        title: this.props.task.title,
        description: this.props.task.description,
        status: this.props.task.status,
        end_date: this.props.task.end_date,
    }

    onSelect = () => {
        this.props.onSelect(this.state);
    }

    moveLeft = () => {
        if (this.state.status > 0) {
            this.props.onStatusChange(this.state, this.state.status - 1);
        }
    }

    moveRight = () => {
        if (this.state.status < 4) {
            this.props.onStatusChange(this.state, this.state.status + 1);
        }
    }

    render() {
        return (
            <div className={navigator.maxTouchPoints ? "" : "smarthover"}>
                <a className="box" onClick={this.onSelect}>
                    <h4 className="title is-marginless is-single-line">{this.state.title}</h4>
                    <p className="is-marginless">{`Until: ${new Date(this.state.end_date).toLocaleDateString()}`}</p>
                    <p className="is-marginless has-text-grey is-single-line">{this.state.description}</p>
                </a>

                <div className="arrow-container">
                    <img
                        onClick={this.moveLeft}
                        className={`icon arrow arrow-left ${this.state.status < 1 ? "" : "active"}`}
                        src="./arrow.svg"
                        alt="Move left"></img>
                    <img
                        onClick={this.moveRight}
                        className={`icon arrow arrow-right ${this.state.status > 2 ? "" : "active"}`}
                        src="./arrow.svg"
                        alt="Move right"></img>
                </div>
            </div>
        )
    }
}
