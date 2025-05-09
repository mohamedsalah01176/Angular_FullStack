import { TranslateService } from '@ngx-translate/core';

import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslateLangService {
  private _TranslateService=inject(TranslateService);
  private _platId=inject(PLATFORM_ID);
  private _Render2=inject(RendererFactory2).createRenderer(null,null);

  constructor() {
    if(typeof localStorage !== "undefined"){
      let lang= localStorage.getItem("lang") || 'en';

      this._TranslateService.setDefaultLang('en');
      this._TranslateService.use(lang as string);

      this.changeDirection()
    }
  }

  changeDirection(){
    if(typeof localStorage !== "undefined"){
      let lang= localStorage.getItem("lang");
      if(lang == "en"){
        // document.documentElement.dir="ltr";
        this._Render2.setAttribute(document.documentElement,"dir","ltr");
        this._Render2.setAttribute(document.documentElement,"lang","en");
      }else if(lang == "ar"){
        // document.documentElement.dir="rtl"
        this._Render2.setAttribute(document.documentElement,"dir","rtl");
        this._Render2.setAttribute(document.documentElement,"lang","ar");
      }
    }
  }

  changeLang(lang:string){
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("lang",lang);
      this._TranslateService.use(lang)
      this.changeDirection();
    }
  }
}
