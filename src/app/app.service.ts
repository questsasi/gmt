import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { AppConstant } from "./app.constant";

@Injectable()
export class AppService {
  appServiceConst = {
    getLine: AppConstant.serviceUrl + "",
    getTargetEntry: AppConstant.serviceUrl + "gettargetentry",
    postTargetEntry: AppConstant.serviceUrl + "target",
  };

  constructor(private httpService: HttpService) { }

  getLines() {
    return this.httpService.get(this.appServiceConst.getLine);
  }

  getTargetEntry() {
    return this.httpService.get(this.appServiceConst.getTargetEntry);
  }

  postTargetEntry(postData: any, successFn: any, errFn: any) {
    return this.httpService.post(this.appServiceConst.postTargetEntry, postData);
  }

}
