import { CwpUserService, IPortalUser, IUserSetting } from "../../../cwpinterface/src/index";

export class UserContext implements CwpUserService {
    public getCurrentUserAsync(){
        return Promise.resolve({
            id: '500093',
            username: 'kai.chen2@honeywell.com',
            idToken: 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg',
            refreshToken: 'g88EfwFmBj0KOXwU0QVPloe1IHg6QtlFbD5wCRH0A',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ODg4ODg4OCIsInVzZXJuYW1lIjoia2FpLmNoZW4yQGhvbmV5d2VsbC5jb20iLCJpYXQiOjE2NzQwNjI3MDJ9.ZjtzuQU0VgrcR-7U6Kl_u-TGt53BKQDHCCXdkljvkIw',
            roles: [{id:'1',name:'admin'}, {id:'2', name:'dev'}],
            settings: [{id:'1', name:'locale', value:'en_US',type:'string' },
            {id:'2', name:'theme', value:'dark',type:'string' },
            {id:'3', name:'session_expire', value:20,type:'number' }],
            groups: [{id:'1', name:'apm'},{id:'2', name:'cwp'}]
        } as IPortalUser);
    } 
    public saveSettingAsync(settings: IUserSetting[]) {
        return Promise.resolve();
    }
    public changeLocaleAsync() {
        return Promise.resolve();
    }
    public changeThemeAsync() {
        return Promise.resolve();
    }

}