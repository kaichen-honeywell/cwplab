import React, { useEffect, useState } from "react";
import { APP_NAV_CHANGE_SUBJECT, CWP, CWP_NAV_BUTTON_SUBJECT } from "../../../cwpcore/src";
import { CwpContext, CwpEventDetail, IAppData, IAppRoute } from "../../../cwpinterface/src";
import { IObserver } from "../../../cwpinterface/src/events/IObserver";
import { hamburgerButtonSubject } from "../SubjectConstant";
import "./Nav.scss";

export interface NavProps {
    items: IAppData[],
}

const Nav = (props: NavProps)=> {
    const [navState, setNavState ] = useState('close');
    const ctx = CWP.getInstance() as CwpContext;
    const toggle = ()=>{
        const val = navState ==='open'? 'close': 'open';
        setNavState(val);
        ctx.events.publishEvent({
            subjectName: CWP_NAV_BUTTON_SUBJECT,
            details: {
                elementId: 'nav_toggle_button',
                source: 'cwp_nav',
                value: val
            }
        } as CwpEventDetail)
    }

    const clickNav = (evt:any, item: IAppData, route: IAppRoute) => {
        evt.preventDefault();
        evt.stopPropagation();
        ctx.events.publishEvent( {
           subjectName: APP_NAV_CHANGE_SUBJECT,
           details: {
            elementId: 'nav_toggle_button',
            source: 'cwp_nav',
            route: route.rootUrl,
            app: item.appId,
           }
        } )
    }

    const navObserver = {observerName: 'cwp_nav', updateObserver: (sub, data:CwpEventDetail)=> {
        const val = data.details.value
        if( val ==='open'){
            setNavState(val);
        } 
        
    }} as IObserver<CwpEventDetail>; 
    
    useEffect(()=>{
        ctx.events.subscribe(hamburgerButtonSubject, navObserver, true);
        return ()=>{
           ctx.events.unsubscribe(hamburgerButtonSubject,navObserver, true);
        };
    },[props.items])

    return (
    <div className="nav_container">
    <nav className={"nav " + navState}>
        <button key={'nav_toggle_button'} onClick={toggle}>x</button>
        <ul>
        {
         props.items?.map((item)=>
         <>
         <li className="navitem" key={item.appId}>
                 <h3> {item.defaultName} </h3>
             </li><li key={`${item.appId}--child`}>
                     <ul>
                         {item.appRoutes?.map((route) =><li key={route.appRouteId}>
                             <a href={route.rootUrl} onClick={(e)=>clickNav(e, item, route)}>{route.defaultName}</a></li> )}
                     </ul>
                 </li>
                 </>
         )
        }
        </ul>
    </nav>
    </div>)
}

export default Nav;