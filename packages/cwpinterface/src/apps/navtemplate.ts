import { INavGroup } from "./navgroup";

/**
 * this is the interface to server
 * nav tree request by CWP UI. 
 * the real logic is in cwp/core
 */
export interface INavTemplate {
    templateId: string;
    tenantId: string;
    navGroups: INavGroup[];
}