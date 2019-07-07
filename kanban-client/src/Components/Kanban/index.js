import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TaskCard from './TaskCard';
import Modal from './Modal';
import API from '../../api';
import * as helpers from '../../helpers';


export default class Kanban extends Component {
    state = {
        columns: [
            { key: "new", title: "New" },
            { key: "progress", title: "In Progress" },
            { key: "done", title: "Done" },
            { key: "cancelled", title: "Cancelled" }
        ],
        tasks: {
            new: [],
            progress: [],
            done: [],
            cancelled: []
        },
        loading: true,
        redirect: false,
        modalCreate: false,
        modalTask: null
    }

    componentWillMount() {
        this.loadTasks();
    }

    loadTasks = () => {
        API.get('/api/v1/task', { headers: helpers.getHeaders() }).then(res => {
            helpers.setHeaders(res.headers);
            this.setState({
                tasks: {
                    new: [],
                    progress: [],
                    done: [],
                    cancelled: []
                }, modalCreate: false, modalTask: null
            });
            this.setState({ tasks: res.data, loading: false });
        }).catch(err => {
            console.log(err);
            this.setState({ redirect: true });
        });
    }

    createData = (res) => {
        console.log(res)
        this.setState({ tasks: res });
    }

    onTaskSelect = (selectedTask) => {
        this.setState({ modalTask: selectedTask });
    }

    openModalCreate = () => {
        this.setState({ modalCreate: true });
    }

    closeModalCreate = (reload) => {
        if (reload) {
            this.loadTasks();
        } else {
            this.setState({ modalCreate: false });
        }
    }

    closeModal = (reload) => {
        if (reload) {
            this.loadTasks();
        } else {
            this.setState({ modalTask: null });
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/login" />);
        }

        return (
            <React.Fragment>
                <div className="buttons">
                    <button
                        className="button is-info is-rounded is-outlined is-inverted"
                        onClick={this.openModalCreate}
                    >Add new task</button>
                </div>

                <div className="columns is-multiline">
                    {this.state.columns.map((column, index) =>

                        <div className="column is-half-tablet is-one-quarter-desktop" key={index}>
                            <div className="box content">
                                <div className="has-text-centered">
                                    <h4>{column.title}</h4>
                                </div>
                                {this.state.tasks[column.key].map((task, index) =>

                                    <TaskCard
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        end_date={task.end_date}
                                        onSelect={this.onTaskSelect}
                                        key={index}
                                    />

                                )}

                                {this.state.tasks[column.key].length
                                    ? null
                                    : <div className="has-text-centered">
                                        {this.state.loading
                                            ? <img className="is-centered" src="./loading.gif" alt="random"></img>
                                            : <p className="is-italic has-text-grey">none</p>
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                    )}
                </div>
                {this.state.modalTask
                    ? <Modal task={this.state.modalTask} onClose={this.closeModal} />
                    : ""
                }
                {this.state.modalCreate
                    ? <Modal onClose={this.closeModalCreate} />
                    : ""
                }
            </React.Fragment>
        );
    }
}
