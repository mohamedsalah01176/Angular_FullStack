import { CommonModule } from '@angular/common';
import { Component, inject, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../util/services/cart.service';
import { IProduct } from '../../util/interfes/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products:any[] =[]
  @ViewChildren('ProductTotalPrice') ProductTotalPrice :any;
  coupon:string='';
  error:string=''
  url:string='';
  totalCheckout:number=70
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  cartId:string="";
  ngDoCheck(): void {
    // this.calcCheckout()
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._CartService.getCartProducts().subscribe({
      next:(res)=>{
        this.products=res.data.products;
        this.totalCheckout=+res.data.totalCartPrice;
        console.log(res);
        this.cartId=res.cartId
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  increaseQounter(id:string,count:number){
    if(count>0){
      this._CartService.changeQuaintity(id,count).subscribe({
        next:(res)=>{
          this.products=res.data.products;
          this._ToastrService.success("Product increased","Fresh Cart")
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }
  decreaseQounter(id:string,count:number){
    if(count>0){
      this._CartService.changeQuaintity(id,count).subscribe({
        next:(res)=>{
          this.products=res.data.products;
          this._ToastrService.success("Product decreased","Fresh Cart")
          console.log(res)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }
  deleteProduct(id:string){
    console.log(id,"hhhhhhhh")
    this._CartService.removeCartProduct(id).subscribe({
      next:(res)=>{
        this.products=res.data.products;
        this._ToastrService.success("Product Deleted","Fresh Cart");
        this._CartService.couterCart.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  clearCart(){
    console.log("ddddddd")
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == "success"){
          this.products=[] as IProduct[];
          this._ToastrService.success("Cart Cleares","Fresh Cart")
          this._CartService.couterCart.set(0)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  // deleteProduct(){}

  // calcCheckout(){
  //   this.totalCheckout =this.products.reduce((prev,current)=>prev+(current.price * current.quantity),0);
  //   return this.totalCheckout
  // }
  // addCoupon(){
  //   console.log(this.coupon)
  //   this.totalCheckout-=500;
  //   this.calcCheckout()
  // }
}
