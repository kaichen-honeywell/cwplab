import { VersionStatusEnum } from "./enums";

/**
 * one app have multiple version
 * one version have multiple features.
 */
export interface IVersion {
    versionId: string;
    versionText: string;
    app: string;
    versionStatus: VersionStatusEnum
    releaseDate: string;
    remoteEntryFileUrl: string; // "localhost:3001/remoteEntry.js"
    metadataJSON: {[key: string]: string};  // "expose" metadata in micro-frontend config  
}