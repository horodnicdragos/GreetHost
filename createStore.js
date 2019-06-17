import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootReducer, {rootSaga} from './redux';

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [sagaMiddleware];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(RootReducer);

sagaMiddleware.run(rootSaga);