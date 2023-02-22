import { CwpContext, CwpAppService, CwpEventService, 
    CwpTranslateService, CwpUIService, CwpUserService } from "../../../cwpinterface/src/index"; 
import { AppCatalog } from "../apps/appcatalog";
import { EventBus } from "../events/eventbus";
import { Translator } from "../i18n/translator";
import { UIHelper } from "../ui/uihelper";
import { UserContext } from "../user/usercontext";

export class CWP  implements  CwpContext{
    private static instance: CWP;
    public apps: CwpAppService;
    public events: CwpEventService;
    public ui: CwpUIService;
    public user: CwpUserService;
    public i18n: CwpTranslateService;
    constructor() {
        this.events = new EventBus();
        this.ui = new UIHelper();
        this.apps = new AppCatalog(this.ui);
        this.user = new UserContext();
        this.i18n = new Translator();
        window.CWP  = {
            apps: this.apps, 
            events: this.events,
            ui: this.ui,
            user: this.user,
            i18n: this.i18n,
        } as CwpContext;
        CWP.instance = window.CWP;
        
    }
    public static getInstance(): CWP {
        if (!CWP.instance) {
            CWP.instance = new CWP();
        }

        return CWP.instance;
    }

}
