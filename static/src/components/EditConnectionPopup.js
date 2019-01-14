import React from 'react';
import EditConnectionForm from './EditConnectionForm';
import BasicPopup from './support/BasicPopup';

const EditConnectionPopup = (props) => (
        <BasicPopup title={""} buttonName={"edit"} buttonVariant={"secondary"}>
            <EditConnectionForm connectionId={props.connectionId}/>
        </BasicPopup>
    );

export default EditConnectionPopup;