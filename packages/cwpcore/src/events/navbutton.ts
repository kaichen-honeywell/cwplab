import { CwpEventDetail } from "../../../cwpinterface/src/index";
import { BaseSubject } from "./basesubject";

export const CWP_NAV_BUTTON_SUBJECT = 'CWP_NAV_BUTTON_SUBJECT';
export class NavButtonSubject extends BaseSubject<CwpEventDetail> {
    constructor() {
        super(CWP_NAV_BUTTON_SUBJECT);
    }
}