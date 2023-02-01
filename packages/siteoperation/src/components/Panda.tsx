import React, { useEffect, useState } from 'react';
import { CWP_NAV_BUTTON_SUBJECT } from '../../../cwpcore/src';
import { CwpContext, CwpEventDetail, GetSafeCwpContext, LoaderConfig, UISize } from '../../../cwpinterface/src';
import { IObserver } from '../../../cwpinterface/src/events/IObserver';
import './components.scss';

const Panda = (props)=>{
    const [color, setColor] = useState('green');
    const handleClick = ()=>{
        const ctx = GetSafeCwpContext()
        ctx.ui.renderToastMessage('click a panda button', {triggerId: 'panda_btn', source:'Panda', open: true })
        ctx.ui.renderLoader({
            size: UISize.medium,
            customText:'Panda Eating',
            showPercentage: true,
            percentageValue: '66%',
            source: 'Panda',
            triggerId: 'panda_btn',
            open: true
        } as LoaderConfig);

        setTimeout(() => {
            ctx.ui.closeLoader('panda_btn');
        }, 3000);
    }

    const pandaBtnObserver = {
        observerName: 'Panda_NAV_Button_Observer',
        updateObserver: (sub, data)=> {
            setColor('black');
        }
    } as IObserver<CwpEventDetail>

    useEffect(()=>{
         GetSafeCwpContext().events.subscribe(CWP_NAV_BUTTON_SUBJECT,pandaBtnObserver, true);
        return ()=>{
             GetSafeCwpContext().events.unsubscribe(CWP_NAV_BUTTON_SUBJECT,pandaBtnObserver, true)
        }
    });

    return (<div className='panda-container'>
        
        <button key='panda_btn' className='panda-button' onClick={handleClick}>Panda Button</button>
    </div>)
}

export default Panda;