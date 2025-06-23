import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMovie, IMovieResponse } from '../interfaces/movie';
import { IMovieDetails } from '../interfaces/movie-details';
import { environment } from '../../environments/environment.prod';
import { ITvShowResponse } from '../interfaces/ITvShow';
import { ITvShowDetails } from '../interfaces/ITvShow-details';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpClientService {
  url = environment.tmdbBaseUrl;
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${environment.tmdbApiKey}`,
    },
  };
  constructor() {}
  http = inject(HttpClient);
  // movies: IMovie[] = [];
  // moviesSignal = signal<IMovie[]>(this.movies);
  getMovies(httpOptions: string, page: number) {
    return this.http.get<IMovieResponse>(
      `${this.url}${httpOptions}?page=${page}`,
      this.options
    );
  }

  getTVShows(httpOptions: string, page: number) {
    return this.http.get<ITvShowResponse>(
      `${this.url}${httpOptions}?page=${page}`,
      this.options
    );
  }

  getMovieByID(httpOptions: string) {
    return this.http.get<IMovieDetails>(
      `${this.url}${httpOptions}`,
      this.options
    );
  }
  getTvShowByID(httpOptions: string) {
    return this.http.get<ITvShowDetails>(
      `${this.url}${httpOptions}`,
      this.options
    );
  }
}
