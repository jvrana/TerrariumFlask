import React from 'react';


class AlertDismissable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        show: true,
        heading: props.heading,
        message: props.message,
        variant: props.variant,
        button_message: props.button_message,
    };
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
      <>
        <Alert show={this.state.show} variant={this.state.variant}>
          <Alert.Heading>{this.state.heading}</Alert.Heading>
          <p>
              {this.state.message}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-success">
                {this.state.button_message}
            </Button>
          </div>
        </Alert>

        {!this.state.show && <Button onClick={handleShow}>Show Alert</Button>}
      </>
    );
  }
}

render(<AlertDismissable />);