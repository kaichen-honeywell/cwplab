import { FeatureFlag } from "./enums";

/**
 * one feature can be implemented in multiple version
 */
export interface IFeature {
    featureId: string;
    featureName: string;
    featureFlag: FeatureFlag;
    owner: string;
    lastUpdate:string;
    entryComponent: string;
    metadataJSON: {[key: string]: string}; // { "Dashboard": "./src/Dashboard",  "assetDetail": "./src/Detail"}
}