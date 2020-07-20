import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateSignInUserRequest } from '../Components/CreateSignInUserRequest';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import * as jwt_decode from "jwt-decode";

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl: string = '';
  //to maintain roles and userdata throughout application
  private decodedToken;
  private result;
  private User;
  private Role;
  // User related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient) {
    // this.decodedToken = JSON.parse(localStorage.getItem('auth_token')) || new DecodedToken();
    this.baseUrl = environment.baseUrl;

  }

  LoginMethod(createSignInUserRequest: CreateSignInUserRequest): Observable<any> {
    let url = this.baseUrl + "/api/SignIn";

    return this.http.post<any>(url, createSignInUserRequest).
      pipe(map(res => {
        this.result = res;
        return this.saveToken(this.result.token);
      }));
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt_decode(token);
    this.User = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.Role = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.loginStatus.next(true);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('loginStatus', '1');
    localStorage.setItem('username', this.User);
    localStorage.setItem('userRole', this.Role);
    this.UserName.next(localStorage.getItem('username'));
    this.UserRole.next(localStorage.getItem('userRole'));
    return token;
  }

  // public isAuthenticated(): boolean {
  //   return moment().isBefore(moment.unix(this.decodedToken.exp));
  // }

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      if (localStorage.getItem('auth_token') === null || localStorage.getItem('auth_token') === undefined) {
        return false;
      }
      //Get and Decode the Token
      const token = localStorage.getItem('auth_token');
      const decoded = jwt_decode(token);
      // Check if the cookie is valid
      if (decoded.exp === undefined) {
        return false;
      }
      // Get Current Date Time
      const date = new Date(0);
      // Convert EXp Time to UTC
      let tokenExpDate = date.setUTCSeconds(decoded.exp);
      // If Value of Token time greter than 
      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        return true;
      }
      console.log("NEW DATE " + new Date().valueOf());
      console.log("Token DATE " + tokenExpDate.valueOf());
      return false;
    }
    return false;
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.setItem('loginStatus', '0');
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}