import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers/App';
import { Welcome } from './components/Welcome';

ReactDOM.render(
    <App>
        <Welcome />
    </App>,
    document.getElementById('root')
);