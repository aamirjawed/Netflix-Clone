import { UserAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {

    const {user} = UserAuth()

    if(!user){
        return <Navigate to="/" replace={true} />
    }
    
    return children
}

export default ProtectedRoute