import { IPortalUser, IUserSetting } from "./portaluser";

export interface CwpUserService {
  getCurrentUserAsync: () => Promise<IPortalUser>;
  saveSettingAsync: (settings: IUserSetting[]) => Promise<void>;
  changeLocaleAsync: () => Promise<void>;
  changeThemeAsync: () => Promise<void>;
}
