import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SppinerComponent } from "./componenet/sppiner/sppiner.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, SppinerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce2';
}
