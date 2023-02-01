import React, { useEffect } from 'react';
import { APP_NAV_CHANGE_SUBJECT, CwpAppChange, CwpContext } from '../../../cwpinterface/src';
import { IObserver } from '../../../cwpinterface/src/events/IObserver';

const Outbound = (props)=> {
    /*const ctx = window.CWP as CwpContext;
    
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
    });
    */
    return (<div>Outbound</div>)
}

export default Outbound;