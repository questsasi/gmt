import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public isAuthenticated(): boolean {
    return true;
    // const isLoggedInUserString = sessionStorage.getItem('isLoggedInUser');
    // return (isLoggedInUserString?.toLowerCase() === 'true');
  }
}
