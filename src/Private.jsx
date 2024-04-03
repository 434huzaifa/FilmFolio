import { Navigate } from "react-router-dom";

const Private = ({children}) => {
    const user=localStorage.getItem("user")
    if (user) {
        return children
    }
    return <Navigate to="/login"></Navigate>
};

export default Private;