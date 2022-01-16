import * as React from 'react'
import * as yup from 'yup';
import * as Formik from 'formik';
import {Lock, EyeFill, EyeSlashFill} from 'react-bootstrap-icons';
import axios from "axios";
import {Alert, Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

interface Props {
    url: string;
    icon: object;
    title: string;
    buttonText: string;
}

interface State {
    show: boolean;
    passwordShown: boolean;
    type: string;
    msg: string;
}

class AuthForm extends React.Component<Props, State> {
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
        const icon = this.props.icon;

        return (
            <Formik.Formik
                validationSchema={this.schema}
                onSubmit={(values) => {
                    let url = this.props.url;
                    axios.post(url, {
                        username: values.username,
                        password: values.password
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
                            {icon}
                            <h3 className="text-center">{this.props.title}</h3>
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
                                            {this.props.buttonText}
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik.Formik>
        )
    }
}

export default AuthForm