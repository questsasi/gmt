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
  };

  localhostConst = {
    listTarget: AppConstant.serviceUrl + 'src/assets/data/targetList.json',
    getTargetDetails: AppConstant.serviceUrl + 'src/assets/data/addtarget.json'
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

  // POST APIs
  postEditTarget(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.editTarget, postData);
  }

  postDeleteTarget(postData: any, successFn: Function, errorFn: Function) {
    return this.httpService.post(this.appServiceConst.deleteTarget, postData);
  }

  postCreateTarget(postData: any, successFn: any, errFn: any) {
    return this.httpService.post(this.appServiceConst.createTarget, postData);
  }

}
