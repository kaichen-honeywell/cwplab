import React, { lazy, Suspense, useEffect, useState } from 'react';
import { CWP } from '../../../../cwpcore/src';
import { APP_NAV_CHANGE_SUBJECT, CwpContext, CwpEventDetail, IAppData, UISize } from '../../../../cwpinterface/src';
import { IObserver } from '../../../../cwpinterface/src/events/IObserver';
import { Blank } from './Blank';
// import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
import "./Main.scss";


const comp1 = React.lazy(() =>import('@hce/siteop/Panda') );
const comp2 = React.lazy(() =>import('@hce/siteop/Picking') );
const comp3 = React.lazy(() =>import('@hce/siteop/Shipping') );
           
let components ={'Panda': comp1, 'Picking': comp2, 'Shipping': comp3};


let RemoteComponent  = Blank;

export const Main = (props) => {

    //const navigate = useNavigate();
    const [comp, setComp] = useState('Panda');
   
    // const  allRoutes= RouteBuilder(props.allItems);

    const ctx = CWP.getInstance() as CwpContext;

    const mainObserver = {
        observerName: 'cwp_main',
        updateObserver : (sub, data)=> {
            ctx.ui.renderLoader({
                size: UISize.medium,
                triggerId: 'cwp_main',
                open: true,
            });
            const routerDetails = data.details;
            const currentApp = ctx.apps.currentApp() as IAppData;
            ctx.user.getCurrentUserAsync().then((user)=>{
                if(currentApp.appId) { // has current app.  check if route in same app or to different app
                    if(currentApp.appId === routerDetails.appId){                        
                        ctx.ui.closeLoader('cwp_main');               
                        setComp(routerDetails.component);
                        RemoteComponent = components[routerDetails.component];
                    } else {
                        ctx.apps.closeApp(currentApp.appId, user).then(()=>{
                            ctx.apps.openApp(routerDetails.appId, user).then(
                                ()=>{
                                    ctx.ui.closeLoader('cwp_main');
                                    // need check if current user can access the route
                                    //navigate(routerDetails.route);
                                    RemoteComponent = components[routerDetails.component];
                                    setComp(routerDetails.component);
                                }
                            )
                         }
                        )
                    }
    
                } else { // no current app,  safe to redirect if the route is in routing table
                    ctx.apps.openApp(routerDetails.appId, user).then(()=>{
                        // need check if current user can access the route
                        //navigate(routerDetails.route);
                        RemoteComponent = components[routerDetails.component];
                        setComp(routerDetails.component);
                        ctx.ui.closeLoader('cwp_main');
                    });
                }
                

                }
            )
        } 
    } as IObserver<CwpEventDetail>

    useEffect(() => {
        ctx.events.subscribe(APP_NAV_CHANGE_SUBJECT, mainObserver, true);
        return ()=> {
            ctx.events.unsubscribe(APP_NAV_CHANGE_SUBJECT, mainObserver,true);
        }
    });

    /**
     * 
    <BrowserRouter>
    {
        allRoutes.map((r)=><Route path={r.routePath} component={r.component}>
            {r.children.map((rc)=><Route path={rc.routePath} component= {rc.component}></Route>)}
        </Route>)
    }
    </BrowserRouter>
     */
    return(<div className='main-content'>
        <Suspense fallback={<div>Loading</div>}>
        <RemoteComponent></RemoteComponent>
        </Suspense>
    </div>)
}