import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
const Dashboard = () => {

    const {currentUser} = useContext(AuthContext)
    
    return (
    <div>
        {currentUser?.email ? <div>Dashboard !</div> : <Navigate to='/login'/>}
    </div>
    )
}

export default Dashboard;

 