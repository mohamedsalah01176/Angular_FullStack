import { BehaviorSubject, Observable } from 'rxjs';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient=inject(HttpClient)
  constructor() { }
  token:any=document.cookie.split("=")[1];
  // couterCart:BehaviorSubject<number>=new BehaviorSubject(0)
  couterCart:WritableSignal<number>=signal(0)

  addToCart(id:string):Observable<any>{
    //بيرجع error علشان token forn user from my backend and i use your database
    console.log(document.cookie.split("=")[1])
    return this._HttpClient.post(`${environment.baseUrlRoute}/api/v1/cart`,
      {'productId':id},
    )
  }

  getCartProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrlRoute}/api/v1/cart`,
    )
  };
  removeCartProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrlRoute}/api/v1/cart/${id}`,
    )
  }
  changeQuaintity(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrlRoute}/api/v1/cart/${id}`,
      {
        'count':count
      },
    )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrlRoute}/api/v1/cart`,
    )

  }
}

