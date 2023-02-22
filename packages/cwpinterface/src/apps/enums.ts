export enum RouteTypeEnum {
  Nav = 1, // display at side nav or main nav
  ActionButton = 2, // display at action menu
  LinkButton = 3, // display at component level such as link or button
  Internal = 0, // does not display, for internal redirect only.
}

export enum FeatureFlag {
  dev=0,
  test=1,
  prod=2,
  retire=9
}

export enum VersionStatusEnum {
  stable,
  preview,
  inactive,  
}

export enum NavTargetEnum {
 Self,  //  target = '_self'
 Blank, // target='_blank'
 Parent, // target = '_parent'
 Top // target = '_top'
}