import * as React from "react"
import {PersonPlus} from "react-bootstrap-icons";
import MyNavBar from "./MyNavBar";
import AuthForm from "./AuthForm";

class Signup extends React.Component<{}, {}> {
    render() {
        const icon = <PersonPlus size={28}/>

        return (
            <>
                <MyNavBar title="CVWO Todo App" url="/sign_in" rightNavText="Log In" />
                <AuthForm url="/sign_up" icon={icon} title="Sign Up" buttonText="Register" />
            </>
        )
    }
}

export default Signup