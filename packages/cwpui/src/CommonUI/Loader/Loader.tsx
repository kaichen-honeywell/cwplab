import "./Loader.scss";
import React, { useEffect, useState }  from "react";
import { CwpContext, CwpEventDetail, CWP_LOADER_SUBJECT, LoaderConfig, UISize } from "../../../../cwpinterface/src";
import { CWP } from "../../../../cwpcore/src";
import { IObserver } from "../../../../cwpinterface/src/events/IObserver";
export const LoaderService = (props) => {
    const[loader, setLoader] = useState({size: UISize.medium, triggerId: '', open: false, text: '', per: '100%'})
    const ctx = CWP.getInstance() as CwpContext;

    const observer = {
        observerName: 'cwp_loader',
        updateObserver: (subject, data:CwpEventDetail)=> {
            const config  = data.details.config as LoaderConfig;
            setLoader({
                size: config.size,
                open: config.open,
                text: config.customText,
                per: config.showPercentage? config.percentageValue: '',
                triggerId: 'cwp_loader'
            });
        }
    } as IObserver<CwpEventDetail>;

    useEffect(()=> {
        ctx.events.subscribe(CWP_LOADER_SUBJECT, observer, true);
        return ()=>{
            ctx.events.unsubscribe(CWP_LOADER_SUBJECT, observer, true);
        }
    })
    if(loader.open){
        return (
        <div className="loader-container">
            <div className="loader">{loader.text}</div>
            <span>{loader.per}</span>
        </div>
        )
    } else {
        return null;
    }
}