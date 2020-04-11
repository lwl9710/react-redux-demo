import * as types from "../type";
const defaultState = {
    count: 0
}



export default function(state = defaultState, action) {
    let newState = null;

    if(Object.values(types).indexOf(action.type) === -1) {
        return state
    }else {
        newState = JSON.parse(JSON.stringify(state));

        switch(action.type) {
            case types.ADD:
                newState.count += action.value;
            break;
            case types.DEL:
                newState.count -= action.value;
            break;
            default: return state
        }
    }

    return newState;
}