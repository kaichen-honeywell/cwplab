import React, { useEffect, useRef, useState } from 'react';
import { APP_NAV_CHANGE_SUBJECT, CwpAppChange, CwpContext } from '../../../cwpinterface/src';
import { IObserver } from '../../../cwpinterface/src/events/IObserver';

const Outbound = (props)=> {
    const ctx = window.CWP as CwpContext;
    const inputRef = useRef(null);
    const [myname, setMyname] = useState(null);
    
    const isFormClean = (): boolean => {
        return inputRef.current.value === 'kai';
    }
    const saveForm = () => {
       // eslint-disable-next-line no-restricted-globals
       if(confirm("please save outbound form first!")){
          setMyname('kai');
          alert('outbound form saved!');
       }
    }
    ctx.ui.lock.request("Outbound",isFormClean, saveForm);
    const outboundObserver = {
        updateObserver: (sub, data)=> {
            if (data.oldAppId ==='siteop' && data.oldUrl ==='/outbound') {
                ctx.ui.renderToastMessage('Leaving Outbound App', {allowClose: false, triggerId:'outbound', open: true});
            }
        }
    } as IObserver<CwpAppChange>;

    useEffect(()=>{
        ctx.events.subscribe(APP_NAV_CHANGE_SUBJECT, outboundObserver, true);
        return ()=>{
            ctx.events.unsubscribe(APP_NAV_CHANGE_SUBJECT,outboundObserver, true);
        }
    },[myname]);
    
    return (<div>

        <form>
        <label>
            Name:
            <input type="text" name="name"  ref={inputRef}  value={myname}/>
        </label>
        <label>
            Organization:
            <input type="text" name="text" required />
        </label>
        <input type="submit" value= "Save" /> 
        </form>

    </div>)
}

export default Outbound;