import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // logic for request
  let token=document.cookie.split("=")[1]
    if(token){
      req=req.clone({
        setHeaders:{
          token:token,
          lang:localStorage.getItem("lang") as string
        }
      })
  }
  return next(req); // logic for reponse
};
