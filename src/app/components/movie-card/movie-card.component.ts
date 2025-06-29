import { Component, inject, input } from '@angular/core';
import { IMovie } from '../../interfaces/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input.required<IMovie>();
  router = inject(Router);
  movieURL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

  onMovieClick(id: number) {
    this.router.navigate(['/movies', id]);
  }
}
