import { Component, inject } from '@angular/core';
import { PaymentService } from '../../util/services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { FormPaymentComponent } from "../form-payment/form-payment.component";

@Component({
  selector: 'app-cash-payment',
  imports: [FormPaymentComponent],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.css'
})
export class CashPaymentComponent {
  private readonly _PaymentService=inject(PaymentService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  cardId:string="";

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res:any)=>{
        this.cardId=res.params.id;
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getData(data:any){
    this._PaymentService.cashPayment(this.cardId,data).subscribe({
      next:(res)=>{
        console.log(res)
        window.location.href='/allorders'
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
