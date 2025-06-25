import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CardSliderComponent } from '../../components/card-slider/card-slider.component';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { EndPoints } from '../../endpoints/endpoints';
import { ITvShow, ITvShowResponse } from '../../interfaces/ITvShow';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, finalize, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardSliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly service = inject(GenericHttpClientService);

  // Data properties
  movies: IMovie[] = [];
  topRatedMovies: IMovie[] = [];
  upComingMovies: IMovie[] = [];
  topRatedTvShows: ITvShow[] = [];
  tvShows: ITvShow[] = [];

  // Configuration
  readonly coverURL = 'https://image.tmdb.org/t/p/original';

  // Loading state
  isLoading = false;

  ngOnInit(): void {
    this.loadAllData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all data using forkJoin for better performance and reliability
   */
  private loadAllData(): void {
    this.isLoading = true;

    const requests = {
      popularMovies: this.fetchPopularMovies(),
      topRatedMovies: this.fetchTopRatedMovies(),
      upcomingMovies: this.fetchUpcomingMovies(),
      popularTvShows: this.fetchPopularTvShows(),
      topRatedTvShows: this.fetchTopRatedTvShows(),
    };

    forkJoin(requests)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          this.movies = data.popularMovies;
          this.topRatedMovies = data.topRatedMovies;
          this.upComingMovies = data.upcomingMovies;
          this.tvShows = data.popularTvShows;
          this.topRatedTvShows = data.topRatedTvShows;

          console.log('All data loaded successfully');
        },
        error: (error) => {
          console.error('Error loading data:', error);
        },
      });
  }

  /**
   * Fetch popular movies
   */
  private fetchPopularMovies() {
    return this.service.getMovies(EndPoints.POPULAR_MOVIES, 1).pipe(
      map((data: IMovieResponse) => this.processMovieResults(data)),
      catchError((error) => {
        console.error('Error fetching popular movies:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch top rated movies
   */
  private fetchTopRatedMovies() {
    return this.service.getMovies(EndPoints.TOP_Rated_MOVIES, 1).pipe(
      map((data: IMovieResponse) => this.processMovieResults(data)),
      catchError((error) => {
        console.error('Error fetching top rated movies:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch upcoming movies
   */
  private fetchUpcomingMovies() {
    return this.service.getMovies(EndPoints.UP_COMING_MOVIES, 1).pipe(
      map((data: IMovieResponse) => this.processMovieResults(data)),
      catchError((error) => {
        console.error('Error fetching upcoming movies:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch popular TV shows
   */
  private fetchPopularTvShows() {
    return this.service.getTVShows(EndPoints.POPULAR_TV_SHOWS, 1).pipe(
      map((data: ITvShowResponse) => this.processTvShowResults(data)),
      catchError((error) => {
        console.error('Error fetching popular TV shows:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch top rated TV shows
   */
  private fetchTopRatedTvShows() {
    return this.service.getTVShows(EndPoints.TOP_Rated_TV_SHOWS, 1).pipe(
      map((data: ITvShowResponse) => this.processTvShowResults(data)),
      catchError((error) => {
        console.error('Error fetching top rated TV shows:', error);
        return of([]);
      })
    );
  }

  /**
   * Filter adult content and limit results
   */
  private processMovieResults(data: IMovieResponse): IMovie[] {
    return data.results.filter((movie) => !movie.adult).slice(0, 10);
  }

  /**
   * Filter adult content and limit results for TV shows
   */
  private processTvShowResults(data: ITvShowResponse): ITvShow[] {
    return data.results.filter((show) => !show.adult).slice(0, 10);
  }

  /**
   * Navigate to movie details
   */
  goToMovie(movieId: number): void {
    if (!movieId) {
      console.warn('Invalid movie ID');
      return;
    }
    console.log(`Navigating to movie with ID: ${movieId}`);
  }

  // Enhanced autoplay configuration
  autoplayConfig = {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  // Enhanced pagination configuration
  paginationConfig = {
    clickable: true,
    dynamicBullets: true,
  };

  // Computed property to handle loop logic
  get shouldEnableLoop(): boolean {
    return this.upComingMovies && this.upComingMovies.length >= 3;
  }

  // Method to duplicate slides if needed for loop
  get processedMovies(): any[] {
    if (!this.upComingMovies || this.upComingMovies.length === 0) {
      return [];
    }

    // If we have fewer than 3 movies, duplicate them to enable smooth loop
    if (this.upComingMovies.length < 3) {
      const duplicatedMovies = [...this.upComingMovies];
      while (duplicatedMovies.length < 3) {
        duplicatedMovies.push(...this.upComingMovies);
      }
      return duplicatedMovies.slice(0, 6); // Limit to avoid too many duplicates
    }

    return this.upComingMovies;
  }
}
