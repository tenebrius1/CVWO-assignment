import React from "react"
import {Button, Col, Container, Form, Navbar, Row} from 'react-bootstrap';
import axios from "axios";
import TodoList from "./TodoList";
import {Formik} from "formik";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.current_user,
            incomplete: props.incomplete,
            complete: props.complete,
        };

        this.updateLists = this.updateLists.bind(this);
    }

    logout() {
        axios.delete("/logout").then(res => {
            location.href = res.data.url;
        })
    }

    updateLists(incomplete, complete) {
        this.setState({
            incomplete: incomplete,
            complete: complete,
        })
    }

    handleSearch(query) {
        axios.post("/search", {
            query: query,
        }).then(res => {
            this.setState({
                incomplete: res.data.incomplete,
                complete: res.data.complete,
            })
        })
    }

    render() {
        return (
            <>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand>{this.state.user.username}'s Todo List</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="" onClick={this.logout}>Log out</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Formik
                    onSubmit={(values) => {
                        axios.post("/todos", {
                            todo: {
                                title: values.new_todo,
                            }
                        }).then(res => {
                            this.setState({
                                incomplete: res.data.updated_list,
                            });
                        })
                        values.new_todo = '';
                    }}
                    initialValues={{
                        new_todo: '',
                        search: '',
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors,
                      }) => (
                        <Container>
                            <Row className="mt-5">
                                <h3>Add Todos</h3>
                            </Row>
                            <Form onSubmit={handleSubmit} className="mt-2">
                                <Row>
                                    <Col md="4">
                                        <Form.Control placeholder="What needs to be done?"
                                                      onChange={handleChange}
                                                      value={values.new_todo}
                                                      name="new_todo"/>
                                    </Col>
                                    <Col md="2">
                                        <Button variant="primary" type="submit">Add</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="mt-5">
                                <h3>Search Todos</h3>
                                <Col md="4">
                                    <Form className="mt-2">
                                        <Form.Control
                                            onKeyUp={() => this.handleSearch(values.search)}
                                            onChange={handleChange}
                                            value={values.search}
                                            name="search"/>
                                    </Form>
                                </Col>
                            </Row>
                            <TodoList title="Things to do" todos={this.state.incomplete} done={false}
                                      updateLists={this.updateLists} incomplete_to_complete={true}/>
                            <TodoList title="Things done" todos={this.state.complete} done={true}
                                      updateLists={this.updateLists} incomplete_to_complete={false}/>
                        </Container>
                    )}
                </Formik>
            </>
        )
    }
}

export default Todo