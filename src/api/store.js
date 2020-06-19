import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import auth_reducer from './Reducer/AuthReducer';
import user_reducer from './Reducer/UserReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist:['auth_reducer', 'user_reducer']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({auth_reducer, user_reducer}));

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
export const persistor = persistStore(store)