import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTxt'
})
export class SplitTxtPipe implements PipeTransform {

  transform(value: string,limit:number): unknown {
    return value.split(" ",limit).join(" ");
  }

}
