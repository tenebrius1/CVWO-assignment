import React from "react";
import {Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import {TrashFill} from "react-bootstrap-icons"

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomplete_to_complete: props.incomplete_to_complete,
            editId: -1,
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(title) {
        axios.post("/update_todo", {
            title: title,
            incomplete_to_complete: this.state.incomplete_to_complete,
        }).then(res => {
            this.props.updateLists(res.data.incomplete, res.data.complete);
        })
    }

    handleDelete(title) {
        axios.post("/delete_todo", {
            title: title,
            done: this.props.done,
        }).then(res => {
            this.props.updateLists(res.data.incomplete, res.data.complete);
        })
    }

    handleEdit(id) {
        this.setState({
            editId: id
        })
    }

    handleChange(id, title) {
        axios.post("/edit_todo", {
            title: title,
            done: this.props.done,
            id: id
        }).then(res => {
            this.props.updateLists(res.data.incomplete, res.data.complete);
        })
        this.setState({
            editId: -1
        })
    }

    render() {
        // const todoItems = this.props.todos.map((todo) =>
        //     <div key={todo.id} className="justify-content-center align-content-center item mt-2">
        //         <Form.Check
        //             defaultChecked={this.props.done}
        //             type="checkbox"
        //             label={todo.title}
        //             onClick={() => this.handleUpdate(todo.title)}
        //         />
        //     </div>
        // )
        const todoItems =
            <Table responsive>
                <thead>
                <tr>
                    <th>Done?</th>
                    <th>Task Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.props.todos.map((todo) => {
                    let displayName = this.props.done
                        ? <td className="todo-strike" onClick={() => this.handleEdit(todo.id)}>{todo.title}</td>
                        : <td onClick={() => this.handleEdit(todo.id)}>{todo.title}</td>
                    displayName = this.state.editId === todo.id
                        ? <td>
                            <Form.Control type="text" defaultValue={todo.title}
                                          onBlur={(e) => this.handleChange(todo.id, e.target.value)}/>
                        </td>
                        : displayName
                    return (<tr key={todo.id}>
                        <td>
                            <Form.Check defaultChecked={this.props.done} type="checkbox"
                                        onClick={() => this.handleUpdate(todo.title)}/>
                        </td>
                        {displayName}
                        <td>
                            <TrashFill onClick={() => this.handleDelete(todo.title)} className="trash-icon"/>
                        </td>
                    </tr>)
                })
                }
                </tbody>
            </Table>

        return (
            <Row className="mt-5">
                <Col>
                    <h3>
                        {this.props.title} ({this.props.todos.length})
                    </h3>
                    {todoItems}
                </Col>
            </Row>
        )
    }
}

export default TodoList