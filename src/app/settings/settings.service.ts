import { Injectable } from "@angular/core";
import { HttpService } from "../shared/services/http.service";
import { AppConstant } from "../app.constant";

@Injectable()
export class SettingsService {
  appServiceConst = {
    // User Management
    listUsers: AppConstant.serviceUrl + 'users/list',
    createUser: AppConstant.serviceUrl + 'users/create',
    modifyUserStatus: AppConstant.serviceUrl + 'users/modifystatus',
    updateUser: AppConstant.serviceUrl + 'users/update/',
    createFactory: AppConstant.serviceUrl + 'factory/create',
    modifyFactoryStatus: AppConstant.serviceUrl + 'factory/modifystatus',
  };

  localhostConst = {
    listTarget: AppConstant.serviceUrl + 'src/assets/data/targetList.json',
    getTargetDetails: AppConstant.serviceUrl + 'src/assets/data/addtarget.json',
    listProduction: AppConstant.serviceUrl + 'src/assets/data/productionList.json',
    listUser: AppConstant.serviceUrl + 'src/assets/data/userList.json',
    listFactory: AppConstant.serviceUrl + 'src/assets/data/factoryList.json'
  }

  constructor(private httpService: HttpService) { }

  getUsersList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.listUser, successFn, errorFn);
  }

  getFactoryList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.listFactory, successFn, errorFn);
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

  createFactory(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createFactory, postdata, successFn, errorFn);
  }

  modifyFactoryStatus(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.modifyFactoryStatus, postdata, successFn, errorFn);
  }

}
