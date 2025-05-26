import { Component, inject } from '@angular/core';
import { FormPaymentComponent } from "../form-payment/form-payment.component";
import { PaymentService } from '../../util/services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-online-payment',
  imports: [FormPaymentComponent],
  templateUrl: './online-payment.component.html',
  styleUrl: './online-payment.component.css'
})
export class OnlinePaymentComponent {
  private readonly _PaymentService=inject(PaymentService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  cardId:string="";

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res:any)=>{
        this.cardId=res.params.id;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getData(data:any){
    this._PaymentService.onlinePayment(this.cardId,data).subscribe({
      next:(res)=>{
        console.log(res)
        window.location.href=res.session.url
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
