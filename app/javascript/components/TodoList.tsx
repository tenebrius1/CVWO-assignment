import * as React from "react";
import {Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import {TrashFill} from "react-bootstrap-icons"

interface Props {
    incomplete_to_complete: boolean;
    updateLists: Function;
    title: string;
    todos: any;
    done: boolean;
}

interface State {
    incomplete_to_complete: boolean;
    editId: number;
}

class TodoList extends React.Component<Props, State> {
    state: State = {
        incomplete_to_complete: this.props.incomplete_to_complete,
        editId: -1,
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
                                          onBlur={event => this.handleChange(todo.id, event.target.value)}/>
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