import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";

export interface CwpEventDetail {
  subjectName: string;
  details: {[key:string]: any};
}

export interface CwpEventService {
  events: Record<string, ISubject<CwpEventDetail>>;
  addEvent: (evtName: string, evt: ISubject<CwpEventDetail>) => void;
  removeEvent: (evtName: string, observer?: IObserver<CwpEventDetail>) => void;
  publishEvent: (evt: CwpEventDetail) => void;
  subscribe:(subjectName: string, observer : IObserver<CwpEventDetail>, force?: boolean)=>void;
  unsubscribe:(subjectName: string, observer: IObserver<CwpEventDetail>, prune?: boolean)=>void;
}
