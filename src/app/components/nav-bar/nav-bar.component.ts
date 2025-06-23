import { Component, inject } from '@angular/core';
import { NavItem } from '../../interfaces/nav-item';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  router = inject(Router);
  isMenuOpen = false; // Track menu state
  navItems: NavItem[] = [
    { name: 'Movies', path: 'movies', active: false },
    { name: 'TV Shows', path: 'tvshows', active: false },
    {
      name: 'Suggest Me',
      path: 'suggests',
      icon: 'bi bi-arrow-right',
      active: false,
    },
  ];

  handleNavClick(item: NavItem) {
    this.router.navigate([item.path]);
    this.navItems.forEach((navItem) => {
      navItem.active = false;
    });
    item.active = true;
    // Close mobile menu after selection
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
