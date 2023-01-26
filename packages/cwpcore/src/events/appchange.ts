import { CwpEventDetail } from "../../../cwpinterface/src/index";
import { BaseSubject } from "./basesubject";

export const APP_NAV_CHANGE_SUBJECT  = 'CWP_APP_NAV_CHANGE_EVENT';

export class AppChangeSubject extends BaseSubject<CwpEventDetail> {
    constructor() {
        super(APP_NAV_CHANGE_SUBJECT);
    }
}