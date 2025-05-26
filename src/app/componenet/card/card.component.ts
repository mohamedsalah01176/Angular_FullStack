import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../util/interfes/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { SplitTxtPipe } from '../../util/pipes/split-txt.pipe';
import { Subscription } from 'rxjs';
import { CartService } from '../../util/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-card',
  imports: [RouterLink,UpperCasePipe,CurrencyPipe,SplitTxtPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product!:IProduct;
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService);

  cartService!:Subscription;



  getArrFromStars(num:number){
    return Array.from({length:num})
  }

  addCartFun(id:number){
    this.cartService=this._CartService.addToCart(String(id)).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,"Rresh Cart");
        this._CartService.couterCart.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }








  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cartService?.unsubscribe()
  }
}
