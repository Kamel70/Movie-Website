import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  AfterViewInit,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IMovie } from '../../interfaces/movie';
import { ITvShow } from '../../interfaces/ITvShow';
import { Router } from '@angular/router';
import { AosService } from '../../services/aos/aos.service';

register();

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.css',
})
export class CardSliderComponent implements AfterViewInit {
  router = inject(Router);
  aosService = inject(AosService);
  title = input.required<string>();
  content = input.required<IMovie[] | ITvShow[]>();
  type = input.required<'movie' | 'tv'>();
  imageURL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
  titleAnimation = input<string>('fade-right');
  titleDelay = input<number>(0);
  cardAnimation = input<string>('fade-up');
  cardDelay = input<number>(100);
  cardDelayIncrement = input<number>(50); // Delay increment for each card
  breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };
  ngAfterViewInit() {
    setTimeout(() => {
      this.aosService.refresh();
    }, 200);
  }

  getTitle(item: IMovie | ITvShow): string {
    return this.type() === 'movie'
      ? (item as IMovie).title
      : (item as ITvShow).name;
  }

  getYear(item: IMovie | ITvShow): string {
    return this.type() === 'movie'
      ? new Date((item as IMovie).release_date).getFullYear().toString()
      : new Date((item as ITvShow).first_air_date).getFullYear().toString();
  }
  goToDetails(id: number) {
    this.type() === 'movie'
      ? this.router.navigate(['/movies', id])
      : this.router.navigate(['/tvshows', id]);
  }
  getCardDelay(index: number): number {
    return this.cardDelay() + index * this.cardDelayIncrement();
  }
}
