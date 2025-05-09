import { Routes } from '@angular/router';
import { LoginComponent } from './componenet/login/login.component';
import { RegisterComponent } from './componenet/register/register.component';
import { HomeComponent } from './componenet/home/home.component';
import { CartComponent } from './componenet/cart/cart.component';
import { CategoryComponent } from './componenet/category/category.component';
import { ProductsComponent } from './componenet/products/products.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';
import { BrandsComponent } from './componenet/brands/brands.component';
import { logedGuardGuard } from './util/guards/loged-guard.guard';
import { unLogedGuardGuard } from './util/guards/un-loged-guard.guard';
import { NotFoundComponent } from './componenet/not-found/not-found.component';
import { ProductDetailsComponent } from './componenet/product-details/product-details.component';
import { ForgetPasswordComponent } from './componenet/forget-password/forget-password.component';
import { SingleCategoryComponent } from './componenet/single-category/single-category.component';
import { CashPaymentComponent } from './componenet/cash-payment/cash-payment.component';
import { OnlinePaymentComponent } from './componenet/online-payment/online-payment.component';
import { AllordersComponent } from './componenet/allorders/allorders.component';

export const routes: Routes = [
  {path:"",component:AuthComponent,canActivate:[unLogedGuardGuard],children:[
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",loadComponent:()=>import("./componenet/login/login.component").then(c=>c.LoginComponent),title:"Login Page"},
    {path:"register",loadComponent:()=>import("./componenet/register/register.component").then(c=>c.RegisterComponent),title:"Register Page"},
    {path:"forgetPassowrd",loadComponent:()=>import("./componenet/forget-password/forget-password.component").then(c=>c.ForgetPasswordComponent),title:"Details Page"},
  ]},
  {path:"",component:BlankComponent, canActivate:[logedGuardGuard],children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent,title:"Home Page"},
    {path:"cart",loadComponent:()=>import("./componenet/cart/cart.component").then(c=>c.CartComponent),title:"Cart Page"},
    {path:"category",component:CategoryComponent,title:"Category Page"},
    {path:"category/:id",component:SingleCategoryComponent,title:"Category Page"},
    {path:"products",component:ProductsComponent,title:"Products Page"},
    {path:"brands",loadComponent:()=>import("./componenet/brands/brands.component").then(c=>c.BrandsComponent),title:"Brands Page"},
    {path:"product/:id",component:ProductDetailsComponent,title:"Details Page"},
    {path:"cashPayment/:id",loadComponent:()=>import("./componenet/cash-payment/cash-payment.component").then(c=>c.CashPaymentComponent),title:"Cash Payment Page"},
    {path:"onlinePayment/:id",loadComponent:()=>import("./componenet/online-payment/online-payment.component").then(c=>c.OnlinePaymentComponent),title:"Online Payment Page"},
    {path:"allorders",loadComponent:()=>import("./componenet/allorders/allorders.component").then(c=>c.AllordersComponent),title:"Orders Page"},
  ]},

  {path:"**",loadComponent:()=>import("./componenet/not-found/not-found.component").then(c=>c.NotFoundComponent),title:"Not Found Page"}
];
