import * as types from "./types";

const setField = ( { key, value, error} ) => ( {
    type: types.SET_FIELD,
    payload: { key, value, error }
} );

const setValidated = ( validated ) => ( {
    type: types.SET_VALIDATED,
    payload: { validated }
} );

const clearFields = () => ( {
    type: types.CLEAR_FIELDS
} );

const submitForm = (payload) => ( {
    type: types.SUBMIT_FORM,
    payload
} );

export {
    setField,
    setValidated,
    clearFields,
    submitForm,
};
