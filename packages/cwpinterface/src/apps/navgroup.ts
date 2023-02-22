import { INavItem } from './navitem';

export interface INavGroup {
  groupId: string;
  defaultName: string;
  textKey: string;
  icon?: string;
  items: INavItem[];
}
