import { Component, inject } from '@angular/core';
import { ITvShow, ITvShowResponse } from '../../interfaces/ITvShow';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { EndPoints } from '../../endpoints/endpoints';
import { NgxPaginationModule } from 'ngx-pagination';
import { TvShowCardComponent } from '../tv-show-card/tv-show-card.component';

@Component({
  selector: 'app-tv-show-list',
  imports: [NgxPaginationModule, TvShowCardComponent],
  templateUrl: './tv-show-list.component.html',
  styleUrl: './tv-show-list.component.css',
})
export class TvShowListComponent {
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 500;
  tvshows: ITvShow[] = [];
  loading: boolean = false;
  service = inject(GenericHttpClientService);
  ngOnInit(): void {
    this.fetchTVShows();
  }
  fetchTVShows() {
    this.loading = true;
    console.log(this.currentPage);
    this.service.getTVShows(EndPoints.TV_SHOWS, this.currentPage).subscribe({
      next: (data: ITvShowResponse) => {
        this.tvshows = data.results.filter((m) => !m.adult);
        this.loading = false;
        console.log(this.tvshows);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchTVShows();
  }
}
