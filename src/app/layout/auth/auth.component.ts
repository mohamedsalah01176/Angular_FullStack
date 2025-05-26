import { Component } from '@angular/core';
import { NavAuthComponent } from '../../componenet/nav-auth/nav-auth.component';
import { FooterComponent } from '../../componenet/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [NavAuthComponent,FooterComponent,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
