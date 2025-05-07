import { Component } from '@angular/core';
import { NavItem } from '../../interfaces/nav-item';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-segment-control',
  imports: [NgClass],
  templateUrl: './segment-control.component.html',
  styleUrl: './segment-control.component.css',
})
export class SegmentControlComponent {
  navItems: NavItem[] = [
    { name: 'All', path: 'movies', active: false },
    { name: 'TV Shows', path: 'tv-shows', active: false },
    { name: 'Movies', path: 'tv-shows', active: false },
  ];

  setActive(item: NavItem) {
    this.navItems.forEach((navItem) => {
      navItem.active = false;
    });
    item.active = true;
  }
}
