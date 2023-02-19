import React from 'react'
import { Navigate, useNavigate } from 'react-router';

const ProtectPage = ({children}) => {
    if(!localStorage.getItem("user")){
        return <Navigate to={'/login'}/>;
    };
    
    return children;
};

export default ProtectPage;
