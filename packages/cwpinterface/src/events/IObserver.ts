import { ISubject } from "./ISubject";

export interface IObserver<T> {
  observerName: string;
  updateObserver(subject: ISubject<T>, data: T): void;
  updateObserverAsync(subject: ISubject<T>, data: T): Promise<void>;
}
