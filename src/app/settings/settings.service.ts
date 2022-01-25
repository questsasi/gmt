import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { AppConstant } from "../app.constant";

@Injectable()
export class SettingsService {
  appServiceConst = {
    // User Management
    listUsers: AppConstant.serviceUrl + 'users/list',
    createUser: AppConstant.serviceUrl + 'users/create',
    modifyUserStatus: AppConstant.serviceUrl + 'users/modifystatus',
    updateUser: AppConstant.serviceUrl + 'users/update/'
  };

  localhostConst = {
    listTarget: AppConstant.serviceUrl + 'src/assets/data/targetList.json',
    getTargetDetails: AppConstant.serviceUrl + 'src/assets/data/addtarget.json',
    listProduction: AppConstant.serviceUrl + 'src/assets/data/productionList.json',
    listUser: AppConstant.serviceUrl + 'src/assets/data/userList.json'
  }

  constructor(private httpService: HttpService) { }

  getUsersList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.listUser, successFn, errorFn);
  }

  updateUser(userId: number, postData: any, successFn: Function, errorFn: Function) {
    const url = `${this.appServiceConst.updateUser}${userId}`;
    return this.httpService.put(url, postData, successFn, errorFn);
  }
  createUser(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createUser, postData, successFn, errorFn);
  }

  modifyUserStatus(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.modifyUserStatus, postdata, successFn, errorFn);
  }

}