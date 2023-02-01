import { RouteTypeEnum } from "./enums";

// app Routes represent the access points of an app can they can be group by modules
export interface IAppRoute {
  appRouteId: number;
  defaultName: string; //default name of current route if i18n key is not present, use default name
  rootUrl: string; //root Url
  component: string;
  iconName?: string; //
  nameKey: string;
  children: IAppRoute[];
  appParams: { [key: string]: string }; // a key value pair  for extra parameter needed by url if there's any.
  routeType: RouteTypeEnum[];
}
