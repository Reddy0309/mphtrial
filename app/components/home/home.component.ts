import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterOutlet,RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterModule,RouterOutlet,NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
