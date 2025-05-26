import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../util/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _AuthServices=inject(AuthService);
  errMessage:string="";
  isloading=false;
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router);
  loginSubscribe!:Subscription;


  // loginForm:FormGroup=new FormGroup({
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)])
  // })

  loginForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
  },
  {
    // validators:this.confirmPassword
  }
  )

  submitLogin(){
    if(this.loginForm.valid){
      this.isloading=true;
      this.loginSubscribe=this._AuthServices.setLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message === "success"){
            document.cookie=`token=${res.token}`
            setTimeout(()=>{
              this._Router.navigate(['/home'])
            },1500)
          }
        },
        error:(err)=>{
          this.errMessage=err.error.message;
          console.log(err)
          this.isloading=false;
        }
      });
    }
  }

}
