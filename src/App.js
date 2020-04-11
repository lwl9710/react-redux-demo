import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getAddCountAction, getDelCountAction } from "./store/action";
import { useActionCallback } from "./hook";
import store from "./store";


function App() {
    const [count, setCount] = useState(0);
    // const myRef = useRef(null);   验证函数依赖

    const stateChange = useCallback(()=>setCount(store.getState().count),[])

    const addCountAction = useMemo(()=>getAddCountAction(2),[]);
    const delCountAction = useMemo(()=>getDelCountAction(2),[]);

    const addCount = useActionCallback(addCountAction);
    const delCount = useActionCallback(delCountAction);

    useEffect(()=>{
        setCount(store.getState().count);

        store.listener.use(stateChange);

        return ()=>store.listener.unUse(stateChange);
    },[ stateChange ]);

    /*
        验证内存函数
        useEffect(()=>{
            if(myRef.current != null) {
                console.log(myRef.current === addCountAction);
            }
            myRef.current = addCountAction;
        })
    */

    return (
        <div className="App">
            <h3>计数器:</h3>
            <div className="content">
                <p>
                    <span>当前计数: </span>
                    <span style={{ color: "orangered", fontWeight: "bold" }}>{ count }</span>
                </p>
            </div>
            <div className="control">
                <button style={{ marginRight: "10px" }} onClick={ addCount }>增加计数</button>
                <button onClick={ delCount }>减少计数</button>
            </div>
        </div>
    );
}

export default App;
