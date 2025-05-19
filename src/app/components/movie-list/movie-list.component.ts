import { Component, inject } from '@angular/core';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { EndPoints } from '../../endpoints/endpoints';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movies: IMovie[] = [];
  service = inject(GenericHttpClientService);
  constructor() {
    this.service
      .getMovies(EndPoints.MOVIES)
      .subscribe((data: IMovieResponse) => {
        this.movies = data.results;
        console.log(this.movies);
      });
  }
}
