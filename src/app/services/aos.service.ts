import { Injectable } from '@angular/core';
import AOS from 'aos';

@Injectable({
  providedIn: 'root',
})
export class AosService {
  private initialized = false;

  init() {
    if (!this.initialized) {
      AOS.init({
        easing: 'ease-in-out',
        once: false,
        duration: 800,
        delay: 0,
        disable: false,
        startEvent: 'DOMContentLoaded',
        throttleDelay: 99,
        debounceDelay: 50,
        offset: 120,
      });
      this.initialized = true;
    }
  }

  refresh() {
    if (this.initialized) {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  refreshHard() {
    if (this.initialized) {
      setTimeout(() => {
        AOS.refreshHard();
      }, 100);
    }
  }
}
