import React from 'react';
import { Alert } from 'react-bootstrap';
import  LoginToken from './LoginToken'

export default function PleaseLogin() {
    return <Alert variant="danger">Login required to view this content.<LoginToken /></Alert>
}