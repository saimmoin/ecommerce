import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-left',
  standalone: true,
  imports: [],
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.css']
})
export class NavbarLeftComponent {
  isNavbarOpen = true; // Navbar starts open by default

  toggleNavbar() {
    const navbar = document.querySelector('.left-nav');
    const content = document.querySelector('.content');
    const navToggle = document.querySelector('.nav-toggle'); // Button element

    if (navbar) {
      navbar.classList.toggle('open');
      this.isNavbarOpen = navbar.classList.contains('open'); // Update state
    }

    if (content) {
      if (this.isNavbarOpen) {
        content.classList.remove('navbar-closed');
      } else {
        content.classList.add('navbar-closed');
      }
    }

    // Adjust the toggle button's position based on navbar state
    if (navToggle) {
      if (this.isNavbarOpen) {
        navToggle.classList.add('move'); // When open, move the button
      } else {
        navToggle.classList.remove('move'); // When closed, reset button position
      }
    }
  }

  ngOnInit() {
    const navbar = document.querySelector('.left-nav');
    const content = document.querySelector('.content');
    const navToggle = document.querySelector('.nav-toggle');

    if (navbar) {
      navbar.classList.add('open'); // Add the 'open' class by default
    }

    if (content) {
      content.classList.remove('navbar-closed'); // Ensure content starts aligned
    }

    if (navToggle) {
      navToggle.classList.add('move'); // Move the button when the navbar starts open
    }
  }
}
