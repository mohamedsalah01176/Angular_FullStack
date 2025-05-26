import { CommonModule } from '@angular/common';
import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-payment',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-payment.component.html',
  styleUrl: './form-payment.component.css'
})
export class FormPaymentComponent {
  @Output() EventEmitter=new EventEmitter();
  CartForm:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(010|011|012)\d{8}$/)]),
    city:new FormControl(null,[Validators.required,Validators.minLength(3)]),
  });

  submit(){
    if(this.CartForm.valid){
      console.log(this.CartForm)
      this.EventEmitter.emit(this.CartForm.value)
    }
  }
}
