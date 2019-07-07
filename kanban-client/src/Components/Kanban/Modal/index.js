import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import API from '../../../api';
import * as helpers from '../../../helpers';

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: "",
            description: "",
            status: 0,
            date: new Date(),

            newTask: true,

            titleError: false,
            descriptionError: false,
            dateError: false,
            serverError: false,

            submitLoading: false,
            deleteLoading: false
        }

        if (this.props.task) {
            this.state.newTask = false;
            this.state.id = this.props.task.id;
            this.state.title = this.props.task.title;
            this.state.description = this.props.task.description;
            this.state.status = this.props.status;
            this.state.date = new Date(this.props.task.end_date);
        }
    }

    updateTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    updateDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    updateDate = (date) => {
        this.setState({ date: date });
    }

    closeModal = () => {
        this.props.onClose(false);
    }

    submit = () => {
        var validData = true;

        if (this.state.title.length < 1) {
            this.setState({ titleError: true });
            validData = false;
        }
        if (this.state.description < 1) {
            this.setState({ descriptionError: true });
            validData = false;
        }
        if (!validData) return;

        this.setState({ submitLoading: true });

        const task = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,
            end_date: this.state.date.toUTCString()
        }
        if (this.state.newTask) {
            API.post(`/api/v1/task`, task, { headers: helpers.getHeaders() }).then(res => {
                helpers.setHeaders(res.headers);
                this.props.onClose(true);
            }).catch(err => {
                console.log(err);
                this.setState({ serverError: true, submitLoading: false });
            });
        } else {
            API.put(`/api/v1/task/${task.id}`, task, { headers: helpers.getHeaders() }).then(res => {
                helpers.setHeaders(res.headers);
                this.props.onClose(true);
            }).catch(err => {
                console.log(err);
                this.setState({ serverError: true, submitLoading: false });
            });
        }
    }

    delete = () => {
        this.setState({ deleteLoading: true });

        API.delete(`/api/v1/task/${this.state.id}`, { headers: helpers.getHeaders() }).then(res => {
            helpers.setHeaders(res.headers);
            this.props.onClose(true);
        }).catch(err => {
            console.log(err);
            this.setState({ serverError: true, deleteLoading: false });
        });
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <h2 className="modal-card-title">Task</h2>
                        <button onClick={this.closeModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        {this.state.serverError
                            ? <div className="notification is-danger">Oops! Could not submit to server.</div>
                            : ""
                        }
                        {/* form do */}
                        <form>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input
                                        className={`input ${this.state.titleError ? "is-danger" : ""}`}
                                        value={this.state.title}
                                        onChange={this.updateTitle}
                                        type="text"></input>
                                </div>
                                {this.state.titleError
                                    ? <p className="help is-danger">You must set a title!</p>
                                    : null
                                }
                            </div>

                            <div className="field">
                                <label className="label ">Description</label>
                                <div className="control">
                                    <textarea
                                        className={`textarea ${this.state.descriptionError ? "is-danger" : ""}`}
                                        value={this.state.description}
                                        onChange={this.updateDescription}></textarea>
                                </div>
                                {this.state.descriptionError
                                    ? <p className="help is-danger">Description cannot be empty!</p>
                                    : null
                                }
                            </div>

                            <div className="field">
                                <label className="label ">Deadline</label>
                                <div className="control">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.updateDate}
                                        inline
                                        dateFormat="yyyy/MM/dd"
                                    />
                                </div>
                            </div>
                            {/* form end */}
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            onClick={this.submit}
                            className={`button is-success ${this.state.submitLoading ? "is-loading" : ""}`}
                        >Save changes</button>
                        {!this.state.newTask
                            ? <button
                                onClick={this.delete}
                                className={`button is-danger ${this.state.deleteLoading ? "is-loading" : ""}`}
                            >Delete task</button>
                            : null
                        }
                        <button onClick={this.closeModal} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}
