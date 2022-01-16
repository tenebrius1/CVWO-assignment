import * as React from "react"
import {Col, Form, Button, Container, Row, Navbar, InputGroup, Alert} from "react-bootstrap";
import {PersonPlus, EyeFill, EyeSlashFill} from "react-bootstrap-icons";
import * as yup from 'yup'
import {Formik} from "formik";
import axios from "axios"

interface State {
    show: boolean;
    passwordShown: boolean;
    type: string;
    msg: string;
}

class Signup extends React.Component {
    state: State = {
        show: false,
        passwordShown: false,
        type: "",
        msg: "",
    };

    schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    setShow(b) {
        this.setState({show: b})
    }

    togglePasswordVisibility = () => {
        this.setState({passwordShown: !this.state.passwordShown});
    };

    classes = {
        error: 'danger',
        alert: 'warning',
        notice: 'info',
        success: 'success'
    };

    render() {
        const eye = <EyeFill/>
        const eyeSlash = <EyeSlashFill/>

        return (
            <>
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="/">CVWO Todo App</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end" role="navigation">
                            <Navbar.Text>
                                <a href="/sign_in">Log In</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Formik
                    validationSchema={this.schema}
                    onSubmit={(values) => {
                        axios.post("/sign_up", {
                            user: {
                                username: values.username,
                                password: values.password
                            }
                        }).then(res => {
                            if (res.data.url) {
                                location.href = res.data.url;
                            } else {
                                this.setState({
                                    show: true,
                                    type: res.data["type"],
                                    msg: res.data["msg"],
                                });
                            }
                        })
                    }}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          errors,
                      }) => (
                        <Container>
                            <Row className="justify-content-center mt-5">
                                <PersonPlus size={28}/>
                                <h3 className="text-center">Sign up</h3>
                                <Col xs="10" md="4">
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" name="username" placeholder="Enter username"
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.username} value={values.username}/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your username!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control type={this.state.passwordShown ? "text" : "password"}
                                                              name="password"
                                                              onChange={handleChange}
                                                              isInvalid={!!errors.password} value={values.password}
                                                              placeholder="Password"/>
                                                <InputGroup.Text className="eye">
                                                    <i onClick={this.togglePasswordVisibility}>{this.state.passwordShown ? eyeSlash : eye}</i>
                                                </InputGroup.Text>
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter your password!
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Alert variant={this.classes[this.state.type]} show={this.state.show}
                                               onClose={() => this.setShow(false)} dismissible>
                                            <p>
                                                {this.state.msg}
                                            </p>
                                        </Alert>
                                        <div className="d-grid gap-2 mt-4">
                                            <Button variant="primary" type="submit">
                                                Register
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Formik>
            </>
        )
    }
}

export default Signup