import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, inject, OnDestroy, ViewChild,  } from '@angular/core';
import { IUser } from '../../util/interfes/user';
import { NgClass } from '@angular/common';
import { AuthService } from '../../util/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isloading=false;
  messageErr:string='';
  private readonly _AuthServices=inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router)
  registerSubscribe!:Subscription;

  // registerForm:FormGroup=new FormGroup({
  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(/^(010|011|012)\d{8}$/)]),
  // },
  // // this.confirmPassword
  // )

  // it is way for work at companys
  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    phone:[null,[Validators.required,Validators.pattern(/^(010|011|012)\d{8}$/)]],
  },
  {
    // validators:this.confirmPassword
  }
  )

  // custom validation => error put on form not controler
  // confirmPassword(g:AbstractControl){
  //   if(g.get('password') === g.get('rePassword')){
  //     return null;
  //   }else{
  //     return {
  //       misMatch:true
  //     }
  //   }
  // }

  submit(){
    this.isloading=true;
    if(this.registerForm.valid){
      this.registerSubscribe=this._AuthServices.setRegisterForm({...this.registerForm.value,rePassword:this.registerForm.value.password} as IUser).subscribe({
        next:(res)=>{
          if(res.message === "success"){
            //                       [path ,data]
            setTimeout(()=>{
              this._Router.navigate(['/login'])
            },1500)
            console.log("done");
          }
        },
        error:(err)=>{
          this.messageErr=err.error.message
          this.isloading=false;
          console.log(err)
        }
      })
    }else{
      this.registerForm.markAllAsTouched();
      this.isloading=false;
    }
  }


}
