import { useCallback } from "react";

import store from "../store";

//生成触发action的回调hook
export function useActionCallback(action) {

    const ACTION_CALLBACK = useCallback(()=>{
        store.dispatch(action);
    },[ action ]);

    return ACTION_CALLBACK;
}