import { Component } from '@angular/core';
import { NavBlankComponent } from '../../componenet/nav-blank/nav-blank.component';
import { FooterComponent } from '../../componenet/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank',
  imports: [NavBlankComponent,FooterComponent,RouterOutlet],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

}
