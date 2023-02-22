import { IVersion } from "./version";

export interface IAppData {
  appId: string; // UUID of app
  defaultName: string; //name of app
  nameKey: string; // name key for i18n;
  iconName?: string;
  description?: string; // description
  version: IVersion[]
  manifestJSON: {[key:string]: string}  // a complete manifest json string of current application
}