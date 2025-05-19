import { Component, inject, input } from '@angular/core';
import { IMovie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input.required<IMovie>();
  service = inject(MovieService);
}
