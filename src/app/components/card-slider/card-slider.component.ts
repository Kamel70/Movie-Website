import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import AOS from 'aos';

register();

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string;
}
@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.css'
})
export class CardSliderComponent {

}
