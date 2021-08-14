import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url: any) {
    return this.http.get(url);
  }

  post(url: any, postData: any) {
    return this.http.post(url, postData).subscribe({
      next: (result: any) => {
        console.log("<-- Next -->", result);
      },
      error: (err: any) => {
        console.log("<-- error -->", err);
      },
      complete: () => {
        console.log("<-- complete -->");
      }
    });
  }

  put(url: any, postData: any) {
    return this.http.put(url, postData).subscribe({
      next: (result: any) => {
        console.log("<-- Next -->", result);
      },
      error: (err: any) => {
        console.log("<-- error -->", err);
      },
      complete: () => {
        console.log("<-- complete -->");
      }
    });
  }

  delete(url: any) {
    return this.http.delete(url).subscribe({
      next: (result: any) => {
        console.log("<-- Next -->", result);
      },
      error: (err: any) => {
        console.log("<-- error -->", err);
      },
      complete: () => {
        console.log("<-- complete -->");
      }
    });
  }
}
