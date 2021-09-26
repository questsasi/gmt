import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { AppConstant } from "./app.constant";

@Injectable()
export class AppService {
  appServiceConst = {
    getLine: AppConstant.serviceUrl + "",

    // Target
    target: AppConstant.serviceUrl + 'target',
    listTarget: AppConstant.serviceUrl + 'target/list/',
    getTargetDetails: AppConstant.serviceUrl + "target/details",
    createTarget: AppConstant.serviceUrl + "target/create",

    // Production
    production: AppConstant.serviceUrl + 'production',
    listProduction: AppConstant.serviceUrl + 'production/list/',
    createProduction: AppConstant.serviceUrl + 'production/postproductionhours',
    editProduction: AppConstant.serviceUrl + 'editproduction',
    deleteProduction: AppConstant.serviceUrl + 'deleteproduction/'
  };

  localhostConst = {
    listTarget: AppConstant.serviceUrl + 'src/assets/data/targetList.json',
    getTargetDetails: AppConstant.serviceUrl + 'src/assets/data/addtarget.json',
    listProduction: AppConstant.serviceUrl + 'src/assets/data/productionList.json'
  }

  constructor(private httpService: HttpService) { }

  // GET APIs
  getLines(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.appServiceConst.getLine, successFn, errorFn);
  }

  getTargetList(selectedDate: string, successFn: Function, errorFn: Function) {
    const url = `${this.appServiceConst.listTarget}${selectedDate}`;
    return this.httpService.get(url, successFn, errorFn);
  }

  getTargetDetails(successFn: Function, errorFn: Function) {
    return this.httpService.get(this.appServiceConst.getTargetDetails, successFn, errorFn);
  }

  getProductionList(selectedDate: string, successFn: Function, errorFn: Function) {
    const url = `${this.appServiceConst.listProduction}${selectedDate}`;
    return this.httpService.get(url, successFn, errorFn);
  }

  // PUT APIs
  editTarget(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.put(this.appServiceConst.target, postData, successFn, errorFn);
  }

  editProduction(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.put(this.appServiceConst.production, postData, successFn, errorFn);
  }

  // POST APIs
  createTarget(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.target, postData, successFn, errorFn);
  }

  createProduction(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.createProduction, postData, successFn, errorFn);
  } 

  // DELETE APIs
  deleteTarget(targetId: number, successFn: Function, errorFn: Function) {
    return this.httpService.delete(this.appServiceConst.target + '/' + targetId, successFn, errorFn);
  }

  deleteProduction(productionId: number, successFn: Function, errorFn: Function) {
    return this.httpService.delete(this.appServiceConst.production + '/' + productionId, successFn, errorFn);
  }

}
