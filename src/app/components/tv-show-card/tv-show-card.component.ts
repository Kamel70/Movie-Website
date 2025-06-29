import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ITvShow } from '../../interfaces/ITvShow';

@Component({
  selector: 'app-tv-show-card',
  imports: [],
  templateUrl: './tv-show-card.component.html',
  styleUrl: './tv-show-card.component.css',
})
export class TvShowCardComponent {
  tvShow = input.required<ITvShow>();
  router = inject(Router);
  movieURL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

  onMovieClick(id: number) {
    this.router.navigate(['/tvshows', id]);
  }
}
