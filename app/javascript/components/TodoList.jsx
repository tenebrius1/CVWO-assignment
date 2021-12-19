import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import axios from "axios";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomplete_to_complete: props.incomplete_to_complete,
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

    render() {
        const todoItems = this.props.todos.map((todo) =>
            <div key={todo.id} className="justify-content-center align-content-center item mt-2">
                <Form.Check
                    defaultChecked={this.props.done}
                    type="checkbox"
                    label={todo.title}
                    onClick={() => this.handleUpdate(todo.title)}
                />
            </div>
        )

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