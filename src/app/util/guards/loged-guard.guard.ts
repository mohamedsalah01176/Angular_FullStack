import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuardGuard: CanActivateFn = (route, state) => {
  let _PlatFormId=inject(PLATFORM_ID);
  let _Router=inject(Router);
  if(isPlatformBrowser(_PlatFormId)){
    let token=document.cookie.split("=")[1]
    if(token){
      return true;
    }else{
      _Router.navigate(['/login'])
      return false;
    }
  }else{
    return false
  }
};
