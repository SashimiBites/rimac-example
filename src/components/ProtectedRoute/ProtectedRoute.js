import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = props => {
    const isValid = props.completed;
    if(!isValid) {
        return <Redirect to="/"/>
    }

    return <Route {...props}/>;
};

export default ProtectedRoute;