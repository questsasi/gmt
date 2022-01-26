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
    createZone: AppConstant.serviceUrl + 'zone/create',
    modifyZoneStatus: AppConstant.serviceUrl + 'zone/modifystatus',
    createLine: AppConstant.serviceUrl + 'line/create',
    modifyLineStatus: AppConstant.serviceUrl + 'line/modifystatus'
  };

  localhostConst = {
    listTarget: AppConstant.serviceUrl + 'src/assets/data/targetList.json',
    getTargetDetails: AppConstant.serviceUrl + 'src/assets/data/addtarget.json',
    listProduction: AppConstant.serviceUrl + 'src/assets/data/productionList.json',
    listUser: AppConstant.serviceUrl + 'src/assets/data/userList.json',
    listFactory: AppConstant.serviceUrl + 'src/assets/data/factoryList.json',
    listZone: AppConstant.serviceUrl + 'src/assets/data/zoneList.json',
    listLine: AppConstant.serviceUrl + 'src/assets/data/lineList.json',
    allListLine: AppConstant.serviceUrl + 'src/assets/data/allLineList.json'
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

  getFactoryList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.listFactory, successFn, errorFn);
  }

  createFactory(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createFactory, postdata, successFn, errorFn);
  }

  modifyFactoryStatus(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.modifyFactoryStatus, postdata, successFn, errorFn);
  }

  getZoneList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.listZone, successFn, errorFn);
  }

  createZone(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createZone, postdata, successFn, errorFn);
  }

  modifyZoneStatus(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.modifyZoneStatus, postdata, successFn, errorFn);
  }

  getLineList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.listLine, successFn, errorFn);
  }

  createLine(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createLine, postdata, successFn, errorFn);
  }

  modifyLineStatus(postdata: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.modifyLineStatus, postdata, successFn, errorFn);
  }

  getAllFactoryList(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.localhostConst.allListLine, successFn, errorFn);
  }

}
