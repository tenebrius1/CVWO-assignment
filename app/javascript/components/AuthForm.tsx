import * as React from 'react'
import * as yup from 'yup';
import * as Formik from 'formik';
import {EyeFill, EyeSlashFill} from 'react-bootstrap-icons';
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

function CTAButton(props) {
    return (
        <div className="d-grid gap-2 mt-4">
            <Button variant="primary" type="submit">
                {props.buttonText}
            </Button>
        </div>
    )
}

function ErrorAlert(props) {
    return (
        <Alert variant={props.variant} show={props.show}
               onClose={() => props.setShow(false)} dismissible>
            <p>
                {props.msg}
            </p>
        </Alert>
    )
}

function UsernameForm(props) {
    return (
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter username"
                          onChange={props.handleChange}
                          isInvalid={!!props.errors.username} value={props.username}/>
            <Form.Control.Feedback type="invalid">
                Please enter your username!
            </Form.Control.Feedback>
        </Form.Group>
    )
}

function PasswordForm(props) {
    const eye = <EyeFill/>
    const eyeSlash = <EyeSlashFill/>

    return (
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
                <Form.Control type={props.passwordShown ? "text" : "password"}
                              name="password"
                              onChange={props.handleChange}
                              isInvalid={!!props.errors.password} value={props.password}
                              placeholder="Password"/>
                <InputGroup.Text className="eye">
                    <i onClick={props.togglePasswordVisibility}>{props.passwordShown ? eyeSlash : eye}</i>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                    Please enter your password!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
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

    setShow = b => {
        this.setState({show: b})
    }

    handleSubmit = (username, password) => {
        let url = this.props.url;
        axios.post(url, {
            username: username,
            password: password
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
    }

    render() {
        const icon = this.props.icon;

        return (
            <Formik.Formik
                validationSchema={this.schema}
                onSubmit={values => {
                    this.handleSubmit(values.username, values.password)
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
                                    <UsernameForm handleChange={handleChange} errors={errors}
                                                  username={values.username}/>
                                    <PasswordForm passwordShown={this.state.passwordShown} handleChange={handleChange}
                                                  errors={errors} password={values.password}
                                                  togglePasswordVisibility={this.togglePasswordVisibility}/>
                                    <ErrorAlert variant={this.classes[this.state.type]} show={this.state.show}
                                                setShow={this.setShow} msg={this.state.msg}/>
                                    <CTAButton buttonText={this.props.buttonText}/>
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