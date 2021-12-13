import React from "react"
import {Col, Form, Button, Container, Row, Navbar, InputGroup} from "react-bootstrap";
import {Lock, EyeFill, EyeSlashFill} from "react-bootstrap-icons";
import * as yup from 'yup'
import {Formik} from "formik";

export default function Signin() {
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const [passwordShown, setPasswordShown] = React.useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };
    const eye = <EyeFill/>
    const eyeSlash = <EyeSlashFill/>

    return (
        <>
            <Navbar>
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
                validationSchema={schema}
                onSubmit={(values) => {
                    fetch("http://localhost:3000/sign_in", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: values.username,
                            password: values.password
                        })
                    }).then(data => location.href = data["url"])
                }}
                initialValues={{
                    username: '',
                    password: '',
                }}
                validateOnChange={false}
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
                                            <Form.Control type={passwordShown ? "text" : "password"} name="password"
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.password} value={values.password}
                                                          placeholder="Password"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your password!
                                            </Form.Control.Feedback>
                                            <InputGroup.Text>
                                                <i onClick={togglePasswordVisibility}>{passwordShown ? eyeSlash : eye}</i>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
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
