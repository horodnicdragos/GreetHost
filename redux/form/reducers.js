import { combineReducers } from "redux";
import * as types from "./types";

const fieldsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.SET_FIELD:
            const { key, value, error } = action.payload;
            if (!key) return state;
            return {
                ...state,
                [key]: { value, error }
            };
        case types.SET_VALIDATED:
            const { validated } = action.payload;
            if (!validated) return state
            return {
                ...state,
                ...validated,
            };
        case types.CLEAR_FIELDS:
            return {};
        default: return state;
    }
}

const submitReducer = (state = {}, action) => {
    switch (action.type) {
        case types.POST_FORM_SUCCEEDED:
            return {
                pending: false,
                error: null,
            }
        case types.POST_FORM_REQUESTED:
            return {
                ...state,
                pending: true,
            }
        case types.POST_FORM_FAILED:
            return {
                error: action.error,
                pending: false,
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    fields: fieldsReducer,
    submit: submitReducer,
});

export default reducer;
