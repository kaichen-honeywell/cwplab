export interface IRole {
  id: string;
  name: string;
}
export interface IUserSetting {
  id: string;
  name: string;
  value: string;
  type: string;
}
export interface IUserGroup {
  id: string;
  name: string;
}
export interface IPortalUser {
  id: string;
  username: string;
  idToken: string;
  accessToken: string;
  refreshToken: string;
  roles: IRole[];
  settings: IUserSetting[];
  groups: IUserGroup[];
}
