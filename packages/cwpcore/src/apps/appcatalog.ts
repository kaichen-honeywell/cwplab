import { CwpAppService, IAppData, IPortalUser } from "../../../cwpinterface/src/index";

const APP_CATALOG_SERVICE_URL ='http://localhost:3000/appcatalog';

export class AppCatalog implements CwpAppService {
    private localApps: Record<string, IAppData>;
    constructor() {
        this.localApps = {};
    }
    public openApp(appId: string, user: IPortalUser): Promise<IAppData> {
        return new Promise((resolve) => setTimeout(resolve, 3000));        
    }
    public closeApp(appId: string, user: IPortalUser):Promise<IAppData> {
        return Promise.resolve({} as IAppData);
    }

    public listLocalApps() { 
        return Object.keys(this.localApps).map((key)=>this.localApps[key]);
    }

    public async getApp(appId: string, user: IPortalUser):Promise<IAppData> {
        const response = await fetch(`${APP_CATALOG_SERVICE_URL}`,{
            method:'GET',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json =await response.json();
        const result = JSON.parse(json) as IAppData;

        if(!this.localApps[appId]){
          this.localApps[appId]= result;
        }

        return Promise.resolve(result);
    } 

    public currentApp():IAppData {
        return {} as IAppData;
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