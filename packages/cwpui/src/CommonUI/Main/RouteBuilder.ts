import { Component } from "react";
import { IAppData, IAppRoute } from "../../../../cwpinterface/src";

export interface CwpRoute {
    routePath: string;
    component: ()=>Component,
    children: CwpRoute[],
}
export const RouteBuilder = (allItems: IAppData[]): CwpRoute[] => {
     const cwpRoutes =[];
     for(const item of allItems){
        const rootRoute ={
            routePath: item.rootUrl,
            component: ()=>window[item.component],
            children: item.appRoutes.map((ar)=>GetRoute(ar))
        }
        cwpRoutes.push(rootRoute);
     }
     return cwpRoutes;
}

export const GetRoute = (appRoute: IAppRoute): CwpRoute | undefined => {
    const Comp = ()=> window[appRoute.component];
    if(!Comp){
        return undefined;
    } else {
        return {
            routePath : appRoute.rootUrl,
            component : Comp,
            children : appRoute.children.map((r)=> GetRoute(r))
        }
    }
}