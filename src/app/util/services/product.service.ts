import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfes/product';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _HttpClient=inject(HttpClient)
  constructor() { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrlRoute}/api/v1/products`)
  }
  getSingleProduct(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrlRoute}/api/v1/products/${id}`)
  }
}
 