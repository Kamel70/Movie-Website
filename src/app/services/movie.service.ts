import { inject, Injectable, signal } from '@angular/core';
import { IMovie, IMovieResponse } from '../interfaces/movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer api key',
    },
  };
  constructor() {}
  http = inject(HttpClient);
  // movies: IMovie[] = [];
  // moviesSignal = signal<IMovie[]>(this.movies);
  getMovies() {
    return this.http.get<IMovieResponse>(this.url, this.options);
  }
}
