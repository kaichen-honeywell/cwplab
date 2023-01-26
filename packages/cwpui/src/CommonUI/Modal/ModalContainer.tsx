import React, { useEffect, useState } from "react"
import { CWP } from "../../../../cwpcore/src";
import { CwpContext, CwpEventDetail, CWP_MODAL_SUBJECT, ModalConfig, ModalObject } from "../../../../cwpinterface/src";
import { IObserver } from "../../../../cwpinterface/src/events/IObserver";
import { Modal, ModalProps} from "./Modal";

export const ModalService = (props) => {
    let modalProps = {} as ModalProps;
    const[modal, setModal] = useState(modalProps);
    const ctx=  CWP.getInstance() as CwpContext;
    

    const modalObserver = {
        observerName: '',
        updateObserver: (sub, data:CwpEventDetail) => {
            const detail = data.details.modal as ModalObject;
            modalProps = {
                header: detail.header,
                config: detail.config,
                content: detail.content,
                footer: detail.footer,
            };
            setModal(modalProps);
        }
    } as IObserver<CwpEventDetail>;

    useEffect(()=> {

        ctx.events.subscribe(CWP_MODAL_SUBJECT, modalObserver, true)

        return ()=>{
            ctx.events.unsubscribe(CWP_MODAL_SUBJECT, modalObserver, true);
        }

    }, []);

    return (
        <Modal {...modal}>
           
        </Modal>
    )
}