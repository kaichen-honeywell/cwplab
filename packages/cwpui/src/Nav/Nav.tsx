import React, { useEffect, useState } from "react";
import { CWP, CWP_NAV_BUTTON_SUBJECT } from "../../../cwpcore/src";
import { APP_NAV_CHANGE_SUBJECT, CwpContext, CwpEventDetail, INavItem, INavTemplate } from "../../../cwpinterface/src";
import { IObserver } from "../../../cwpinterface/src/events/IObserver";
import { hamburgerButtonSubject } from "../SubjectConstant";
import "./Nav.scss";

export interface NavProps {
    navTemplate: INavTemplate;
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

    const clickNav = (evt:any, item: INavItem) => {
        evt.preventDefault();
        evt.stopPropagation();

        const nav_evt=  {
            subjectName: APP_NAV_CHANGE_SUBJECT,
            details: {
             elementId: 'nav_toggle_button',
             source: 'cwp_nav',
             route: item.url,
             component: item.component,
             feature: item.feature.featureId,
             version: item.version.versionId,
            }
         } ;
        console.log(nav_evt);
        ctx.events.publishEvent(nav_evt);
        toggle();
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
    },[props.navTemplate])

    return (
    <div className="nav_container">
    <nav className={"nav " + navState}>
        <button key={'nav_toggle_button'} onClick={toggle}>x</button>
        <ul>
        {
         props.navTemplate?.navGroups.map((item)=>
         <>
         <li className="navitem" key={item.groupId}>
                 <h3> {item.defaultName} </h3>
             </li><li key={`${item.groupId}--child`}>
                     <ul>
                         {item.items.map((route) =><li key={route.navItemId}>
                             <a href={route.url} onClick={(e)=>clickNav(e, route)}>{route.defaultText}</a></li> )}
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