import { CwpAppService, CwpUIService, IAppData, IConfigure, IFeature, INavTemplate, IPortalUser, IVersion } from "../../../cwpinterface/src/index";

const APP_CATALOG_SERVICE_URL ='http://localhost:3000/appcatalog';

export class AppCatalog implements CwpAppService {
    private _localFeature: Record<string, IFeature>;
    private _currentFeature: IFeature;
    private _currentVersion: IVersion;
    private uiHelper: CwpUIService;
    constructor(ui:CwpUIService) {
        this._localFeature = {};
        this.uiHelper = ui;
        this._currentFeature = {} as IFeature;
        this._currentVersion = {} as IVersion;
    }
    public async listFeatures(user: IPortalUser) : Promise<IFeature[]> {
        return Promise.resolve([]);
    }

    public listLocalFeatures() : IFeature[] {
        return [];
    }
    public async openFeature(featureId: string, user: IPortalUser) : Promise<IFeature> {
        const feature =  {
            featureId: featureId,
            featureName : "some feature"
             

        } as IFeature;
        this._currentFeature = feature;
        return Promise.resolve(feature);
    }
    public async closeFeature(featureId: string, user: IPortalUser): Promise<IFeature> {
        if (this.uiHelper.lock) {
            if (this.uiHelper.lock.unlock(featureId)) {
                this.uiHelper.lock.release(featureId);
                this._currentFeature = {} as IFeature;
                return Promise.resolve({} as IFeature);
            } else{
                this.uiHelper.lock.accept(featureId);
                return Promise.reject('ui is locked.')
            }
        }
        this._currentFeature = {} as IFeature;
        return Promise.resolve({} as IFeature);
    }
    public async getVersion(versionId: string, user: IPortalUser) : Promise<IVersion> {
        return Promise.resolve({} as IVersion);
    }
    public async getFeature(featureId: string, user: IPortalUser) : Promise<IFeature> {
        return Promise.resolve({} as IFeature);
    }
    public currentVersion() : IVersion {
        return  this._currentVersion;
    }
    public currentFeature() : IFeature {
        return this._currentFeature;
    }
    public async getNavTemplate(user: IPortalUser) : Promise<INavTemplate> {
        const response = await fetch(`${APP_CATALOG_SERVICE_URL}`,{
            method:'GET',
            mode:'cors',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`, 
                'Content-Type': 'application/json'
            }
        });
        const json =await response.json();
        const result =json as INavTemplate;

        return Promise.resolve(result);
    }
    public async getConfigure(user: IPortalUser, featureId: string) : Promise<IConfigure> {
        return Promise.resolve({} as IConfigure)
    }
    public async upgradeFeature(featureId: string, user: IPortalUser) : Promise<IFeature> {
        return Promise.resolve({} as IFeature);
    }

    // public async openApp(appId: string, user: IPortalUser): Promise<IAppData> {
    //     if(!appId){
    //         throw new Error('invalid appId');
    //     }


    //     if(this.currentAppId===appId){
    //         return Promise.resolve(this.currentApp());
    //     } else {
    //         this.currentAppId= appId;
    //         await this.getApp(appId,user);
    //     return new Promise((resolve) => setTimeout(resolve, 2000));        
    //     }
    // }
    public closeApp(appId: string, user: IPortalUser):Promise<IAppData> {
        // check lock
        if(this.uiHelper && this.uiHelper.lock) {
            if(!this.uiHelper.lock.unlock(appId)) {
                this.uiHelper.lock.accept(appId);
                return Promise.reject('ui locked by previous screen');
            } 
        }

        // close current app so we can open a new app.
        return Promise.resolve({} as IAppData);
    }

    // public listLocalApps() { 
    //     return Object.keys(this.localApps).map((key)=>this.localApps[key]);
    // }

    // public async getApp(appId: string, user: IPortalUser):Promise<IAppData> {
    //     const localapp = this.localApps[appId];
    //     if(localapp){
    //         return Promise.resolve(localapp);
    //     }
    //     const response = await fetch(`${APP_CATALOG_SERVICE_URL}/${appId}`,{
    //         method:'GET',
    //         mode:'cors',
    //         headers: {
    //             'Authorization': `Bearer ${user.accessToken}`, 
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const json =await response.json();
    //     const result =json as IAppData;

    //     this.localApps[appId]= result;
    //     this.currentAppId = appId;

    //     return Promise.resolve(result);
    // } 

    // public currentApp():IAppData  {
    //     if (!this.currentAppId){
    //         return {} as IAppData;
    //     }
    //     const app = this.localApps[this.currentAppId];
    //     if (app) {
    //         return app; 
    //     } else {
    //         throw new Error('current app not exist');
    //     }
    // }

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