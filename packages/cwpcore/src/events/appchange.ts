import { APP_NAV_CHANGE_SUBJECT, CwpEventDetail } from "../../../cwpinterface/src/index";
import { BaseSubject } from "./basesubject";

export class AppChangeSubject extends BaseSubject<CwpEventDetail> {
    constructor() {
        super(APP_NAV_CHANGE_SUBJECT);
    }
}