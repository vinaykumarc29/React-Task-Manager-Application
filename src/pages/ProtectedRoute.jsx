import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loader from '../components/Loader';

function ProtectedRoute(props) {

    const {children} = props;
    const {user , loading} = useAuth();

   if(loading){
    return <Loader/>
   }

   if(!user){
    return <Navigate to='/login' replace/>
   }

   return children ;
}

export default ProtectedRoute
