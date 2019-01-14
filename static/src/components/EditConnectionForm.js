import React from 'react';
import {Mutation, Query} from 'react-apollo';
import {Alert, Button, Form} from 'react-bootstrap';
import {isEmail, isURL} from 'validator';
import {EDIT_CONNECTION} from '../graphql/mutations';
import {GET_CONNECTION} from '../graphql/queries';

const EditConnection = ({id, name, login, password, url}) => (
    <Mutation mutation={EDIT_CONNECTION}>
        {
            (editConnection, {loading, error, called, data}) => {
                if (error) return <Alert variant={"danger"}>Error editing connection: {error.message}</Alert>
                if (loading) return "Loading!";
                if (called) return `editing connection...`;
                let variables = {id, name, login, password, url};
                console.log("Edit conneciton")
                console.log(variables);
                editConnection({variables: variables});
                return <></>
            }
        }
    </Mutation>
);


class EditConnectionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionId: props.connectionId,
            login: "",
            password: "",
            url: "",
            name: "",
            register: false,
            password_error_text: null,
            url_error_text: null,
            disabled: false,
        };

        this.changeValue = this.changeValue.bind(this);
    }

    isDisabled() {
        let password_is_valid = false;
        let url_is_valid = false;

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 1) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (isURL(this.state.url)) {
            url_is_valid = true;
            this.setState({
                url_error_text: null,
            });
        } else {
            this.setState({
                url_error_text: 'url invalid',
            });
        }

        // if (url_is_valid) {
        //     this.setState({
        //         disabled: false,
        //     });
        // } else {
        //     this.setState({
        //         disabled: true
        //     })
        // }

    }


    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState({register: false});
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    register(e) {
        e.preventDefault()
        this.setState({register: true});
    }

    render() {
        const {disabled, password_error_text, url_error_text} = this.state;
        return <Query query={GET_CONNECTION} variables={{id: this.props.connectionId}}>
            {({data, loading, error}) => {
                <h3>Edit connection for {this.props.connectionId}</h3>
                {
                    this.props.statusText &&
                    <Alert variant={this.props.statusVariant}>{this.props.statusText}</Alert>
                }
                if (loading) return "loading form";
                if (error) return "error loading form";
                let connection = data.connection;
                return <Form>
                    <Form.Group controlId="fromBasicText">
                        <Form.Label>Connection name</Form.Label>
                        <Form.Control type="text" defaultValue={connection.name}
                                      onChange={(e) => this.changeValue(e, 'name')}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Connection login</Form.Label>
                        <Form.Control type="login" defaultValue={connection.login}
                                      onChange={(e) => this.changeValue(e, 'login')}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Connection password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                                      onChange={(e) => this.changeValue(e, 'password')}/>
                        <Form.Text className="text-muted">{password_error_text}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicURL">
                        <Form.Label>Connection URL</Form.Label>
                        <Form.Control type="text" defaultValue={connection.url}
                                      onChange={(e) => this.changeValue(e, 'url')}/>
                        <Form.Text className="text-muted">{url_error_text}</Form.Text>
                    </Form.Group>


                    <Button variant="warning" type="submit" onClick={(e) => this.register(e)} disabled={disabled}>
                        Edit connection
                    </Button>
                    <div>
                        {this.state.register && <EditConnection
                            id={this.props.connectionId}
                            name={this.state.name}
                            login={this.state.login}
                            password={this.state.password}
                            url={this.state.url}
                        />}
                    </div>
                </Form>
            }}
        </Query>
    }
}

// const EnhancedEditConnectionForm = compose(
//     withCurrentUser
// )(EditConnectionForm);


export default EditConnectionForm;