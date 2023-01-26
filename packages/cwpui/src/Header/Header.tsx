import "./Header.scss";
import React, { useEffect, useState } from "react";
import { CWP, CWP_NAV_BUTTON_SUBJECT } from "../../../cwpcore/src";
import { CwpContext, CwpEventDetail } from "../../../cwpinterface/src";
import { hamburgerButtonSubject } from "../SubjectConstant";
import { IObserver } from "../../../cwpinterface/src/events/IObserver";
export interface HeaderProps {
    logo: any;
}


const Header = (props: HeaderProps) => {
    const [color, setColor] = useState('yellow');

    const ctx = CWP.getInstance() as CwpContext;
    const handleClick = (clickEvt)=>{
      setColor('red');
      ctx.events.publishEvent({
        subjectName: hamburgerButtonSubject,
        details: {
          elementId: 'header-logo-id',
          source:'cwp_header',
          value: 'open'
        }
      } as CwpEventDetail )
    }

    const headerObserver = { observerName: 'cwp_heaer', updateObserver: (sub, data)=>{
     setColor('yellow');
    }
  } as IObserver<CwpEventDetail>;

    useEffect(()=>{
      ctx.events.subscribe(CWP_NAV_BUTTON_SUBJECT, headerObserver);
      return () => {
        ctx.events.unsubscribe(CWP_NAV_BUTTON_SUBJECT, headerObserver);
      };
    },[props.logo]);

    return (
        <header className={`App-header  ${color}`}>
        <img id="header-logo-id" src={props.logo} className="App-logo" onClick={handleClick} alt="logo" />
        <span><b>Honeywell Performance+</b></span>
      </header>
    )
}

export default Header;