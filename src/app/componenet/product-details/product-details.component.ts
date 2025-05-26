import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../util/services/product.service';
import { IProduct } from '../../util/interfes/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly ProductService=inject(ProductService);
  product!:IProduct;

  ngOnInit(): void {
    let id= Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this.ProductService.getSingleProduct(id).subscribe({
      next:(res)=>{
        console.log(res.data,"sssssssssss");
        this.product=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getArrFromStars(num:number){
    return Array.from({length:num})
  }
}
