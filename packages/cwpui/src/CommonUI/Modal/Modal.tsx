import { ModalConfig } from "../../../../cwpinterface/src";
import React from 'react';

export interface ModalProps {
    header: any;
    content: any;
    config: ModalConfig
    footer: any;
}

export const Modal = (props: ModalProps)=> {

    return (
    <div className="cwp-modal">
        <header className="cwp-modal-header">
            {props.header}
        </header>
        <div className="cwp-modal-content">
            {props.content}
        </div>
        <footer className="cwp-modal-footer">
            {props.footer}
        </footer>
    </div>
    )
}