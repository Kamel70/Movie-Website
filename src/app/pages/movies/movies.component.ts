import { Component, inject } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { EndPoints } from '../../endpoints/endpoints';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [MovieListComponent, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 500;
  movies: IMovie[] = [];
  loading: boolean = false;
  service = inject(GenericHttpClientService);
  ngOnInit(): void {
    this.fetchMovies();
  }

  handleInputChange() {
    this.currentPage = 1;
    if (this.searchQuery.trim().length === 0) {
      this.totalPages = 500;
      this.fetchMovies();
      return;
    }
    this.fetchMoviesWithSearch();
  }

  fetchMoviesWithSearch() {
    this.loading = true;
    this.service
      .searchMovies(EndPoints.SEARCH_MOVIES, this.searchQuery, this.currentPage)
      .subscribe({
        next: (data: IMovieResponse) => {
          this.movies = data.results.filter((m) => !m.adult);
          this.totalPages = data.total_pages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.loading = false;
        },
      });
  }

  fetchMovies() {
    this.loading = true;
    this.service.getMovies(EndPoints.MOVIES, this.currentPage).subscribe({
      next: (data: IMovieResponse) => {
        this.movies = data.results.filter((m) => !m.adult);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      },
    });
  }

  onPageChange = (page: number) => {
    this.currentPage = page;
    if (this.searchQuery.trim().length > 0) {
      this.fetchMoviesWithSearch();
      return;
    }
    this.fetchMovies();
  };
}
