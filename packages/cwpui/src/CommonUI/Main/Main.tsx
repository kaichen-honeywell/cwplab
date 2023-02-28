import React, { lazy, Suspense, useEffect, useState } from 'react';
import { CWP } from '../../../../cwpcore/src';
import { APP_NAV_CHANGE_SUBJECT, CwpContext, CwpEventDetail, IAppData, IFeature, IVersion, UISize } from '../../../../cwpinterface/src';
import { IObserver } from '../../../../cwpinterface/src/events/IObserver';
import { Blank } from './Blank';
// import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
import "./Main.scss";


const comp1 = lazy(() =>import('@hce/siteop/Panda') );
const comp2 = lazy(() =>import('@hce/siteop/Picking') );
const comp3 = lazy(() =>import('@hce/siteop/Shipping') );
const comp4 = lazy(() =>import('@hce/siteop/Outbound'));           
let components ={'Panda': comp1, 'Picking': comp2, 'Shipping': comp3, 'Outbound': comp4};


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
            const currentFeature = ctx.apps.currentFeature() as IFeature;
            ctx.user.getCurrentUserAsync().then((user)=>{
                if(currentFeature) { // has current feature.  check if route in same app or to different app
                    if(comp === routerDetails.feature){                        
                        ctx.ui.closeLoader('cwp_main');               
                        setComp(routerDetails.component);
                        RemoteComponent = components[routerDetails.component];
                        history.pushState({comp},'');
                    } else {
                        ctx.apps.closeFeature(comp, user).then(()=>{
                            ctx.apps.openFeature(routerDetails.featureId, user).then(
                                ()=>{
                                    ctx.ui.closeLoader('cwp_main');
                                    // need check if current user can access the route
                                    //navigate(routerDetails.route);
                                    RemoteComponent = components[routerDetails.component];
                                    setComp(routerDetails.component);
                                    history.pushState({comp},'');
                                }
                            ).catch((reason)=>{
                                console.log(`cannot open because ${reason}`)
                                ctx.ui.closeLoader('cwp_main');  
                            });
                         }
                        ).catch((reason)=> {
                            console.log(`cannot close because ${reason}`)
                            ctx.ui.closeLoader('cwp_main');  
                        })
                    }
    
                } else { // no current app,  safe to redirect if the route is in routing table
                    ctx.apps.openFeature(routerDetails.feature, "main", user).then(()=>{
                        // need check if current user can access the route
                        //navigate(routerDetails.route);
                        RemoteComponent = components[routerDetails.component];
                        setComp(routerDetails.component);
                        history.pushState({comp},'');
                        ctx.ui.closeLoader('cwp_main');
                    }).catch((reason)=> console.log(`cannot open because ${reason}`));
                }
                

                }
            )
        } 
    } as IObserver<CwpEventDetail>

    const popstateLock = (evt)=> {
       if(ctx.ui.lock.unlock('Outbound')){
           ctx.ui.lock.release('Outbound');
       }else{
           ctx.ui.lock.accept('Outbound');
       }
    }
    useEffect(() => {
        ctx.events.subscribe(APP_NAV_CHANGE_SUBJECT, mainObserver, true);
        window.addEventListener('popstate', popstateLock);
        return ()=> {
            ctx.events.unsubscribe(APP_NAV_CHANGE_SUBJECT, mainObserver,true);
            window.removeEventListener('popstate',popstateLock);
        }
    },[comp]);

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