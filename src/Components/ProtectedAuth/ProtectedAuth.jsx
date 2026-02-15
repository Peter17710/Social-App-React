import React from 'react'
import { Navigate } from 'react-router-dom';
import styles from './ProtectedAuth.module.css';

export default function ProtectedAuth(props) {

  if (localStorage.getItem("userToken")){

    return <Navigate to="/"></Navigate>
  }

  else{
    return props.children
  }


  }





