import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfes/user';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {jwtDecode} from 'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData={};

  private readonly _Router =inject(Router);
  private readonly _HttpClient=inject(HttpClient);

  constructor() { }
  // httpclient --> import from app.config


 /* setRegisterForm(data:IUser):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/register`,data)
  }
  setLoginForm(data:IUser):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/login`,data)
  }*/
  setRegisterForm(data:IUser):Observable<any>{
    console.log(data)
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/auth/signup`,data)
  }
  setLoginForm(data:IUser):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/auth/signin`,data)
  }
  getUserDetails(token:string){
    this.userData=jwtDecode(token)
    return this.userData
  }
  logout(){
    if(typeof document !== 'undefined'){
      document.cookie='token=;';
      this.userData={};
      setTimeout(()=>{
        this._Router.navigate(['/login']);
      },1500)
    }
  }
  verifyEmailService(email:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/auth/forgotPasswords`,email)
  }
  verifyCodeService(code:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/auth/forgotPasswords`,code)
  }
  verifyNewPasswordService(body:{}):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/auth/forgotPasswords`,body)
  }
}
