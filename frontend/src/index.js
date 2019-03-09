import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
// import 'bootstrap/dist/css/bootstrap.css';


import rootReducer from './reducers';
import { fetchAuthenticated } from './actions/account';
import Startup from './components/Startup';
import Layout from './components/Layout';
import Gallery from './components/Gallery/Gallery';
import Root from './components/Root';
import Home from './components/Home';
import DoodleForm from './components/DoodleForm';
import Appbar from './components/Header/Appbar';
import Comic from './components/Comic/Comic';
import AuthForm from './components/AuthForm';
/**
 * persistedState will be the Redux-Store that is loaded from the client browsers'
 * localStorage. If nothing is there, then the Redux-Store is simply built by
 * the rootReducer. This is just a way to maintain the Redux-Store across
 * Browser Refreshes and connection hiccups.
 */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()   
    )
);

/**
 * @param props: an object with { path, component }. 
 * @summary: This stateless functional component will be used to redirect users
 * away from content management, and uploading screens and towards
 * the admin sign in page. Only if the user can succesfully authenticate
 * themselves may they enter those pages.
 */
const AuthRoute = (props) => {
    const loggedIn = store.getState().account.loggedIn;
    if (!loggedIn) {
        return( <Redirect to={{ pathname: '/' }} /> );
    }
    const { component, path } = props;
    return ( <Route path={path} component={component} /> );
}


/**
 * Upon serving up our index.js we will want our store to check if the user 
 * has been authenticated by calling the fetchAuthenticated function which
 * will update the account section of our redux store. Depending on the resulting
 * values in the account section, the root component will serve up different
 * components to the client.
 * 
 * Side note:
 * If the store dispatches an action creator it returns a promise,
 * If the store dispatches a pure action it returns that action
 */
const history = createBrowserHistory();
store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Startup>
                <Router history={history}> 
                <Fragment>
                    <Appbar />
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/admin' component={AuthForm} />
                            <Route path='/home' component={Home} />
                            <Route path='/gallery' component={Gallery} />
                            <Route path='/comic/:index' component={Comic} />
                            <AuthRoute path='/form' component={DoodleForm} />
                        </Switch>
                    </Layout>
                </Fragment>
                </Router>
                </Startup>
            </Provider>,
            document.getElementById('root')
        );
    })

