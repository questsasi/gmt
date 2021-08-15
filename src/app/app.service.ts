import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { AppConstant } from "./app.constant";

@Injectable()
export class AppService {
  appServiceConst = {
    getLine: AppConstant.serviceUrl + "",

    // Target
    listTarget: AppConstant.serviceUrl + 'listtarget/',
    editTarget: AppConstant.serviceUrl + 'edittarget',
    deleteTarget: AppConstant.serviceUrl + 'deletetarget',
    getTargetDetails: AppConstant.serviceUrl + "targetdetails",
    createTarget: AppConstant.serviceUrl + "createtarget",

    // Production
    listProduction: AppConstant.serviceUrl + 'listproduction/',
    createProduction: AppConstant.serviceUrl + 'createproduction',
    editProduction: AppConstant.serviceUrl + 'editproduction',
    deleteProduction: AppConstant.serviceUrl + 'deleteproduction'
  };

  localhostConst = {
    listTarget: AppConstant.serviceUrl + 'src/assets/data/targetList.json',
    getTargetDetails: AppConstant.serviceUrl + 'src/assets/data/addtarget.json',
    listProduction: AppConstant.serviceUrl + 'src/assets/data/productionList.json'
  }

  constructor(private httpService: HttpService) { }

  // GET APIs
  getLines() {
    return this.httpService.get(this.appServiceConst.getLine);
  }

  getTargetList(selectedDate: string) {
    // return this.httpService.get(this.appServiceConst.listTarget + selectedDate);
    return this.httpService.get(this.localhostConst.listTarget);
  }

  getTargetDetails() {
    // return this.httpService.get(this.appServiceConst.getTargetDetails);
    return this.httpService.get(this.localhostConst.getTargetDetails);
  }

  getProductionList(selectedDate: string) {
    // return this.httpService.get(this.appServiceConst.listProduction + selectedDate);
    return this.httpService.get(this.localhostConst.listProduction);
  }

  // POST APIs
  postCreateTarget(postData: any, successFn: Function, errFn: Function) {
    return this.httpService.post(this.appServiceConst.createTarget, postData);
  }

  postEditTarget(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.editTarget, postData);
  }

  postDeleteTarget(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.deleteTarget, postData);
  }

  postCreateProduction(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createProduction, postData);
  }

  postEditProduction(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.editProduction, postData);
  }

  postDeleteProduction(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.deleteProduction, postData);
  }

}
