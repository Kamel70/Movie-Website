import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  signal,
  WritableSignal,
  inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { EndPoints } from '../../endpoints/endpoints';
import { ITvShow, ITvShowResponse } from '../../interfaces/ITvShow';
import { forkJoin, Subject, of } from 'rxjs';
import { takeUntil, finalize, catchError, map } from 'rxjs/operators';
import { CardSliderComponent } from '../../components/card-slider/card-slider.component';
import { Router } from '@angular/router';
import { AosService } from '../../services/aos.service';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardSliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{
  aosService = inject(AosService);
  cdr = inject(ChangeDetectorRef);

  private viewChecked = false;
  private dataLoaded = false;

  @ViewChild('swiperRef') swiperRef!: ElementRef;
  rotuer = inject(Router);
  private readonly destroy$ = new Subject<void>();
  private readonly service = inject(GenericHttpClientService);

  movies: WritableSignal<IMovie[]> = signal([]);
  topRatedMovies: WritableSignal<IMovie[]> = signal([]);
  upComingMovies: WritableSignal<IMovie[]> = signal([]);
  topRatedTvShows: WritableSignal<ITvShow[]> = signal([]);
  tvShows: WritableSignal<ITvShow[]> = signal([]);

  readonly coverURL = 'https://image.tmdb.org/t/p/original';
  isLoading = false;

  ngOnInit(): void {
    // Initialize AOS service
    this.aosService.init();
    this.loadAllData();
  }

  ngAfterViewInit() {
    window.addEventListener('resize', () => {
      const swiperEl = this.swiperRef?.nativeElement;
      if (swiperEl?.swiper) {
        swiperEl.swiper.update();
      }
    });

    // Initial refresh after view initialization
    setTimeout(() => {
      this.aosService.refresh();
    }, 300);
  }

  ngAfterViewChecked() {
    // Refresh AOS after view is checked (when all content is rendered)
    if (!this.viewChecked && this.hasData() && this.dataLoaded) {
      this.viewChecked = true;
      setTimeout(() => {
        this.aosService.refreshHard();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private hasData(): boolean {
    return (
      this.topRatedMovies().length > 0 &&
      this.movies().length > 0 &&
      this.topRatedTvShows().length > 0 &&
      this.tvShows().length > 0
    );
  }

  private loadAllData(): void {
    this.isLoading = true;
    this.dataLoaded = false;

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
        finalize(() => {
          this.isLoading = false;
          this.dataLoaded = true;
          // Refresh AOS after data is loaded
          this.checkAndRefreshAos();
        })
      )
      .subscribe({
        next: (data) => {
          this.movies.set(data.popularMovies);
          this.topRatedMovies.set(data.topRatedMovies);
          this.upComingMovies.set(data.upcomingMovies);
          this.tvShows.set(data.popularTvShows);
          this.topRatedTvShows.set(data.topRatedTvShows);

          // Trigger change detection and AOS refresh
          this.cdr.detectChanges();
          this.checkAndRefreshAos();
        },
        error: (error) => {
          console.error('Error loading data:', error);
          this.dataLoaded = true;
        },
      });
  }

  private checkAndRefreshAos() {
    if (this.hasData()) {
      // Multiple refresh attempts with different timings for reliability
      setTimeout(() => {
        this.aosService.refresh();
      }, 100);

      setTimeout(() => {
        this.aosService.refreshHard();
        this.cdr.detectChanges();
      }, 300);

      // Final refresh attempt
      setTimeout(() => {
        this.aosService.refreshHard();
      }, 600);
    }
  }

  private fetchPopularMovies() {
    return this.service.getMovies(EndPoints.POPULAR_MOVIES, 1).pipe(
      map((data: IMovieResponse) => this.processMovieResults(data)),
      catchError((error) => {
        console.error('Error fetching popular movies:', error);
        return of([]);
      })
    );
  }

  private fetchTopRatedMovies() {
    return this.service.getMovies(EndPoints.TOP_Rated_MOVIES, 1).pipe(
      map((data: IMovieResponse) => this.processMovieResults(data)),
      catchError((error) => {
        console.error('Error fetching top rated movies:', error);
        return of([]);
      })
    );
  }

  private fetchUpcomingMovies() {
    return this.service.getMovies(EndPoints.UP_COMING_MOVIES, 1).pipe(
      map((data: IMovieResponse) => this.processMovieResults(data)),
      catchError((error) => {
        console.error('Error fetching upcoming movies:', error);
        return of([]);
      })
    );
  }

  private fetchPopularTvShows() {
    return this.service.getTVShows(EndPoints.POPULAR_TV_SHOWS, 1).pipe(
      map((data: ITvShowResponse) => this.processTvShowResults(data)),
      catchError((error) => {
        console.error('Error fetching popular TV shows:', error);
        return of([]);
      })
    );
  }

  private fetchTopRatedTvShows() {
    return this.service.getTVShows(EndPoints.TOP_Rated_TV_SHOWS, 1).pipe(
      map((data: ITvShowResponse) => this.processTvShowResults(data)),
      catchError((error) => {
        console.error('Error fetching top rated TV shows:', error);
        return of([]);
      })
    );
  }

  private processMovieResults(data: IMovieResponse): IMovie[] {
    return data.results.filter((movie) => !movie.adult).slice(0, 10);
  }

  private processTvShowResults(data: ITvShowResponse): ITvShow[] {
    return data.results.filter((show) => !show.adult).slice(0, 10);
  }

  goToMovie(movieId: number): void {
    this.rotuer.navigate(['/movies', movieId]);
  }
}
