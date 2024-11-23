import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarTopComponent } from "./components/navbar-top/navbar-top.component";
import { NavbarLeftComponent } from "./components/navbar-left/navbar-left.component";  



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarTopComponent, NavbarLeftComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_18_tutorial';

}
