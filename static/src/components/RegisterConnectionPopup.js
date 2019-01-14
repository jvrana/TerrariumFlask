import React from 'react';
import RegisterConnectionForm from './RegisterConnectionForm';
import BasicPopup from './support/BasicPopup';

const RegisterConnectionPopup = (props) => (
        <BasicPopup title={""} buttonName={"New connection"} buttonVariant={"warning"}>
            <RegisterConnectionForm/>
        </BasicPopup>
    );

export default RegisterConnectionPopup;