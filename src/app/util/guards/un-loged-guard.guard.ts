import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const unLogedGuardGuard: CanActivateFn = (route, state) => {
  if(typeof document !== 'undefined'){
    let token=document.cookie.split('=')[1];
    let _Router=inject(Router);
    if(token){
      _Router.navigate(['/home'])
      return false;
    }else{
      return true;
    }
  }else{
    return false;
  }
};
