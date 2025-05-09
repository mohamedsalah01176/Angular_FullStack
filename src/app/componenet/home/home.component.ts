import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../util/interfes/product';
import { ProductService } from '../../util/services/product.service';
import { CardComponent } from "../card/card.component";
import { single, Subscription } from 'rxjs';
import { SliderComponent } from "../CategoriesSlider/slider.component";
import { CategoriesService } from '../../util/services/categories.service';
import { ICategory } from '../../util/interfes/category';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../util/pipes/search.pipe';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CardComponent, SliderComponent, MainSliderComponent,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy ,OnInit {
  products:WritableSignal<IProduct[]>=signal([]);
  categoriesList:WritableSignal<any[]>=signal([])
  private readonly _ProductService=inject(ProductService);
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService);
  searchWord:WritableSignal<string>=signal("");

  productsSubscribe!:Subscription;
  categoriesSubscribe!:Subscription;

  ngOnInit(){
    this._NgxSpinnerService.show("spinner1")
    this.productsSubscribe=this._ProductService.getAllProducts().subscribe({
      next:(res)=>{
        this._NgxSpinnerService.hide("spinner1")
        this.products.set(res.data);
      },
      error:(err)=>{
        console.log(err)
      }
    });
    this.categoriesSubscribe=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.categoriesList.set(res.data);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }







  ngOnDestroy(): void {

    this.productsSubscribe?.unsubscribe()
    this.categoriesSubscribe?.unsubscribe()
  }

}
