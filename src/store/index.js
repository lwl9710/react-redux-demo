import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";



const middlewareCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const middleware = middlewareCompose(applyMiddleware(thunk));

const store = createStore(reducer, middleware);

//新增监听器API
store.listener = function() {
    const LISTENER_API = {
        //处理器
        __handlers: [],
        //使用处理器
        use: function(fn,isInit = true) {
            this.__handlers.push(fn);
            isInit && fn(store.getState());
        },
        //取消处理器使用
        unUse: function(fn) {
            if(!fn)return false;

            const INDEX = this.__handlers.indexOf(fn);
            if( INDEX !== -1 ) {
                return false
            }else {
                return this.__handlers.splice(INDEX,1);
            }
        }
    }

    //注册监听器服务
    store.subscribe(function() {
        LISTENER_API.__handlers.forEach(fn=>fn(store.getState()));
    })

    //返回监听器API
    return LISTENER_API;
}();

export default store;