import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from './reducers/rootReducer';

const rootReducer = createRootReducer();
const middleware = [thunkMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
})

export const dispatch = store.dispatch;

export const persistor = persistStore(store);

export default store
