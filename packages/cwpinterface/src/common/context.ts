import { CwpAppService } from "../apps/appservice";
import { CwpTranslateService } from "../i18n/i18nservice";
import { CwpEventService } from "../index";
import { CwpUIService } from "../ui/uiservice";
import { CwpUserService } from "../users/userservice";

export interface CwpContext {
  apps: CwpAppService;
  events: CwpEventService;
  ui: CwpUIService;
  user: CwpUserService;
  i18n: CwpTranslateService;
}
