import { IObserver } from "../../../cwpinterface/src/events/IObserver";
import { ISubject } from "../../../cwpinterface/src/events/ISubject";

export class BaseSubject<T> implements ISubject<T> {
    _observers: Array<IObserver<T>>;
    subjectName: string;

    constructor(subName: string) {
        this.subjectName = subName;
        this._observers=[];
    }

    subscribe(observer: IObserver<T>): void {
      const isAlreadyObserver = this._observers.includes(observer);
      if (isAlreadyObserver) return;
      this._observers.push(observer);
      console.debug(`${this.subjectName} now has ${this._observers.length} subscribers.`);
    }
    unsubscribe(observer: IObserver<T>): void {
        console.debug(`${observer.observerName} unsubscribed from ${this.subjectName}.`);
        this._observers = this._observers.filter((other) => other !== observer);
        console.debug(`${this.subjectName} now has ${this._observers.length} subscribers.`);
    }
    notify(data: T): void {
        console.debug(`${this.subjectName} notifies its ${this._observers.length} subscribers sync`);
        this._observers.map(observer => {
            if(observer.updateObserver !== undefined){
                observer.updateObserver(this, data);
            }
        } );
    }
    notifyAsync(data: T): Promise<void[]> | Promise<void> {
        console.debug(`${this.subjectName} notifies its ${this._observers.length} subscribers asycn`);
        return Promise.all(this._observers.map((observer) => {
            if(observer.updateObserverAsync!== undefined){
                observer.updateObserverAsync(this, data);
            }
        } ));
    }
    listObservers(): IObserver<T>[] {
        return this._observers;
    }

}