import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import AdminInterface from './components/AdminInterface';
import UserInterface from './components/UserInterface';

class Router extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path='/admin' component={AdminInterface} />
                        <Route path='/' component={UserInterface} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Router;