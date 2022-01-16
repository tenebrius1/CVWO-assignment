import * as React from 'react';
import {Lock} from 'react-bootstrap-icons';
import MyNavBar from "./MyNavBar";
import AuthForm from "./AuthForm";

class Signin extends React.Component<{}, {}> {
    render() {
        const icon = <Lock size={28}/>

        return (
            <>
                <MyNavBar title="CVWO Todo App" url="/sign_up" rightNavText="Sign Up" />
                <AuthForm url="/sign_in" icon={icon} title="Sign In" buttonText="Sign In" />
            </>
        )
    }
}

export default Signin;