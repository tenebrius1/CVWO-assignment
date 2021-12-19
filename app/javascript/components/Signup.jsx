import React from "react"
import {Col, Form, Button, Container, Row, Navbar, InputGroup, Alert} from "react-bootstrap";
import {PersonPlus, EyeFill, EyeSlashFill} from "react-bootstrap-icons";
import * as yup from 'yup'
import {Formik} from "formik";
import axios from "axios"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordShown: false,
        };
    }

    schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    togglePasswordVisibility = () => {
        this.setState({passwordShown: !this.state.passwordShown});
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
                        <Navbar.Collapse className="justify-content-end">
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
                            location.href = res.data.url;
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
                          handleBlur,
                          values,
                          touched,
                          isValid,
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