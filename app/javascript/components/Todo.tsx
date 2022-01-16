import * as React from "react"
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import axios from "axios";
import TodoList from "./TodoList";
import MyNavBar from "./MyNavBar";
import {Formik} from "formik";

interface Props {
    incomplete_to_complete: boolean;
    updateLists: Function;
    title: string;
    todos: any;
    done: boolean;
    current_user: any;
    incomplete: any;
    complete: any;
}

interface State {
    user: any;
    incomplete: any;
    complete: any;
}

function Title() {
    return (
        <Row className="mt-5">
            <h3>Add Todos</h3>
        </Row>
    )
}

function AddTodoForm(props) {
    return (
        <Form onSubmit={props.handleSubmit} className="mt-2">
            <Row>
                <Col md="4">
                    <Form.Control placeholder="What needs to be done?"
                                  onChange={props.handleChange}
                                  value={props.new_todo}
                                  name="new_todo"/>
                </Col>
                <Col md="2">
                    <Button variant="primary" type="submit">Add</Button>
                </Col>
            </Row>
        </Form>
    )
}

function SearchTodoForm(props) {
    return (
        <Row className="mt-5">
            <h3>Search Todos</h3>
            <Col md="4">
                <Form className="mt-2">
                    <Form.Control
                        onKeyUp={() => props.handleSearch(props.search)}
                        onChange={props.handleChange}
                        value={props.search}
                        name="search"/>
                </Form>
            </Col>
        </Row>
    )
}

class Todo extends React.Component<Props, State> {
    state: State = {
        user: this.props.current_user,
        incomplete: this.props.incomplete,
        complete: this.props.complete,
    };

    logout = () => {
        axios.delete("/logout").then(res => {
            location.href = res.data.url;
        })
    }

    updateLists = (incomplete, complete) => {
        this.setState({
            incomplete: incomplete,
            complete: complete,
        })
    }

    handleSearch = query => {
        axios.post("/search", {
            query: query,
        }).then(res => {
            this.setState({
                incomplete: res.data.incomplete,
                complete: res.data.complete,
            })
        })
    }

    handleSubmit = (new_todo) => {
        axios.post("/todos", {
            todo: {
                title: new_todo,
            }
        }).then(res => {
            this.setState({
                incomplete: res.data.updated_list,
            });
        })
    }

    render() {
        return (
            <>
                <MyNavBar callBack={this.logout} title={this.state.user.username + "'s Todo List"}
                          rightNavText="Log Out"/>
                <Formik
                    onSubmit={values => {
                        this.handleSubmit(values.new_todo);
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
                          values,
                      }) => (
                        <Container>
                            <Title/>
                            <AddTodoForm handleSubmit={handleSubmit} handleChange={handleChange}
                                         new_todo={values.new_todo}/>
                            <SearchTodoForm search={values.search} handleChange={handleChange}
                                            handleSearch={this.handleSearch}/>
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