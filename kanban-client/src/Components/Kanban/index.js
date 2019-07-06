import React, { Component } from 'react';
import TaskCard from './TaskCard';
import API, {login, getTasks} from '../../api';
import * as helpers from '../../api/helpers';


export default class Kanban extends Component {
    constructor() {
        super()

        this.state = {
            columns: [
                { id: 0, title: "New" },
                { id: 1, title: "In Progress" },
                { id: 2, title: "Done" },
                { id: 3, title: "Cancelled" }
            ],
            tasks: {
                new: [],
                progress: [],
                done: [],
                cancelled: []
            }
        }

        this.createData = this.createData.bind(this);
    }
    

    componentDidMount() {
        // API.post('/auth/sign_in', {
        //     "email": "test@test.com",
        //     "password": "123456"
        // })
        // .then(res => {
        //     helpers.setHeaders(res.headers);
        //     API.get('/api/v1/task', { headers: helpers.getHeaders() })
        //     .then(res => {
        //         // console.log(res.data);
        //         // console.log(this.state);
        //         this.setState({tasks: res.data})
        //         helpers.setHeaders(res.headers);
        //         // success(res.data);
        //     })
        //     .catch(err => {
        //         // error(err);
        //     });
        //     // this.setState({tasks: res.data})
        // })
        // .catch(err => {
        //     // error(err);
        // });
        
        // login("test@test.com", "123456", function onSuccess() {
        //     console.log("GOOD")
        //     getTasks(function onSuccess(res) {
        //         // this.createData(res);
        //         this.createData(res);
        //     },
        //     function onError(err) {
        //         console.log(err)
        //     });
        // },
        // function onError(err) {
        //     console.log(err)
        // });

        API.post('/auth/sign_in', {
            "email": "test@test.com",
            "password": "123456"
        })
        .then(res => {
            helpers.setHeaders(res.headers);
            API.get('/api/v1/task', { headers: helpers.getHeaders() })
            .then(res => {
                // console.log(res.data);
                // console.log(this.state);
                this.setState({tasks: res.data})
                helpers.setHeaders(res.headers);
                // success(res.data);
            })
            .catch(err => {
                // error(err);
            });
            // this.setState({tasks: res.data})
        })
        .catch(err => {
            // error(err);
        });
    }

    createData = (res) => {
        console.log(res)
        this.setState({ tasks: res });
    }

    render() {
        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <div className="panel-list">
                            <h1>{this.state.columns[0].title}</h1>
                            {this.state.tasks.new.map((task, index) =>
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    end_date={task.end_date}
                                    key={index}
                                />
                            )}
                        </div>
                    </div>

                    <div className="column is-one-quarter">
                        <div className="panel">
                            <h1>{this.state.columns[1].title}</h1>
                            {this.state.tasks.progress.map((task, index) =>
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    end_date={task.end_date}
                                    key={index}
                                />
                            )}
                        </div>
                    </div>

                    <div className="column is-one-quarter">
                        <div className="panel-list">
                            <h1>{this.state.columns[2].title}</h1>
                            {this.state.tasks.done.map((task, index) =>
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    end_date={task.end_date}
                                    key={index}
                                />
                            )}
                        </div>
                    </div>

                    <div className="column is-one-quarter">
                        <div className="panel-list">
                            <h1>{this.state.columns[3].title}</h1>
                            {this.state.tasks.cancelled.map((task, index) =>
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    end_date={task.end_date}
                                    key={index}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
