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
            { key: "progress", title: "Ongoing" },
            { key: "paused", title: "Paused" },
            { key: "done", title: "Done" }
        ],
        tasks: {
            new: [],
            progress: [],
            paused: [],
            done: []
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
                    paused: [],
                    done: []
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

    updateTaskStatus = (task, newStatus) => {
        console.log(task)
        const updatedTasks = this.state.tasks;
        const oldTaskKey = this.state.columns[task.status].key

        updatedTasks[oldTaskKey] = updatedTasks[oldTaskKey].filter(obj => {
            return obj.id !== task.id;
        });
        console.log(this.state.tasks)
        console.log(newStatus)
        const newTaskKey = this.state.columns[newStatus].key
        task.status = newStatus;
        updatedTasks[newTaskKey].push(task)

        API.put(`/api/v1/task/${task.id}`, task, { headers: helpers.getHeaders() }).then(res => {
            helpers.setHeaders(res.headers);
            this.props.onClose(true);
        }).catch(err => {
            console.log(err);
        });

        setTimeout(() => {
            this.setState({
                tasks: {
                    new: [],
                    progress: [],
                    paused: [],
                    done: []
                }
            });
            this.setState({ tasks: updatedTasks });
        }, 50);
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
                                        task={task}
                                        onSelect={this.onTaskSelect}
                                        onStatusChange={this.updateTaskStatus}
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
