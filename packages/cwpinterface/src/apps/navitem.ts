import { NavTargetEnum, RouteTypeEnum } from "./enums";
import { IFeature } from "./feature";
import { IVersion } from "./version";

/**
 * This is the interface to render side nav,  
 * the logic to compose the template should be
 * implemented in the cwp/core package.
 */
export interface INavItem {
    navItemId: string;
    defaultText: string;
    textKey?: string;
    icon?: string;
    url: string;
    component: string;
    target: NavTargetEnum;
    routeType: RouteTypeEnum[];
    navParams: { [key: string]: string }; 
    feature: IFeature;  // one feature
    version: IVersion;  // version of the app
    children: INavItem[];
}