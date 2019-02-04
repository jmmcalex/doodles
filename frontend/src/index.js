import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import { fetchAuthenticated } from './actions/account';
// import { loadState, saveState } from './localStorage';
// import throttle from 'lodash.throttle';
import Doodle from './components/Doodle';
import DoodleList from './components/DoodleList';
import Root from './components/Root';
import DoodleForm from './components/DoodleForm';
import Navbar from './components/Navbar';
import Container from './components/Container';

/**
 * persistedState will be the Redux-Store that is loaded from the client browsers'
 * localStorage. If nothing is there, then the Redux-Store is simply built by
 * the rootReducer. This is just a way to maintain the Redux-Store across
 * Browser Refreshes and connection hiccups.
 */
// const persistedState = loadState();
const store = createStore(
    rootReducer,
    // persistedState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()   
    )
);

/**
 * Every time the store changes, this will save the account section of the store
 * to local storage. We throttle the number of saves per second because it's 
 * an expensive operation
 */
// store.subscribe(throttle(()=> {
//     saveState({
//         account: store.getState().account
//     });
// }), 1000);


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
                <Router history={history}> 
                    <Fragment>
                        <Navbar />
                        <Container>
                            <Switch>
                                <Route exact path='/' component={Root} />
                                <AuthRoute path='/doodle' component={Doodle} />
                                <AuthRoute path='/gallery' component={DoodleList} />
                                <AuthRoute path='/form' component={DoodleForm} />
                            </Switch>
                        </Container>
                    </Fragment>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    })

