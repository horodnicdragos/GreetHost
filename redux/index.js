import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import form, {formSaga} from './form';

export default combineReducers({
    form,
});

export function* rootSaga() {
    yield all([
        formSaga(),
    ]);
}