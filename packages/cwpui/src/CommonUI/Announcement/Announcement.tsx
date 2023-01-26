import React, { useEffect, useState } from 'react';
import { CWP } from '../../../../cwpcore/src';
import { AnnounceConfig, CwpContext, CwpEventDetail, CWP_ANNOUNCEMENT_SUBJECT, UILevel } from '../../../../cwpinterface/src';
import { IObserver } from '../../../../cwpinterface/src/events/IObserver';
import "./Announcement.scss";

export const AnnouncementService = (props) => {
    const [displayMsg, setDisplayMsg] = useState({message: '', level:'', trigger: '', show: 'close'});
    const ctx = CWP.getInstance() as CwpContext;
    const convertUiLevel = (level: UILevel) => {
        switch(level) {
            case UILevel.error :
                return 'error';
            case UILevel.info :
                return 'info';
            case UILevel.warning:
                return 'warning';
            default:
                return 'info';
        }
    }
    const observer = {
        observerName: 'cwp_announcement_service',
        updateObserver: (subject, data)=> {
            const config = data.details.config as AnnounceConfig;
            const msg = data.details.message;
            if(config && config.open){
                setDisplayMsg({
                    message: msg,
                    show: 'open',
                    trigger: config.triggerId,
                    level: convertUiLevel(config.msgLevel)
                });
                if(config.timeout > 0){
                    setTimeout(() => {
                        ctx.ui.closeAnnouncement(config.triggerId);
                    }, config.timeout*1000);
                }

            }else{
                setDisplayMsg({
                    message: '',
                    show: 'close',
                    trigger: '',
                    level: convertUiLevel(config.msgLevel)
                });

            }
        }
    } as IObserver<CwpEventDetail>;
    
    const closeAnnouncement = (e)=> {
        e.preventDefault();
        e.stopPropagation();
        ctx.ui.closeAnnouncement(displayMsg.trigger);
    }

    useEffect(()=> {
        ctx.events.subscribe(CWP_ANNOUNCEMENT_SUBJECT, observer, true);
        return ()=>{
            ctx.events.unsubscribe(CWP_ANNOUNCEMENT_SUBJECT, observer);
        }
    });

    if(displayMsg.show === 'open'){
        return (<p className={`announcement ${displayMsg.level}`}>{displayMsg.message}
        <button onClick={closeAnnouncement}>x</button>
        </p>)
    } else{
        return (null);      
    }
  
}
