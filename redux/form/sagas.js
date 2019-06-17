import { put, takeLatest, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as types from "./types";
import NavigationService from '../../utils/navigationService';

const mockedFetch = (url, opts) => new Promise((resolve, reject) => {
    console.log(opts);
    setTimeout(() => resolve({
        body: {},
        bodyUsed: false,
        headers: {},
        ok: true,
        redirected: false,
        status: 200,
        statusText: "",
        type: "basic",
        url,
    }), 1000);
});

const afterSubmit = () => {
    NavigationService.navigate('Home');
    Alert.alert(
        'Success!',
        'We have successfully received the data! Looking forward to greet you!'
    );
}

function* submitForm({payload}) {
    console.log(payload);
    yield put({ type: types.POST_FORM_REQUESTED });
    const status = yield mockedFetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.status);
    if (status === 200) {
        yield put({ type: types.CLEAR_FIELDS})
        yield put({ type: types.POST_FORM_SUCCEEDED});
        yield afterSubmit();
    } else {
        yield put({ 
            type: POST_FORM_FAILED, 
            error: 'Failed to submit!' 
        });        
    }
}
function* actionWatcher() {
    yield takeLatest(types.SUBMIT_FORM, submitForm)
}
export default function* formSaga() {
    yield all([
        actionWatcher(),
    ]);
}
