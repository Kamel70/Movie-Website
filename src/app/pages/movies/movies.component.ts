import { Component } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-movies',
  imports: [MovieListComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {}
