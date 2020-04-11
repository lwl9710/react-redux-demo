import { ADD, DEL } from "../type";

function createAction(type) {
    let action = {
        type
    }

    return function(value) {
        value && (action.value = value);
        return action;
    }
}

export const getAddCountAction = createAction(ADD);

export const getDelCountAction = createAction(DEL);