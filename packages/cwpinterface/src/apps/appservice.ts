import { IPortalUser } from "../users/portaluser";
import { IAppData } from "./appdata";

export interface CwpAppService {
  listAllApps: (user: IPortalUser) => Promise<IAppData[]>; // list all apps from catalog service api
  listLocalApps: () => IAppData[]; // list apps already installed in browser
  getApp: (appId: string, user: IPortalUser) => Promise<IAppData>; // get remote app info
  openApp:(appId: string, user: IPortalUser) => Promise<IAppData>;
  closeApp:(appId: string, user: IPortalUser) =>Promise<IAppData>;
  currentApp: () => IAppData; // get current app info from local
  upgradeApp: (appId: string, user: IPortalUser) => Promise<IAppData>; // upgrade current app to new version by calling remote api
}
