import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest ,HttpHeaders} from '@angular/common/http';
 import { BehaviorSubject, Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { CreateSignInUserRequest } from '../Components/CreateSignInUserRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService  {

  baseUrl: string = '';
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;
  
  private currentUserSubject: BehaviorSubject<string>;  
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl =environment.baseUrl;
  }

  LoginMethod(createSignInUserRequest:CreateSignInUserRequest) :Observable<any>{ 
    let url = this.baseUrl + "/api/SignIn";

    return this.http.post<any>(url,createSignInUserRequest).
           pipe(map(res => {      
                 localStorage.setItem('auth_token', res.token);
                 this.loggedIn = true;
                 return true;}));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}