import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLangService } from '../../util/services/translate.service';
import { AuthService } from '../../util/services/auth.service';
import { CartService } from '../../util/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent {
  readonly _AuthService=inject(AuthService)
  readonly _TranslateLangService=inject(TranslateLangService);
  readonly _CartService=inject(CartService);
  currentlang:string="en";
  countercart:Signal<number>=computed(()=>this._CartService.couterCart());


  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    // this._CartService.couterCart.subscribe({
    //   next:(res)=>{
    //     this.countercart.set(res)
    //   }
    // })
    this._CartService.getCartProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.couterCart.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  changeLang(lang:string){
    this.currentlang=lang
    console.log(this.currentlang)
    this._TranslateLangService.changeLang(lang)
  }
}

