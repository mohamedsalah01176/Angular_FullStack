import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../util/services/categories.service';
import { ProductService } from '../../util/services/product.service';
import { IProduct } from '../../util/interfes/product';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-single-category',
  imports: [CardComponent],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent {
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _ProductService=inject(ProductService);
  productId:string="";
  categoryProduct:IProduct[]=[]
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res:any)=>{
        this.productId=res.params.id;
      },
      error:(err)=>{
        console.log(err)
      }
    })
    // this._CategoriesService.getSpecificProduct(this.productId).subscribe({
    //   next:(res)=>{
    //     console.log(res)
    //   },
    //   error:(err)=>{
    //     console.log(err)
    //   }
    // })
    this._ProductService.getAllProducts().subscribe({
      next:(res)=>{
        this.categoryProduct =res.data.filter((item:any)=>item.category._id == this.productId)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
