import { Component, inject } from '@angular/core';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movies: IMovie[] = [];
  service = inject(MovieService);
  constructor() {
    this.service.getMovies().subscribe((data: IMovieResponse) => {
      this.movies = data.results;
      console.log(this.movies);
    });
  }
}
