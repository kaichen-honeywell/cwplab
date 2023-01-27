import { IObserver } from "../../../cwpinterface/src/events/IObserver";
import { ISubject } from "../../../cwpinterface/src/events/ISubject";
import { CwpEventService, CwpEventDetail } from "../../../cwpinterface/src/index";
import { AppChangeSubject, APP_NAV_CHANGE_SUBJECT } from "./appchange";
import { BaseSubject } from "./basesubject";
import { CWP_NAV_BUTTON_SUBJECT, NavButtonSubject } from "./navbutton";


export class EventBus implements CwpEventService {
    constructor() {
        this.events = {};
        this.addEvent(APP_NAV_CHANGE_SUBJECT, new AppChangeSubject());
        this.addEvent(CWP_NAV_BUTTON_SUBJECT, new NavButtonSubject());
    }
    public subscribe(subjectName: string, observer: IObserver<CwpEventDetail>, force?: boolean) {
        if(!this.events[subjectName]){
            if(force){
                this.addEvent(subjectName, new BaseSubject(subjectName));
                this.events[subjectName].subscribe(observer);
            }else{
                throw new Error('unsupported subject');
            }
        }else{
            // only subscribe one time!
            if(!this.events[subjectName].listObservers().find((o)=>o.observerName === observer.observerName)){
                this.events[subjectName].subscribe(observer);
            }
        }
    }
    public unsubscribe(subjectName: string, observer: IObserver<CwpEventDetail>, prune?: boolean) {
        const sub = this.events[subjectName];
        if(sub) {
            sub.unsubscribe(observer);
            if(sub.listObservers().length === 0 && prune){
                this.removeEvent(subjectName);
            }
        }
    }

    events: Record<string, ISubject<CwpEventDetail>>;
    public addEvent(evtName: string, evt: ISubject<CwpEventDetail>) {
        if (!this.events){
            this.events = {};
        }
        this.events[evtName] = evt;
    }

    public removeEvent(evtName: string, observer?: IObserver<CwpEventDetail>){
        const targetSubject = this.events[evtName];
        if(targetSubject) {
            if(targetSubject.listObservers().length ===0  ||
              (targetSubject.listObservers().length===1 
              && targetSubject.listObservers()[0].observerName ===observer?.observerName))
              delete this.events[evtName];
        }else {
            throw new Error(`event ${evtName} does not exist or cannot be deleted`);
        }
    }

    public publishEvent(evt: CwpEventDetail, callback?:()=>void){
      if(evt.subjectName &&  this.events[evt.subjectName]){
        console.log(`eventbus will notify ${evt.subjectName} to ${this.events[evt.subjectName].listObservers().length} subscibers`);
          this.events[evt.subjectName].notify(evt);
          this.events[evt.subjectName].notifyAsync(evt).then(callback)
      }   
    }

}