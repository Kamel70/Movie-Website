import { Component } from '@angular/core';
import { NavItem } from '../../interfaces/nav-item';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  navItems: NavItem[] = [
    { name: 'Movies', path: 'movies', active: false },
    { name: 'TV Shows', path: 'tv-shows', active: false },
    {
      name: 'Suggest Me',
      path: 'suggests',
      icon: 'bi bi-arrow-right',
      active: false,
    },
  ];

  setActive(item: NavItem) {
    this.navItems.forEach((navItem) => {
      navItem.active = false;
    });
    item.active = true;
    console.log(this.navItems);
  }
}
