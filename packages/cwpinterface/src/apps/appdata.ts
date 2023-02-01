import { IAppRoute } from "./approute";
import { AppStatus } from "./enums";

export interface IAppData {
  appId: string; // UUID of app
  defaultName: string; //name of app
  nameKey: string; // name key for i18n;
  iconName?: string;
  description?: string; // description
  rootUrl: string; // root url of app
  component: string;
  appEntryUrl: string; // entry url for microfront
  version: string; // target version of app
  releaseDate: string; // YYYY-MM-DDTHH:mm:ss.sssZ
  appRoutes: IAppRoute[];
  appParams: { [key: string]: string }; // a key value pair  for extra parameter needed by url if there's any.
  status: AppStatus; // app status
  manifestJSONString?: string; // a complete manifest json string of current application
}
