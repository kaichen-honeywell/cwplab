import { IObserver } from "./IObserver";

export interface ISubject<T> {
  subjectName: string;
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(data: T): void;
  notifyAsync(data: T): Promise<void[]> | Promise<void>;
  listObservers(): IObserver<T>[];
}
