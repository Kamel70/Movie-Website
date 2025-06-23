import { Component, inject } from '@angular/core';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { ActivatedRoute } from '@angular/router';
import { ITvShowDetails } from '../../interfaces/ITvShow-details';
import { EndPoints } from '../../endpoints/endpoints';

@Component({
  selector: 'app-tv-show-details',
  imports: [],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css',
})
export class TvShowDetailsComponent {
  route = inject(ActivatedRoute);
  service = inject(GenericHttpClientService);
  tvShowID!: string;
  tvShow!: ITvShowDetails;
  loading: boolean = false;
  posterURL: string = 'https://image.tmdb.org/t/p/w500';
  coverURL: string = 'https://image.tmdb.org/t/p/original';
  constructor() {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.tvShowID = params.get('id')?.toString()!;
      this.service
        .getTvShowByID(EndPoints.TV_SHOWS_ID(this.tvShowID))
        .subscribe((data: ITvShowDetails) => {
          this.loading = true;
          this.tvShow = data;
          this.loading = false;
          console.log(this.tvShow);
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

  getAverageRuntime(runtimes: number[]): number {
    if (!runtimes || runtimes.length === 0) return 0;
    const sum = runtimes.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / runtimes.length);
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ended':
      case 'canceled':
        return 'status-ended';
      case 'returning series':
      case 'in production':
        return 'status-ongoing';
      default:
        return 'status-returning';
    }
  }
}
