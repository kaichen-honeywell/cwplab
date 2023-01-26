import { IAppRoute } from "./approute";

export enum AppStatus {
  stable,
  preview,
  inactive,
}
export interface IAppData {
  appId: string; // UUID of app
  defaultName: string; //name of app
  nameKey: string; // name key for i18n;
  iconName?: string;
  description?: string; // description
  rootUrl: string; // root url of app
  appEntryUrl: string; // entry url for microfront
  version: string; // target version of app
  releaseDate: string; // YYYY-MM-DDTHH:mm:ss.sssZ
  appRoutes: IAppRoute[];
  appParams: { [key: string]: string }; // a key value pair  for extra parameter needed by url if there's any.
  status: AppStatus; // app status
}
