/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';

/* components */
import { Welcome } from './components/Welcome'

export default (
    <Route path="/" component={App}>
        <Route path="welcome" component={ Welcome } />
    </Route>
);
