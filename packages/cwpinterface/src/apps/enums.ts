export enum RouteTypeEnum {
    Nav = 1, // display at side nav or main nav
    ActionButton = 2, // display at action menu
    LinkButton = 3, // display at component level such as link or button
    Internal = 0, // does not display, for internal redirect only.
  }
  
  export enum AppStatus {
    stable,
    preview,
    inactive,
  }