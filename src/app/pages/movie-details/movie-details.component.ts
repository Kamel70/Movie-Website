import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { IMovieDetails } from '../../interfaces/movie-details';
import { EndPoints } from '../../endpoints/endpoints';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  route = inject(ActivatedRoute);
  service = inject(GenericHttpClientService);
  movieId!: string;
  movie!: IMovieDetails;
  loading: boolean = false;
  posterURL: string = 'https://image.tmdb.org/t/p/w500';
  coverURL: string = 'https://image.tmdb.org/t/p/original';
  constructor() {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id')?.toString()!;
      this.service
        .getMovieByID(EndPoints.MOVIES_ID(this.movieId))
        .subscribe((data: IMovieDetails) => {
          this.loading = true;
          this.movie = data;
          this.loading = false;
          console.log(this.movie);
        });
    });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}
