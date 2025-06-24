import { Component, Input } from '@angular/core';
import { ITvShow } from '../../interfaces/ITvShow';
import { NgxPaginationModule } from 'ngx-pagination';
import { TvShowCardComponent } from '../tv-show-card/tv-show-card.component';

@Component({
  selector: 'app-tv-show-list',
  imports: [NgxPaginationModule, TvShowCardComponent],
  templateUrl: './tv-show-list.component.html',
  styleUrl: './tv-show-list.component.css',
})
export class TvShowListComponent {
  itemsPerPage: number = 20;
  @Input() totalPages: number = 500;
  @Input() onPageChange!: (page: number) => void;
  @Input() currentPage: number = 1;
  @Input() tvshows: ITvShow[] = [];
  @Input() loading: boolean = false;
}
