import React, { Component } from 'react';
import TaskCard from './TaskCard';
import API from '../../api';
import * as helpers from '../../helpers';


export default class Kanban extends Component {
    constructor() {
        super()

        this.state = {
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
            }
        }
    }


    componentDidMount() {
        API.get('/api/v1/task', { headers: helpers.getHeaders() }).then(res => {
            helpers.setHeaders(res.headers);
            this.setState({ tasks: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    createData = (res) => {
        console.log(res)
        this.setState({ tasks: res });
    }

    render() {
        return (
            <div className="columns">

                {this.state.columns.map((column, index) =>
                    <div className="column is-one-quarter">
                        <div className="box content has-background-light">
                            <div className="has-text-centered">
                                <h4>{column.title}</h4>
                            </div>

                            {this.state.tasks[column.key].map((task, index) =>
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    end_date={task.end_date}
                                    key={index}
                                />
                            )}

                        </div>
                    </div>
                )}

            </div>
        );
    }
}
