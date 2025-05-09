import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../util/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)
  step:number=1;
  verifyEmailForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  verifyCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })
  verifyNewPasswordForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)]),
  })
  // yolid10466@albarulo.com
  verifyEmail(){
    this._AuthService.verifyEmailService(this.verifyEmailForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.step=2
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  verifyCode(){
    this._AuthService.verifyCodeService(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.step=3
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  verifyNewPassword(){
    this._AuthService.verifyNewPasswordService(this.verifyNewPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        document.cookie=`token=${res.token};`
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
