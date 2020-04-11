import { useCallback } from "react";

import store from "../store";

//生成触发action的回调hook
export function useActionCallback(fn) {

    const ACTION_CALLBACK = useCallback(()=>{
        store.dispatch(fn);
    },[ fn ]);

    return ACTION_CALLBACK;
}