import { IPortalUser } from "../users/portaluser";
import { IConfigure } from "./configure";
import { IFeature } from "./feature";
import { INavTemplate } from "./navtemplate";
import { IVersion } from "./version";

export interface CwpAppService {
  listFeatures:(user: IPortalUser) => Promise<IFeature[]>; // list all feature.
  listLocalFeatures:() => IFeature[]; // list downloaded feature from local. 
  openFeature:(featureId: string,  user: IPortalUser) => Promise<IFeature>; // open a feature
  closeFeature:(featureId: string,  user: IPortalUser) =>Promise<IFeature>; // close a feature
  getVersion:(versionId: string, user: IPortalUser)=>Promise<IVersion>; // get a version by id
  getFeature:(featureId: string, user: IPortalUser)=> Promise<IFeature>; // get a feature by id
  currentVersion: ()=>IVersion; // get current version from local
  currentFeature: ()=>IFeature; // get current feature from local
  getNavTemplate:(user: IPortalUser) => Promise<INavTemplate>; // get the generated nav tree 
  getConfigure: (user: IPortalUser, featureId: string) => Promise<IConfigure>; // get the config for current feature.
  upgradeFeature: (featureId: string, user: IPortalUser) => Promise<IFeature>; // upgrade current feature to new version by calling remote api
}
