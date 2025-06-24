import { Component, inject } from '@angular/core';
import { TvShowListComponent } from '../../components/tv-show-list/tv-show-list.component';
import { FormsModule } from '@angular/forms';
import { ITvShow, ITvShowResponse } from '../../interfaces/ITvShow';
import { GenericHttpClientService } from '../../services/generic-http-client.service';
import { EndPoints } from '../../endpoints/endpoints';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-shows',
  imports: [TvShowListComponent, FormsModule],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css',
})
export class TvShowsComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 500;
  tvshows: ITvShow[] = [];
  loading: boolean = false;
  service = inject(GenericHttpClientService);

  onSearchChange() {
    this.currentPage = 1;
    if (this.searchQuery.trim().length === 0) {
      this.totalPages = 500;
      this.fetchTVShows();
      return;
    }
    this.fetchTVShowsWithSearch();
  }
  ngOnInit(): void {
    this.fetchTVShows();
  }
  fetchTVShowsWithSearch() {
    this.loading = true;
    this.service
      .searchTVShows(
        EndPoints.SEARCH_TV_SHOWS,
        this.searchQuery.trim(),
        this.currentPage
      )
      .subscribe({
        next: (data: ITvShowResponse) => {
          this.tvshows = data.results.filter((m) => !m.adult);
          this.totalPages = data.total_pages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.loading = false;
        },
      });
  }
  fetchTVShows() {
    this.loading = true;
    this.service.getTVShows(EndPoints.TV_SHOWS, this.currentPage).subscribe({
      next: (data: ITvShowResponse) => {
        this.tvshows = data.results.filter((m) => !m.adult);
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
      this.fetchTVShowsWithSearch();
      return;
    }
    this.fetchTVShows();
  };
}
