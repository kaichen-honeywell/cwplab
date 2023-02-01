import { CwpAppService, IAppData, IPortalUser } from "../../../cwpinterface/src/index";

const APP_CATALOG_SERVICE_URL ='http://localhost:3000/appcatalog';

export class AppCatalog implements CwpAppService {
    private localApps: Record<string, IAppData>;
    private currentAppId: string;
    constructor() {
        this.localApps = {};
        this.currentAppId = '';
    }
    public async openApp(appId: string, user: IPortalUser): Promise<IAppData> {
        if(!appId){
            throw new Error('invalid appId');
        }
        if(this.currentAppId===appId){
            return Promise.resolve(this.currentApp());
        } else {
            this.currentAppId= appId;
            await this.getApp(appId,user);
        return new Promise((resolve) => setTimeout(resolve, 2000));        
        }
    }
    public closeApp(appId: string, user: IPortalUser):Promise<IAppData> {
        return Promise.resolve({} as IAppData);
    }

    public listLocalApps() { 
        return Object.keys(this.localApps).map((key)=>this.localApps[key]);
    }

    public async getApp(appId: string, user: IPortalUser):Promise<IAppData> {
        const localapp = this.localApps[appId];
        if(localapp){
            return Promise.resolve(localapp);
        }
        const response = await fetch(`${APP_CATALOG_SERVICE_URL}/${appId}`,{
            method:'GET',
            mode:'cors',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`, 
                'Content-Type': 'application/json'
            }
        });
        const json =await response.json();
        const result =json as IAppData;

        this.localApps[appId]= result;
        this.currentAppId = appId;

        return Promise.resolve(result);
    } 

    public currentApp():IAppData  {
        if (!this.currentAppId){
            return {} as IAppData;
        }
        const app = this.localApps[this.currentAppId];
        if (app) {
            return app; 
        } else {
            throw new Error('current app not exist');
        }
    }

    public async upgradeApp(appId: string, user: IPortalUser): Promise<IAppData> {
        return Promise.resolve({} as IAppData);
    }

    public async listAllApps(user: IPortalUser): Promise<IAppData[]> {
        const res = await fetch('http://localhost:3000/appcatalog',{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`, 
                'Content-Type': 'application/json'
            }
        }).catch((err)=>Promise.reject(err));
        const json = await res.json();
        const result = JSON.parse(JSON.stringify(json)) as IAppData[];
        return Promise.resolve(result);
    }

}