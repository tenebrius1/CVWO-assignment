import * as React from 'react';
import {Container, Navbar} from "react-bootstrap";

interface Props {
    callBack?: Function;
    title: string;
    url?: string;
    rightNavText: string;
}

class MyNavBar extends React.Component<Props, {}> {
    render() {
        let rightNav = this.props.callBack
            ? <a href="" onClick={() => this.props.callBack()}>{this.props.rightNavText}</a>
            : <a href={this.props.url}>{this.props.rightNavText}</a>
        return (
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand>{this.props.title}</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end" role="navigation">
                        <Navbar.Text>
                            {rightNav}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default MyNavBar