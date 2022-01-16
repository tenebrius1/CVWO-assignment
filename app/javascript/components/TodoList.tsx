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

function NameDisplay(props) {
    // If todo is marked as done, we add a strikethrough style to it
    let displayName = props.done
        ? <td className="todo-strike" onClick={() => props.handleEdit(props.todo.id)}>{props.todo.title}</td>
        : <td onClick={() => props.handleEdit(props.todo.id)}>{props.todo.title}</td>

    // Checks whether the row is flagged as being edited, if yes change it to a text field
    if (props.editId === props.todo.id) {
        displayName =
            <td>
                <Form.Control type="text" defaultValue={props.todo.title}
                              onBlur={event => props.handleChange(props.todo.id, event.target.value)}/>
            </td>
    }
    return displayName;
}

function DisplayTodos(props) {
    return (
        <tbody>
        {props.todos.map((todo) => {
            return (
                <tr key={todo.id}>
                    <td>
                        <Form.Check defaultChecked={props.done} type="checkbox"
                                    onClick={() => props.handleUpdate(todo.title)}/>
                    </td>
                    <NameDisplay done={props.done} todo={todo} handleEdit={props.handleEdit} editId={props.editId}
                                 handleChange={props.handleChange}/>
                    <td>
                        <TrashFill onClick={() => props.handleDelete(todo.title)} className="trash-icon"/>
                    </td>
                </tr>
            )
        })}
        </tbody>
    )
}

function DisplayTable(props) {
    return (
        <Table responsive>
            <thead>
            <tr>
                <th>Done?</th>
                <th>Task Name</th>
                <th></th>
            </tr>
            </thead>
            {props.body}
        </Table>
    )
}

class TodoList extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

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
        const tableBody = <DisplayTodos handleUpdate={this.handleUpdate} handleChange={this.handleChange}
                                        handleDelete={this.handleDelete} handleEdit={this.handleEdit}
                                        done={this.props.done} todos={this.props.todos} editId={this.state.editId}/>
        const displayTable = <DisplayTable body={tableBody}/>

        return (
            <Row className="mt-5">
                <Col>
                    <h3>
                        {this.props.title} ({this.props.todos.length})
                    </h3>
                    {displayTable}
                </Col>
            </Row>
        )
    }
}

export default TodoList