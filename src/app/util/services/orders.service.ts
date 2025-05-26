import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _HttpClient=inject(HttpClient);
  token:any=document.cookie.split("=")[1]
  constructor() { }

  getAllOrders():Observable<any>{
    const decoded:any = jwtDecode(this.token);
    return this._HttpClient.get(`${environment.baseUrlRoute}/api/v1/orders/user/${decoded.id}`);
  }
}
