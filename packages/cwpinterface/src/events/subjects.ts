import { CwpEventDetail } from "./eventservice";

export interface CwpTheme extends CwpEventDetail {
  currentTheme: string;
  defaultTheme: string;
}

export interface CwpLocale extends CwpEventDetail {
  currentLocale: string;
  defaultLocale: string;
}

export interface CwpBranding  extends CwpEventDetail {
  currentBranding: string;
  defaultBranding: string;
}

export interface CwpAppChange extends CwpEventDetail {
  oldAppId: string;
  newAppId: string;
  oldUrl: string;
  newUrl: string;
}

export interface CwpClick extends CwpEventDetail {
  appId: string;
  elementId: string;
}
export enum CwpChangeType {
  TEXT_CHANGE,
  VALUE_CHANGE,
  SELECT_CHANGE,
}
export interface CwpChange extends CwpEventDetail{
  appId: string;
  elementId: string;
  changeType: CwpChangeType;
  oldvalue: string[];
  newvalue: string[];
}
