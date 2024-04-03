import { Navigate } from "react-router-dom";

const Priavate = ({children}) => {
    const user=localStorage.getItem("user")
    if (user) {
        return children
    }
    return <Navigate to="/login"></Navigate>
};

export default Priavate;