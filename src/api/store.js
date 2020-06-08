import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import auth_reducer from './Reducer/AuthReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const persistConfig = {
  key: 'authType',
  storage: storage,
};

const persisted_reducer = persistReducer(persistConfig, auth_reducer);

const store = createStore(persisted_reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
export const persistor = persistStore(store)