import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url: any, cbSuccessFn: any, cbErrorFn: any) {
    return this.http.get(url).subscribe(cbSuccessFn, cbErrorFn);
  }

  post(url: any, postData: any, cbSuccessFn: any, cbErrorFn: any) {
    return this.http.post(url, postData).subscribe(cbSuccessFn, cbErrorFn);
  }

  put(url: any, postData: any, cbSuccessFn: any, cbErrorFn: any) {
    return this.http.put(url, postData).subscribe(cbSuccessFn, cbErrorFn);
  }

  delete(url: any, cbSuccessFn: any, cbErrorFn: any) {
    return this.http.delete(url).subscribe(cbSuccessFn, cbErrorFn);
  }
}
