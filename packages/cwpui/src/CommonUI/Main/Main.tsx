import React, { useEffect } from 'react';
import { APP_NAV_CHANGE_SUBJECT, CWP } from '../../../../cwpcore/src';
import { CwpContext, CwpEventDetail, IAppData } from '../../../../cwpinterface/src';
import { IObserver } from '../../../../cwpinterface/src/events/IObserver';
import "./Main.scss";

export const Main = (props) => {
    const ctx = CWP.getInstance() as CwpContext;
    const mainObserver = {
        observerName: 'cwp_main',
        updateObserver : (sub, data)=> {
            const routerDetails = data.details;
            const currentApp = ctx.apps.currentApp() as IAppData;
            ctx.user.getCurrentUserAsync().then((user)=>{
                if(currentApp) { // has current app.  check if route in same app or to different app
                    if(currentApp.appId === routerDetails.appId){
                        
    
                    } else {
                        ctx.apps.closeApp(currentApp.appId, user).then(()=>{
                            ctx.apps.openApp(routerDetails.appId, user).then(
                                ()=>{

                                }
                            )
                         }
                        )
                    }
    
                }else { // no current app,  safe to redirect
                    ctx.apps.openApp(routerDetails.appId, user).then(()=>{

                    });
                }
                }
            )
        
          
        } 
    } as IObserver<CwpEventDetail>

    useEffect(() => {
        ctx.events.subscribe(APP_NAV_CHANGE_SUBJECT, mainObserver)
        return ()=> {

        }
    })

    return(<div className='main-content'>
    </div>)
}