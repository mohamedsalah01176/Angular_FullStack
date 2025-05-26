import { Component, inject, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../util/services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {
  private readonly _OrdersService=inject(OrdersService);
  ordersALL:WritableSignal<any>=signal([])
  total:WritableSignal<number>=signal(0);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._OrdersService.getAllOrders().subscribe({
      next:(res)=>{
        console.log(res,"ssss")
        this.ordersALL.set(res);
        this.total.set(this.ordersALL().reduce((acc:any,order:any)=>{
          return acc + order.cartItems.reduce((sum:any,item:any)=>sum+item.price,0)
        },0));
        console.log(this.total())

      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
