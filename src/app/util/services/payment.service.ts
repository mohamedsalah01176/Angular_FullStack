import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly _HttpClient=inject(HttpClient);
  token:any=document.cookie.split("=")[1]
  constructor() { }
  onlinePayment(CartId:string,body:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/orders/checkout-session/${CartId}?url=http://localhost:4200`,
      {
        "shippingAddress":body
      },
      {
        headers:{
          token:this.token
        }
      }
    )
  }
  cashPayment(CartId:string,body:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/orders/${CartId}`,
      {
        "shippingAddress":body
      },
      {
        headers:{
          token:this.token
        }
      }
    )
  }
}
