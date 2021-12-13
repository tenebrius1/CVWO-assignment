import React from "react"
import {Col, Form, Button, Container, Row, Navbar, InputGroup, Alert} from "react-bootstrap";
import {Lock, EyeFill, EyeSlashFill} from "react-bootstrap-icons";
import * as yup from 'yup'
import {Formik} from "formik";
import axios from "axios"

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            passwordShown: false,
            type: "",
            msg: ""
        };
    }

    schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    classes = {
        error: 'danger',
        alert: 'warning',
        notice: 'info',
        success: 'success'
    };

    togglePasswordVisibility = () => {
        this.setState({passwordShown: !this.state.passwordShown});
    };

    setShow(b) {
        this.setState({show: b})
    }

    render() {
        const eye = <EyeFill/>
        const eyeSlash = <EyeSlashFill/>

        return (
            <>
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="#">Navbar with text</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#">Mark Otto</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Formik
                    validationSchema={this.schema}
                    onSubmit={(values) => {
                        axios.post("http://localhost:3000/sign_in", {
                            username: values.username,
                            password: values.password
                        }).then(res => {
                            this.setState({
                                show: true,
                                type: res.data["type"],
                                msg: res.data["msg"],
                            })
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
                                <Lock size={28}/>
                                <h3 className="text-center">Sign in</h3>
                                <Col xs="10" md="4">
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                                <InputGroup.Text>
                                                    <i onClick={this.togglePasswordVisibility}>{this.state.passwordShown ? eye : eyeSlash}</i>
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
                                                Sign In
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

export default Signin