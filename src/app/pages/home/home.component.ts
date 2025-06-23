import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CardSliderComponent } from '../../components/card-slider/card-slider.component';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { EndPoints } from '../../endpoints/endpoints';
import { ITvShow, ITvShowResponse } from '../../interfaces/ITvShow';

register();

interface Movie {
  id: number;
  title: string;
  poster: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardSliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviess: IMovie[] = [];
  topRatedMovies: IMovie[] = [];
  upComingMoviess: IMovie[] = [];
  topRatedTvShows: ITvShow[] = [];
  tvShows: ITvShow[] = [];
  service = inject(GenericHttpClientService);
  coverURL: string = 'https://image.tmdb.org/t/p/original';
  autoplayConfig = {
    delay: 3000,
    disableOnInteraction: false,
  };

  paginationConfig = {
    clickable: true,
  };

  constructor() {
    // fetch popular movies
    this.service.getMovies(EndPoints.POPULAR_MOVIES, 1).subscribe({
      next: (data: IMovieResponse) => {
        this.moviess = data.results.filter((m) => !m.adult).slice(0, 10);
        console.log(this.moviess);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
    // fetch popular TV shows
    this.service.getTVShows(EndPoints.POPULAR_TV_SHOWS, 1).subscribe({
      next: (data: ITvShowResponse) => {
        this.tvShows = data.results.filter((m) => !m.adult).slice(0, 10);
        console.log(this.tvShows);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
    // fetch upcoming movies
    this.service.getMovies(EndPoints.UP_COMING_MOVIES, 1).subscribe({
      next: (data: IMovieResponse) => {
        this.upComingMoviess = data.results
          .filter((m) => !m.adult)
          .slice(0, 10);
        console.log(this.moviess);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
    // fetch top rated movies
    this.service.getMovies(EndPoints.TOP_Rated_MOVIES, 1).subscribe({
      next: (data: IMovieResponse) => {
        this.topRatedMovies = data.results.filter((m) => !m.adult).slice(0, 10);
        console.log(this.moviess);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
    // fetch top rated TV shows
    this.service.getTVShows(EndPoints.TOP_Rated_TV_SHOWS, 1).subscribe({
      next: (data: ITvShowResponse) => {
        this.topRatedTvShows = data.results
          .filter((m) => !m.adult)
          .slice(0, 10);
        console.log(this.tvShows);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
  }

  goToMovie(movieId: number) {
    console.log(`Navigating to movie with ID: ${movieId}`);
  }
}
