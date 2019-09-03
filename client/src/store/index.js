import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { save, load } from "redux-localstorage-simple"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware 
    = composeEnhancers(applyMiddleware(
        thunk,
        save()
    ))(createStore)

export const store = createStoreWithMiddleware(
    rootReducer,
    load() // Loading done here
)    