import { Component, inject, OnInit } from '@angular/core';
import { IMovie, IMovieResponse } from '../../interfaces/movie';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EndPoints } from '../../endpoints/endpoints';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent, NgxPaginationModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 500;
  movies: IMovie[] = [];
  loading: boolean = false;
  service = inject(GenericHttpClientService);
  ngOnInit(): void {
    this.fetchMovies();
  }
  fetchMovies() {
    this.loading = true;
    console.log(this.currentPage);
    this.service.getMovies(EndPoints.MOVIES, this.currentPage).subscribe({
      next: (data: IMovieResponse) => {
        this.movies = data.results.filter((m) => !m.adult);
        this.loading = false;
        console.log(this.movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchMovies();
  }
}
