import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {CarouselModule } from 'ngx-owl-carousel-o'
import { ICategory } from '../../util/interfes/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule,RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() categoriesList!:ICategory[];

  customOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false,
    rtl:true
  }

}
