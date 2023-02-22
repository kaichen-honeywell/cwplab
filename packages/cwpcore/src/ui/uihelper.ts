import { AnnounceConfig, CwpContext, CwpUIService, CWP_ANNOUNCEMENT_SUBJECT, CWP_LOADER_SUBJECT, CWP_MESSAGE_SUBJECT, CWP_MODAL_SUBJECT, LoaderConfig, ModalConfig, ModalObject, ToastMessageConfig, UILock } from "../../../cwpinterface/src/index";
import { CWP } from "../context/context";

export class UILockImpl implements UILock {
    static _lockObj: string;
    _lockFunc: ()=>boolean;
    _acceptFunc: ()=>void;

    constructor(){
        UILockImpl._lockObj = "";
        this._lockFunc = ()=> true;
        this._acceptFunc = ()=>{console.debug('Empty accept')};
    }

    request(triggerId: string, canUnlock: () => boolean, accept: () => void) {
       if(!UILockImpl._lockObj){
        UILockImpl._lockObj = triggerId;
           this._lockFunc = canUnlock;
           this._acceptFunc = accept;
       }
    }
    release(triggerId: string): void {
        if( UILockImpl._lockObj === triggerId) {
            UILockImpl._lockObj = "";
            this._lockFunc = ()=>true;
            this._acceptFunc = ()=>{console.debug('Empty accept')};
        } else if(!UILockImpl._lockObj){
            this._lockFunc = ()=>true;
            this._acceptFunc = ()=>{console.debug('Empty accept')};    
        } else {
            throw new Error('');
        }
    }
    unlock(triggerId: string): boolean {
        if(!UILockImpl._lockObj) { // no lock,  free to go.
            return true;
        }
        if(UILockImpl._lockObj===triggerId ){
            if (this._lockFunc()) { // meet the condition to unlock, release the lock
                this.release(triggerId);
                return true;
            } else {
               return false;
            }
        }else{
           return false; // current trigger does not own lock.
        }
    }
    accept(triggerId: string): void {
       if(UILockImpl._lockObj===triggerId){
            this._acceptFunc();
       }else{
           throw new Error('');
       }
    }

}
export class  UIHelper implements CwpUIService {
    _loaders: Record<string, boolean>;
    _messages: Record<string, boolean>;
    _modals: Record<string, boolean>;
    _announcement: Record<string, boolean>
    lock: UILock;
    constructor() {
        this._loaders = {};
        this._messages = {};
        this._modals = {};
        this._announcement = {};
        this.lock = new UILockImpl();
    }

    public renderToastMessage(msg: string, toastMessageConfig: ToastMessageConfig) : void {
        if (!toastMessageConfig.triggerId){
            return;
        }
        
        if(this._messages[toastMessageConfig.triggerId]){
            return;
        }
        const ctx =  CWP.getInstance() as CwpContext;      
        ctx.events.publishEvent({
            subjectName: CWP_MESSAGE_SUBJECT,
            details: {
                message: msg,
                config: toastMessageConfig,
            }
        });
        this._messages[toastMessageConfig.triggerId] = true;
    }
    
    public closeToastMessage(triggerId: string) : void {
       if(!triggerId) {
           return;
       }
       const exist = this._messages[triggerId]
       if (exist){
        const ctx =  CWP.getInstance() as CwpContext;
        ctx.events.publishEvent({
            subjectName: CWP_MESSAGE_SUBJECT, 
            details: {
              config:{
                triggerId: triggerId,
                open: false
              } as ToastMessageConfig   
            } 
        });
        delete this._messages[triggerId];
       }
    }

    public renderModal(modalObject: ModalObject) : void {
        if(!modalObject || !modalObject.config || modalObject.config.triggerId){
            return;
        }
        const exists = this._modals[modalObject.config.triggerId];
        if(exists){
            return;
        }
        const ctx =  CWP.getInstance() as CwpContext;
        ctx.events.publishEvent({
            subjectName: CWP_MODAL_SUBJECT,
            details: {
                modal: modalObject,
            } 
        });
        this._modals[modalObject.config.triggerId] = true;
    }

    public closeModal(triggerId: string) : void {
        if(!triggerId) {
            return;
        }
        const exist = this._modals[triggerId]
        if (exist){
         const ctx =  CWP.getInstance() as CwpContext;
         ctx.events.publishEvent({
             subjectName: CWP_MODAL_SUBJECT, 
             details: {
                modal: {
                    config: {
                        open: false,
                    }
                } as ModalObject
             } 
         });
         delete this._modals[triggerId];
        }
    }

    public renderLoader(loadConfig: LoaderConfig) : void {
        if (!loadConfig || !loadConfig.triggerId){
            return;
        }
        
        if(this._loaders[loadConfig.triggerId]){
            return;
        }
        const ctx =  CWP.getInstance() as CwpContext;    
        loadConfig.open = true;  
        ctx.events.publishEvent({
            subjectName: CWP_LOADER_SUBJECT,
            details: {
               config: loadConfig,
            }
        });
        this._loaders[loadConfig.triggerId] = true;
    }

    public closeLoader(triggerId: string) : void {
        if(!triggerId) {
            return;
        }
        const exist = this._loaders[triggerId]
        if (exist){
         const ctx =  CWP.getInstance() as CwpContext;
         ctx.events.publishEvent({
             subjectName: CWP_LOADER_SUBJECT, 
             details: {
                config: {
                    open: false
                }
             } 
         });
         delete this._loaders[triggerId];
        }
    }

    public renderAnnouncement(msg: string, announceConfig: AnnounceConfig) {
        if (!announceConfig || !announceConfig.triggerId){
            return;
        }
        
        if(this._announcement[announceConfig.triggerId]){
            return;
        }
        const ctx =  CWP.getInstance() as CwpContext;      
        ctx.events.publishEvent({
            subjectName: CWP_ANNOUNCEMENT_SUBJECT,
            details: {
               message: msg,
               config: announceConfig,
            }
        });
        this._announcement[announceConfig.triggerId] = true;
    }

    public closeAnnouncement(triggerId: string) {
        if(!triggerId) {
            return;
        }
        const exist = this._announcement[triggerId]
        if (exist){
         const ctx =  CWP.getInstance() as CwpContext;
         ctx.events.publishEvent({
             subjectName: CWP_ANNOUNCEMENT_SUBJECT, 
             details: {
                config: {
                    open: false
                }
             } 
         });
         delete this._announcement[triggerId];
        }
    }

    
}